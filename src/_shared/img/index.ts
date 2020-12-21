import {cssOfStr} from "../dom-utils";
import style from "./index.css";

export class ATSImg extends HTMLImageElement {
  private intersection$: IntersectionObserver;
  private threshold: number;

  public constructor() {
    super();
    this.threshold = parseFloat(this.getAttribute("threshold") || "0");

    this.intersection$ = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.setAttribute("intersecting", "");
          }
        });
      },
      {threshold: this.threshold},
    );
  }

  protected connectedCallback() {
    this.intersection$.observe(this);
  }

  protected disconnectedCallback() {
    this.intersection$.unobserve(this);
  }
}

customElements.define("ats-img", ATSImg, {extends: "img"});
customElements.whenDefined("ats-img").then(() => document.head.append(cssOfStr(style)));
