import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { smoother } from "../Navbar";

export function initialFX() {
  try {
    document.body.style.overflowY = "auto";
    if (smoother && typeof smoother.paused === "function") {
      smoother.paused(false);
    }
    const mainEl = document.getElementsByTagName("main")[0];
    if (mainEl) {
      mainEl.classList.add("main-active");
    }

    gsap.to("body", {
      backgroundColor: "#08090c",
      duration: 0.5,
      delay: 1,
    });

    const landingText = new SplitText(
      [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
      {
        type: "chars,lines",
        linesClass: "split-line",
      }
    );
    if (landingText.chars && landingText.chars.length > 0) {
      gsap.fromTo(
        landingText.chars,
        { opacity: 0, y: 80, filter: "blur(5px)" },
        {
          opacity: 1,
          duration: 1.2,
          filter: "blur(0px)",
          ease: "power3.inOut",
          y: 0,
          stagger: 0.025,
          delay: 0.3,
        }
      );
    }

    const TextProps = { type: "chars,lines", linesClass: "split-h2" };

    const landingText2 = new SplitText(".landing-h2-info", TextProps);
    if (landingText2.chars && landingText2.chars.length > 0) {
      gsap.fromTo(
        landingText2.chars,
        { opacity: 0, y: 80, filter: "blur(5px)" },
        {
          opacity: 1,
          duration: 1.2,
          filter: "blur(0px)",
          ease: "power3.inOut",
          y: 0,
          stagger: 0.025,
          delay: 0.3,
        }
      );
    }

    gsap.fromTo(
      ".landing-info-h2",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power1.inOut",
        y: 0,
        delay: 0.8,
      }
    );

    gsap.fromTo(
      [".header", ".icons-section", ".nav-fade", ".landing-bio", ".landing-actions"],
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power1.inOut",
        delay: 0.2,
      }
    );

    const landingText3 = new SplitText(".landing-h2-info-1", TextProps);
    const landingText4 = new SplitText(".landing-h2-1", TextProps);
    const landingText5 = new SplitText(".landing-h2-2", TextProps);

    if (landingText3.chars && landingText5.chars) {
      gsap.set([landingText3.chars, landingText5.chars], { opacity: 0, y: 80 });
    }

    LoopText(landingText2, landingText3);
    LoopText(landingText4, landingText5);
  } catch (err) {
    console.warn("initialFX animation initialization error:", err);
  }
}

function LoopText(Text1: SplitText, Text2: SplitText) {
  if (!Text1?.chars?.length || !Text2?.chars?.length) return;

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    Text2.chars,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: delay,
    },
    0
  )
    .fromTo(
      Text1.chars,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .fromTo(
      Text1.chars,
      { opacity: 1, y: 0 },
      {
        opacity: 0,
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    .to(
      Text2.chars,
      {
        opacity: 0,
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}
