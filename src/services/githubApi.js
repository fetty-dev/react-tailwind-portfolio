const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
const BASE_URL = 'https://api.github.com';

console.log('GitHub Token loaded:', GITHUB_TOKEN ? 'Yes' : 'No');
console.log('Token length:', GITHUB_TOKEN ? GITHUB_TOKEN.length : 0);

class GitHubApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'GitHubApiError';
    this.status = status;
  }
}

const fetchWithAuth = async (url) => {
  if (!GITHUB_TOKEN) {
    throw new GitHubApiError('GitHub token not found in environment variables', 401);
  }

  console.log('Fetching:', url);
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  });

  console.log('Response status:', response.status);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('GitHub API Error:', errorText);
    throw new GitHubApiError(
      `GitHub API error: ${response.status} ${response.statusText}`,
      response.status
    );
  }

  return response.json();
};

export const fetchAllRepositories = async () => {
  const repos = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    try {
      const data = await fetchWithAuth(
        `${BASE_URL}/user/repos?per_page=${perPage}&page=${page}&type=all`
      );

      if (data.length === 0) break;
      
      repos.push(...data);
      
      if (data.length < perPage) break;
      page++;
    } catch (error) {
      console.error('Error fetching repositories:', error);
      throw error;
    }
  }

  return repos;
};

export const fetchRepositoryLanguages = async (owner, repo) => {
  try {
    return await fetchWithAuth(`${BASE_URL}/repos/${owner}/${repo}/languages`);
  } catch (error) {
    console.error(`Error fetching languages for ${owner}/${repo}:`, error);
    return {};
  }
};

export const calculateSkillLevels = async () => {
  try {
    const repos = await fetchAllRepositories();
    const languageStats = {};
    let totalBytes = 0;

    // Fetch languages for all repositories
    for (const repo of repos) {
      const languages = await fetchRepositoryLanguages(repo.owner.login, repo.name);
      
      for (const [language, bytes] of Object.entries(languages)) {
        languageStats[language] = (languageStats[language] || 0) + bytes;
        totalBytes += bytes;
      }
    }

    // Convert to percentages and skill levels
    const skills = Object.entries(languageStats)
      .map(([language, bytes]) => {
        const percent = ((bytes / totalBytes) * 100).toFixed(1);
        const percentNum = parseFloat(percent);
        
        // Convert percentage to skill level (1-5 stars)
        let level;
        let emoji;
        if (percentNum >= 50) {
          level = 5;
          emoji = '🔵';
        } else if (percentNum >= 30) {
          level = 4;
          emoji = '🟣';
        } else if (percentNum >= 15) {
          level = 3;
          emoji = '🟠';
        } else if (percentNum >= 5) {
          level = 2;
          emoji = '🟡';
        } else {
          level = 1;
          emoji = '🟢';
        }

        return {
          language,
          percent: percentNum,
          level,
          emoji,
          bytes,
        };
      })
      .sort((a, b) => b.percent - a.percent); // Sort by percentage descending

    return {
      skills,
      totalRepositories: repos.length,
      totalBytes,
    };
  } catch (error) {
    console.error('Error calculating skill levels:', error);
    throw error;
  }
};