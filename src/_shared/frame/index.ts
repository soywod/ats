import {parseStyle, parseTpl, findFirstOrFail} from "../dom-utils";
import style from "./index.css";
import tpl from "./index.html";

function clamp(min: number, max: number, n: number) {
  return Math.max(min, Math.min(n, max), n);
}

export class ATSFrame extends HTMLElement {
  private intersection$: IntersectionObserver;
  private isIntersecting = false;
  private content: HTMLSlotElement;

  public constructor() {
    super();
    const root = this.attachShadow({mode: "open"});
    root.append(parseStyle(style), parseTpl(tpl));
    this.content = findFirstOrFail(root, HTMLSlotElement, "slot[name='animated-content']");

    this.intersection$ = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          this.isIntersecting = entry.isIntersecting;

          if (entry.isIntersecting) {
            this.content.assignedElements().forEach(elem => {
              if (elem instanceof HTMLElement) {
                if (entry.intersectionRatio > 0.75) {
                  elem.style.opacity = "1";
                  elem.style.transform = "translateY(0)";
                } else {
                  elem.style.opacity = "0";
                  elem.style.transform = "translateY(5rem)";
                }
              }
            });
          }
        });
      },
      {threshold: [0, 0.75]},
    );
  }

  private reduceBorder = () => {
    if (this.isIntersecting) {
      const borderWidthMax = 400;
      const offsetTop = this.offsetTop - window.innerHeight;
      const ratio = (this.clientHeight * 0.75) / borderWidthMax;
      const borderWidth = borderWidthMax - (window.scrollY - offsetTop) / ratio;
      this.style.borderWidth = `${clamp(0, borderWidthMax, borderWidth)}px`;
    }
  };

  protected connectedCallback() {
    this.intersection$.observe(this);
    window.addEventListener("scroll", this.reduceBorder);
  }

  protected disconnectedCallback() {
    this.intersection$.unobserve(this);
    window.removeEventListener("scroll", this.reduceBorder);
  }
}

customElements.define("ats-frame", ATSFrame);
