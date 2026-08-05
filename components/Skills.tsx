'use client'

import { useEffect, useRef, useState } from 'react'

/* ── Icon with fallback ─────────────────────────────────────── */
function SkillIcon({ src, name, className = '', style }: { src: string; name: string; className?: string; style?: React.CSSProperties }) {
  const [err, setErr] = useState(false)
  if (err) return <span className="skill-icon-fallback">{name.slice(0, 2)}</span>
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={name} className={`skill-icon${className ? ' ' + className : ''}`}
      style={style} onError={() => setErr(true)} aria-hidden="true" />
  )
}

const DI = (id: string, v: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${id}/${id}-${v}.svg`
const SI = (slug: string) => `https://cdn.simpleicons.org/${slug}`

/* ── Skill Chip Component ───────────────────────────────────── */
function SkillChip({ name, icon }: { name: string; icon: React.ReactNode }) {
  return (
    <div className="skill-tab-chip">
      <div className="skill-tab-icon">{icon}</div>
      <span className="skill-tab-name">{name}</span>
    </div>
  )
}

/* ── Data ───────────────────────────────────────────────────── */
const SKILL_GROUPS = [
  {
    category: 'Languages',
    skills: [
      { name: 'C++',        icon: <SkillIcon src={DI('cplusplus','plain')}   name="C++" /> },
      { name: 'Python',     icon: <SkillIcon src={DI('python','plain')}      name="Python" /> },
      { name: 'JavaScript', icon: <SkillIcon src={DI('javascript','plain')}  name="JavaScript" /> },
      { name: 'TypeScript', icon: <SkillIcon src={DI('typescript','plain')}  name="TypeScript" /> },
      { name: 'Kotlin',     icon: <SkillIcon src={DI('kotlin','plain')}      name="Kotlin" /> },
      { name: 'Java',       icon: <SkillIcon src={DI('java','plain')}        name="Java" /> },
      { name: 'C#',         icon: <SkillIcon src={DI('csharp','original')}      name="C#" /> },
      { name: 'PHP',        icon: <SkillIcon src={DI('php','original')}         name="PHP" /> },
      { name: 'HTML5',      icon: <SkillIcon src={DI('html5','plain')}       name="HTML5" /> },
      { name: 'CSS3',       icon: <SkillIcon src={DI('css3','plain')}        name="CSS3" /> },
    ]
  },
  {
    category: 'Frontend Development',
    skills: [
      { name: 'React',         icon: <SkillIcon src={DI('react','original')}      name="React" /> },
      { name: 'Next.js',       icon: <SkillIcon src={DI('nextjs','original')}     name="Next.js" className="icon-invert" /> },
      { name: 'Tailwind CSS',  icon: <SkillIcon src={DI('tailwindcss','original')}name="Tailwind" /> },
      { name: 'Framer Motion', icon: <SkillIcon src={SI('framer')}                name="Framer" /> },
    ]
  },
  {
    category: 'Backend Development',
    skills: [
      { name: 'Node.js',   icon: <SkillIcon src={DI('nodejs','plain')}     name="Node.js" /> },
      { name: 'C# / .NET', icon: <SkillIcon src={DI('dot-net','plain')}    name=".NET" /> },
    ]
  },
  {
    category: 'Mobile Development',
    skills: [
      { name: 'Android Studio', icon: <SkillIcon src={DI('androidstudio','plain')} name="AndroidStudio" /> },
      { name: 'Android SDK',    icon: <SkillIcon src={DI('android','plain')}       name="Android" /> },
      { name: 'Flutter',        icon: <SkillIcon src={DI('flutter','original')}    name="Flutter" /> },
      { name: 'Firebase',       icon: <SkillIcon src={DI('firebase','plain')}      name="Firebase" /> },
      { name: 'Figma',          icon: <SkillIcon src={DI('figma','original')}         name="Figma" /> },
    ]
  },
  {
    category: 'Databases',
    skills: [
      { name: 'MongoDB',     icon: <SkillIcon src={DI('mongodb','plain')}            name="MongoDB" /> },
      { name: 'MySQL',       icon: <SkillIcon src={DI('mysql','original')}           name="MySQL" /> },
      { name: 'PostgreSQL',  icon: <SkillIcon src={DI('postgresql','plain')}         name="PostgreSQL" /> },
      { name: 'SQL Server',  icon: <SkillIcon src={DI('microsoftsqlserver','plain')} name="SQL Server" /> },
      { name: 'SQLite',      icon: <SkillIcon src={DI('sqlite','original')}             name="SQLite" /> },
      { name: 'Supabase',    icon: <SkillIcon src={SI('supabase')}                   name="Supabase" /> },
    ]
  },
  {
    category: 'HPC & Systems',
    skills: [
      { name: 'CUDA',  icon: <SkillIcon src={SI('nvidia')} name="CUDA" style={{ filter: 'invert(0) sepia(1) hue-rotate(75deg) saturate(3)' }} /> },
      { name: 'Linux', icon: <SkillIcon src={DI('linux','original')} name="Linux" /> },
    ]
  },
  {
    category: 'Cloud & DevOps',
    skills: [
      { name: 'Azure',           icon: <SkillIcon src={DI('azure','original')} name="Azure" /> },
      { name: 'Docker',          icon: <SkillIcon src={DI('docker','plain')} name="Docker" /> },
      { name: 'GitHub Actions',  icon: <SkillIcon src={SI('githubactions')} name="GitHub Actions" /> },
      { name: 'Azure Bicep',     icon: <SkillIcon src={DI('azure','original')} name="Bicep" /> },
      { name: 'Key Vault',       icon: <SkillIcon src={DI('azure','original')} name="Key Vault" /> },
    ]
  },
  {
    category: 'Tools & Utilities',
    skills: [
      { name: 'Git',       icon: <SkillIcon src={DI('git','plain')}           name="Git" /> },
      { name: 'GitHub',    icon: <SkillIcon src={DI('github','original')}     name="GitHub" className="icon-invert" /> },
      { name: 'VS Code',   icon: <SkillIcon src={DI('vscode','original')}        name="VS Code" /> },
      { name: 'Postman',   icon: <SkillIcon src={DI('postman','plain')}       name="Postman" /> },
      { name: 'Vercel',    icon: <SkillIcon src={SI('vercel')}                name="Vercel" className="icon-invert" /> },
    ]
  }
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.reveal')
    if (!items?.length) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const siblings = Array.from(entry.target.parentElement?.querySelectorAll('.reveal:not(.visible)') ?? [])
        const idx = siblings.indexOf(entry.target as HTMLElement)
        setTimeout(() => entry.target.classList.add('visible'), Math.min(idx * 80, 400))
        obs.unobserve(entry.target)
      })
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' })
    items.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" className="section section-alt" ref={sectionRef} aria-label="Technical skills">
      <div className="container">
        <div className="section-header reveal">
          <div className="section-label">What I Work With</div>
          <h2 className="section-title">Technical Skills</h2>
        </div>

        <div className="skills-grid-layout">
          {SKILL_GROUPS.map((group) => (
            <div key={group.category} className="skill-category-block reveal">
              <h3 className="skill-category-header">{group.category}</h3>
              <div className="skill-category-list">
                {group.skills.map(s => (
                  <SkillChip key={s.name} name={s.name} icon={s.icon} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
