export const PERSONAL = {
  name: "Manasai Stanly J",
  brandLine: "STANLY",
  roleLine1: "// Full-Stack Developer",
  roleLine2: "AI Engineer",
  heroRoles: "Full-Stack Developer · Mobile App Developer · AI Enthusiast · Cloud & DevOps",
  bioShort: "I build intuitive, high-performance applications across web and mobile. I partner with teams to turn ideas into real, scalable products — fast and with intention.",
  bioLong: "I began my software engineering journey by building a rigorous foundation in full-stack architecture and machine learning. Since then, I have focused on translating complex technical concepts into production-ready solutions. My expertise spans AI-powered mobile applications, real-time computer vision systems, and scalable cloud backends. Having successfully delivered end-to-end projects across healthcare, agriculture, and industrial safety, I bring a proven track record of bridging cutting-edge technology with tangible business value. My approach is simple: engineer robust, high-performance products that solve real-world problems with precision and reliability.",
  tagline: "Distinctive engineering for products that need to perform.",
  github: "https://github.com/manasaistanly",
  email: "manasaistanly0@gmail.com",
  phone: "+91 8220470829",
  location: "Hosur, Tamil Nadu, India",
  linkedin: "https://www.linkedin.com/in/manasai-stanly-j-028202252/",

  photoUrl: "/profile.jpg"
};

export const PROJECTS = [
  {
    id: 1,
    title: "PathPilot AI",
    year: "2024",
    description: "LLM-powered career platform for autonomous internship discovery and tailored applications",
    longDescription: "PathPilot AI is an advanced career platform that leverages Large Language Models to automate the internship discovery process. It intelligently matches student profiles with highly relevant opportunities, autonomously generates customized application materials, and provides actionable insights for career growth. The system was engineered from the ground up using Python and fine-tuned LLMs, drastically reducing the time students spend searching while increasing application success rates.",
    tags: ["Python", "LLMs", "Automation"],
    link: null,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 2,
    title: "Industrial Safety",
    year: "2024",
    description: "Real-time PPE compliance detection from live CCTV feeds using computer vision",
    longDescription: "A robust computer vision system designed for high-risk industrial environments. By analyzing live CCTV feeds in real-time, the system accurately detects whether workers are wearing required Personal Protective Equipment (PPE) such as hard hats and safety vests. Built with Python, OpenCV, and cutting-edge deep learning architectures, it triggers immediate alerts upon detecting non-compliance, ensuring workplace safety standards are strictly maintained.",
    tags: ["Python", "OpenCV", "Deep Learning"],
    link: null,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 3,
    title: "Brain Tumor MRI",
    year: "2024",
    description: "Classification of brain tumor MRI scans using Deep Learning and Convolutional Neural Networks",
    longDescription: "A medical imaging AI tool designed to assist radiologists in the rapid and accurate classification of brain tumors from MRI scans. Utilizing advanced Convolutional Neural Networks (CNNs) built in TensorFlow, the model was trained on thousands of clinical scans to identify and categorize tumors with high precision. This deep learning approach minimizes human error and significantly accelerates the diagnostic process.",
    tags: ["Python", "Deep Learning", "TensorFlow"],
    link: null,
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 4,
    title: "Rural Utility",
    year: "2023",
    description: "OCR-based web system for rural electricity and water usage forecasting",
    longDescription: "An innovative utility analysis tool built specifically for rural environments where smart meters are unavailable. Users upload photos of analog utility meters, and the system uses Optical Character Recognition (OCR) to extract readings. A FastAPI backend then processes the data to forecast future electricity and water usage, helping rural communities track consumption and optimize their energy footprint efficiently.",
    tags: ["Python", "OCR", "FastAPI"],
    link: "https://github.com/manasaistanly/Rural-Utility-Analyzer",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 5,
    title: "IDRS",
    year: "2023",
    description: "Institutional AI disaster preparedness system with real-time alerting",
    longDescription: "The Institutional Disaster Response System (IDRS) is a comprehensive web platform designed to improve emergency preparedness for large organizations. It features real-time threat monitoring, automated multi-channel alerting, and dynamic evacuation mapping. Built on a scalable Node.js backend with AI-driven threat assessment, it ensures fast and coordinated responses during critical emergencies.",
    tags: ["JavaScript", "AI", "Node.js"],
    link: null,
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&q=80&w=1000"
  }
];

export const SERVICES = [
  {
    id: "s1",
    index: "01",
    title: "Full-Stack Development",
    description: "End-to-end web and API systems built for scale and speed.",
    items: ["React.js Frontends", "Node.js & FastAPI Backends", "REST API Design", "Database Architecture", "Docker Deployment", "Cloud Integration"]
  },
  {
    id: "s2",
    index: "02",
    title: "AI & Machine Learning",
    description: "Intelligent systems that solve real problems — from vision to language.",
    items: ["Computer Vision Systems", "Deep Learning Models", "LLM Integration", "ML Pipeline Engineering", "Model Deployment", "Data Processing"]
  },
  {
    id: "s3",
    index: "03",
    title: "Mobile Development",
    description: "Cross-platform mobile apps with native performance and clean UX.",
    items: ["Flutter Apps", "React Native", "Mobile UI Design", "API Integration", "Push Notifications", "App Store Deployment"]
  },
  {
    id: "s4",
    index: "04",
    title: "DevOps & Cloud",
    description: "Infrastructure that ships fast and stays up.",
    items: ["Docker & Containerisation", "GitHub Actions CI/CD", "Cloud Deployment", "Environment Management", "Monitoring", "Security"]
  }
];

export const TESTIMONIALS = [
  {
    id: "t1",
    quote: "His deep understanding of both engineering and product thinking sets him apart. He shipped our backend in record time without sacrificing quality.",
    name: "Priya Menon",
    role: "CTO",
    company: "HealthTech Startup",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "t2",
    quote: "Manasai's AI integration work transformed how we approach data. Precise, fast, and always two steps ahead of the problem.",
    name: "Rahul Sharma",
    role: "Founder",
    company: "AgriSense",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "t3",
    quote: "One of the most reliable engineers I've worked with. He brings clarity to complex problems and delivers with consistency.",
    name: "Ananya Krishnan",
    role: "Product Lead",
    company: "EduTech Co.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

export const STATS = [
  { number: "6", label: "Projects Shipped", description: "Across healthcare, agriculture, industrial & education domains." },
  { number: "3+", label: "Years Building", description: "Full-stack, mobile, and AI systems from idea to deployment." },
  { number: "5", label: "Tech Stacks", description: "Python, React, Flutter, Node.js, FastAPI — and growing." }
];

export const ACHIEVEMENTS = [
  { title: "2+ Internships with Real-World Industry Exposure", platform: "Professional", index: "01" },
  { title: "Brain Tumor MRI Classification Research", platform: "DC Presentation", index: "02" },
  { title: "Smart Farm Compensation Assistant", platform: "Open Source", index: "03" },
  { title: "Industrial Safety Vision System", platform: "Project Showcase", index: "04" },
  { title: "NPTEL + Swayam Certifications", platform: "NPTEL", index: "05" },
  { title: "EnergyMind Lite — Industry 4.0 MVP", platform: "Self-initiated", index: "06" }
];
