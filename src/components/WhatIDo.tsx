import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "../data/portfolio";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);

  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  useEffect(() => {
    if (!ScrollTrigger.isTouch) return;

    const handlers = containerRef.current
      .map((container) => {
        if (!container) return null;

        const handleTouch = () => handleClick(container);
        container.classList.remove("what-noTouch");
        container.addEventListener("click", handleTouch);

        return { container, handleTouch };
      })
      .filter(Boolean);

    return () => {
      handlers.forEach((item) => {
        if (!item) return;
        item.container.removeEventListener("click", item.handleTouch);
      });
    };
  }, []);

  return (
    <div className="whatIDO" id="what">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          {portfolioData.capabilities.map((item, index) => (
            <div
              className="what-content what-noTouch"
              ref={(el) => setRef(el, index)}
              key={item.title}
            >
              <div className="what-corner"></div>

              <div className="what-content-in">
                <h3>{item.title}</h3>
                <h4>{item.subtitle}</h4>
                <p>{item.description}</p>
                <h5>Skillset &amp; tools</h5>
                <div className="what-content-flex">
                  {item.tags.map((tag) => (
                    <div className="what-tags" key={tag}>
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
