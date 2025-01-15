import React, { useState, useEffect, useLayoutEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";

import logo from "./images/sarah-portfolio-icon.svg";
import arrowDown from "./images/down-arrow_15093084.svg";
import one from "./images/1.webp";
import two from "./images/2.webp";
import three from "./images/3.webp";
import four from "./images/4.webp";
import five from "./images/5.webp";
import six from "./images/6.webp";

import "./Mobile.css";

function Mobile() {
  const transictionOne = useRef(null);
  const oneRef = useRef(null);
  const twoRef = useRef(null);
  const threeRef = useRef(null);
  const fourRef = useRef(null);
  const fiveRef = useRef(null);
  const sixRef = useRef(null);
  const galleryMobile = useRef(null);
  const [isOpened, setIsOpened] = useState(false);

  const toggleMenu = () => {
    setIsOpened((prevState) => !prevState); // Toggle the state
  };

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  gsap.registerPlugin(
    ScrollTrigger,
    ScrollToPlugin,
    ScrollSmoother,
    ScrambleTextPlugin,
    SplitText
  );

  useEffect(() => {
    let smootherMobile = ScrollSmoother.create({
      smooth: 1,
      effects: true,
      smoothTouch: 0.1,
      speed: 0.5,
    });

    gsap.utils.toArray("a").forEach(function (button) {
      button.addEventListener("click", (e) => {
        const anchor = e.target.closest("a"); // Get the closest anchor element
        const href = anchor.getAttribute("href"); // Get the href value

        if (href && href.startsWith("#")) {
          e.preventDefault(); // Prevent default browser action for hash links
          console.log(href);
          const targetElement = document.querySelector(href); // Get the target element
          if (targetElement) {
            // Smooth scroll to the target element
            smootherMobile.scrollTo(targetElement, true, "top top");

            // Properly construct the relative URL, ensuring no stacking
            const relativePath = `${window.location.pathname
              .split("/")
              .slice(0, -1)
              .join("/")}${href.replace("#", "/")}`;
            window.history.pushState(null, "", relativePath);
          }
        }
      });
    });

    window.onload = () => {
      // Check if the URL ends with a section path
      const sectionPath = window.location.pathname.split("/").pop();
      if (sectionPath && sectionPath !== "") {
        const rootPath =
          window.location.pathname.split("/").slice(0, -1).join("/") || "/";
        window.history.replaceState(null, "", rootPath); // Update URL to the root
      }
      const sectionElement = document.querySelector(`#${sectionPath}`);
      if (sectionElement) {
        smootherMobile.scrollTo(sectionElement, true, "top top");
      }
    };

    return () => {};
  }, []);

  useLayoutEffect(() => {
    // Heartbeat animation for the logo loader
    const heartbeat = gsap.to(".logo-loader", {
      scale: 0.8,
      duration: 0.5,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      paused: true, // Initially paused
    });

    // Reference to ScrollSmoother instance (if used)
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.paused(true); // Pause ScrollSmoother

    // Prevent scrolling on body
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";

    // GSAP preloader timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 1 },
        onStart: () => heartbeat.play(), // Start heartbeat pulsation
        onComplete: () => {
          document.body.style.overflow = ""; // Restore scrolling
          document.body.style.position = ""; // Reset position
          if (smoother) smoother.paused(false); // Resume ScrollSmoother
        },
      });
      tl.fromTo(
        ".logo-loader",
        { scale: 1, opacity: 1 },
        { scale: 0.33, ease: "power2.inOut", opacity: 0, duration: 1, delay: 3 }
      )
        .call(() => heartbeat.kill()) // Kill the heartbeat animation
        .fromTo(".loader", { opacity: 1 }, { display: "none", opacity: 0 });

      const loopTl = gsap.timeline({ repeat: -1 }); // Loop indefinitely
      loopTl
        .fromTo(
          ".myName-mobile h2:nth-child(1)",
          { opacity: 0 },
          { opacity: 1, duration: 0.5 }
        )
        .to(".myName-mobile h2:nth-child(1)", { opacity: 0, duration: 0.5 })
        .fromTo(
          ".myName-mobile h2:nth-child(2)",
          { opacity: 0 },
          { opacity: 1, duration: 0.5 }
        )
        .to(".myName-mobile h2:nth-child(2)", { opacity: 0, duration: 0.5 })
        .fromTo(
          ".myName-mobile h2:nth-child(3)",
          { opacity: 0 },
          { opacity: 1, duration: 0.5 }
        )
        .to(".myName-mobile h2:nth-child(3)", { opacity: 0, duration: 0.5 })
        .fromTo(
          ".myName-mobile h2:nth-child(4)",
          { opacity: 0 },
          { opacity: 1, duration: 0.5 }
        )
        .to(".myName-mobile h2:nth-child(4)", { opacity: 0, duration: 0.5 })
        .fromTo(
          ".myName-mobile h2:nth-child(5)",
          { opacity: 0 },
          { opacity: 1, duration: 0.5 }
        )
        .to(".myName-mobile h2:nth-child(5)", { opacity: 0, duration: 0.5 });
    });

    return () => {
      ctx.revert(); // Revert GSAP animations
      heartbeat.kill(); // Ensure heartbeat is killed on unmount
      document.body.style.overflow = ""; // Reset body styles
      document.body.style.position = "";
      if (smoother) smoother.paused(false); // Resume ScrollSmoother if component unmounts
    };
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-mobile",
          start: "top top",
          pinSpacing: false,
          pin: true,
          scrub: 0.5,
          toggleActions: "play none none reverse",
        },
        defaults: {
          duration: 0.5,
        },
      });
      tl.fromTo(".about-description-mobile", { opacity: 1 }, { opacity: 0 })
        .fromTo(
          oneRef.current,
          { visibility: "hidden", opacity: 0 },
          { visibility: "visible", opacity: 1 },
          "<0.5"
        )
        .fromTo(
          twoRef.current,
          { visibility: "hidden", opacity: 0 },
          { visibility: "visible", opacity: 1 },
          "<0.75"
        )

        .fromTo(
          threeRef.current,
          { visibility: "hidden", opacity: 0 },
          { visibility: "visible", opacity: 1 },
          "<0.75"
        )

        .fromTo(
          fourRef.current,
          { visibility: "hidden", opacity: 0 },
          { visibility: "visible", opacity: 1 },
          "<0.75"
        )

        .fromTo(
          fiveRef.current,
          { visibility: "hidden", opacity: 0 },
          { visibility: "visible", opacity: 1 },
          "<0.75"
        )

        .fromTo(
          sixRef.current,
          { visibility: "hidden", opacity: 0 },
          { visibility: "visible", opacity: 1 },
          "<0.75"
        );
    }, galleryMobile);
    return () => ctx.revert();
  }, []);

  return (
    <div id="smooth-wrapper">
      <div className="loader">
        <div className="logo-loader">
          <img src={logo} id="loader-image" alt=""></img>
        </div>
      </div>
      <div className="fixed-header">
        <div className="logo-mobile">
          <button
            onClick={() => window.location.reload()}
            aria-label="Reload Page"
          >
            <img src={logo} alt="Company Logo" />
          </button>
        </div>

        <button
          className={`menu ${isOpened ? "opened" : ""}`}
          onClick={toggleMenu}
          aria-expanded={isOpened}
          aria-label="Main Menu"
        >
          <svg width="100" height="100" viewBox="0 0 100 100">
            <path
              className="line line1"
              d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
            />
            <path className="line line2" d="M 20,50 H 80" />
            <path
              className="line line3"
              d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
            />
          </svg>
        </button>
      </div>

      <div className={`side-menu ${isOpened ? "show" : ""}`}>
        <div className="side-menu-list">
          <a href="#home" onClick={() => setIsOpened(false)}>
            HOME
          </a>
          <a href="#about" onClick={() => setIsOpened(false)}>
            ABOUT ME
          </a>
          <a href="#work" onClick={() => setIsOpened(false)}>
            WORK
          </a>
          <a href="#contact" onClick={() => setIsOpened(false)}>
            CONTACT
          </a>
        </div>
      </div>
      <div id="smooth-content">
        <header className="hero" id="home" ref={transictionOne}>
          <div className="sticky-hero">
            <div className="myName-mobile">
              <h2>S</h2>
              <h2>A</h2>
              <h2>R</h2>
              <h2>A</h2>
              <h2>H</h2>
            </div>
            <div className="static-name">
              <h1>
                <span>S</span>
                <span>A</span>
                <span>R</span>
                <span>A</span>
                <span>H</span>
              </h1>
            </div>
            <div className="arrow-down">
              <img src={arrowDown} alt=""></img>
            </div>
          </div>
        </header>

        <main>
          <div className="about-mobile" id="about" ref={galleryMobile}>
            <div className="about-sticky">
              <div className="about-description-mobile">
                <p>
                  I’m
                  <span> S</span>
                  <span>a</span>
                  <span>r</span>
                  <span>a</span>
                  <span>h</span>,
                  <br />a <span className="one">Senior Designer</span>
                  <br />
                  with over <span className="two">5 </span>
                  <span className="three">years </span>
                  <span className="four">of </span>
                  <span className="five">experience</span>, i like the
                  <br />
                  idea of{" "}
                  <span className="six">
                    show
                    <br />
                    more
                  </span>{" "}
                  <span className="seven">read less</span>,
                  <br />
                  <span className="eight">
                    where visual creativity
                    <br /> stands for the main
                    <br /> value of my work.
                  </span>
                </p>
              </div>
              <img
                ref={oneRef}
                src={one}
                alt="Animated Element"
                className="img-one-mobile"
              />
              <img
                ref={twoRef}
                src={two}
                alt="Animated Element"
                className="img-two-mobile"
              />
              <img
                ref={threeRef}
                src={three}
                alt="Animated Element"
                className="img-three-mobile"
              />
              <img
                ref={fourRef}
                src={four}
                alt="Animated Element"
                className="img-four-mobile"
              />
              <img
                ref={fiveRef}
                src={five}
                alt="Animated Element"
                className="img-five-mobile"
              />
              <img
                ref={sixRef}
                src={six}
                alt="Animated Element"
                className="img-six-mobile"
              />
            </div>
          </div>

          <div className="work-mobile" id="work">
            <div className="work-title">
              <p>
                MY WORKS <br />
                <span>PRESS ANY</span>
              </p>
            </div>
            <div className="work-list">
              <a
                href="https://www.behance.net/gallery/215975463/ESTEVES-CORRETORA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="work-list-one"></div>
              </a>
              <a
                href="https://www.behance.net/gallery/215978025/OCEAN-CLUB-TABULEIRO"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="work-list-two"></div>
              </a>
              <a
                href="https://www.behance.net/gallery/215976293/ATHARAX"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="work-list-three"></div>
              </a>
              <a
                href="https://www.behance.net/gallery/199036633/ORGANICOS-HP"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="work-list-four"></div>
              </a>
            </div>
            <div className="work-more">
              <a
                href="https://www.behance.net/sarahdasilveira"
                target="_blank"
                rel="noopener noreferrer"
              >
                SEE MORE
              </a>
            </div>
          </div>

          <footer id="contact" className="footer">
            <div className="footer-name">
              <h1>
                <span>S</span>
                <span>A</span>
                <span>R</span>
                <span>A</span>
                <span>H</span>
              </h1>
            </div>
            <div className="socials-mobile">
              <a
                href="https://www.behance.net/sarahdasilveira"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="behance-mobile">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox="0 0 24 24"
                    width="75"
                    height="75"
                    className="behance-svg-mobile"
                  >
                    <g>
                      <path d="M9.579,9.573C9.579,8.625,8.845,8.4,8.03,8.4H5.909v2.4h2.287C9.005,10.8,9.579,10.446,9.579,9.573z" />
                      <path d="M16.666,10.816c-0.98,0-1.634,0.611-1.698,1.591H18.3C18.209,11.416,17.695,10.816,16.666,10.816z" />
                      <path d="M8.368,12.509H5.904v2.834H8.32c0.922,0,1.672-0.327,1.672-1.361C9.991,12.927,9.364,12.514,8.368,12.509z" />
                      <path d="M19.75,0.3H4.25C1.9,0.3,0,2.2,0,4.55V19.45C0,21.8,1.9,23.7,4.25,23.7h15.5c2.35,0,4.25-1.9,4.25-4.25V4.55   C24,2.2,22.1,0.3,19.75,0.3z M14.555,7.184h4.168v1.012h-4.168V7.184z M8.63,17.1H3.643V6.814h4.848   c1.763,0,3.289,0.498,3.289,2.544c0,1.034-0.482,1.543-1.404,1.982c1.264,0.359,1.875,1.474,1.875,2.765   C12.252,16.195,10.5,17.089,8.63,17.1z M20.341,13.698h-5.368c0,1.189,0.627,1.891,1.827,1.891c0.621,0,1.42-0.332,1.618-0.97   h1.805c-0.557,1.709-1.709,2.507-3.487,2.507c-2.346,0-3.809-1.591-3.809-3.911c0-2.239,1.538-3.942,3.809-3.942   c2.33,0,3.621,1.837,3.621,4.039C20.357,13.441,20.346,13.575,20.341,13.698z" />
                    </g>
                  </svg>
                  <p>BEHANCE</p>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/sarah-da-silveira/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="linkedin-mobile">
                  <svg
                    height="75"
                    viewBox="0 0 176 176"
                    width="75"
                    xmlns="http://www.w3.org/2000/svg"
                    className="linkedin-svg-mobile"
                  >
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="linkedin">
                        <path d="m152 0h-128a24 24 0 0 0 -24 24v128a24 24 0 0 0 24 24h128a24 24 0 0 0 24-24v-128a24 24 0 0 0 -24-24zm-92 139.28a3.71 3.71 0 0 1 -3.71 3.72h-15.81a3.71 3.71 0 0 1 -3.72-3.72v-66.28a3.72 3.72 0 0 1 3.72-3.72h15.81a3.72 3.72 0 0 1 3.71 3.72zm-11.62-76.28a15 15 0 1 1 15-15 15 15 0 0 1 -15 15zm94.26 76.54a3.41 3.41 0 0 1 -3.42 3.42h-17a3.41 3.41 0 0 1 -3.42-3.42v-31.05c0-4.64 1.36-20.32-12.13-20.32-10.45 0-12.58 10.73-13 15.55v35.86a3.42 3.42 0 0 1 -3.37 3.42h-16.42a3.41 3.41 0 0 1 -3.41-3.42v-66.87a3.41 3.41 0 0 1 3.41-3.42h16.42a3.42 3.42 0 0 1 3.42 3.42v5.78c3.88-5.83 9.63-10.31 21.9-10.31 27.18 0 27 25.38 27 39.32z" />
                      </g>
                    </g>
                  </svg>
                  <p>LINKEDIN</p>
                </div>
              </a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default Mobile;
