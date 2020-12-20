import {parseStyle, parseTpl, findOrFail} from "../dom-utils";
import style from "./index.css";
import tpl from "./index.html";

export class ATSFrame extends HTMLElement {
  private intersection$: IntersectionObserver;
  private isIntersecting = false;
  private content: HTMLDivElement;

  public constructor() {
    super();
    const root = this.attachShadow({mode: "open"});
    root.append(parseStyle(style), parseTpl(tpl));
    this.content = findOrFail(root, HTMLDivElement, "content");
    this.intersection$ = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          this.isIntersecting = entry.isIntersecting;

          if (entry.isIntersecting) {
            if (entry.intersectionRatio > 0.75) {
              this.content.style.opacity = "1";
              this.content.style.transform = "translateY(0)";
            } else {
              this.content.style.opacity = "0";
              this.content.style.transform = "translateY(5rem)";
            }
          }
        });
      },
      {threshold: [0, 0.75]},
    );
  }

  private reduceBorder = () => {
    if (this.isIntersecting) {
      const nav = document.querySelector("ats-nav");
      const navHeight = nav ? nav.clientHeight : 128;
      const offsetTop = this.offsetTop - navHeight - 16;
      const borderWidth = Math.trunc(Math.max(0, (offsetTop * 100) / window.scrollY - 100) * 30);
      this.style.borderWidth = `${borderWidth}px`;
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
