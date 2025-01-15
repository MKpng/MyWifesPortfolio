import React, { useEffect, useLayoutEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";
import { Observer } from "gsap/Observer";

import "./Hero.css";
import vamp from "./images/vamp-frase.webp";
import logo from "./images/sarah-portfolio-icon.svg";
import line from "./images/line-header.svg";
import one from "./images/1.webp";
import two from "./images/2.webp";
import three from "./images/3.webp";
import four from "./images/4.webp";
import five from "./images/5.webp";
import six from "./images/6.webp";
import tabuleiro from "./images/tabuleiro-SP.webp";
import atharax from "./images/atharax-SP.webp";
import esteves from "./images/esteves-SP.webp";
import house from "./images/house-SP.webp";
import organica from "./images/organica-SP.webp";
import pod from "./images/pod-SP.webp";

function Hero() {
  const gallery = useRef(null);
  const oneRef = useRef(null);
  const twoRef = useRef(null);
  const threeRef = useRef(null);
  const fourRef = useRef(null);
  const fiveRef = useRef(null);
  const sixRef = useRef(null);
  const loader = useRef(null);
  const work = useRef(null);
  const transictionOne = useRef(null);

  gsap.registerPlugin(
    ScrollTrigger,
    ScrollToPlugin,
    ScrollSmoother,
    ScrambleTextPlugin,
    SplitText,
    Observer
  );

  useEffect(() => {
    let smoother = ScrollSmoother.create({
      smooth: 2,
      effects: true,
      normalizeScroll: true,
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
            smoother.scrollTo(targetElement, true, "top top");

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
        smoother.scrollTo(sectionElement, true, "top top");
      }
    };
  }, []);

  useLayoutEffect(() => {
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
        .call(() => heartbeat.kill())
        .fromTo(
          ".loader",
          { opacity: 1 },
          {
            display: "none",
            opacity: 0,
            onComplete: () => {
              document.body.style.overflow = ""; // Restore scrolling
              document.body.style.position = ""; // Reset position
              if (smoother) smoother.paused(false); // Resume ScrollSmoother
            },
          }
        )
        .fromTo(
          ".myName h1 span:nth-child(1)",
          { opacity: 0, css: { textShadow: "0px 0px 0px rgba(0, 0, 0, 0)" } },
          {
            opacity: 1,
            css: {
              textShadow:
                "0 0px 10px #fff, 0 0px 20px rgb(255, 196, 0), 0 0px 40px #ECD12F, 0px 0px 20px #ECB530",
            },
            duration: 0.5,
          },
          "-=.9"
        )
        .fromTo(
          ".myName h1 span:nth-child(2)",
          { opacity: 0, css: { textShadow: "0px 0px 0px rgba(0, 0, 0, 0)" } },
          {
            opacity: 1,
            css: {
              textShadow:
                "0 0px 10px #fff, 0 0px 20px rgb(17, 61, 14), 0 0px 40px #1C4918, 0px 0px 20px #20492F",
            },
          },
          "-=.8"
        )
        .fromTo(
          ".myName h1 span:nth-child(3)",
          { opacity: 0, css: { textShadow: "0px 0px 0px rgba(0, 0, 0, 0)" } },
          {
            opacity: 1,
            css: {
              textShadow:
                "0 0px 10px #fff, 0 0px 20px rgb(247, 116, 252), 0 0px 40px #FF8FC9, 0px 0px 20px #E480B4",
            },
          },
          "-=.8"
        )
        .fromTo(
          ".myName h1 span:nth-child(4)",
          { opacity: 0, css: { textShadow: "0px 0px 0px rgba(0, 0, 0, 0)" } },
          {
            opacity: 1,
            css: {
              textShadow:
                "0 0px 10px #fff, 0 0px 20px rgb(255, 86, 86), 0 0px 40px #FF412C, 0px 0px 20px #DD3826",
            },
          },
          "-=.8"
        )
        .fromTo(
          ".myName h1 span:nth-child(5)",
          { opacity: 0, css: { textShadow: "0px 0px 0px rgba(0, 0, 0, 0)" } },
          {
            opacity: 1,
            css: {
              textShadow:
                "0 0px 10px #fff, 0 0px 20px rgb(17, 61, 14), 0 0px 40px #1C4918, 0px 0px 20px #20492F",
            },
          },
          "-=.8"
        )
        .fromTo(
          ".hero nav ul",
          { x: "-100vw" },
          { x: 0, duration: 0.5 },
          "-=.9"
        )
        .fromTo(
          ".line-header",
          { x: "-100vw" },
          { x: 0, duration: 0.5 },
          "-=.8"
        )
        .fromTo(".logo", { x: "-100vw" }, { x: 0, duration: 0.5 }, "-=.8")
        .fromTo(
          ".myName h1 span:nth-child(1)",
          {
            css: {
              textShadow:
                "0 0px 10px #fff, 0 0px 20px rgb(255, 196, 0), 0 0px 40px #ECD12F, 0px 0px 20px #ECB530",
            },
          },
          {
            css: { textShadow: "0px 0px 0px rgba(0, 0, 0, 0)" },
            duration: 0.5,
          },
          "-=.9"
        )
        .fromTo(
          ".myName h1 span:nth-child(2)",

          {
            css: {
              textShadow:
                "0 0px 10px #fff, 0 0px 20px rgb(17, 61, 14), 0 0px 40px #1C4918, 0px 0px 20px #20492F",
            },
          },
          { css: { textShadow: "0px 0px 0px rgba(0, 0, 0, 0)" } },
          "-=.9"
        )
        .fromTo(
          ".myName h1 span:nth-child(3)",

          {
            css: {
              textShadow:
                "0 0px 10px #fff, 0 0px 20px rgb(247, 116, 252), 0 0px 40px #FF8FC9, 0px 0px 20px #E480B4",
            },
          },
          { css: { textShadow: "0px 0px 0px rgba(0, 0, 0, 0)" } },
          "-=.9"
        )
        .fromTo(
          ".myName h1 span:nth-child(4)",

          {
            css: {
              textShadow:
                "0 0px 10px #fff, 0 0px 20px rgb(255, 86, 86), 0 0px 40px #FF412C, 0px 0px 20px #DD3826",
            },
          },
          { css: { textShadow: "0px 0px 0px rgba(0, 0, 0, 0)" } },
          "-=.9"
        )
        .fromTo(
          ".myName h1 span:nth-child(5)",

          {
            css: {
              textShadow:
                "0 0px 10px #fff, 0 0px 20px rgb(17, 61, 14), 0 0px 40px #1C4918, 0px 0px 20px #20492F",
            },
          },
          { css: { textShadow: "0px 0px 0px rgba(0, 0, 0, 0)" } },
          "-=.9"
        );
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
    const elementsFade = [
      ".about-description",
      ".gallery img",
      ".left-side nav",
    ];
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about",
          start: "top top",
          end: "bottom top",
          pinSpacing: false,
          pin: true,
          scrub: 1,
          toggleActions: "play none none reverse",
        },
      });
      tl.addPause(0.05)
        .fromTo(oneRef.current, { x: 0 }, { x: "-97.5vw", duration: 1 })
        .fromTo(twoRef.current, { x: 0 }, { x: "-95vw", duration: 1 }, "-=.6")
        .fromTo(
          threeRef.current,
          { x: 0 },
          { x: "-92.5vw", duration: 1 },
          "-=.6"
        )
        .fromTo(fourRef.current, { x: 0 }, { x: "-90vw", duration: 1 }, "-=.6")
        .fromTo(
          fiveRef.current,
          { x: 0 },
          { x: "-87.5vw", duration: 1 },
          "-=.6"
        )
        .fromTo(sixRef.current, { x: 0 }, { x: "-85vw", duration: 1 }, "-=.6")
        .fromTo(
          ".left-side",
          { x: 0 },
          {
            x: "27vw",
            duration: 1,
          },
          "-=.9"
        )
        .fromTo(
          ".about-hover",
          {
            top: "85%",
            left: "16.75vw", // Initial vertical position
            x: "0%", // No offset initially
            y: "0%", // No offset initially
            scale: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "#E480B4",
          },
          {
            top: "50%",
            left: "22.75vw", // Move vertically to the center
            x: "-50%", // Offset to center the element precisely
            y: "-50%", // Offset to center the element precisely
            scale: 15,
            backgroundColor: "rgba(0, 0, 0, 0)", // Scale up the logo
            duration: 1,
            ease: "power1.inOut",
            keyframes: {
              color: [
                "#E480B4", // Start with red
                "#20492F", // Then transition to yellow
                "#ECB530",
                "#DD3826", // Then transition to green
                "#E480B4", // Finally transition to blue
              ],
            },
          }
        )
        .fromTo(elementsFade, { opacity: 1 }, { opacity: 0 }, "-=.9");
    }, gallery);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          pinSpacing: false,
          pin: true,
          scrub: 1,
          toggleActions: "play none none reverse",
        },
      });
      tl.fromTo(".vamp", { opacity: 1 }, { opacity: 0, duration: 1 })
        .fromTo(
          ".myName h1 span:nth-child(5)",
          { opacity: 1 },
          { opacity: 0, duration: 0.2 },
          0
        )
        .fromTo(
          ".myName h1 span:nth-child(4)",
          { opacity: 1 },
          { opacity: 0, duration: 0.2 },
          "-=.85"
        )
        .fromTo(
          ".myName h1 span:nth-child(3)",
          { opacity: 1 },
          { opacity: 0, duration: 0.2 },
          "-=.75"
        )
        .fromTo(
          ".myName h1 span:nth-child(2)",
          { opacity: 1 },
          { opacity: 0, duration: 0.2 },
          "-=.60"
        )
        .fromTo(
          ".myName h1 span:nth-child(1)",
          { opacity: 1 },
          { opacity: 0, duration: 0.2 },
          "-=.50"
        )
        .fromTo(
          ".hero nav, .line-header, .logo",
          { opacity: 1 },
          { opacity: 0, duration: 0.5 },
          "-=.50"
        );
    }, transictionOne);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#work",
          start: "top top",
          end: "bottom top",
          pinSpacing: false,
          pin: true,
          scrub: 1,
          toggleActions: "play none none reverse",
        },
        defaults: { duration: 0.2, ease: "power2.out" },
      });
      tl.to(".work-no-one", { x: "-9vw", y: "-9vh", rotation: 15 }, 0)
        .to(".work-no-two", { x: "9vw", y: "9vh", rotation: 15 }, 0)
        .to(".work-no-three", { x: "9.375vw", y: "-11.25vh", rotation: -10 }, 0)
        .to(".work-no-four", { x: "-11.25vw", y: "11.25vh", rotation: -10 }, 0)
        .to(".work-no-five", { x: "0vw", y: "3.75vh", rotation: 5 }, 0)
        .to(".work-no-six", { x: "3.75vw", y: "-7.125vh", rotation: -5 }, 0);

      const hoverEffect = (element) => {
        const hoverTimeline = gsap.timeline({ paused: true });
        hoverTimeline.to(element, { scale: 1.2, duration: 0.4 });
        element.addEventListener("mouseenter", () => hoverTimeline.play());
        element.addEventListener("mouseleave", () => hoverTimeline.reverse());
      };

      // Apply hover effects to each work element
      hoverEffect(document.querySelector(".work-no-one"));
      hoverEffect(document.querySelector(".work-no-two"));
      hoverEffect(document.querySelector(".work-no-three"));
      hoverEffect(document.querySelector(".work-no-four"));
      hoverEffect(document.querySelector(".work-no-five"));
      hoverEffect(document.querySelector(".work-no-six"));
    }, work);

    return () => ctx.revert();
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content" ref={loader}>
        <div className="loader">
          <div className="logo-loader">
            <img src={logo} id="loader-image" alt=""></img>
          </div>
        </div>

        <header className="hero" id="home" ref={transictionOne}>
          <div className="sticky-hero">
            <div className="logo">
              <button onClick={() => window.location.reload()}>
                <img src={logo} alt=""></img>
              </button>
            </div>
            <div className="line-header">
              <img src={line} alt=""></img>
            </div>
            <nav>
              <ul>
                <a href="#about">
                  <li>ABOUT ME</li>
                </a>
                <a href="#work">
                  <li>WORK</li>
                </a>
                <a href="#contact">
                  <li>CONTACT</li>
                </a>
              </ul>
            </nav>
            <div className="myName">
              <h1>
                <span>S</span>
                <span>A</span>
                <span>R</span>
                <span>A</span>
                <span>H</span>
              </h1>
            </div>
            <div className="vamp">
              <img src={vamp} alt=""></img>
            </div>{" "}
          </div>
        </header>

        <main>
          <div className="about" id="about" ref={gallery}>
            <div className="left-side">
              <nav>
                <ul>
                  <button onClick={() => window.location.reload()}>
                    <img src={logo} alt=""></img>
                  </button>
                  <a href="#about">
                    <li>ABOUT ME</li>
                  </a>
                  <a href="#work">
                    <li>WORK</li>
                  </a>
                  <a href="#contact">
                    <li>CONTACT</li>
                  </a>
                </ul>
              </nav>
              <div className="about-description">
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
              <div className="about-hover">
                <p>SCROLL</p>
              </div>
            </div>
            <div className="gallery">
              <img
                ref={oneRef}
                src={one}
                alt="Animated Element"
                className="img-one"
              />
              <img
                ref={twoRef}
                src={two}
                alt="Animated Element"
                className="img-two"
              />
              <img
                ref={threeRef}
                src={three}
                alt="Animated Element"
                className="img-three"
              />
              <img
                ref={fourRef}
                src={four}
                alt="Animated Element"
                className="img-four"
              />
              <img
                ref={fiveRef}
                src={five}
                alt="Animated Element"
                className="img-five"
              />
              <img
                ref={sixRef}
                src={six}
                alt="Animated Element"
                className="img-six"
              />
            </div>
          </div>

          <div className="work-section" id="work" ref={work}>
            <div className="sticky">
              <div className="logo">
                <button onClick={() => window.location.reload()}>
                  <img src={logo} alt=""></img>
                </button>
              </div>
              <div className="line-work">
                <img src={line} alt=""></img>
              </div>
              <nav>
                <ul>
                  <a href="#about">
                    <li>ABOUT ME</li>
                  </a>
                  <a href="#work">
                    <li>WORK</li>
                  </a>
                  <a href="#contact">
                    <li>CONTACT</li>
                  </a>
                </ul>
              </nav>
              <div className="hover-click">CLICK AN IMAGE</div>
              <div className="scroll-ready">SCROLL DOWN</div>
              <div className="my-works">
                <div className="work-no-one">
                  <a
                    href="https://www.behance.net/gallery/215978025/OCEAN-CLUB-TABULEIRO"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={tabuleiro} alt=""></img>
                  </a>
                </div>
                <div className="work-no-two">
                  <a
                    href="https://www.behance.net/gallery/215976293/ATHARAX"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={atharax} alt=""></img>
                  </a>
                </div>
                <div className="work-no-three">
                  <a
                    href="https://www.behance.net/gallery/215975463/ESTEVES-CORRETORA"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={esteves} alt=""></img>
                  </a>
                </div>
                <div className="work-no-four">
                  <a
                    href="https://www.behance.net/gallery/199036633/ORGANICOS-HP"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={house} alt=""></img>
                  </a>
                </div>
                <div className="work-no-five">
                  <a
                    href="https://www.behance.net/gallery/215974969/ORGANICA"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={organica} alt=""></img>
                  </a>
                </div>
                <div className="work-no-six">
                  <a
                    href="https://www.behance.net/gallery/197400193/ADS-POD-KOMBUCHA"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={pod} alt=""></img>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer id="contact">
          <div className="footer-name">
            <h2>
              <span>S</span>
              <span>A</span>
              <span>R</span>
              <span>A</span>
              <span>H</span>
            </h2>
          </div>
          <div className="socials">
            <a
              href="https://www.behance.net/sarahdasilveira"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="behance">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  viewBox="0 0 24 24"
                  width="125"
                  height="125"
                  className="behance-svg"
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
              <div className="linkedin">
                <svg
                  height="125"
                  viewBox="0 0 176 176"
                  width="125"
                  xmlns="http://www.w3.org/2000/svg"
                  className="linkedin-svg"
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
          <div className="logo-footer">
            <button onClick={() => window.location.reload()}>
              <svg
                width="265"
                height="265"
                viewBox="0 0 65 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32.5285 33.1236C38.1572 39.1344 39.109 48.7142 35.3132 56.1194C33.9141 58.9603 31.7947 61.5928 29.2429 63.6977C26.9713 65.646 23.5563 65.3776 21.6149 63.0979C19.6735 60.8183 19.9409 57.3912 22.2126 55.4429C22.7519 54.9803 23.3739 54.6376 24.0076 54.4224C25.7238 53.8451 27.3846 52.8983 28.8421 51.5757C30.2991 50.257 31.5456 48.5669 32.4273 46.6122C34.3153 42.4643 34.3279 37.4785 32.5285 33.1236Z"
                  fill="#ECB530"
                />
                <path
                  d="M32.3747 33.1915C33.8721 41.3018 29.5112 49.8773 22.3287 54.0476C19.6208 55.6782 16.4198 56.7431 13.1395 57.1296C10.1793 57.5362 7.45047 55.4576 7.04585 52.4864C6.64074 49.5156 8.71196 46.7777 11.6727 46.3707C12.3759 46.274 13.0836 46.3238 13.7328 46.4863C15.4875 46.9319 17.3949 47.0364 19.3339 46.7143C21.27 46.3956 23.2294 45.6498 25.0239 44.4844C28.8455 42.0183 31.5421 37.8309 32.3747 33.1915Z"
                  fill="#DD3826"
                />
                <path
                  d="M32.2085 33.1646C29.0984 40.7996 20.8104 45.6479 12.5215 45.2599C9.36523 45.1627 6.09854 44.3213 3.13049 42.867C0.421164 41.6029 -0.754275 38.3735 0.505798 35.6546C1.76538 32.9357 4.98344 31.7561 7.69277 33.0202C8.33667 33.3203 8.90508 33.7464 9.36369 34.2349C10.5999 35.5619 12.1484 36.6844 13.9527 37.4653C15.7531 38.2476 17.8029 38.6834 19.9408 38.6761C24.4841 38.6756 29.0084 36.6161 32.2085 33.1646Z"
                  fill="#20492F"
                />
                <path
                  d="M32.083 33.0519C25.3532 37.7879 15.7692 37.3696 9.00491 32.5458C6.40209 30.7512 4.10711 28.2715 2.39426 25.4374C0.795707 22.904 1.54658 19.5496 4.07159 17.9459C6.59611 16.3417 9.93857 17.0952 11.5366 19.6292C11.9165 20.2309 12.1655 20.8976 12.2876 21.5574C12.613 23.3442 13.3103 25.129 14.4075 26.7649C15.5007 28.3998 16.9904 29.8786 18.7927 31.0324C22.6157 33.497 27.5315 34.2193 32.083 33.0519Z"
                  fill="#E480B4"
                />
                <path
                  d="M32.0382 32.8889C23.8256 33.2218 15.988 27.6698 12.8964 19.9421C11.6738 17.0206 11.079 13.6892 11.1646 10.3754C11.185 7.37684 13.6234 4.96248 16.6114 4.98298C19.5994 5.00348 22.0053 7.45054 21.9849 10.4491C21.98 11.1616 21.8301 11.8571 21.5777 12.4789C20.8886 14.1587 20.5142 16.0382 20.5561 18.0099C20.595 19.9782 21.0516 22.0304 21.9459 23.9792C23.8339 28.1271 27.58 31.4019 32.0382 32.8889Z"
                  fill="#ECB530"
                />
                <path
                  d="M32.0884 32.7278C25.0002 28.5521 21.3979 19.6292 22.9605 11.451C23.5057 8.32945 24.8003 5.2045 26.6576 2.46363C28.2902 -0.0478506 31.6424 -0.755512 34.1451 0.882369C36.6477 2.52074 37.3529 5.88483 35.7208 8.39632C35.3332 8.99271 34.8323 9.49734 34.2847 9.8829C32.7999 10.9219 31.4723 12.3002 30.4451 13.9815C29.4175 15.6584 28.6958 17.6326 28.3987 19.7575C27.7519 24.271 29.1393 29.0582 32.0884 32.7278Z"
                  fill="#DD3826"
                />
                <path
                  d="M32.2172 32.619C28.5036 25.2603 30.2802 15.7995 36.0008 9.76725C38.1412 7.43732 40.9136 5.51052 43.9527 4.21232C46.679 2.98537 49.8806 4.20841 51.1032 6.94439C52.3258 9.68037 51.107 12.8932 48.3807 14.1201C47.7329 14.4115 47.0399 14.5642 46.3717 14.5916C44.5631 14.6604 42.7033 15.0991 40.9336 15.9562C39.1653 16.8093 37.4948 18.0787 36.1005 19.7048C33.1251 23.1519 31.7134 27.9323 32.2172 32.619Z"
                  fill="#20492F"
                />
                <path
                  d="M32.3845 32.598C33.2249 24.393 39.816 17.3978 47.8783 15.4266C50.9339 14.6277 54.3046 14.511 57.5606 15.0679C60.515 15.515 62.5493 18.2807 62.1044 21.2461C61.6589 24.2109 58.9029 26.2524 55.948 25.8059C55.2462 25.7 54.5809 25.452 54.0036 25.1124C52.4449 24.189 50.6441 23.5492 48.6939 23.31C46.7467 23.0684 44.6574 23.23 42.6085 23.841C38.2486 25.126 34.4855 28.3813 32.3845 32.598Z"
                  fill="#E480B4"
                />
                <path
                  d="M32.5362 32.6707C37.6635 26.2241 46.9772 23.9157 54.8216 26.6316C57.8227 27.6175 60.7208 29.3481 63.1602 31.5829C65.4051 33.5619 65.6263 36.9924 63.6542 39.2452C61.6822 41.498 58.2638 41.7201 56.0189 39.741C55.4854 39.271 55.0594 38.7015 54.7569 38.1032C53.9433 36.4804 52.7727 34.9655 51.2607 33.7064C49.7526 32.4467 47.9085 31.4491 45.8552 30.8513C41.4948 29.5667 36.5751 30.2632 32.5362 32.6707Z"
                  fill="#ECB530"
                />
                <path
                  d="M32.6247 32.8142C40.4113 30.1729 49.49 33.2837 54.6256 39.825C56.6191 42.2828 58.1252 45.3106 58.9729 48.5142C59.7953 51.3971 58.133 54.4029 55.2603 55.2282C52.3875 56.0535 49.3923 54.3854 48.5699 51.5025C48.3744 50.8177 48.3228 50.1076 48.3909 49.44C48.5806 47.6332 48.4118 45.724 47.8185 43.8441C47.2286 41.9661 46.2141 40.1261 44.8091 38.5097C41.8338 35.0636 37.3197 32.9806 32.6247 32.8142Z"
                  fill="#DD3826"
                />
                <path
                  d="M32.6223 32.9831C40.5956 34.9855 46.557 42.5283 47.3536 50.8172C47.7067 53.9661 47.342 57.3307 46.3299 60.4859C45.4687 63.3571 42.4509 64.9842 39.5894 64.1199C36.7283 63.2556 35.1069 60.2272 35.9682 57.3561C36.1729 56.6738 36.5115 56.0486 36.9287 55.5235C38.0614 54.1067 38.9484 52.4087 39.462 50.5054C39.9775 48.6054 40.1156 46.5073 39.8043 44.3848C39.157 39.8713 36.4818 35.6702 32.6223 32.9831Z"
                  fill="#20492F"
                />
              </svg>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Hero;
