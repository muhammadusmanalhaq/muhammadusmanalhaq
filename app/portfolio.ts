const POS_IMGS = [
  '/projects/pos/dashboard.webp',
  '/projects/pos/POS.webp',
  '/projects/pos/login.webp',
  '/projects/pos/Manage Products.webp',
  '/projects/pos/Manage Cashiers.webp',
  '/projects/pos/Manage Discounts.webp',
  '/projects/pos/Manage Managers.webp',
  '/projects/pos/Sales Reports.webp',
  '/projects/pos/Inventory Reports.webp',
  '/projects/pos/Cashier Performance.webp',
  '/projects/pos/Discount Reports.webp',
  '/projects/pos/Flop Products.webp',
]

const FASTPAY_IMGS = [
  '/projects/fastpay/authentication.webp',
  '/projects/fastpay/dashboard.webp',
  '/projects/fastpay/send_money.webp',
  '/projects/fastpay/bills_payment.webp',
  '/projects/fastpay/qr_code_slip.webp',
  '/projects/fastpay/transaction_log.webp',
  '/projects/fastpay/new_partition.webp',
  '/projects/fastpay/add_money_dialog.webp',
  '/projects/fastpay/bank_topup.webp',
  '/projects/fastpay/manage_card.webp',
  '/projects/fastpay/raast.webp',
  '/projects/fastpay/mobile_topup.webp',
  '/projects/fastpay/donations.webp',
]

const LISTIT_IMGS = ['/projects/list-it-cover.webp']

const RACE_IMGS = [
  '/projects/race/screencapture-localhost-8501-2026-06-14-08_30_06.webp',
  '/projects/race/screencapture-localhost-8501-2026-06-14-08_30_35.webp',
  '/projects/race/screencapture-localhost-8501-2026-06-14-08_31_20.webp',
  '/projects/race/screencapture-localhost-8501-2026-06-14-08_32_05.webp',
  '/projects/race/screencapture-localhost-8501-2026-06-14-08_31_45.webp',
]

const SERVICEDESK_IMGS = [
  '/projects/serviceDesk/screencapture-service-desk-mauve-vercel-app-tickets-2026-08-05-08_05_46.webp',
  '/projects/serviceDesk/screencapture-service-desk-mauve-vercel-app-2026-08-05-08_05_11.webp',
  '/projects/serviceDesk/screencapture-service-desk-mauve-vercel-app-audit-2026-08-05-08_06_32.webp',
  '/projects/serviceDesk/screencapture-service-desk-mauve-vercel-app-assets-2026-08-05-08_06_07.webp',
]

const CINEBOOK_IMGS = [
  '/projects/cinebook/screencapture-cinema-zeta-beryl-vercel-app-admin-2026-06-14-07_27_03.webp',
  '/projects/cinebook/screencapture-cinema-zeta-beryl-vercel-app-movies-2026-06-14-07_28_02.webp',
  '/projects/cinebook/screencapture-cinema-zeta-beryl-vercel-app-movies-6a05681cb48251208c4a6a46-2026-06-14-07_28_30.webp',
  '/projects/cinebook/screencapture-cinema-zeta-beryl-vercel-app-profile-bookings-2026-06-14-07_26_18.webp',
  '/projects/cinebook/screencapture-cinema-zeta-beryl-vercel-app-admin-halls-2026-06-14-07_27_23.webp',
  '/projects/cinebook/screencapture-cinema-zeta-beryl-vercel-app-admin-users-2026-06-14-07_27_41.webp',
]

export const resume = '/Muhammad_Usman_AlHaq_Resume.pdf'
export const email = 'muhammadusmanalhaq@gmail.com'
export const socials = [
  { label: 'GitHub', href: 'https://github.com/muhammadusmanalhaq' },
  { label: 'LinkedIn', href: 'https://pk.linkedin.com/in/muhammad-usman-al-haq-05a321315' },
  { label: 'Email', href: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}` },
]

export const serviceDesk = {
  images: SERVICEDESK_IMGS,
  demo: 'https://service-desk-mauve.vercel.app/',
  source: 'https://github.com/muhammadusmanalhaq/ServiceDesk',
}

export const benchmark = [
  { resolution: '3840 × 2160', speedup: 6.65 },
  { resolution: '1920 × 1080', speedup: 8.16 },
  { resolution: '512 × 512', speedup: 10.67 },
]

export type Project = {
  id: string
  name: string
  description: string
  stack: string
  images?: string[]
  document?: string
  video?: string
}

export const projects: Project[] = [
  {
    id: 'fastpay', name: 'FastPay',
    description: 'I built a JavaFX desktop client and a web portal around the same double-entry ledger. Users can move money between accounts, split funds into budgets, and generate QR payment slips.',
    stack: 'JavaFX / Next.js / Supabase / PostgreSQL',
    images: FASTPAY_IMGS,
  },
  {
    id: 'halite', name: 'Halite',
    description: 'For our final-year project, my team is building a prototype that searches FAA maintenance reports through a Neo4j knowledge graph and proposes ranked checks with citations to the reports.',
    stack: 'Team project in progress / FastAPI / Neo4j / Groq',
  },
  {
    id: 'race', name: 'RACE: Reading Comprehension & Quiz Generation',
    description: 'I built separate pipelines for generating multiple-choice questions and plausible wrong answers. In a Label Spreading experiment using 10% labeled data, the model reached 50% accuracy.',
    stack: 'Python / scikit-learn / TF-IDF / Streamlit',
    images: RACE_IMGS,
  },
  {
    id: 'cinebook', name: 'CineBook Pro',
    description: 'I built a cinema booking app with an interactive seat map and an admin area for managing halls and screenings. The catalog imports movie data from TMDB.',
    stack: 'Next.js / MongoDB / NextAuth.js / TMDB',
    images: CINEBOOK_IMGS,
  },
  {
    id: 'listit', name: 'List It',
    description: 'An Android marketplace with offline listing access, offers, chat, and a map for choosing pickup locations.',
    stack: 'Kotlin / SQLite / Firebase',
    images: LISTIT_IMGS, document: '/projects/ListIt-UI.pdf',
  },
  {
    id: 'swiftcart', name: 'SwiftCart',
    description: 'A keyboard-driven retail point-of-sale app with separate cashier and manager roles, transactional checkout, and live inventory.',
    stack: 'JavaFX / SQL Server', images: POS_IMGS,
  },
  {
    id: 'socially', name: 'Socially',
    description: 'An Android social app with a feed, stories, notifications, and Agora calling. I designed the screens in Figma and implemented them in Kotlin.',
    stack: 'Kotlin / Firebase / Agora',
  },
  {
    id: 'travelease', name: 'TravelEase',
    description: 'A travel management app with six user roles and SQL reports for profit, loss, and booking trends.',
    stack: 'C# / WinForms / SQL',
  },
  {
    id: 'airport', name: 'Airplane Sync Simulation',
    description: 'A three-runway airport simulation with a live GUI and priority scheduling using semaphores and mutexes.',
    stack: 'C++ / Concurrency',
  },
  {
    id: 'pvz', name: 'Plants vs. Zombies Clone',
    description: 'A playable recreation with a custom game loop, collision handling, and enemy waves.',
    stack: 'C++ / SFML', video: '/projects/plantsvszombie.mp4',
  },
  {
    id: 'centipede', name: 'Centipede Arcade Game',
    description: 'A recreation of Centipede with progressive difficulty and a scoreboard.',
    stack: 'C++ / SFML',
  },
  {
    id: 'minigit', name: 'Mini GitHub',
    description: 'A command-line version control project that implements core Git operations with custom data structures.',
    stack: 'C++ / Data structures',
  },
]

export const experience = [
  {
    company: 'MikroStarTech', title: 'Software Intern', dates: 'Jul 9 – Oct 9, 2026', location: 'Remote',
    description: 'Built ServiceDesk during a three-month .NET internship. I worked on the API and data layer, added integration tests against containerized PostgreSQL, and deployed the Dockerized API to Azure Container Apps.',
    link: { href: '#servicedesk', label: 'See ServiceDesk' },
    proof: { image: '/certificates/mikrostartech-experience.webp', label: 'Experience letter' },
  },
  {
    company: 'Sigma Evolution', title: 'Full-Stack Intern', dates: 'Jun 29 – Aug 30, 2026', location: 'Remote',
    description: 'Led integration and deployment for CareInFlow, a hospital management platform. I connected the React frontend to FastAPI and Express backends, coordinated work across the remote intern team, and automated the Aiven MySQL keepalive with GitHub Actions.',
    proof: { image: '/certificates/sigma-evolution-experience.webp', label: 'Experience letter' },
    link: { href: 'https://careinflow.co/', label: 'Visit CareInFlow' },
  },
  {
    company: 'Kuwait Kazmah Center', title: 'Web Development Intern', dates: 'Jun – Aug 2025', location: 'Hawally, Kuwait',
    description: 'Rebuilt the company website in WordPress and Elementor. I created English and Arabic feedback forms, moved company records to Microsoft Access, and helped launch its Instagram presence.',
    link: { href: 'https://kkc.com.kw/', label: 'Company website' },
    proof: { image: '/Internship%20Certificate.jpg', label: 'Certificate of recognition' },
  },
]

export const credentials = [
  { title: 'ICPC Asia Topi Regionalist', detail: 'Represented FAST-NUCES Islamabad at GIK Institute, 2025.', image: '/icpc.jpg' },
  { title: 'National AI Hackathon', detail: 'Participant, June 2026.', image: '/certificates/hackathon-certificate.jpg' },
  { title: 'Essentials with Azure Fundamentals', detail: 'Microsoft / Coursera', image: '/certificates/azure-fundamentals.jpg', href: 'https://coursera.org/verify/QBAM6XM60I1B' },
  { title: 'Deploy an ASP.NET Core Web App', detail: 'Microsoft', image: '/certificates/Deploy%20an%20ASP.NET%20Core.png', href: '/certificates/Deploy-ASP.NET-Core.pdf' },
  { title: 'Strategic Analysis and Solution Design', detail: 'SAP / Coursera', image: '/certificates/sap-strategic-analysis.jpg', href: 'https://coursera.org/verify/KNUPQLG81Z76' },
  { title: 'Computer Fundamentals', detail: 'IT Ronix Solutions', image: '/computer%20funadamentals.jpg' },
]
