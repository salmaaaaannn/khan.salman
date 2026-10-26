import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";
import { portfolioData } from "../data/portfolio";
import {
  MdMenu,
  MdClose,
  MdFileDownload,
  MdArrowOutward,
  MdMailOutline,
} from "react-icons/md";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#what" },
  { label: "EXPERIENCE", href: "#career" },
  { label: "PROJECTS", href: "#work" },
  { label: "CONTACT", href: "#contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { meta } = portfolioData;

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    smoother.scrollTop(0);
    smoother.paused(true);

    const links = Array.from(
      document.querySelectorAll("a[data-href]")
    ) as HTMLAnchorElement[];

    const handleLinkClick = (event: Event) => {
      if (window.innerWidth > 1024) {
        event.preventDefault();
        const anchor = event.currentTarget as HTMLAnchorElement;
        const section = anchor.getAttribute("data-href");
        if (section) {
          smoother.scrollTo(section, true, "top top");
        }
      }
    };

    links.forEach((element) => element.addEventListener("click", handleLinkClick));

    const handleResize = () => {
      ScrollSmoother.refresh(true);
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      links.forEach((element) =>
        element.removeEventListener("click", handleLinkClick)
      );
      window.removeEventListener("resize", handleResize);
      smoother?.kill();
    };
  }, []);

  const handleMobileNav = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      } else if (smoother) {
        smoother.scrollTo(href, true);
      }
    }, 150);
  };

  return (
    <>
      <header className="header">
        {/* Brand initials */}
        <a href="/#" className="navbar-title" data-cursor="disable">
          {meta.initials}
        </a>

        {/* Center contact pill on desktop */}
        <a
          href={meta.emailHref}
          className="navbar-connect"
          data-cursor="disable"
        >
          {meta.email}
        </a>

        {/* Desktop Navigation Links */}
        <ul className="desktop-nav">
          {navItems.map((item) => (
            <li key={item.label}>
              <a data-href={item.href} href={item.href}>
                <HoverLinks text={item.label} />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Toggle */}
        <button
          className={`mobile-menu-toggle${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          data-cursor="disable"
        >
          {menuOpen ? <MdClose /> : <MdMenu />}
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`mobile-drawer-overlay${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      <nav
        className={`mobile-drawer${menuOpen ? " open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-drawer-inner">
          <div className="mobile-drawer-header">
            <span className="mobile-drawer-title">{meta.name}</span>
            <span className="mobile-drawer-role">{meta.title}</span>
          </div>

          <div className="mobile-drawer-links">
            {navItems.map((item, idx) => (
              <button
                key={item.label}
                className="mobile-nav-link"
                onClick={() => handleMobileNav(item.href)}
                data-cursor="disable"
              >
                <span className="link-num">0{idx + 1}</span>
                <span className="link-text">{item.label}</span>
                <MdArrowOutward className="link-arrow" />
              </button>
            ))}
          </div>

          <div className="mobile-drawer-footer">
            <a
              href={meta.resumePath}
              download="Salman-Khan-Resume.pdf"
              className="mobile-resume-btn"
              data-cursor="disable"
            >
              <MdFileDownload /> Download Resume
            </a>

            <div className="mobile-drawer-socials">
              <a
                href={meta.githubHref}
                target="_blank"
                rel="noreferrer"
                aria-label="Salman Khan GitHub"
                data-cursor="disable"
              >
                <FaGithub />
              </a>
              <a
                href={meta.linkedinHref}
                target="_blank"
                rel="noreferrer"
                aria-label="Salman Khan LinkedIn"
                data-cursor="disable"
              >
                <FaLinkedinIn />
              </a>
              <a
                href={meta.emailHref}
                aria-label="Email Salman Khan"
                data-cursor="disable"
              >
                <MdMailOutline />
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
