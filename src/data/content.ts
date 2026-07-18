export const profile = {
  name: "Jefferson Germino",
  location: "Mandaluyong, Philippines",
  email: "jsongermino@gmail.com",
  phone: "0991-665-3756",
  roles: [
    "Web Developer",
    "Cloud Engineer",
    "Automation Engineer",
    "Azure Engineer",
    "AI Workflow Builder",
    "Modern Software Engineer",
  ],
  tagline:
    "I build AI-powered workflow systems that replace repetitive work with intelligent automation.",
  socials: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
  },
};

export const stats = [
  { label: "Years of Experience", value: 3, suffix: "+" },
  { label: "Projects Completed", value: 24, suffix: "+" },
  { label: "Cloud Deployments", value: 40, suffix: "+" },
  { label: "Workflow Automations", value: 18, suffix: "+" },
  { label: "Technologies Used", value: 30, suffix: "+" },
];

export const aboutText = [
  "I started out fixing hardware and chasing down network faults as an IT intern — the kind of work that teaches you how systems actually break.",
  "That instinct followed me into web development, then into Microsoft Azure, where I learned to design infrastructure that stays up when it matters.",
  "Now I spend most of my time connecting the two worlds: building interfaces people enjoy using, and wiring the invisible automation behind them — so the busywork disappears and the software just works.",
];

export const skillCategories = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Interfaces built for clarity and motion.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Angular", "ASP.NET"],
  },
  {
    id: "backend",
    title: "Backend",
    description: "Reliable services and data layers.",
    skills: ["C#", "ASP.NET", "Web API", "PHP", "MS SQL", "MySQL"],
  },
  {
    id: "cloud",
    title: "Cloud",
    description: "Infrastructure that scales and recovers.",
    skills: [
      "Microsoft Azure",
      "Virtual Machines",
      "Networking",
      "Storage",
      "Load Balancer",
      "WAF",
      "Disaster Recovery",
      "Monitoring",
      "Log Analytics",
    ],
  },
  {
    id: "automation",
    title: "Automation",
    description: "Systems that run themselves.",
    skills: [
      "n8n",
      "Make",
      "OpenAI",
      "Claude",
      "Ollama",
      "APIs",
      "Webhooks",
      "CRM",
      "Gmail",
      "Telegram",
      "Google Sheets",
    ],
  },
  {
    id: "devops",
    title: "DevOps",
    description: "Shipping without friction.",
    skills: ["Docker", "Git", "Bitbucket", "PowerShell", "CI/CD"],
  },
  {
    id: "uiux",
    title: "UI / UX",
    description: "Design that earns the engineering.",
    skills: ["Figma", "Canva"],
  },
];

export const experience = [
  {
    id: "jyosna",
    company: "Jyosna Inc.",
    role: "Web Developer & Cloud Engineer",
    period: "2022 — Present",
    description:
      "Developing enterprise web applications with C# .NET and ASP.NET Web Forms, backed by SQL Server and deployed across Azure. Responsible for API integration, security, networking, disaster recovery, and performance tuning — plus UI design in Figma and production graphics in Photoshop and Canva.",
    tags: ["C# .NET", "ASP.NET", "SQL Server", "Azure", "Security", "Figma"],
  },
  {
    id: "holycross",
    company: "Holy Cross College",
    role: "IT Support Intern",
    period: "Earlier",
    description:
      "Installed and maintained hardware and software, managed databases, resolved technical issues, and ran preventive maintenance across the campus network.",
    tags: ["Hardware", "Databases", "Troubleshooting", "Maintenance"],
  },
];

export type ProjectCategory = "web" | "automation";

export type Project = {
  id: string;
  name: string;
  category: ProjectCategory;
  tagline: string;
  technologies: string[];
  github?: string;
  demo?: string;
  accent: "blue" | "purple" | "cyan";
};

export const projects: Project[] = [
  // Web Development
  {
    id: "alex-ai",
    name: "Alex AI",
    category: "web",
    tagline:
      "An AI-powered chatbot I built that holds human-like conversations, answers questions, and runs basic automation tasks through natural language processing.",
    technologies: ["ASP.NET Core", "React", "API", "MS SQL"],
    accent: "blue",
  },
  {
    id: "echo-ai-assistant",
    name: "Echo – Personal AI Assistant",
    category: "web",
    tagline:
      "A self-hosted AI assistant inspired by Iron Man's J.A.R.V.I.S. and F.R.I.D.A.Y., built for natural, voice-driven conversations. Echo understands spoken commands, answers questions, and interacts with my applications in real time through a responsive interface. It runs on my own infrastructure using Ollama with locally hosted LLMs for full control over privacy, customization, and cost, and is exposed securely over the internet via Cloudflare Tunnel with Zero Trust authentication.",
    technologies: ["Ollama", "Local LLMs", "Voice AI", "Cloudflare Tunnel", "Zero Trust"],
    accent: "purple",
  },
  {
    id: "curfew-epass",
    name: "Curfew E-Pass Management System",
    category: "web",
    tagline:
      "A web-based system that automates the issuance and verification of electronic travel passes during curfew restrictions, letting authorities manage approvals and track authorized movements securely instead of relying on paper.",
    technologies: ["PHP", "MySQL", "JavaScript"],
    accent: "purple",
  },
  {
    id: "moviety",
    name: "Moviety",
    category: "web",
    tagline:
      "A movie information platform where users browse, search, and view details, ratings, and trailers, pulling real-time data from third-party APIs.",
    technologies: ["React", "Tailwind CSS", "API", "JavaScript"],
    accent: "cyan",
  },
  // Automation
  {
    id: "shipment-tracker",
    name: "Shipment Tracker",
    category: "automation",
    tagline:
      "An automated workflow that tracks shipment status and sends real-time updates and notifications, so no one has to check carriers manually.",
    technologies: ["Make.com", "APIs", "Automated Notifications", "Discord", "Slack"],
    accent: "blue",
  },
  {
    id: "payment-proof-processing",
    name: "Client Payment Proof Processing",
    category: "automation",
    tagline:
      "A workflow that receives client payment proofs, uses AI and OCR to read and extract the payment details, records them automatically, and notifies the team, removing manual checking and encoding.",
    technologies: ["n8n", "AI", "OCR", "Google Sheets", "Discord", "Slack"],
    accent: "purple",
  },
  {
    id: "real-estate-automation",
    name: "Real Estate Automation",
    category: "automation",
    tagline:
      "Automated workflows for real estate operations that capture and manage leads and inquiries, sync data with the CRM, and handle follow-ups automatically.",
    technologies: ["n8n", "CRM", "APIs", "Webhooks", "AI"],
    accent: "cyan",
  },
  {
    id: "customer-support-automation",
    name: "Customer Support Automation",
    category: "automation",
    tagline:
      "An AI-powered support workflow that receives customer inquiries, responds to common questions automatically, and routes the rest to the right person with real-time notifications.",
    technologies: ["n8n", "AI", "Telegram", "Gmail"],
    accent: "blue",
  },
  {
    id: "smart-email-assistant",
    name: "Smart Email Assistant",
    category: "automation",
    tagline:
      "An AI assistant connected to Gmail that reads incoming emails, categorizes them, and prepares responses and notifications automatically to keep the inbox under control.",
    technologies: ["n8n", "AI", "Gmail"],
    accent: "purple",
  },
];

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  web: "Web Development",
  automation: "Automation",
};

export const automationNodes = [
  { id: "telegram", label: "Telegram", col: 0, row: 0 },
  { id: "webhook", label: "Webhook", col: 1, row: 0 },
  { id: "n8n", label: "n8n", col: 2, row: 0 },
  { id: "openai", label: "OpenAI", col: 3, row: -1 },
  { id: "claude", label: "Claude", col: 3, row: 0 },
  { id: "ollama", label: "Ollama", col: 3, row: 1 },
  { id: "make", label: "Make", col: 4, row: 0 },
  { id: "crm", label: "CRM", col: 5, row: -1 },
  { id: "sheets", label: "Google Sheets", col: 5, row: 0 },
  { id: "gmail", label: "Gmail", col: 5, row: 1 },
  { id: "slack", label: "Slack", col: 6, row: 0.5 },
  { id: "database", label: "Database", col: 6, row: -0.5 },
] as const;

export const automationEdges: Array<[string, string]> = [
  ["telegram", "webhook"],
  ["webhook", "n8n"],
  ["n8n", "openai"],
  ["n8n", "claude"],
  ["n8n", "ollama"],
  ["openai", "make"],
  ["claude", "make"],
  ["ollama", "make"],
  ["make", "crm"],
  ["make", "sheets"],
  ["make", "gmail"],
  ["crm", "database"],
  ["sheets", "slack"],
  ["gmail", "slack"],
];

export const consoleLog = [
  "POST /webhook/telegram · 200 OK",
  "n8n → routing intent: support_request",
  "claude-sonnet-5 → generating response…",
  "openai:gpt → drafting summary…",
  "CRM.contacts.upsert() → success",
  "sheets.append(row) → success",
  "gmail.send() → queued",
  "slack.notify(#ops) → delivered",
  "workflow.run() → completed in 812ms",
];

export const azureServices = [
  { id: "vm", label: "Virtual Machine", col: 0, row: 0 },
  { id: "gateway", label: "Application Gateway", col: 1, row: -1 },
  { id: "waf", label: "WAF", col: 1, row: 1 },
  { id: "lb", label: "Load Balancer", col: 2, row: 0 },
  { id: "network", label: "Networking", col: 2, row: -1.4 },
  { id: "storage", label: "Storage", col: 3, row: -1 },
  { id: "recovery", label: "Recovery Vault", col: 3, row: 1 },
  { id: "monitor", label: "Monitoring", col: 4, row: -0.5 },
  { id: "logs", label: "Log Analytics", col: 4, row: 0.7 },
] as const;

export const azureEdges: Array<[string, string]> = [
  ["waf", "gateway"],
  ["gateway", "lb"],
  ["network", "lb"],
  ["lb", "vm"],
  ["vm", "storage"],
  ["vm", "recovery"],
  ["vm", "monitor"],
  ["monitor", "logs"],
];

export const navItems = [
  { id: "hero", label: "Intro" },
  { id: "kurama", label: "KURAMA" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "automation", label: "Automation" },
  { id: "cloud", label: "Cloud" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];
