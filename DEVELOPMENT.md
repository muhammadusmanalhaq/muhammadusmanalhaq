# Portfolio development

The current portfolio is the Next.js app in this directory.

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production build, run `npm run build` and then `npm start`.

## Update the site

- `app/page.tsx` contains the homepage sections and the featured case study.
- `app/portfolio.ts` contains project, experience, credential, and contact data.
- `app/globals.css` contains typography, color, and layout styles.
- `components/ServiceDiagram.tsx` contains the ServiceDesk architecture walkthrough.
- `public/Muhammad_Usman_AlHaq_Resume.pdf` is the public résumé download.

The optional contact form uses the existing Web3Forms integration when
`NEXT_PUBLIC_WEB3FORMS_KEY` is configured. Visitors can always use the direct email link.

Run browser checks with `npx playwright test`.
