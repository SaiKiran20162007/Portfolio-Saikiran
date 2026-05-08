import { useEffect, useState, FormEvent, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  ExternalLink, 
  ChevronRight, 
  Menu, 
  X, 
  Terminal, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Send,
  Cpu,
  Layers,
  Database,
  Globe,
  ArrowUpRight
} from 'lucide-react';

// Typing Effect Component
const TypingEffect = ({ texts, speed = 100, delay = 2000 }: { texts: string[], speed?: number, delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const currentFullText = texts[textIndex];
    
    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
        if (displayText === '') {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }, speed / 2);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentFullText.slice(0, displayText.length + 1));
        if (displayText === currentFullText) {
          setIsDeleting(true);
          timeout = setTimeout(() => {}, delay); // Wait before deleting
        }
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, speed, delay]);

  return (
    <span className="text-brand-blue-glow font-mono font-bold">
      {displayText}
      <span className="animate-pulse border-r-2 border-brand-blue ml-1"></span>
    </span>
  );
};

// Section Component
const Section = ({ id, children, className = "" }: { id: string, children: ReactNode, className?: string }) => (
  <section id={id} className={`py-24 px-6 md:px-12 lg:px-24 scroll-mt-20 ${className}`}>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  </section>
);

// Navbar Component
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div 
          className="h-full bg-brand-blue" 
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-dark-bg/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold tracking-tighter text-gradient">
            RSK<span className="text-brand-blue">.</span>
          </a>
          
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[10px] uppercase tracking-widest font-bold text-slate-400 hover:text-blue-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="hidden md:block px-5 py-2 glass-card text-sm font-semibold hover:border-brand-blue/50 transition-all cursor-pointer"
          >
            Hire Me
          </motion.a>

          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-950 border-b border-white/10"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-gray-300 active:text-brand-blue"
                  >
                    {link.name}
                  </a>
                ))}
                <a 
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 bg-brand-blue text-white rounded-xl font-bold"
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      // Use FormSubmit.co via fetch
      const response = await fetch("https://formsubmit.co/ajax/sairamsairam1619@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-dark-bg flex flex-col items-center justify-center z-50">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 border-4 border-brand-blue border-t-transparent rounded-full shadow-[0_0_20px_rgba(14,165,233,0.3)] mb-8"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold tracking-widest text-gradient"
        >
          LOADING EXPERIENCE
        </motion.div>
      </div>
    );
  }

  const skills = [
    { name: 'HTML', icon: <Code2 />, level: 95 },
    { name: 'CSS', icon: <Layers />, level: 90 },
    { name: 'JavaScript', icon: <Terminal />, level: 85 },
    { name: 'React.js', icon: <Globe />, level: 88 },
    { name: 'Node.js', icon: <Cpu />, level: 80 },
    { name: 'SQL', icon: <Database />, level: 75 },
    { name: 'Java', icon: <Code2 />, level: 82 },
    { name: 'C', icon: <Terminal />, level: 80 },
    { name: 'GenAI', icon: <Cpu />, level: 85 },
    { name: 'Prompt Engineering', icon: <Layers />, level: 90 },
    { name: 'GitHub', icon: <Github />, level: 88 },
    { name: 'VS Code', icon: <Code2 />, level: 95 },
    { name: 'DSA', icon: <Terminal />, level: 78 },
  ];

  const projects = [
    {
      title: "To-Do List Application",
      description: "Developed a full-stack To-Do List application using React.js and Node.js with CRUD operations and real-time task management.",
      tags: ["React", "Node.js", "Express", "MongoDB"],
      image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&q=80&w=800",
      link: "#",
      github: "https://github.com/Saikiran20162007"
    },
    {
      title: "Stock Market Navigation",
      description: "Built a stock market web app using React.js and financial APIs to track real-time stock prices and market trends.",
      tags: ["React", "API", "Charts"],
      image: "https://images.unsplash.com/photo-1611974717482-1dd5f764a78a?auto=format&fit=crop&q=80&w=800",
      link: "#",
      github: "https://github.com/Saikiran20162007"
    },
    {
      title: "AI Chatbot Concept",
      description: "Designed an AI-powered chatbot idea that simulates conversations with cinematic characters and celebrities using behavior-driven responses.",
      tags: ["GenAI", "NLP", "Python", "Concept"],
      image: "https://images.unsplash.com/photo-1531746020798-e7953e5e85b5?auto=format&fit=crop&q=80&w=800",
      link: "#",
      github: "https://github.com/Saikiran20162007"
    }
  ];

  return (
    <div className="relative">
      {/* Success Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-10 left-1/2 z-50 px-6 py-4 glass-card border-green-500/30 bg-green-500/10 flex items-center gap-3 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
              <Send size={16} />
            </div>
            <div>
              <h5 className="text-white font-bold text-sm">Message Sent!</h5>
              <p className="text-slate-400 text-xs">Your message has been sent successfully.</p>
            </div>
            <button onClick={() => setShowNotification(false)} className="ml-4 text-slate-500 hover:text-white">
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />
      
      {/* Background Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-blob" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none animate-blob animation-delay-2000" />
      </div>

      {/* HERO SECTION */}
      <Section id="home" className="min-h-screen flex items-center pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-[10px] uppercase font-bold tracking-widest mb-6"
            >
              <Terminal size={14} /> Portfolio 2026
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] mb-6 text-white"
            >
              Hi, I'm <br />
              <span className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">Ravuru Saikiran</span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-medium text-gray-400 mb-8 h-20"
            >
              I am <TypingEffect texts={["Developing Modern Web Apps", "Generative AI Enthusiast", "Passionate Developer"]} />
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-400 max-w-lg mb-10 leading-relaxed"
            >
              Passionate Computer Science student focused on Generative AI, modern web development, and impactful software solutions.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <a href="#contact" className="px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-lg shadow-blue-600/20 uppercase tracking-wider transition-all flex items-center gap-2 group">
                Hire Me <Send size={16} />
              </a>
              <a href="#projects" className="px-7 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg border border-slate-700 uppercase tracking-wider flex items-center gap-2 transition-all">
                View Projects <Layers size={16} />
              </a>
            </motion.div>

              <div className="flex gap-6 mt-12">
                <a href="https://github.com/Saikiran20162007" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-brand-blue-glow transition-colors"><Github size={24} /></a>
                <a href="https://www.linkedin.com/in/ravuru-saikiran" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-brand-blue-glow transition-colors"><Linkedin size={24} /></a>
                <a href="mailto:sairamsairam1619@gmail.com" className="text-gray-500 hover:text-brand-blue-glow transition-colors"><Mail size={24} /></a>
              </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              {/* Profile Background Decor */}
              <div className="absolute -inset-4 bg-linear-to-tr from-brand-blue/20 to-purple-500/20 rounded-3xl blur-2xl animate-pulse" />
              <div className="absolute inset-0 bg-linear-to-tr from-brand-blue/30 to-purple-500/30 rounded-3xl transform rotate-6 border border-white/10" />
              
              {/* Image Container */}
              <div className="absolute inset-0 bg-gray-900 rounded-3xl border-2 border-white/10 overflow-hidden z-10 p-2">
                <div className="w-full h-full bg-linear-to-br from-gray-800 to-gray-950 rounded-2xl flex items-center justify-center relative group overflow-hidden">
                   <img 
                    src="/profile.jpg" 
                    alt="Ravuru Saikiran"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes('ui-avatars.com')) {
                        target.src = "https://ui-avatars.com/api/?name=Ravuru+Saikiran&background=0ea5e9&color=fff&size=512";
                      }
                    }}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                   />
                   <div className="absolute inset-0 bg-brand-blue/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              
              {/* Decorative Elements */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-10 -right-12 glass-card p-4 z-20"
              >
                <Cpu className="text-brand-blue-glow" size={32} />
              </motion.div>
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute bottom-10 -left-12 glass-card p-4 z-20"
              >
                <Code2 className="text-brand-blue-glow" size={32} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ABOUT ME SECTION */}
      <Section id="about">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gradient">About Me</h2>
          <div className="glass-card p-10 relative overflow-hidden text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-3xl -translate-y-16 translate-x-16" />
            <div className="flex flex-col md:flex-row gap-12 items-start">
               <div className="space-y-6 flex-1">
                  <p className="text-xl text-gray-300 leading-relaxed font-light">
                    I enjoy building things that people can actually use, not just projects that sit unfinished in folders. My interest started with web development and gradually expanded into Generative AI, where I became curious about how intelligent systems think, respond, and interact with users.
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    I like experimenting with ideas, learning new technologies quickly, and turning concepts into working applications using React.js, Node.js, and modern web tools. Currently, I’m focused on improving my skills by creating practical, creative, and impactful software projects.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                     <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-brand-blue-glow font-bold text-2xl uppercase font-mono">15+</div>
                        <div className="text-xs text-gray-500 font-mono tracking-widest mt-1">TOTAL SKILLS</div>
                     </div>
                     <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-brand-blue-glow font-bold text-2xl uppercase font-mono">2026</div>
                        <div className="text-xs text-gray-500 font-mono tracking-widest mt-1">GRADUATION</div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </Section>

      {/* SKILLS SECTION */}
      <Section id="skills">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gradient">Tech Stack & Skills</h2>
          <p className="text-gray-400">The tools and technologies I use to bring ideas to life.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5, borderColor: 'rgba(59, 130, 246, 0.4)', backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-xl p-6 flex flex-col gap-4 group transition-all"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                {skill.icon}
              </div>
              <div>
                <h3 className="font-bold text-sm text-white mb-2 uppercase tracking-wider">{skill.name}</h3>
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.05 }}
                    className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                  />
                </div>
                <div className="flex justify-between items-center mt-2 font-mono">
                  <span className="text-[9px] text-slate-500 uppercase tracking-tighter">PROFICIENCY</span>
                  <span className="text-[9px] text-blue-400 font-bold">{skill.level}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* PROJECTS SECTION */}
      <Section id="projects">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
           <div>
              <h2 className="text-4xl font-bold mb-4 text-gradient">Featured Projects</h2>
              <p className="text-gray-400 max-w-xl">Explore some of my recent work, ranging from full-stack applications to AI-driven concepts.</p>
           </div>
           <a href="https://github.com/Saikiran20162007" className="hidden md:flex items-center gap-2 text-brand-blue-glow hover:underline underline-offset-8 mt-4 md:mt-0 font-medium">
             View more on GitHub <ArrowUpRight size={18} />
           </a>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-xl group overflow-hidden flex flex-col h-full"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('images.unsplash.com')) {
                       target.src = `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800&q=80&text=${encodeURIComponent(project.title)}`;
                    } else {
                       target.src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800";
                    }
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                <div className="absolute bottom-4 left-4 flex gap-2">
                   {project.tags.slice(0, 2).map(tag => (
                     <span key={tag} className="text-[9px] px-2 py-0.5 rounded bg-blue-500/20 backdrop-blur-md text-blue-400 font-bold border border-blue-500/30 uppercase tracking-tighter">{tag}</span>
                   ))}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-widest">{project.title}</h3>
                <p className="text-slate-500 text-[10px] leading-relaxed mb-6 flex-1 line-clamp-3">{project.description}</p>
                <div className="flex gap-3">
                  <a href={project.link} className="flex-1 py-2 text-[10px] font-bold text-center border border-white/10 rounded-lg hover:bg-blue-600 hover:border-blue-600 transition-all uppercase tracking-widest">DEMO</a>
                  <a href={project.github} className="flex-1 py-2 text-[10px] font-bold text-center border border-white/10 rounded-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-slate-400">
                    CODE <Github size={12} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* EDUCATION SECTION */}
      <Section id="education">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gradient">Education</h2>
          <p className="text-gray-400">My academic journey and milestones.</p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-8 relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-ml-px hidden sm:block" />
          
          {[
            {
              title: "B.Tech Computer Science and Engineering",
              institution: "Vel Tech University, Chennai",
              period: "2023 – 2026",
              grade: "CGPA: 7.3",
              desc: "Focused on core CS fundamentals, AI modules, and modern application development."
            },
            {
              title: "Diploma",
              institution: "Government Polytechnic, Rayadurg",
              period: "2023",
              grade: "Percentage: 69.77%",
              desc: "Specialized in Technical Engineering and basic programming."
            },
            {
              title: "Secondary School",
              institution: "A.P Model E.M High School",
              period: "2020",
              grade: "Percentage: 86%",
              desc: "Completed secondary education with a strong foundation in science and mathematics."
            }
          ].map((edu, i) => (
            <motion.div
              key={edu.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`relative flex flex-col md:flex-row items-center gap-8 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-brand-blue rounded-full md:-ml-2 hidden sm:block neon-glow shadow-brand-blue" />
              
              <div className="md:w-1/2 w-full">
                <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 group hover:border-blue-500/30 transition-all">
                  <div className="flex items-center gap-2 mb-4 text-blue-400">
                    <GraduationCap size={20} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{edu.period}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-1 text-white">{edu.title}</h3>
                  <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-3">{edu.institution}</div>
                  <p className="text-slate-400 text-xs mb-5 leading-relaxed">{edu.desc}</p>
                  <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 font-bold text-[10px] tracking-wider uppercase">
                    {edu.grade}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CERTIFICATIONS SECTION */}
      <Section id="certifications">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
             <div className="h-px bg-white/10 flex-1" />
             <h2 className="text-3xl font-bold text-gradient whitespace-nowrap px-4">Certifications</h2>
             <div className="h-px bg-white/10 flex-1" />
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="glass-card p-8 flex items-start gap-6 group hover:translate-y-[-5px] transition-all">
               <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Award size={32} />
               </div>
               <div>
                  <h3 className="font-bold text-xl mb-2">TCS ION Career Edge</h3>
                  <p className="text-sm text-gray-400">Young Professional Certification</p>
               </div>
            </div>
            
            <div className="glass-card p-8 flex items-start gap-6 group hover:translate-y-[-5px] transition-all">
               <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue-glow flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Award size={32} />
               </div>
               <div>
                  <h3 className="font-bold text-xl mb-2">Java Programming</h3>
                  <p className="text-sm text-gray-400">Fundamentals Certificate</p>
               </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CONTACT SECTION */}
      <Section id="contact">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
           <div>
              <h2 className="text-4xl font-bold mb-6 text-gradient text-balance">Get in Touch</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-10">
                Have a project in mind or just want to say hi? I'm always open to new opportunities and collaborations. 
              </p>
                          <div className="space-y-6">
                 <a href="mailto:sairamsairam1619@gmail.com" className="flex items-center gap-6 glass-card p-6 group hover:border-blue-500/50 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue-glow group-hover:scale-110 transition-transform">
                       <Mail size={24} />
                    </div>
                    <div>
                       <div className="text-gray-500 text-[10px] font-mono mb-1 uppercase tracking-widest text-slate-500">EMAIL ME</div>
                       <div className="font-bold text-lg text-white">sairamsairam1619@gmail.com</div>
                    </div>
                 </a>
                 
                 <a href="https://www.linkedin.com/in/ravuru-saikiran" target="_blank" rel="noreferrer" className="flex items-center gap-6 glass-card p-6 group hover:border-brand-blue/50 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue-glow group-hover:scale-110 transition-transform">
                       <Linkedin size={24} />
                    </div>
                    <div>
                       <div className="text-gray-500 text-[10px] font-mono mb-1 uppercase tracking-widest text-slate-500">LINKEDIN</div>
                       <div className="font-bold text-lg text-white">Ravuru Saikiran</div>
                    </div>
                 </a>
                 
                 <a href="https://github.com/Saikiran20162007" target="_blank" rel="noreferrer" className="flex items-center gap-6 glass-card p-6 group hover:border-brand-blue/50 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue-glow group-hover:scale-110 transition-transform">
                       <Github size={24} />
                    </div>
                    <div>
                       <div className="text-gray-500 text-[10px] font-mono mb-1 uppercase tracking-widest text-slate-500">GITHUB</div>
                       <div className="font-bold text-lg text-white">Saikiran20162007</div>
                    </div>
                 </a>
              </div>
           </div>
           
           <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-10 relative">
              <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-8">Send a Message</h3>
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <Send size={40} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                  <p className="text-slate-400 text-sm">Thank you for reaching out. I'll get back to you soon.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-blue-400 text-xs font-bold uppercase tracking-widest hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* FormSubmit Configuration */}
                  <input type="hidden" name="_subject" value="New Portfolio Contact Message" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_captcha" value="false" />

                  <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Full Name</label>
                        <input required name="name" type="text" placeholder="John Doe" className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors text-white" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Email</label>
                        <input required name="email" type="email" placeholder="john@example.com" className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors text-white" />
                      </div>
                  </div>
                  <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Subject</label>
                      <input required name="subject" type="text" placeholder="Project Inquiry" className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors text-white" />
                  </div>
                  <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Message</label>
                      <textarea required name="message" rows={5} placeholder="Hi, let's talk about..." className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 resize-none transition-colors text-white"></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-lg shadow-blue-600/20 uppercase tracking-wider hover:bg-blue-700 transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={16} className={isSubmitting ? 'animate-pulse' : ''} />
                  </button>
                </form>
              )}
           </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 bg-gray-950/50 backdrop-blur-md">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
               <div className="text-2xl font-bold tracking-tighter text-gradient mb-2">
                 RSK<span className="text-brand-blue">.</span>
               </div>
               <p className="text-gray-500 text-sm max-w-xs">Building digital experiences that matter with code and creativity.</p>
            </div>
            
            <div className="flex gap-8">
               {['About', 'Skills', 'Projects', 'Education'].map(item => (
                 <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-gray-500 hover:text-white transition-colors">{item}</a>
               ))}
            </div>
            
            <div className="flex flex-col items-center md:items-end">
               <p className="text-gray-500 text-sm font-mono">© 2026 Ravuru Saikiran. All Rights Reserved.</p>
               <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-brand-blue-glow text-xs font-bold mt-2 flex items-center gap-1 group"
               >
                  BACK TO TOP <ChevronRight className="-rotate-90 group-hover:-translate-y-1 transition-transform" size={14} />
               </button>
            </div>
         </div>
      </footer>
    </div>
  );
}
