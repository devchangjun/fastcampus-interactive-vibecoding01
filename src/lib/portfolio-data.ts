export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  award: string;
  image: string;
  description?: string;
  technologies?: string[];
  year?: string;
  client?: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Creative Pulse",
    category: "UI, UX, Development",
    award: "CSS Award",
    image: "/image/1.webp",
    description: "A modern e-commerce platform with intuitive user experience and cutting-edge design.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    year: "2024",
    client: "Creative Agency",
  },
  {
    id: 2,
    title: "Design Surge",
    category: "Logo, User Interface",
    award: "Awwwards",
    image: "/image/2.webp",
    description: "Brand identity and digital presence for a premium lifestyle brand.",
    technologies: ["Figma", "Adobe Creative Suite", "React", "GSAP"],
    year: "2024",
    client: "Luxury Brand",
  },
  {
    id: 3,
    title: "Vision Craft",
    category: "Logo, User Interface",
    award: "Awwwards",
    image: "/image/3.webp",
    description: "Innovative web application with focus on user-centered design principles.",
    technologies: ["Vue.js", "Node.js", "MongoDB", "CSS Grid"],
    year: "2023",
    client: "Tech Startup",
  },
  {
    id: 4,
    title: "Brand Bloom",
    category: "UI, UX, Development",
    award: "CSS Award",
    image: "/image/4.webp",
    description: "Complete digital transformation for a growing business with modern web solutions.",
    technologies: ["React", "Express.js", "PostgreSQL", "Docker"],
    year: "2023",
    client: "Growing Business",
  },
  {
    id: 5,
    title: "Impact Edge",
    category: "Font, User Interface",
    award: "CSS Award",
    image: "/image/5.webp",
    description: "Typography-focused design system with custom font development and implementation.",
    technologies: ["FontForge", "CSS Variables", "Webpack", "Sass"],
    year: "2024",
    client: "Publishing House",
  },
  {
    id: 6,
    title: "Digital Harmony",
    category: "Mobile App, UI/UX",
    award: "Mobile Excellence",
    image: "/image/7.webp",
    description: "Cross-platform mobile application with seamless user experience and modern design.",
    technologies: ["React Native", "Firebase", "Redux", "Expo"],
    year: "2024",
    client: "Music Platform",
  },
  {
    id: 7,
    title: "Future Labs",
    category: "Web Design, Development",
    award: "Innovation Award",
    image: "/image/8.webp",
    description: "Cutting-edge research platform with interactive data visualization and AI integration.",
    technologies: ["Three.js", "D3.js", "WebGL", "Machine Learning"],
    year: "2024",
    client: "Research Institute",
  },
];

export const blogPosts = [
  {
    id: 1,
    title: "Understanding Framer CMS",
    date: "April 12, 2025",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "SEO Strategies for 2024",
    date: "April 12, 2025",
    readTime: "5 min read",
  },
  {
    id: 3,
    title: "Content Marketing Strategies",
    date: "April 12, 2025",
    readTime: "5 min read",
  },
];
