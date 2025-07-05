import {
  FaArrowUp,
  FaGithub,
  FaInstagramSquare,
  FaLinkedin,
} from "react-icons/fa";
import about from "../assets/DP.jpg";
import { FaBars, FaFacebook, FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import download from "downloadjs";

export function Home() {
  const [navActive, setNavActive] = useState(false);
  const [sticky, SetSticky] = useState(false);
  const [showScroll, SetShowScroll] = useState(false);
  const [counterOn, SetCounterOn] = useState(false);

  const handleScroll = () => {
    if (document.documentElement.scrollTop > 20) {
      SetSticky(true);
      SetShowScroll(true);
    } else {
      SetSticky(false);
      SetShowScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleMenuClick = () => {
    setNavActive(true);
    document.body.style.overflow = "hidden";
  };

  const handleCancelClick = () => {
    setNavActive(false);
    document.body.style.overflow = "auto";
  };

  const handleNavLinkClick = () => {
    setNavActive(false);
    document.body.style.overflow = "auto";
  };

  const Counterskills = () => {
    return (
      <>
        <ScrollTrigger
          onEnter={() => SetCounterOn(true)}
          onExit={() => SetCounterOn(false)}
        >
          <span>
            {counterOn && <CountUp start={0} end={90} duration={1} delay={0} />}
          </span>
        </ScrollTrigger>
      </>
    );
  };

  const Countersnode = () => {
    return (
      <>
        <span>
          <CountUp start={0} end={85} duration={1} delay={0} />
        </span>
      </>
    );
  };

  const PDF_URL = "http://localhost:5173/Kavin Kumar_CV_.pdf";

  // const resumeDownload = (url) => {
  //   const fileName = url.split("/").pop();
  //   const aTag = document.createElement("a");
  //   aTag.href = url;
  //   aTag.setAttribute("download", fileName);
  //   document.body.appendChild(aTag);
  //   aTag.click();
  //   aTag.remove();
  // };

  const downloadCV = async () => {
    const url = `https://www.googleapis.com/drive/v3/files/18iqEleiqc_MdfT278McQD9tSwxEz2pDQJVcPijR3QMs/export?key=AIzaSyAvOvppum3RYo-Zu9V6Btd3jyA-0-H_YLM`;

    const response = await axios.get(url, {
      responseType: "blob",
      params: { mimetype: "application/pdf" },
    });

    try {
      download(response.data, "Kavin kumar_CV.pdf", "application/pdf");
    } catch (error) {
      console.log("error getting file");
    }
  };

  function getTotalYearsAndMonthsFromSept2022() {
    const start = new Date(2022, 8); // September is month 8 (0-indexed)
    const now = new Date();

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return { years, months };
  }

  const duration = getTotalYearsAndMonthsFromSept2022();

  return (
    <>
      <div
        className="scroll-button"
        style={{ pointerEvents: navActive ? "none" : "auto" }}
      >
        <a href="#home" style={{ display: showScroll ? "block" : "none" }}>
          <FaArrowUp />
        </a>
      </div>
      <nav className={sticky ? "sticky" : ""}>
        <div
          className={`navbar flex justify-between items-center m-auto w-[90%] ${
            navActive ? "active" : ""
          }`}
        >
          <div className="logo">
            <a href="#" className="text-[#4070f4]">
              Portfolio.
            </a>
          </div>
          <ul className="menu flex relative">
            <li className="mx-4">
              <a href="#home" onClick={handleNavLinkClick}>
                Home
              </a>
            </li>
            <li className="mx-4">
              <a href="#about" onClick={handleNavLinkClick}>
                About
              </a>
            </li>
            <li className="mx-4">
              <a href="#skills" onClick={handleNavLinkClick}>
                Skills
              </a>
            </li>
            <li className="mx-4">
              <a href="#services" onClick={handleNavLinkClick}>
                Services
              </a>
            </li>
            <li className="mx-4">
              <a href="#contact" onClick={handleNavLinkClick}>
                Contact
              </a>
            </li>
            <div className="cancel-btn" onClick={handleCancelClick}>
              <FaXmark />
            </div>
          </ul>
          <div className="flex items-center">
            <a
              href="https://www.linkedin.com/in/kavin-kumar-5b7763275/"
              target="_blank"
            >
              <FaLinkedin className="mx-2 text-3xl text-blue-600" />
            </a>

            <a href="https://www.instagram.com/kavin_lefty/" target="_blank">
              <FaInstagramSquare className="mx-2 text-3xl text-pink-600" />
            </a>
            <a href="https://github.com/kavin-lefty" target="_blank">
              <FaGithub className="mx-2 text-3xl" />
            </a>
          </div>
          <div
            className="menu-btn text-[#4070f4]"
            onClick={handleMenuClick}
            style={{
              opacity: navActive ? 0 : 1,
              pointerEvents: navActive ? "none" : "auto",
            }}
          >
            <FaBars />
          </div>
        </div>
        {/* <div
          className="menu-btn text-[#4070f4]"
          onClick={handleMenuClick}
          style={{
            opacity: navActive ? 0 : 1,
            pointerEvents: navActive ? "none" : "auto",
          }}
        >
          <FaBars />
        </div> */}
      </nav>

      <section className="home h-screen w-full bg-[#f0f8ff]" id="home">
        <div className="home-content w-[90%] h-full flex flex-col justify-center m-auto">
          <div className="text">
            <div className="text-one text-2xl text-[#0E2431]">Hello,</div>
            <div className="text-two text-[#0E2431] text-8xl font-extrabold">
              I'm Kavin Kumar
            </div>
            <div className="text-three text-[#4070f4] my-4 text-5xl">
              MERN Stack Developer
            </div>
            <div className="text-four text-2xl text-[#0E2431] my-2">
              From Chennai
            </div>
          </div>
          <div className="button my-8">
            <button className="hover:border-[#4070f4] hover:bg-[#fff] hover:text-[#4070f4]">
              <a href="mailto:kavinkumarsksi@gmail.com"> Hire Me</a>
            </button>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="content">
          <div className="title flex justify-center mb-10">
            <span>About Me</span>
          </div>
          <div className="about-details flex justify-between items-center">
            <div className="left">
              <img src={about} alt="" />
            </div>
            <div className="right">
              <div className="topic">Development Is My Passion</div>
              <p className="text-justify text-[#E2431]">
                I'm a skilled MERN stack developer specializing in crafting
                dynamic web applications. Proficient in React.js, Node.js,
                Express.js, and MongoDB, Bootstrap, JQuery, TailwindCSS, I excel
                in creating robust solutions that exceed expectations. With a
                commitment to quality code and a problem-solving mindset, I
                thrive in collaborative environments where I can contribute and
                learn. Let's connect to explore opportunities and collaborate on
                exciting projects.
              </p>
              <div className="button my-4">
                <button className="hover:border-[#4070f4] hover:bg-[#fff] hover:text-[#4070f4]">
                  <a href="src/assets/Kavin%20Kumar_CV_.pdf" target="_blank">
                    {" "}
                    Download CV
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="skills bg-[#f0f8ff]" id="skills">
        <div className="content py-8">
          <div className="title flex justify-center mb-10">
            <span>My Skills</span>
          </div>
          <div className="skills-details flex justify-between items-center">
            <div className="text w-2/4">
              <div className="topic">Skills Reflects Our Knowledge</div>
              <p className="text-justify text-[#0E2431]">
                React.js, Node.js, MongoDB, Express.js, Javascript, TypeScript,
                TailwindCSS, Git, RESTfull API's, Collaboration. These skills
                enable Me to create robust, efficient, and scalable web
                applications from start to finish.
              </p>
              <div className="experience flex items-center mx-2.5">
                <div className="num text-[#0E2431] flex items-center space-x-2">
                  <span className="text-8xl">{duration?.years}</span>
                  <span className="text-3xl">Years</span>
                </div>
                <div className="exp text-[#0E2431] ml-5 mx-2 text-lg font-medium flex items-center">
                  <span className="text-8xl">{duration?.months}</span>
                  <span>
                    months Of <br />
                    Experience
                  </span>
                </div>
              </div>
            </div>
            <div className="boxes w-[45%] flex flex-wrap justify-between">
              <div className="box">
                <div className="topic text-[#4070f4] text-xl">React.Js</div>
                <div className="per text-[#4070f4] text-6xl flex">
                  <Counterskills />%
                </div>
              </div>
              <div className="box">
                <div className="topic text-[#4070f4] text-xl">Node.Js</div>
                <div className="per text-[#4070f4] text-6xl flex">
                  <Countersnode />%
                </div>
              </div>
              <div className="box">
                <div className="topic text-[#4070f4] text-xl">MongoDb</div>
                <div className="per text-[#4070f4] text-6xl flex">
                  <Counterskills />%
                </div>
              </div>
              <div className="box">
                <div className="topic text-[#4070f4] text-xl">Express.Js</div>
                <div className="per text-[#4070f4] text-6xl flex">
                  <Countersnode />%
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="content">
          <div className="title flex justify-center mb-10">
            <span>My Projects</span>
          </div>
          <div className="boxes">
            <div className="box">
              <div className="icon">
                <i className="fas fa-desktop"></i>
              </div>
              <div className="topic">What's app Web </div>
              <p className="text-lg">Tools Used: HTML and CSS</p>
            </div>
            <div className="box">
              <div className="icon">
                <i className="fas fa-paint-brush"></i>
              </div>
              <div className="topic">Event Management</div>
              <p className="text-lg">
                Tools used: HTML, CSS, Javascript(ES6+), Bootstrap
              </p>
            </div>
            <div className="box">
              <div className="icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="topic">Olsortz</div>
              <p className="text-lg">Tools used: React.js and TailwindCSS</p>
            </div>
            <div className="box">
              <div className="icon">
                <i className="fab fa-android"></i>
              </div>
              <div className="topic">Certificate Generator</div>
              <p className="text-lg">
                Tools used: React.js, Node.js, MongoDB, Express.js, TailwindCSS
              </p>
            </div>
            <div className="box">
              <div className="icon">
                <i className="fas fa-camera-retro"></i>
              </div>
              <div className="topic">Job portal</div>
              <p className="text-lg">
                Tools used: React.js, Node.js, MongoDB, Express.js, TailwindCSS
              </p>
            </div>
            <div className="box">
              <div className="icon">
                <i className="fas fa-tablet-alt"></i>
              </div>
              <div className="topic">ECommerce</div>
              <p className="text-lg">Tools used: Flutter and Node.js</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="content">
          <div className="title flex justify-center mb-10">
            <span>Contact Me</span>
          </div>
          <div className="text">
            <div className="topic">Have Any Project?</div>
            <p className="text-justify">
              I'd love to hear from you! Whether you have a question, a project
              idea, or just want to say hello, feel free to reach out. I'm
              always open to discussing new opportunities, collaborative
              projects, or any interesting challenges you might have. Drop me a
              line and I'll get back to you as soon as possible!
            </p>
            <div className="button my-8">
              <button className="hover:border-[#4070f4] hover:bg-[#fff] hover:text-[#4070f4]">
                <a
                  href="https://api.whatsapp.com/send/?phone=+918012142585&text&type=phone_number&app_absent=0"
                  target="_blank"
                >
                  {" "}
                  Let's Chat
                </a>
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="text">
          <span>
            Created By <a href="#">KK</a> | &#169; 2023 All Rights Reserved
          </span>
        </div>
      </footer>
    </>
  );
}
