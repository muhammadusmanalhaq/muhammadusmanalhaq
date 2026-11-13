import Image from 'next/image'
import { Arrow } from './PortfolioIcons'

type Technology = [name: string, icon: string]

const groups: { title: string; tools: Technology[]; project: string; href: string }[] = [
  {
    title: 'Languages',
    tools: [['C#', 'csharp'], ['Python', 'python'], ['TypeScript', 'typescript'], ['JavaScript', 'javascript'], ['Java', 'java'], ['Kotlin', 'kotlin'], ['C++', 'cplusplus']],
    project: 'Convolution benchmarks', href: '#hpc-research',
  },
  {
    title: 'Frontend',
    tools: [['React', 'react'], ['Next.js', 'nextjs'], ['HTML', 'html5'], ['CSS', 'css3']],
    project: 'CineBook Pro', href: '#cinebook',
  },
  {
    title: 'Backend',
    tools: [['ASP.NET Core', 'dotnetcore'], ['EF Core', 'EF'], ['FastAPI', 'fastapi'], ['Node.js', 'nodejs'], ['Express', 'express']],
    project: 'ServiceDesk', href: '#servicedesk',
  },
  {
    title: 'Databases',
    tools: [['PostgreSQL', 'postgresql'], ['MySQL', 'mysql'], ['MongoDB', 'mongodb'], ['SQLite', 'sqlite'], ['SQL Server', 'microsoftsqlserver'], ['Neo4j', 'neo4j']],
    project: 'SwiftCart', href: '#swiftcart',
  },
  {
    title: 'Cloud & DevOps',
    tools: [['Azure Container Apps', 'azure'], ['Bicep', 'IaC'], ['Docker', 'docker'], ['GitHub Actions', 'githubactions'], ['Git', 'git'], ['Firebase', 'firebase'], ['Supabase', 'supabase']],
    project: 'ServiceDesk deployment', href: '#architecture-title',
  },
  {
    title: 'Mobile & desktop',
    tools: [['Android', 'android'], ['JavaFX', 'java'], ['Windows Forms', 'WF']],
    project: 'List It', href: '#listit',
  },
  {
    title: 'AI & parallel computing',
    tools: [['scikit-learn', 'scikitlearn'], ['CUDA', 'GPU']],
    project: 'RACE quiz generation', href: '#race',
  },
]

export default function TechStack() {
  return (
    <section id="skills" className="tech-stack" aria-labelledby="skills-title">
      <h2 id="skills-title">Tech stack</h2>
      {groups.map(({ title, tools, project, href }) => (
        <div key={title} className="tech-group">
          <div className="tech-group-heading">
            <h3>{title}</h3>
            <a className="tech-project-link" href={href}>{project} <Arrow /></a>
          </div>
          <ul className="tech-grid">
            {tools.map(([name, icon]) => (
              <li className="tech-tile" key={name}>
                {/^[a-z]/.test(icon) ? (
                  <Image src={`/tech/${icon}.svg`} alt="" width={34} height={34} className="tech-logo" data-logo={icon} unoptimized />
                ) : (
                  <span className="tech-glyph" aria-hidden="true">{icon}</span>
                )}
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
