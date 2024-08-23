import { useEffect, useState } from "react";
import "./Portfolio.css";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { HiMiniViewfinderCircle } from "react-icons/hi2";

function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleSwitchTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navLinkStyle = "hover:text-[#147efb] duration-200";

  const skillsIcons =
    "w-9 h-9 hover:scale-110 transition-transform duration-200";

  const imagesStyles =
    "w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[300px] rounded-md object-cover";

  const projectDescriptions =
    "text-[#767676] dark:text-gray-400 text-[14px] sm:text-[17px] font-medium leading-relaxed";

  const projectLinkStyles =
    "flex items-center justify-center md:justify-start gap-6 dark:text-gray-300";

  const projectTitles =
    "text-xl md:text-2xl font-bold flex items-center gap-2 dark:text-white";

  const projectStructures =
    "flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10 lg:space-x-20 p-4 sm:p-6";

  return (
    <>
      <div className="bg-white dark:bg-black border-b-2 dark:border-gray-700 fixed top-0 left-0 right-0 z-50">
        <header className="flex justify-between items-center px-6 py-4 md:px-8 md:py-5 dark:text-white text-[#2d2e32]">
          <div id="logo" className="text-xl font-bold">
            <a href="#">Satyam.dev</a>
          </div>
          <nav className="hidden md:flex">
            <ul className="flex items-center space-x-6 md:space-x-8 text-md font-semibold">
              <li className="cursor-pointer">
                <a href="#home" className={navLinkStyle}>
                  Home
                </a>
              </li>
              <li className="cursor-pointer">
                <a href="#about" className={navLinkStyle}>
                  About
                </a>
              </li>
              <li className="cursor-pointer">
                <a href="#projects" className={navLinkStyle}>
                  Projects
                </a>
              </li>
              <li className="cursor-pointer">
                <a href="#contact" className={navLinkStyle}>
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex items-center space-x-8">
            <div id="theme">
              <span
                className="text-2xl cursor-pointer"
                onClick={handleSwitchTheme}
              >
                {theme === "light" ? <FaMoon /> : <FaSun />}
              </span>
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <FaBarsStaggered className="text-2xl cursor-pointer" />
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Menu with Sliding Effect and Cross Icon Inside */}
        <nav
          className={`md:hidden fixed inset-0 dark:bg-black dark:text-white bg-[#f9f9f9] transform ${
            isMenuOpen ? `translate-x-0` : `-translate-x-full`
          } transition-transform duration-300 ease-in-out z-40`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex justify-end p-4">
            <button
              className="text-2xl cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaTimes className="text-2xl cursor-pointer" />
            </button>
          </div>
          <ul className="flex items-center flex-col space-y-10 text-2xl font-medium mt-32">
            <li className="cursor-pointer">
              <a href="#home" className={navLinkStyle}>
                Home
              </a>
            </li>
            <li className="cursor-pointer">
              <a href="#about" className={navLinkStyle}>
                About
              </a>
            </li>
            <li className="cursor-pointer">
              <a href="#projects" className={navLinkStyle}>
                Projects
              </a>
            </li>
            <li className="cursor-pointer">
              <a href="#contact" className={navLinkStyle}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Home Section */}
      <section
        id="home"
        className="py-16 dark:bg-black bg-[#f9f9f9] dark:border-b-2 border-gray-700"
      >
        <div className="min-h-screen flex flex-col justify-center items-center px-4 py-6 md:px-8">
          <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-10 md:gap-20">
            {/* Text Section */}
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold dark:text-white text-[#2d2e32]">
                Front-End React <br /> Developer{" "}
                <span className="wave-hand">👋</span>
              </h1>
              <p className="text-md font-medium mt-4 max-w-md dark:text-gray-400 text-[#555]">
                Hi, I'm Satyam Mishra. A passionate Front-end React Developer
                from India. 📍
              </p>
              <div className="flex items-center gap-4 mt-6 justify-center md:justify-start">
                <a
                  href="https://github.com/satyam1007"
                  target="_blank"
                  className="text-3xl dark:text-gray-400 text-gray-700 hover:text-black hover:scale-110 duration-200"
                >
                  <FaGithubSquare />
                </a>
                <a
                  href="#"
                  className="text-3xl text-blue-600 hover:text-blue-800 hover:scale-110 duration-200"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>

            {/* Image Section */}
            <div className="mt-14 md:mt-0 duration-700">
              <div id="profile-img"></div>
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-24">
            <p className="font-normal text-lg dark:text-gray-400 text-[#2d2e32] border-b-2 md:border-b-0 border-gray-500">
              Tech Stack{" "}
              <span className="md:border-r-2 border-gray-700 md:pr-4"></span>
            </p>
            <ul className="flex justify-center items-center space-x-4 md:pl-8">
              <li>
                <img src="/html-logo.svg" alt="HTML" className={skillsIcons} />
              </li>
              <li>
                <img src="/css-logo.svg" alt="CSS" className={skillsIcons} />
              </li>
              <li>
                <img
                  src="/javascript-logo.svg"
                  alt="JavaScript"
                  className={skillsIcons}
                />
              </li>
              <li>
                <img
                  src="/typescript-logo.svg"
                  alt="TypeScript"
                  className={skillsIcons}
                />
              </li>
              <li>
                <img
                  src="/react-logo.svg"
                  alt="React"
                  className={skillsIcons}
                />
              </li>
              <li>
                <img
                  src="/tailwind.svg"
                  alt="Tailwind CSS"
                  className={skillsIcons}
                />
              </li>
              <li>
                <img src="/sql.svg" alt="SQL" className={skillsIcons} />
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section
        className="px-4 dark:bg-black bg-white sm:px-8 md:px-16 lg:px-32 lg:pt-16 lg:pb-28 dark:border-b-2 border-gray-700"
        id="about"
      >
        <div className="relative flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10 lg:space-x-20 p-4 sm:p-6">
          <div className="relative flex-shrink-0">
            <img
              src="https://www.stefantopalovic.com/static/media/about-img.62b47e7f183d4b4e9feb.webp"
              alt="mee"
              className={imagesStyles}
            />
            <span className="hidden md:block absolute bottom-0 right-0 transform translate-x-[30%] translate-y-[30%] bg-white rounded-full">
              <img
                src="https://www.stefantopalovic.com/static/media/text2.3d5aa6ba2d0632bb4e0572631c3f9dc2.svg"
                alt="text"
                className="w-24 sm:w-28 md:w-32 lg:w-48 h-auto relative"
                id="dev-img-rotate"
              />
              <img
                src="https://www.stefantopalovic.com/static/media/working-emoji.c5325f52b5be329995a5.png"
                alt="work-emoji"
                className="absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] w-10 sm:w-12 md:w-14 lg:w-16 h-10 sm:h-12 md:h-14 lg:h-16"
              />
            </span>
          </div>
          <div className="text-center md:text-left pt-8">
            <h1 className="text-md md:text-lg font-bold text-[#147efb]">
              ABOUT ME
            </h1>
            <h2 className="text-xl sm:text-2xl dark:text-white text-[#2d2e32] font-bold tracking-wide leading-snug mt-2">
              Front-end Developer based <br /> in India, Hisar 📍
            </h2>
            <div className="text-[#767676] dark:text-gray-400">
              <p className="mt-4 text-[14px] sm:text-[15px]">
                Hey, my name is Satyam Mishra, and I'm a Frontend Developer. My
                passion is to create and develop a clean UI/UX for my users.
              </p>
              <p className="mt-6 text-[14px] sm:text-[15px]">
                My main stack currently is React/Javascript in combination with
                Tailwind CSS and TypeScript.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Projects Section */}
      <section
        className="px-4 sm:px-8 md:px-16 lg:px-32 lg:py-20 bg-[#f9f9f9] dark:bg-black dark:border-b-2 border-gray-700"
        id="projects"
      >
        <div className="py-10 text-center">
          <h1 className="text-md md:text-lg font-bold text-[#147efb]">
            PORTFOLIO
          </h1>
          <h2 className="text-xl font-bold py-2 dark:text-white">
            Each project is a unique piece of development 🧩
          </h2>
        </div>

        <div className={projectStructures}>
          <div className="relative flex-shrink-0">
            <img
              src="/weather-app.png"
              alt="weather-img"
              className={imagesStyles}
            />
          </div>
          <div className="text-center md:text-left flex flex-col justify-center items-center md:items-start gap-6">
            <h3 className={projectTitles}>
              WEATHER APP{" "}
              <img
                src="https://cdn-icons-png.flaticon.com/512/1779/1779940.png"
                alt="weather-icon"
                width={30}
                className="inline"
              />
            </h3>
            <p className={projectDescriptions}>
              Discover weather conditions in real-time with this visually
              stunning Weather App, crafted with React.js, Vite, and Tailwind
              CSS.
            </p>
            <div className={projectLinkStyles}>
              <a
                href="https://github.com/satyam1007/WeatherApp"
                className="flex items-center gap-2 font-semibold"
              >
                <FaGithubSquare className="text-2xl" /> Code
              </a>
              <a
                href="https://weather-app-lac-three-29.vercel.app/"
                className="flex items-center gap-2 font-semibold"
              >
                <HiMiniViewfinderCircle className="text-2xl" /> Live Demo
              </a>
            </div>
          </div>
        </div>

        <div className={projectStructures}>
          <div className="text-center md:text-left flex flex-col justify-center items-center md:items-start gap-6">
            <h3 className={projectTitles}>
              QUIZ APP
              <img
                src="https://cdn-icons-png.flaticon.com/512/2641/2641457.png"
                alt="quiz-icon"
                width={30}
                className="inline"
              />
            </h3>
            <p className={projectDescriptions}>
              I've built a quiz app with React props and Tailwind CSS, featuring
              a responsive design and interactive coding questions across
              multiple levels.
            </p>
            <div className={projectLinkStyles}>
              <a
                href="https://github.com/satyam1007/QuizApp"
                className="flex items-center gap-2 font-semibold"
              >
                <FaGithubSquare className="text-2xl" /> Code
              </a>
              <a
                href="https://quiz-app-eight-tawny-71.vercel.app/"
                className="flex items-center gap-2 font-semibold"
              >
                <HiMiniViewfinderCircle className="text-2xl" /> Live Demo
              </a>
            </div>
          </div>
          <div className="relative flex-shrink-0">
            <img src="/quiz-app.png" alt="quiz-img" className={imagesStyles} />
          </div>
        </div>

        <div className={projectStructures}>
          <div className="relative flex-shrink-0">
            <img
              src="/digital-clock.png"
              alt="digital-clock-img"
              className={imagesStyles}
            />
          </div>
          <div className="text-center md:text-left flex flex-col justify-center items-center md:items-start gap-6">
            <h3 className={projectTitles}>
              DIGITAL CLOCK{" "}
              <img
                src="https://cdn-icons-png.flaticon.com/512/1404/1404164.png"
                alt="digital-clock-icon"
                width={30}
                className="inline"
              />
            </h3>
            <p className={projectDescriptions}>
              "I’ve built a digital clock with React and Tailwind CSS that shows
              real-time updates with a sleek, modern design."
            </p>
            <div className={projectLinkStyles}>
              <a
                href="https://github.com/satyam1007/digitalClock"
                className="flex items-center gap-2 font-semibold"
              >
                <FaGithubSquare className="text-2xl" /> Code
              </a>
              <a
                href="https://digital-clock-bice-three.vercel.app/"
                className="flex items-center gap-2 font-semibold"
              >
                <HiMiniViewfinderCircle className="text-2xl" /> Live Demo
              </a>
            </div>
          </div>
        </div>

        <div className={projectStructures}>
          <div className="text-center md:text-left flex flex-col justify-center items-center md:items-start gap-6">
            <h3 className={projectTitles}>
              STOPWATCH
              <img
                src="https://cdn-icons-png.flaticon.com/512/8671/8671450.png"
                alt="stopwatch-icon"
                width={30}
                className="inline"
              />
            </h3>
            <p className={projectDescriptions}>
              "I've developed a stopwatch using React and Tailwind CSS,
              featuring start, stop, and reset functionalities with a clean and
              intuitive interface."
            </p>
            <div className={projectLinkStyles}>
              <a
                href="https://github.com/satyam1007/stopWatch"
                className="flex items-center gap-2 font-semibold"
              >
                <FaGithubSquare className="text-2xl" /> Code
              </a>
              <a
                href="https://stop-watch-rho-beryl.vercel.app/"
                className="flex items-center gap-2 font-semibold"
              >
                <HiMiniViewfinderCircle className="text-2xl" /> Live Demo
              </a>
            </div>
          </div>
          <div className="relative flex-shrink-0">
            <img
              src="/stopwatch.png"
              alt="stopwatch-img"
              className={imagesStyles}
            />
          </div>
        </div>

        <div className={projectStructures}>
          <div className="relative flex-shrink-0">
            <img
              src="/vertual-keyboard.png"
              alt="vertual-keyboard-img"
              className={imagesStyles}
            />
          </div>
          <div className="text-center md:text-left flex flex-col justify-center items-center md:items-start gap-6">
            <h3 className={projectTitles}>
              VERTAUL KEYBOARD
              <img
                src="https://cdn2.iconfinder.com/data/icons/metro-uinvert-dock/256/On_Screen_Keyboard.png"
                alt="vertual-keyboard-icon"
                width={30}
                className="inline"
              />
            </h3>
            <p className={projectDescriptions}>
              "I’ve created a virtual keyboard with React and Tailwind CSS,
              offering a fully interactive and responsive design for enhanced
              typing experiences."
            </p>
            <div className={projectLinkStyles}>
              <a
                href="https://github.com/satyam1007/vertualKeyboard"
                className="flex items-center gap-2 font-semibold"
              >
                <FaGithubSquare className="text-2xl" /> Code
              </a>
              <a
                href="https://vertual-keyboard-rho.vercel.app/"
                className="flex items-center gap-2 font-semibold"
              >
                <HiMiniViewfinderCircle className="text-2xl" /> Live Demo
              </a>
            </div>
          </div>
        </div>

        <div className={projectStructures}>
          <div className="text-center md:text-left flex flex-col justify-center items-center md:items-start gap-6">
            <h3 className={projectTitles}>
              GITHUB
              <img
                src="https://repository-images.githubusercontent.com/289382429/e9c6ec80-8902-11eb-9f55-5de819da8bf5"
                alt="github-icon"
                width={50}
                className="inline rounded"
              />
            </h3>
            <p className={projectDescriptions}>
              "I’ve built a GitHub clone using React and Tailwind CSS, providing
              a user-friendly interface for browsing repositories, profiles, and
              commits, with real-time updates and interactive features."
            </p>
            <div className={projectLinkStyles}>
              <a
                href="https://github.com/satyam1007/react-search-github-profile"
                className="flex items-center gap-2 font-semibold"
              >
                <FaGithubSquare className="text-2xl" /> Code
              </a>
              <a
                href="https://react-search-github-profile.vercel.app/"
                className="flex items-center gap-2 font-semibold"
              >
                <HiMiniViewfinderCircle className="text-2xl" /> Live Demo
              </a>
            </div>
          </div>
          <div className="relative flex-shrink-0">
            <img
              src="/github-clone.png"
              alt="github-clone-img"
              className={imagesStyles}
            />
          </div>
        </div>

        <div className={projectStructures}>
          <div className="relative flex-shrink-0">
            <img
              src="/weather-app-2.png"
              alt="weather-app-2-img"
              className={imagesStyles}
            />
          </div>
          <div className="text-center md:text-left flex flex-col justify-center items-center md:items-start gap-6">
            <h3 className={projectTitles}>
              WEATHER APP
              <img
                src="https://cdn-icons-png.flaticon.com/512/1779/1779940.png"
                alt="weather-app-icon"
                width={30}
                className="inline"
              />
            </h3>
            <p className="text-[#767676] dark:text-gray-300 text-[14px] sm:text-[17px] font-medium leading-relaxed">
              "I’ve developed a weather app using React with Context API and
              useParams, featuring real-time weather updates and a user-friendly
              interface for displaying weather information based on location."
            </p>
            <div className={projectLinkStyles}>
              <a
                href="https://github.com/satyam1007/react-weather-app"
                className="flex items-center gap-2 font-semibold"
              >
                <FaGithubSquare className="text-2xl" /> Code
              </a>
              <a
                href="https://react-weather-app-beta-fawn.vercel.app/"
                className="flex items-center gap-2 font-semibold"
              >
                <HiMiniViewfinderCircle className="text-2xl" /> Live Demo
              </a>
            </div>
          </div>
        </div>

        <div className={projectStructures}>
          <div className="text-center md:text-left flex flex-col justify-center items-center md:items-start gap-6">
            <h3 className={projectTitles}>
              TODO APP
              <img
                src="https://cdn-icons-png.freepik.com/256/8476/8476658.png?semt=ais_hybrid"
                alt="github-icon"
                width={50}
                className="inline rounded"
              />
            </h3>
            <p className={projectDescriptions}>
              "I’ve created a to-do app with React and Tailwind CSS that allows
              users to manage tasks efficiently, featuring a clean design and
              intuitive task management.
            </p>
            <div className={projectLinkStyles}>
              <a
                href="https://github.com/satyam1007/react-todo-app"
                className="flex items-center gap-2 font-semibold"
              >
                <FaGithubSquare className="text-2xl" /> Code
              </a>
              <a
                href="https://react-todo-app-eight-mu.vercel.app/"
                className="flex items-center gap-2 font-semibold"
              >
                <HiMiniViewfinderCircle className="text-2xl" /> Live Demo
              </a>
            </div>
          </div>
          <div className="relative flex-shrink-0">
            <img
              src="/todo-app.png"
              alt="todo-app-img"
              className={imagesStyles}
            />
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section
        className="bg-white dark:bg-black py-36 px-4 sm:px-6 lg:px-8"
        id="contact"
      >
        <div className="text-center mb-8">
          <h1 className="text-xl font-semibold text-[#147efb]">Contact</h1>
          <h2 className="text-3xl font-bold mt-2 mb-4 dark:text-white">
            Don't be shy! Hit me up! 👇
          </h2>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 p-4 dark:bg-gray-600 bg-white rounded-lg shadow-lg w-full max-w-xs md:max-w-md">
            <span className="bg-white rounded-full p-3 shadow-lg text-red-600 flex items-center justify-center">
              <img
                src="/location.svg"
                alt="contact-location"
                className="w-8 h-8"
              />
            </span>
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg">Location</h3>
              <p className="text-gray-600 dark:text-gray-200">Haryana, Hisar</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 p-4 dark:bg-gray-600 bg-white rounded-lg shadow-lg w-full max-w-xs md:max-w-md">
            <span className="bg-white rounded-full p-3 shadow-lg flex items-center justify-center">
              <img src="/gmail.svg" alt="gmail-svg" className="w-8 h-8" />
            </span>
            <div className="text-center md:text-left">
              <h3 className="font-bold text-lg">Mail</h3>
              <p className="text-gray-600 dark:text-gray-200">
                satyammishradeveloper@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-[#2d2e32] text-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h3 className="text-sm md:text-base mb-4">
            Copyright © 2024. All rights are reserved
          </h3>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/satyam1007"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-gray-100 hover:scale-110 duration-200"
            >
              <FaGithubSquare />
            </a>
            <a
              href="#"
              className="text-3xl text-blue-100 hover:scale-110 duration-200"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Portfolio;
