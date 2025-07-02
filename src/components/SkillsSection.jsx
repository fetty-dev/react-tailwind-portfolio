import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { calculateSkillLevels } from "@/services/githubApi";

// Fallback skills for when GitHub API fails
const fallbackSkills = [
  { name: "HTML", level: 90, category: "frontend", percent: 15.2, emoji: "🟠" },
  { name: "CSS", level: 85, category: "frontend", percent: 12.8, emoji: "🟠" },
  { name: "JavaScript", level: 80, category: "frontend", percent: 35.4, emoji: "🔵" },
  { name: "React", level: 85, category: "frontend", percent: 25.6, emoji: "🟣" },
  { name: "TypeScript", level: 75, category: "frontend", percent: 18.9, emoji: "🟠" },
  { name: "Python", level: 75, category: "languages", percent: 22.1, emoji: "🟠" },
];

// Language to category mapping
const languageCategories = {
  // Frontend
  'JavaScript': 'frontend',
  'TypeScript': 'frontend', 
  'HTML': 'frontend',
  'CSS': 'frontend',
  'SCSS': 'frontend',
  'Vue': 'frontend',
  'React': 'frontend',
  'Svelte': 'frontend',
  'Angular': 'frontend',
  
  // Backend
  'Node.js': 'backend',
  'Python': 'backend',
  'Java': 'backend',
  'C#': 'backend',
  'Go': 'backend',
  'Rust': 'backend',
  'PHP': 'backend',
  'Ruby': 'backend',
  
  // Languages
  'C': 'languages',
  'C++': 'languages',
  'Kotlin': 'languages',
  'Swift': 'languages',
  'Dart': 'languages',
  'Scala': 'languages',
  'Haskell': 'languages',
  'Lua': 'languages',
  
  // Mobile
  'Swift': 'mobile',
  'Kotlin': 'mobile',
  'Dart': 'mobile',
  'Objective-C': 'mobile',
  
  // Other
  'Shell': 'tools',
  'Dockerfile': 'tools',
  'YAML': 'tools',
  'JSON': 'tools',
};

const getCategoryForLanguage = (language) => {
  return languageCategories[language] || 'other';
};

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [skills, setSkills] = useState(fallbackSkills);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [repoStats, setRepoStats] = useState(null);

  useEffect(() => {
    const loadGitHubSkills = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await calculateSkillLevels();
        
        // List of auto-generated languages to exclude
        const excludedLanguages = [
          'Makefile', 'Dockerfile', 'YAML', 'YML', 'JSON', 'XML', 'HTML',
          'CSS', 'SCSS', 'Less', 'Stylus', 'Shell', 'Bash', 'PowerShell',
          'Batchfile', 'INI', 'TOML', 'Config', 'Ignore', 'Gitignore',
          'Markdown', 'Text', 'Log', 'CSV', 'SQL', 'Lock', 'Lockfile'
        ];
        
        // Transform GitHub data to our skills format
        const githubSkills = data.skills
          .filter(skill => 
            skill.percent >= 1 && // Only show languages with 1%+ usage
            !excludedLanguages.includes(skill.language) && // Exclude auto-generated
            languageCategories[skill.language] // Only include languages we categorize
          )
          .map(skill => ({
            name: skill.language,
            level: skill.level,
            category: getCategoryForLanguage(skill.language),
            percent: skill.percent,
            emoji: skill.emoji,
          }));
        
        setSkills(githubSkills);
        setRepoStats({
          totalRepositories: data.totalRepositories,
          totalBytes: data.totalBytes,
        });
      } catch (err) {
        console.error('Failed to load GitHub skills:', err);
        setError(err.message);
        // Keep fallback skills on error
      } finally {
        setLoading(false);
      }
    };

    loadGitHubSkills();
  }, []);

  // Get unique categories from skills
  const categories = ['all', ...new Set(skills.map(skill => skill.category))].filter(Boolean);
  
  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );
  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>
        
        {repoStats && (
          <p className="text-center text-muted-foreground mb-8">
            Based on {repoStats.totalRepositories} repositories from my GitHub
          </p>
        )}
        
        {loading && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
              Loading skills from GitHub...
            </div>
          </div>
        )}
        
        {error && (
          <div className="text-center mb-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-destructive text-sm">
              Failed to load GitHub data: {error}
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              Showing fallback skills
            </p>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg"> {skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                  style={{ width: skill.percent + "%" }}
                />
              </div>

              <div className="text-right mt-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {skill.percent}%
                  </span>
                  <span className="text-lg" title={`Level ${skill.level}/5`}>
                    {skill.emoji}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};