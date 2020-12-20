import {parseStyle, parseTpl} from "../dom-utils";
import style from "./index.css";
import tpl from "./index.html";

export class ATSFrame extends HTMLElement {
  private intersection$: IntersectionObserver;
  private isIntersecting = false;

  public constructor() {
    super();
    this.attachShadow({mode: "open"}).append(parseStyle(style), parseTpl(tpl));
    this.intersection$ = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          this.isIntersecting = entry.isIntersecting;
        });
      },
      {threshold: 0.2},
    );
  }

  private reduceBorder = () => {
    if (this.isIntersecting) {
      const nav = document.querySelector("ats-nav");
      const navHeight = nav ? nav.clientHeight : 128;
      const offsetTop = this.offsetTop - navHeight - 16;
      const borderWidth = Math.trunc(Math.max(0, (offsetTop * 100) / window.scrollY - 100) * 3);
      console.log(borderWidth);
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
