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
} from "react-icons/si";
const App = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [result, setResult] = useState("");
  const [validated, setValidated] = useState(false);

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

  const inputClasses = (fieldValid = true) =>
    `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#41a4c3] focus:border-[#41a4c3] transition ${
      validated && !fieldValid ? "border-red-500" : "border-gray-300"
    }`;
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-sm shadow-sm py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.a
            href="/"
            className="text-2xl font-bold text-primary flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-primary/10 p-2 rounded-lg mr-2">👋</span>
            <span>Satyam</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {["home", "about", "skills", "projects", "contact"].map((item) => (
              <motion.button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize relative px-3 py-1 transition-colors ${
                  activeSection === item
                    ? "text-primary font-medium"
                    : "text-slate-700 hover:text-primary"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
                {activeSection === item && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 bottom-0 w-full h-0.5 bg-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-slate-700 focus:outline-none p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? (
              <FiX size={24} className="text-primary" />
            ) : (
              <FiMenu size={24} />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg overflow-hidden"
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 py-2 flex flex-col">
                {["home", "about", "skills", "projects", "contact"].map(
                  (item) => (
                    <motion.button
                      key={item}
                      onClick={() => {
                        scrollToSection(item);
                        setMobileMenuOpen(false);
                      }}
                      className={`capitalize py-3 px-4 text-left transition-colors rounded-lg my-1 flex items-center ${
                        activeSection === item
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-slate-700 hover:bg-gray-100"
                      }`}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {activeSection === item && (
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></span>
                      )}
                      <span>{item}</span>
                    </motion.button>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section
          id="home"
          className="min-h-screen flex items-center pt-20 pb-10 bg-gradient-to-b from-white to-blue-50"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Text Content */}
              <motion.div
                className="md:w-1/2 mb-10 md:mb-0"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <motion.h1
                  className="text-4xl md:text-6xl font-bold mb-4 text-slate-800 leading-tight"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Hi, I'm <span className="text-primary">Satyam</span> 👋
                </motion.h1>

                <motion.h2
                  className="text-2xl md:text-3xl font-semibold mb-6 text-slate-600"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <span className="bg-primary/10 rounded-md">
                    Frontend Developer
                  </span>
                </motion.h2>

                <motion.p
                  className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  I build exceptional digital experiences with modern web
                  technologies. Passionate about creating beautiful, functional,
                  and user-friendly applications.
                </motion.p>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.a
                    href="#contact"
                    className="bg-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 flex items-center gap-2"
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiMail size={18} />
                    Contact Me
                  </motion.a>

                  <motion.a
                    href="#projects"
                    className="border-2 border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/10 transition-all shadow hover:shadow-primary/20 flex items-center gap-2"
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiCode size={18} />
                    View Projects
                  </motion.a>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  className="mt-8 flex gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  {[
                    {
                      icon: <FiGithub size={20} />,
                      url: "https://github.com/satyam1007",
                    },
                    {
                      icon: <FiLinkedin size={20} />,
                      url: "https://www.linkedin.com/in/satyam-mishra-202681368/",
                    },
                    {
                      icon: <FiTwitter size={20} />,
                      url: "https://x.com/mishra07_dev",
                    },
                    {
                      icon: <FiInstagram size={20} />,
                      url: "https://www.instagram.com/satyam07.dev/",
                    },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      className="text-slate-600 hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/10"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>

              {/* Profile Image */}
              <motion.div
                className="md:w-1/2 flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
              >
                <div className="relative w-72 h-72 md:w-96 md:h-96">
                  <motion.div
                    className="absolute inset-0 bg-primary/10 rounded-3xl transform rotate-6"
                    animate={{ rotate: 6 }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 4,
                    }}
                  />

                  <motion.div
                    className="absolute inset-0 bg-primary/5 rounded-3xl transform -rotate-6"
                    animate={{ rotate: -6 }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 5,
                    }}
                  />

                  <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                    <img
                      src="/images/animaProfile.png"
                      alt="Satyam Mishra"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <motion.div
                    className="absolute -bottom-5 -right-5 bg-white px-4 py-2 rounded-full shadow-md border border-gray-200"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <span className="text-primary font-medium flex items-center gap-2">
                      <FiAward className="text-yellow-500" />
                      <span>3+ Years Experience</span>
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-20 bg-gradient-to-b from-blue-50 to-white"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="text-center mb-16">
                <motion.h2
                  className="text-3xl md:text-5xl font-bold mb-4 text-slate-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  About <span className="text-primary">Me</span>
                </motion.h2>
                <motion.div
                  className="w-24 h-1.5 bg-primary mx-auto rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                />
                <motion.p
                  className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Get to know more about me, my skills, and what I bring to the
                  table
                </motion.p>
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-12 xl:gap-20">
                {/* Profile Image */}
                <motion.div
                  className="lg:w-2/5 flex justify-center"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="relative w-full max-w-md">
                    <div className="aspect-square bg-primary/10 rounded-2xl overflow-hidden border-8 border-white shadow-xl">
                      <img
                        src="/images/animaProfile.png"
                        alt="Satyam Mishra"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <motion.div
                      className="absolute -bottom-6 -right-2 bg-white px-5 py-3 rounded-xl shadow-lg border border-gray-100"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FiAward className="text-primary text-xl" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">3+ Years</p>
                          <p className="text-sm text-slate-600">Experience</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* About Content */}
                <motion.div
                  className="lg:w-3/5"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <motion.h3
                    className="text-2xl md:text-3xl font-bold mb-6 text-slate-800"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    Who I <span className="text-primary">Am</span>
                  </motion.h3>

                  <motion.div
                    className="space-y-4 text-slate-600 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <p>
                      I'm a passionate{" "}
                      <span className="text-primary font-medium">
                        Frontend Developer
                      </span>{" "}
                      with expertise in React, Next.js, and modern JavaScript
                      frameworks. With a strong eye for design and user
                      experience, I create applications that are both visually
                      stunning and highly functional.
                    </p>
                    <p>
                      My journey in web development started with a curiosity
                      about how websites work, which turned into a full-fledged
                      career. I've had the privilege to work on diverse projects
                      ranging from small business websites to complex enterprise
                      applications.
                    </p>
                    <p>
                      What drives me is the challenge of solving real-world
                      problems through clean, efficient code and intuitive
                      interfaces. I'm committed to continuous learning and
                      staying at the forefront of web technologies.
                    </p>
                  </motion.div>

                  {/* Personal Info */}
                  <motion.div
                    className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {[
                      {
                        icon: <FiUser size={18} />,
                        label: "Name",
                        value: "Satyam Mishra",
                      },
                      {
                        icon: <FiMail size={18} />,
                        label: "Email",
                        value: "satyammishradeveloper@gmail.com",
                      },
                      {
                        icon: <FiMapPin size={18} />,
                        label: "From",
                        value: "Haryana, Hisar",
                      },
                      {
                        icon: <FiBriefcase size={18} />,
                        label: "Experience",
                        value: "3+ Years",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                        whileHover={{ y: -3 }}
                      >
                        <div className="p-2 bg-primary/10 text-primary rounded-lg">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">{item.label}</p>
                          <p className="font-medium text-slate-800">
                            {item.value}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="py-20 bg-gradient-to-b from-white to-blue-50"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="text-center mb-16">
                <motion.h2
                  className="text-3xl md:text-5xl font-bold mb-4 text-slate-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  My <span className="text-primary">Skills</span>
                </motion.h2>
                <motion.div
                  className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-4"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                />
                <motion.p
                  className="text-lg text-slate-600 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Technologies and tools I'm proficient with
                </motion.p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: "HTML",
                    level: 90,
                    icon: <SiHtml5 className="text-orange-500" />,
                  },
                  {
                    name: "CSS",
                    level: 85,
                    icon: <SiCss3 className="text-blue-500" />,
                  },
                  {
                    name: "JavaScript",
                    level: 80,
                    icon: <SiJavascript className="text-yellow-400" />,
                  },
                  {
                    name: "React",
                    level: 75,
                    icon: <SiReact className="text-blue-400" />,
                  },
                  {
                    name: "Tailwind CSS",
                    level: 90,
                    icon: <SiTailwindcss className="text-cyan-400" />,
                  },
                  {
                    name: "Node.js",
                    level: 40,
                    icon: <SiNodedotjs className="text-green-500" />,
                  },
                  {
                    name: "Git",
                    level: 85,
                    icon: <SiGit className="text-orange-600" />,
                  },
                  {
                    name: "TypeScript",
                    level: 65,
                    icon: <SiTypescript className="text-blue-600" />,
                  },
                ].map((skill, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-3xl p-2 bg-slate-100 rounded-lg group-hover:bg-primary/10 transition-colors">
                          {skill.icon}
                        </div>
                        <h3 className="font-semibold text-slate-800">
                          {skill.name}
                        </h3>
                      </div>

                      <div className="mt-auto">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-500">
                            Proficiency
                          </span>
                          <span className="text-primary font-medium">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{
                              duration: 1,
                              delay: index * 0.1 + 0.3,
                            }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Additional Skills */}
              <motion.div
                className="mt-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold text-center mb-8 text-slate-700">
                  Other Skills & Competencies
                </h3>
                <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                  {[
                    "Responsive Design",
                    "UI/UX Principles",
                    "Performance Optimization",
                    "Cross-browser Compatibility",
                    "Problem Solving",
                    "Team Collaboration",
                  ].map((skill, index) => (
                    <motion.span
                      key={index}
                      className="px-4 py-2 bg-white rounded-full text-sm font-medium text-slate-700 shadow-sm hover:shadow-md transition-all"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -2 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="py-20 bg-gradient-to-b from-blue-50 to-white"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="text-center mb-16">
                <motion.h2
                  className="text-3xl md:text-5xl font-bold mb-4 text-slate-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  My <span className="text-primary">Projects</span>
                </motion.h2>
                <motion.div
                  className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-4"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                />
                <motion.p
                  className="text-lg text-slate-600 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  A collection of my recent work and case studies
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Attendance Web App",
                    description:
                      "A web-based attendance tracking system with clean UI and scalable architecture featuring real-time updates and reporting.",
                    tags: ["React", "Tailwind CSS", "Firebase"],
                    image: "/images/attandance_app.png",
                    link: "https://goattend.vercel.app/",
                    github: "https://github.com/satyam1007/attendEasy-app",
                  },
                  {
                    title: "Task Management App",
                    description:
                      "Collaborative task manager with drag-and-drop functionality, project organization, and real-time team collaboration.",
                    tags: ["React", "Tailwind CSS", "DnD"],
                    image: "/images/todo_list.png",
                    link: "https://react-todo-app-eight-mu.vercel.app/",
                    github: "https://github.com/satyam1007/react-todo-app",
                  },
                  {
                    title: "Law Firm Website",
                    description:
                      "Professional responsive website with elegant UI components, contact forms, and case study showcase.",
                    tags: ["Astro", "React", "Tailwind"],
                    image: "/images/law_firm.png",
                    link: "https://law-firm-beta-wine.vercel.app/",
                    github: "https://github.com/yourusername/law-firm",
                  },
                  {
                    title: "Weather App",
                    description:
                      "Real-time weather application with forecasts, location search, and interactive weather maps.",
                    tags: ["JavaScript", "Weather API", "CSS"],
                    image: "/images/weather_app.png",
                    link: "https://weather-app-lac-three-29.vercel.app/",
                    github: "https://github.com/satyam1007/WeatherApp",
                  },
                  {
                    title: "GitHub Profile Finder",
                    description:
                      "Search and display GitHub profiles with detailed stats, repositories, and follower data visualization.",
                    tags: ["React", "GitHub API", "Chart.js"],
                    image: "/images/github_finder.png",
                    link: "https://react-search-github-profile.vercel.app/",
                    github:
                      "https://github.com/satyam1007/react-search-github-profile",
                  },
                  {
                    title: "Quiz App",
                    description:
                      "Interactive quiz platform with multiple-choice questions, scoring system, and progress tracking.",
                    tags: ["React", "Open Trivia API", "Tailwind"],
                    image: "/images/quiz_app.png",
                    link: "https://quiz-app-eight-tawny-71.vercel.app/",
                    github: "https://github.com/satyam1007/QuizApp",
                  },
                ].map((project, index) => (
                  <motion.div
                    key={index}
                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div className="flex gap-3">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-slate-800 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors flex items-center gap-1"
                          >
                            <FiExternalLink size={14} />
                            Live Demo
                          </a>
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white text-slate-800 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-1"
                            >
                              <FiGithub size={14} />
                              Code
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-slate-800 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-slate-600 mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tagIndex) => (
                          <motion.span
                            key={tagIndex}
                            className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full"
                            whileHover={{ scale: 1.05 }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary font-medium hover:underline inline-flex items-center group/link"
                        >
                          View Project
                          <FiArrowRight
                            className="ml-1 transition-transform group-hover/link:translate-x-1"
                            size={16}
                          />
                        </a>
                        <span className="text-xs text-slate-400">
                          {index % 2 === 0 ? "Featured" : "Latest"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-16 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <a
                  href="https://github.com/satyam1007"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary/10 transition-all"
                >
                  <FiGithub size={18} />
                  View All Projects on GitHub
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-20 bg-gradient-to-b from-white to-blue-50"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="text-center mb-16">
                <motion.h2
                  className="text-3xl md:text-5xl font-bold mb-4 text-slate-800"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  Get In <span className="text-primary">Touch</span>
                </motion.h2>
                <motion.div
                  className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-4"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                />
                <motion.p
                  className="text-lg text-slate-600 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Have a project in mind or want to collaborate? Drop me a
                  message and I'll get back to you as soon as possible.
                </motion.p>
              </div>

              <div className="flex flex-col lg:flex-row gap-12">
                {/* Contact Information */}
                <motion.div
                  className="lg:w-1/2"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <motion.h3
                    className="text-2xl md:text-3xl font-bold mb-6 text-slate-800"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    Contact <span className="text-primary">Information</span>
                  </motion.h3>

                  <motion.p
                    className="text-slate-600 mb-8 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    I'm currently available for freelance work or full-time
                    positions. If you have a project that needs creative
                    solutions, feel free to reach out.
                  </motion.p>

                  <div className="space-y-6">
                    {[
                      {
                        icon: <FiMail className="text-xl" />,
                        title: "Email",
                        value: "satyammishradeveloper@gmail.com",
                        link: "mailto:satyammishradeveloper@gmail.com",
                      },
                      {
                        icon: <FiPhone className="text-xl" />,
                        title: "Phone",
                        value: "+91 12345 67890",
                        link: "tel:+911234567890",
                      },
                      {
                        icon: <FiMapPin className="text-xl" />,
                        title: "Location",
                        value: "Haryana, Hisar, India",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="p-3 bg-primary/10 text-primary rounded-lg">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-sm text-slate-500">{item.title}</p>
                          {item.link ? (
                            <a
                              href={item.link}
                              className="text-slate-800 hover:text-primary transition-colors font-medium"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-slate-800 font-medium">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Social Links */}
                  <motion.div
                    className="mt-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="text-lg font-medium text-slate-700 mb-4">
                      Follow Me
                    </h4>
                    <div className="flex gap-4">
                      {[
                        {
                          icon: <FiGithub size={20} />,
                          url: "https://github.com/satyam1007",
                        },
                        {
                          icon: <FiLinkedin size={20} />,
                          url: "https://www.linkedin.com/in/satyam-mishra-202681368/",
                        },
                        {
                          icon: <FiTwitter size={20} />,
                          url: "https://x.com/mishra07_dev",
                        },
                        {
                          icon: <FiInstagram size={20} />,
                          url: "https://www.instagram.com/satyam07.dev/",
                        },
                      ].map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-primary/10 p-3 rounded-full text-primary hover:bg-primary/20 transition-colors"
                          whileHover={{ y: -3, scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {social.icon}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Contact Form */}
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-1 md:p-2">
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className=""
                    >
                      {/* Header */}
                      <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-center">
                        <h1 className="text-3xl font-bold text-white">
                          Let's Talk
                        </h1>
                        <p className="text-blue-100 mt-2">
                          Request a Consultation
                        </p>
                      </div>

                      {/* Form */}
                      <div className="p-6 md:p-8">
                        <form
                          onSubmit={handleSubmit}
                          noValidate
                          className={`space-y-6 ${
                            validated ? "was-validated" : ""
                          }`}
                        >
                          <input
                            type="hidden"
                            name="access_key"
                            value="d0effec1-ba3c-4680-bd1a-2e3af7bad3e8"
                          />
                          <input
                            type="hidden"
                            name="subject"
                            value="New Submission from Web3Forms"
                          />
                          <input
                            type="checkbox"
                            name="botcheck"
                            className="hidden"
                          />

                          {/* Name Fields */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label
                                htmlFor="first_name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                First Name{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                name="name"
                                id="first_name"
                                placeholder="John"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="last_name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Last Name{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                name="last_name"
                                id="last_name"
                                placeholder="Doe"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                              />
                            </div>
                          </div>

                          {/* Contact Info */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Email Address{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="you@example.com"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Phone Number{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                name="phone"
                                id="phone"
                                placeholder="+1 (555) 1234-567"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                              />
                            </div>
                          </div>

                          {/* Message */}
                          <div>
                            <label
                              htmlFor="message"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Your Message{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              rows={5}
                              name="message"
                              id="message"
                              placeholder="How can we help you?"
                              required
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            />
                          </div>

                          {/* Button */}
                          <div className="pt-2">
                            <button
                              type="submit"
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                              Send Message
                            </button>
                          </div>

                          {result && (
                            <div
                              className={`text-center p-4 rounded-lg ${
                                result.includes("success")
                                  ? "bg-green-100 text-green-700 border border-green-200"
                                  : "bg-red-100 text-red-700 border border-red-200"
                              }`}
                            >
                              {result}
                            </div>
                          )}
                        </form>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-blue-50 to-white py-12 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-slate-600">
                  &copy; {new Date().getFullYear()} Satyam Mishra. All rights
                  reserved.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {[
                  {
                    icon: <FiGithub size={20} />,
                    url: "https://github.com/satyam1007",
                  },
                  {
                    icon: <FiLinkedin size={20} />,
                    url: "https://www.linkedin.com/in/satyam-mishra-202681368/",
                  },
                  {
                    icon: <FiTwitter size={20} />,
                    url: "https://x.com/mishra07_dev",
                  },
                  {
                    icon: <FiInstagram size={20} />,
                    url: "https://www.instagram.com/satyam07.dev/",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary/10 p-3 rounded-full text-primary hover:bg-primary/20 transition-colors"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>

              {/* Back to Top */}
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-primary flex items-center gap-1 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiArrowUp className="inline" /> Back to Top
              </motion.button>
            </div>

            {/* Optional: Footer Navigation */}
            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
              <nav className="flex flex-wrap justify-center gap-4 md:gap-8">
                {["Home", "About", "Projects", "Contact"].map((item, index) => (
                  <motion.a
                    key={index}
                    href={`#${item.toLowerCase()}`}
                    className="text-slate-600 hover:text-primary transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default App;
