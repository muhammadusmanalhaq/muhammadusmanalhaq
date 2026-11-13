'use client'

import { useState } from 'react'

const stages = [
  {
    name: 'Frontend', tool: 'Next.js',
    description: 'Staff submit tickets and track assets in a Next.js frontend deployed to Vercel. SignalR pushes ticket updates as they happen.',
    icon: 'M3 4h26v21H3zm0 6h26m-21 5h6m-6 5h13',
  },
  {
    name: 'API', tool: 'ASP.NET Core',
    description: 'The API uses signed tokens to identify the department and role. An EF Core interceptor passes the department context to PostgreSQL. Hangfire scans for SLA breaches every five minutes.',
    icon: 'm10 7-7 9 7 9m12-18 7 9-7 9M18 5l-4 22',
  },
  {
    name: 'Database', tool: 'PostgreSQL',
    description: 'Row-level security enforces department boundaries inside PostgreSQL. A missing filter in the application cannot grant access to another department’s tickets.',
    icon: 'M5 8c0-6 22-6 22 0v16c0 6-22 6-22 0zm0 0c0 6 22 6 22 0M5 16c0 6 22 6 22 0',
  },
  {
    name: 'Delivery', tool: 'GitHub Actions / Azure',
    description: 'GitHub Actions runs Playwright and containerized PostgreSQL tests, then deploys the API to Azure staging. Production requires manual approval. Bicep defines the infrastructure, and OIDC gives the pipeline short-lived Azure credentials.',
    icon: 'M4 12l12-8 12 8v12l-12 7-12-7zm0 0 12 8 12-8M16 20v11m-6-23 12 8',
  },
]

export default function ServiceDiagram() {
  const [active, setActive] = useState(2)
  const stage = stages[active]

  return (
    <section className="architecture" aria-labelledby="architecture-title">
      <h4 id="architecture-title">Inside ServiceDesk</h4>
      <div className="stage-picker" role="group" aria-label="Explore the ServiceDesk architecture">
        {stages.map(({ name, icon }, index) => (
          <button key={name} type="button" aria-pressed={index === active} onClick={() => setActive(index)}>
            <span className="stage-icon">
              <svg aria-hidden="true" viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" strokeLinecap="round"><path d={icon} /></svg>
            </span>
            {name}
          </button>
        ))}
      </div>
      <div className="stage-description" aria-live="polite" aria-atomic="true">
        <div key={active} className="stage-detail">
          <strong>{stage.tool}</strong>
          <p>{stage.description}</p>
        </div>
      </div>
    </section>
  )
}
