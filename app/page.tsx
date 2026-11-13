import Image from 'next/image'
import PortfolioNav from '@/components/PortfolioNav'
import ProjectGallery from '@/components/ProjectGallery'
import ServiceDiagram from '@/components/ServiceDiagram'
import ContactForm from '@/components/ContactForm'
import TechStack from '@/components/TechStack'
import { Arrow, Mark } from '@/components/PortfolioIcons'
import { benchmark, credentials, email, experience, projects, resume, serviceDesk, socials, type Project } from './portfolio'

function SocialLinks({ hero = false }: { hero?: boolean }) {
  return (
    <ul className="social-links" aria-label="Social and contact links">
      {socials.map(({ label, href }) => (
        <li key={label}>
          <a href={href} target="_blank" rel="noreferrer" aria-label={hero && label === 'Email' ? 'Gmail' : label}>
            {label} <Arrow />
          </a>
        </li>
      ))}
    </ul>
  )
}

function ProjectNotes({ project }: { project: Project }) {
  return (
    <article className="archive-item" id={project.id}>
      <div>
        <h4>{project.name}</h4>
        <p className="meta">{project.stack}</p>
      </div>
      <div>
        <p>{project.description}</p>
        <div className="link-row">
          {project.document && <a className="text-button" href={project.document} target="_blank" rel="noreferrer">UI walkthrough <Arrow /></a>}
          {project.video && <a className="text-button" href={project.video} target="_blank" rel="noreferrer">Gameplay video <Arrow /></a>}
        </div>
      </div>
    </article>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card" id={project.id}>
      <ProjectGallery images={project.images!} name={project.name} />
      <div className="project-card-copy">
        <h3>{project.name}</h3>
        <p className="meta">{project.stack}</p>
        <p>{project.description}</p>
        {project.document && <a className="text-button" href={project.document} target="_blank" rel="noreferrer">UI walkthrough <Arrow /></a>}
      </div>
    </article>
  )
}

export default function Page() {
  const galleryProjects = projects.filter(project => project.images?.length)
  const otherProjects = projects.filter(project => !project.images?.length)

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <PortfolioNav />
      <main id="main-content">
        <section id="hero" className="hero scroll-panel" aria-labelledby="hero-title">
          <div className="frame">
            <div className="hero-layout">
              <div className="hero-content">
                <p className="hero-role"><span />Backend &amp; Cloud Engineering</p>
                <h1 id="hero-title">Muhammad<br />Usman <em>Al Haq</em></h1>
                <p className="hero-intro">I build .NET APIs and the infrastructure that runs them. I’m in my final year of Computer Science at FAST-NUCES Islamabad.</p>
                <div className="hero-actions">
                  <a className="primary-button" href="#projects">Explore my work <Arrow direction="down" /></a>
                  <a className="resume-link" href={resume} target="_blank" rel="noreferrer">View résumé <Arrow /></a>
                </div>
              </div>
              <figure className="hero-portrait">
                <svg className="portrait-lines" viewBox="0 0 400 390" preserveAspectRatio="none" fill="none" aria-hidden="true">
                  <path d="M8 73h47l40 43h305M0 314h45l55-60h300M82 0v38l66 57v295M353 0v82l-24 27v232l-38 49M8 351h392M0 39h400" stroke="currentColor" />
                  <path d="M4 67v12m-6-6h12m59-34h20m-10-10v20m267 302h14m-7-7v14M41 314h8m-4-4v8" stroke="currentColor" />
                </svg>
                <div className="portrait-image">
                  <Image src="/me.jpeg" alt="Muhammad Usman Al Haq" fill priority sizes="(max-width: 540px) 64vw, (max-width: 850px) 36vw, 345px" />
                </div>
                <figcaption>Islamabad, Pakistan</figcaption>
              </figure>
            </div>
            <div className="hero-bottom">
              <SocialLinks hero />
              <a href="#achievements" className="hero-icpc">ICPC Asia Topi Regionalist <span> / 2025</span></a>
            </div>
          </div>
        </section>

        <div className="scroll-panel">
          <section id="projects" className="section frame" aria-labelledby="work-title">
            <div className="section-heading">
              <h2 id="work-title">Selected work</h2>
              <a className="text-button" href="#project-archive">More projects <Arrow direction="down" /></a>
            </div>
            <article id="servicedesk" className="featured-project">
              <div className="featured-layout">
                <div className="featured-copy">
                  <p className="meta">MikroStarTech internship / 2026</p>
                  <h3>ServiceDesk</h3>
                  <p className="project-lead">An IT service desk for teams that share a platform and keep their data separate.</p>
                  <p>I built a ticketing and asset management platform with department-level access enforced in PostgreSQL, an audit trail for changes, and an Azure deployment that gates production releases on approval.</p>
                  <div className="link-row">
                    <a className="text-button" href={serviceDesk.source} target="_blank" rel="noreferrer">Source code <Arrow /></a>
                    <a className="text-button" href={serviceDesk.demo} target="_blank" rel="noreferrer">Live demo <Arrow /></a>
                  </div>
                </div>
                <ProjectGallery name="ServiceDesk" images={serviceDesk.images} />
              </div>
              <ServiceDiagram />
            </article>

            <div className="project-grid">
              {galleryProjects.map(project => <ProjectCard key={project.id} project={project} />)}
            </div>

            <article id="hpc-research" className="benchmark">
              <div>
                <p className="meta">Parallel computing / C++ &amp; CUDA</p>
                <h3>Hybrid CPU + GPU convolution</h3>
                <p>I benchmarked four ways to run a 15 × 15 Gaussian convolution, from sequential C++ to a hybrid CPU/GPU implementation. PCIe transfers accounted for about 40% of the measured GPU time.</p>
              </div>
              <figure className="benchmark-figure">
                <figcaption>Hybrid speedup vs. sequential C++</figcaption>
                <ul>
                  {benchmark.map(({ resolution, speedup }) => (
                    <li key={resolution}>
                      <span>{resolution}</span>
                      <span className="benchmark-track" aria-hidden="true"><span style={{ width: `${speedup / 12 * 100}%` }} /></span>
                      <strong>{speedup}×</strong>
                    </li>
                  ))}
                </ul>
              </figure>
            </article>

            <details className="project-archive" id="project-archive">
              <summary><span>More projects</span><span className="archive-toggle"><span className="meta">{otherProjects.length} projects</span><span aria-hidden="true" className="plus-sign" /></span></summary>
              {otherProjects.map(project => <ProjectNotes key={project.id} project={project} />)}
            </details>
          </section>
        </div>

        <section id="experience" className="section experience-section scroll-panel" aria-labelledby="experience-title">
          <div className="frame">
            <div className="section-heading"><h2 id="experience-title">Experience</h2></div>
            <div className="experience-list">
              {experience.map(item => (
                <article key={item.company} className="experience-item">
                  <div className="experience-heading">
                    <p className="experience-meta"><span>{item.dates}</span><span>{item.location}</span></p>
                    <div className="experience-title"><h3>{item.company}</h3><p>{item.title}</p></div>
                  </div>
                  <div className="experience-copy">
                    <p>{item.description}</p>
                    {item.link && <a className="text-button" href={item.link.href} target={item.link.href.startsWith('#') ? undefined : '_blank'} rel="noreferrer">{item.link.label} <Arrow direction={item.link.href.startsWith('#') ? 'right' : 'up'} /></a>}
                  </div>
                  <ProjectGallery name={item.company} images={[item.proof.image]} documentLabel={item.proof.label} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="scroll-panel">
          <div className="section frame background-section">
            <div className="background-intro">
              <section id="about" className="about-story" aria-labelledby="about-title">
                <h2 id="about-title">A bit about me</h2>
                <p className="about-lead">I like figuring out what happens after the code works on my laptop.</p>
                <p>On ServiceDesk, that meant testing with a real database and figuring out how to get releases through staging safely. At FAST-NUCES, I’ve also taken that curiosity into competitive programming, representing Islamabad at the 2025 ICPC Asia Topi Regional.</p>
                <p>Away from code, I play chess and have led a tree-planting drive with the Red Crescent Society in Islamabad.</p>
                <a className="text-button" href="#achievements">See my ICPC credential <Arrow /></a>
              </section>
              <section id="education" className="education" aria-labelledby="education-title">
                <h2 id="education-title">Education</h2>
                <ol className="education-track">
                  <li>
                    <p className="meta">Aug 2023 – Present · Islamabad</p>
                    <h3>FAST-NUCES</h3>
                    <p>BS Computer Science</p>
                  </li>
                  <li>
                    <p className="meta">2020–2022 · Kuwait</p>
                    <h3>International School of Pakistan</h3>
                    <p>HSSC Pre-Engineering</p>
                  </li>
                </ol>
              </section>
            </div>
            <TechStack />
          </div>
        </div>

        <div className="scroll-panel">
          <section id="achievements" className="frame credentials-section" aria-labelledby="achievements-title">
            <div className="section-heading"><h2 id="achievements-title">Credentials</h2></div>
            <ul className="credential-grid">
              {credentials.map(({ title, detail, image, href }) => (
                <li key={title} className="project-card">
                  <ProjectGallery name={title} images={[image]} documentLabel="Certificate" />
                  <div className="project-card-copy">
                    <h3>{title}</h3>
                    <p>{detail}</p>
                    {href && <a className="text-button" href={href} target="_blank" rel="noreferrer">Credential link <Arrow /></a>}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section id="contact" className="contact-section scroll-panel" aria-labelledby="contact-title">
          <div className="frame contact-layout">
            <div className="contact-intro">
              <h2 id="contact-title">Get in touch</h2>
              <p>Have a backend, cloud, or DevOps opportunity in mind? Tell me what you’re working on and where I could help.</p>
              <a className="contact-email" href={socials[2].href} target="_blank" rel="noreferrer" aria-label={`Email ${email}`}>{email} <Arrow /></a>
              <SocialLinks />
              <a href={resume} className="resume-link" target="_blank" rel="noreferrer">View résumé <Arrow /></a>
            </div>
            <ContactForm email={email} />
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="frame footer-layout">
          <a href="#hero" className="wordmark"><Mark /> <span>Muhammad Usman Al Haq</span></a>
          <SocialLinks />
          <a href="#hero" className="back-to-top">Back to top <Arrow /></a>
        </div>
      </footer>
    </>
  )
}
