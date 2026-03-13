import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiTwitter,
  FiMenu,
  FiX,
  FiCode,
  FiInstagram,
  FiAward,
  FiUser,
  FiMapPin,
  FiBriefcase,
  FiExternalLink,
  FiArrowRight,
  FiPhone,
  FiArrowUp,
  FiDownload,
  FiHeart,
  FiStar,
  FiClock,
  FiCheckCircle,
  FiTrendingUp,
  FiCpu,
  FiLayers,
  FiZap,
} from "react-icons/fi";

import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiGit,
  SiTypescript,
  SiNextdotjs,
  SiFigma,
  SiVercel,
  SiNetlify,
  SiVite,
} from "react-icons/si";

const App = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [result, setResult] = useState("");
  const [validated, setValidated] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      setScrolled(scrollPosition > 50);

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      setValidated(true);
      form.querySelector(":invalid")?.focus();
      return;
    }

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    setResult("Please wait...");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (res.status === 200) {
        setResult(json.message);
      } else {
        setResult(json.message);
      }
    } catch (error) {
      setResult("Something went wrong!");
    }

    form.reset();
    setValidated(false);

    setTimeout(() => {
      setResult("");
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans">
      {/* Custom cursor effect */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        ::selection {
          background: #3b82f6;
          color: white;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
        
        /* Gradient animations */
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .gradient-animate {
          background: linear-gradient(-45deg, #3b82f6, #2563eb, #1d4ed8, #3b82f6);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
        
        /* Glow effect */
        .glow {
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
        }
        
        .glow:hover {
          box-shadow: 0 0 50px rgba(59, 130, 246, 0.5);
        }
      `}</style>

      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-gray-800/50 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.a
            href="/"
            className="text-2xl font-bold flex items-center group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-lg blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <img src="/portIcon.png" alt="" width={35} height={35} className="relative z-10" />
            </div>
            <span className="ml-2 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent font-extrabold">
              Mishra
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {["home", "about", "skills", "projects", "contact"].map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeSection === item
                    ? "text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeSection === item && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 capitalize">{item}</span>
              </motion.button>
            ))}
          </div>

          {/* Resume Button */}
          <motion.a
            href="/resume.pdf"
            target="_blank"
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:from-blue-700 hover:to-blue-800 transition-all glow"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiDownload size={16} />
            Resume
          </motion.a>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-gray-300 focus:outline-none p-2 rounded-lg hover:bg-white/5 relative z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? (
              <FiX size={24} className="text-blue-500" />
            ) : (
              <FiMenu size={24} />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden fixed inset-x-0 top-[73px] bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl"
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-6 flex flex-col space-y-2">
                {["home", "about", "skills", "projects", "contact"].map(
                  (item) => (
                    <motion.button
                      key={item}
                      onClick={() => {
                        scrollToSection(item);
                        setMobileMenuOpen(false);
                      }}
                      className={`capitalize py-4 px-4 text-left transition-all rounded-xl flex items-center justify-between group ${
                        activeSection === item
                          ? "bg-gradient-to-r from-blue-600/20 to-blue-700/20 text-blue-400 border border-blue-500/20"
                          : "text-gray-400 hover:bg-white/5"
                      }`}
                      whileHover={{ x: 5 }}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full ${activeSection === item ? 'bg-blue-500' : 'bg-gray-600'}`}></span>
                        <span className="text-lg">{item}</span>
                      </span>
                      <FiArrowRight className={`opacity-0 group-hover:opacity-100 transition-opacity ${activeSection === item ? 'text-blue-500' : ''}`} />
                    </motion.button>
                  )
                )}
                
                {/* Mobile Resume Button */}
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-4 rounded-xl font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiDownload size={18} />
                  Download Resume
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="relative">
        {/* Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>

        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex items-center pt-20 overflow-hidden"
        >
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-6"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-sm text-gray-300">Available for work</span>
                </motion.div>

                <motion.h1
                  className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <span className="text-gray-100">Hi, I'm</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                    Satyam Mishra
                  </span>
                </motion.h1>

                <motion.h2
                  className="text-2xl md:text-3xl font-medium mb-6 text-gray-300"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <span className="border-l-4 border-blue-500 pl-4">
                    Frontend Developer
                  </span>
                </motion.h2>

                <motion.p
                  className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  I craft exceptional digital experiences with modern web technologies. 
                  Specializing in building beautiful, functional, and user-friendly 
                  applications that make a difference.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.a
                    href="#contact"
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl font-medium overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    <span className="relative flex items-center gap-2">
                      <FiMail size={18} />
                      Let's Connect
                    </span>
                  </motion.a>

                  <motion.a
                    href="#projects"
                    className="group px-8 py-4 border border-gray-700 rounded-xl font-medium hover:bg-white/5 transition-all flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiCode size={18} />
                    View Work
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                </motion.div>

                {/* Stats */}
                <motion.div
                  className="grid grid-cols-3 gap-4 max-w-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {[
                    { value: "2+", label: "Years Experience", icon: <FiClock /> },
                    { value: "20+", label: "Projects Done", icon: <FiCheckCircle /> },
                    { value: "15+", label: "Happy Clients", icon: <FiHeart /> },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-blue-500 flex items-center justify-center gap-1">
                        {stat.icon}
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>

                {/* Social Links */}
                <motion.div
                  className="mt-8 flex gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {[
                    { icon: <FiGithub size={18} />, url: "https://github.com/satyam1007", label: "GitHub" },
                    { icon: <FiLinkedin size={18} />, url: "https://www.linkedin.com/in/satyam-mishra-202681368/", label: "LinkedIn" },
                    { icon: <FiTwitter size={18} />, url: "https://x.com/mishra07_dev", label: "Twitter" },
                    { icon: <FiInstagram size={18} />, url: "https://www.instagram.com/satyam07.dev/", label: "Instagram" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 bg-blue-500 rounded-lg blur-md opacity-0 group-hover:opacity-30 transition-opacity"></div>
                      <div className="relative bg-white/5 border border-gray-800 p-3 rounded-lg hover:border-blue-500/50 transition-all">
                        {social.icon}
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>

              {/* Profile Image with Animation */}
              <motion.div
                className="relative lg:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                <div className="relative">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] rotate-6 blur-2xl opacity-30 animate-pulse"></div>
                  
                  {/* Main image container */}
                  <div className="relative w-full max-w-lg mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] rotate-3"></div>
                    <div className="absolute inset-0 bg-[#0a0a0a] rounded-[2rem] rotate-3 scale-[0.98]"></div>
                    
                    <div className="relative rounded-[2rem] overflow-hidden border-4 border-gray-800 shadow-2xl">
                      <img
                        src="/images/animaProfile.png"
                        alt="Satyam Mishra"
                        className="w-full h-auto object-cover"
                      />
                      
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 bg-[#0a0a0a] border border-gray-800 p-4 rounded-xl shadow-xl"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    <div className="flex items-center gap-2">
                      <FiAward className="text-yellow-500 text-xl" />
                      <div>
                        <p className="font-bold text-sm">2+ Years</p>
                        <p className="text-xs text-gray-400">Experience</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -left-4 bg-[#0a0a0a] border border-gray-800 p-4 rounded-xl shadow-xl"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                  >
                    <div className="flex items-center gap-2">
                      <FiCode className="text-blue-500 text-xl" />
                      <div>
                        <p className="font-bold text-sm">50+</p>
                        <p className="text-xs text-gray-400">Projects</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Tech stack icons */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-4 bg-[#0a0a0a]/90 backdrop-blur-sm border border-gray-800 px-6 py-3 rounded-full">
                  {[
                    <SiReact className="text-blue-400" />,
                    <SiTailwindcss className="text-cyan-400" />,
                    <SiJavascript className="text-yellow-400" />,
                    <SiTypescript className="text-blue-600" />,
                  ].map((icon, index) => (
                    <motion.div
                      key={index}
                      className="text-2xl"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                    >
                      {icon}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-blue-500 rounded-full mt-2"></div>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 relative">
          <div className="container mx-auto px-4">
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="text-blue-500 font-semibold text-sm tracking-widest uppercase">About Me</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                Crafting Digital
                <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Experiences
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left column - Image with stats */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] rotate-3 blur-xl opacity-30"></div>
                  
                  <div className="relative bg-[#0a0a0a] border border-gray-800 rounded-[2rem] overflow-hidden">
                    <img
                      src="/images/animaProfile.png"
                      alt="Satyam Mishra"
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                {/* Experience card */}
                <motion.div
                  className="absolute -bottom-6 -right-6 bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl shadow-2xl"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  viewport={{ once: true }}
                >
                  <p className="text-4xl font-bold">2+</p>
                  <p className="text-sm opacity-90">Years of Experience</p>
                </motion.div>

                {/* Tech stack badges */}
                <div className="absolute -top-4 -left-4 flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 bg-[#0a0a0a] border border-gray-800 rounded-lg flex items-center justify-center text-xl">
                      {i === 1 && <SiReact className="text-blue-400" />}
                      {i === 2 && <SiTailwindcss className="text-cyan-400" />}
                      {i === 3 && <SiJavascript className="text-yellow-400" />}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right column - About content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold mb-6">
                  Passionate Frontend Developer
                  <span className="block text-blue-500 mt-2">Creating Impactful Web Solutions</span>
                </h3>

                <div className="space-y-4 text-gray-400 mb-8">
                  <p>
                    I'm a passionate Frontend Developer with expertise in React, Next.js, and modern JavaScript
                    frameworks. With a strong eye for design and user experience, I create applications that are
                    both visually stunning and highly functional.
                  </p>
                  <p>
                    My journey in web development started with a curiosity about how websites work, which turned
                    into a full-fledged career. I've had the privilege to work on diverse projects ranging from
                    small business websites to complex enterprise applications.
                  </p>
                  <p>
                    What drives me is the challenge of solving real-world problems through clean, efficient code
                    and intuitive interfaces. I'm committed to continuous learning and staying at the forefront
                    of web technologies.
                  </p>
                </div>

                {/* Personal info grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <FiUser />, label: "Name", value: "Satyam Mishra" },
                    { icon: <FiMail />, label: "Email", value: "satyammishradeveloper@gmail.com", link: true },
                    { icon: <FiMapPin />, label: "Location", value: "Haryana, India" },
                    { icon: <FiBriefcase />, label: "Experience", value: "2+ Years" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/5 border border-gray-800 p-4 rounded-xl hover:border-blue-500/50 transition-all"
                      whileHover={{ y: -3 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-blue-500">{item.icon}</div>
                        <span className="text-sm text-gray-500">{item.label}</span>
                      </div>
                      {item.link ? (
                        <a href={`mailto:${item.value}`} className="font-medium hover:text-blue-500 transition-colors text-sm break-all">
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium text-sm">{item.value}</p>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Skills preview */}
                <div className="mt-8">
                  <p className="text-sm text-gray-500 mb-3">Tech Stack I work with:</p>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Next.js", "TypeScript", "Tailwind", "Node.js"].map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-white/5 border border-gray-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 relative bg-[#0f0f0f]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="text-blue-500 font-semibold text-sm tracking-widest uppercase">Expertise</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                Technical
                <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Skills & Tools
                </span>
              </h2>
            </motion.div>

            {/* Skills categories */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Frontend Skills */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-gray-800 rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-blue-500/10 rounded-xl">
                    <FiCode className="text-blue-500 text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold">Frontend Development</h3>
                </div>

                <div className="space-y-6">
                  {[
                    { name: "React", level: 85, icon: <SiReact className="text-blue-400" /> },
                    { name: "JavaScript", level: 80, icon: <SiJavascript className="text-yellow-400" /> },
                    { name: "TypeScript", level: 75, icon: <SiTypescript className="text-blue-600" /> },
                    { name: "Tailwind CSS", level: 90, icon: <SiTailwindcss className="text-cyan-400" /> },
                    { name: "HTML/CSS", level: 95, icon: <SiHtml5 className="text-orange-500" /> },
                  ].map((skill, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{skill.icon}</span>
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <span className="text-sm text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Other Skills */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-gray-800 rounded-2xl p-8"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-purple-500/10 rounded-xl">
                    <FiCpu className="text-purple-500 text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold">Other Technologies</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
                    { name: "Git", icon: <SiGit className="text-orange-500" /> },
                    { name: "Next.js", icon: <SiNextdotjs /> },
                    { name: "Figma", icon: <SiFigma className="text-purple-500" /> },
                    { name: "Vercel", icon: <SiVercel /> },
                    { name: "Vite", icon: <SiVite className="text-yellow-500" /> },
                  ].map((skill, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-center hover:border-blue-500/50 transition-all group"
                      whileHover={{ y: -3 }}
                    >
                      <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                        {skill.icon}
                      </div>
                      <span className="text-sm font-medium">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Soft Skills */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4">Soft Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Problem Solving",
                      "Team Collaboration",
                      "Communication",
                      "Time Management",
                      "Adaptability",
                      "Creativity",
                    ].map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="text-blue-500 font-semibold text-sm tracking-widest uppercase">Portfolio</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                Featured
                <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Projects
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Attendance Web App",
                  description: "Real-time attendance tracking system with clean UI and scalable architecture.",
                  tags: ["React", "Tailwind", "Firebase"],
                  image: "/images/attandance_app.png",
                  link: "https://goattend.vercel.app/",
                  github: "https://github.com/satyam1007/attendEasy-app",
                  featured: true,
                },
                {
                  title: "Task Management App",
                  description: "Collaborative task manager with drag-and-drop functionality and real-time updates.",
                  tags: ["React", "Tailwind", "DnD"],
                  image: "/images/todo_list.png",
                  link: "https://react-todo-app-eight-mu.vercel.app/",
                  github: "https://github.com/satyam1007/react-todo-app",
                },
                {
                  title: "Law Firm Website",
                  description: "Professional responsive website with elegant UI components and contact forms.",
                  tags: ["Astro", "React", "Tailwind"],
                  image: "/images/law_firm.png",
                  link: "https://law-firm-beta-wine.vercel.app/",
                  github: "https://github.com/yourusername/law-firm",
                },
                {
                  title: "Weather App",
                  description: "Real-time weather application with forecasts and interactive weather maps.",
                  tags: ["JavaScript", "API", "CSS"],
                  image: "/images/weather_app.png",
                  link: "https://weather-app-lac-three-29.vercel.app/",
                  github: "https://github.com/satyam1007/WeatherApp",
                },
                {
                  title: "GitHub Profile Finder",
                  description: "Search and display GitHub profiles with detailed stats and repositories.",
                  tags: ["React", "GitHub API", "Chart.js"],
                  image: "/images/github_finder.png",
                  link: "https://react-search-github-profile.vercel.app/",
                  github: "https://github.com/satyam1007/react-search-github-profile",
                },
                {
                  title: "Quiz App",
                  description: "Interactive quiz platform with scoring system and progress tracking.",
                  tags: ["React", "API", "Tailwind"],
                  image: "/images/quiz_app.png",
                  link: "https://quiz-app-eight-tawny-71.vercel.app/",
                  github: "https://github.com/satyam1007/QuizApp",
                },
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onHoverStart={() => setHoveredProject(index)}
                  onHoverEnd={() => setHoveredProject(null)}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity"></div>
                  
                  <div className="relative bg-[#0f0f0f] border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all">
                    {/* Project image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent"></div>
                      
                      {/* Featured badge */}
                      {project.featured && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-xs font-bold px-3 py-1 rounded-full">
                          Featured
                        </div>
                      )}
                      
                      {/* Links */}
                      <div className="absolute bottom-4 right-4 flex gap-2 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#0f0f0f] border border-gray-700 p-3 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-all"
                        >
                          <FiGithub size={18} />
                        </a>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 p-3 rounded-lg hover:bg-blue-700 transition-all"
                        >
                          <FiExternalLink size={18} />
                        </a>
                      </div>
                    </div>

                    {/* Project info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs px-2 py-1 bg-blue-500/10 text-blue-500 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-blue-500 hover:text-blue-400 flex items-center gap-1 group/link"
                        >
                          View Project
                          <FiArrowRight className="group-hover/link:translate-x-1 transition-transform" />
                        </a>
                        <span className="text-xs text-gray-600">
                          <FiZap className="inline mr-1" />
                          Live
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View all button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <a
                href="https://github.com/satyam1007"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white/5 border border-gray-800 hover:border-blue-500 px-8 py-4 rounded-xl font-medium transition-all group"
              >
                <FiGithub size={20} />
                View All Projects on GitHub
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 relative bg-[#0f0f0f]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <span className="text-blue-500 font-semibold text-sm tracking-widest uppercase">Contact</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                Let's Work
                <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Together
                </span>
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-8">
              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:col-span-2 space-y-6"
              >
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                
                <p className="text-gray-400 mb-8">
                  Have a project in mind or want to collaborate? I'm always excited to hear about new opportunities and challenges.
                </p>

                {[
                  { icon: <FiMail />, label: "Email", value: "satyammishradeveloper@gmail.com", link: "mailto:satyammishradeveloper@gmail.com" },
                  { icon: <FiPhone />, label: "Phone", value: "+91 12345 67890", link: "tel:+911234567890" },
                  { icon: <FiMapPin />, label: "Location", value: "Haryana, India" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-white/5 border border-gray-800 rounded-xl hover:border-blue-500/50 transition-all"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{item.label}</p>
                      {item.link ? (
                        <a href={item.link} className="font-medium hover:text-blue-500 transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Social links */}
                <div className="pt-6">
                  <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
                  <div className="flex gap-3">
                    {[
                      { icon: <FiGithub />, url: "https://github.com/satyam1007" },
                      { icon: <FiLinkedin />, url: "https://www.linkedin.com/in/satyam-mishra-202681368/" },
                      { icon: <FiTwitter />, url: "https://x.com/mishra07_dev" },
                      { icon: <FiInstagram />, url: "https://www.instagram.com/satyam07.dev/" },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/5 border border-gray-800 p-3 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-all"
                        whileHover={{ y: -3 }}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Contact form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:col-span-3"
              >
                <div className="bg-white/5 border border-gray-800 rounded-2xl p-8">
                  <form onSubmit={handleSubmit} noValidate>
                    <input type="hidden" name="access_key" value="d0effec1-ba3c-4680-bd1a-2e3af7bad3e8" />
                    <input type="hidden" name="subject" value="New Submission from Portfolio" />
                    <input type="checkbox" name="botcheck" className="hidden" />

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none transition"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name *</label>
                        <input
                          type="text"
                          name="last_name"
                          required
                          className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none transition"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none transition"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone *</label>
                        <input
                          type="text"
                          name="phone"
                          required
                          className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none transition"
                          placeholder="+1 234 567 890"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2">Message *</label>
                      <textarea
                        rows={5}
                        name="message"
                        required
                        className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-xl focus:border-blue-500 focus:outline-none transition resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all glow flex items-center justify-center gap-2 group"
                    >
                      Send Message
                      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    {result && (
                      <div className={`mt-4 p-4 rounded-xl text-center ${
                        result.includes("success") ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
                      }`}>
                        {result}
                      </div>
                    )}
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Satyam Mishra. All rights reserved.
              </p>
            </div>

            <div className="flex gap-4">
              {[
                { icon: <FiGithub />, url: "https://github.com/satyam1007" },
                { icon: <FiLinkedin />, url: "https://www.linkedin.com/in/satyam-mishra-202681368/" },
                { icon: <FiTwitter />, url: "https://x.com/mishra07_dev" },
                { icon: <FiInstagram />, url: "https://www.instagram.com/satyam07.dev/" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-500 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-gray-500 hover:text-blue-500 flex items-center gap-1 text-sm transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiArrowUp />
              Back to Top
            </motion.button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
