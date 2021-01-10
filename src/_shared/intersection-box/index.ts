import "./group";

import {cssOfStr, tplOfStr} from "../dom-utils";
import css from "./index.css";
import tpl from "./index.html";

export class ATSIntersectionBox extends HTMLElement {
  protected threshold: number;

  public constructor() {
    super();
    this.attachShadow({mode: "open"}).append(cssOfStr(css), tplOfStr(tpl));
    this.threshold = parseFloat(this.getAttribute("threshold") || "") || 0;
  }

  private handleScroll = () => {
    const threshold = 1 - this.getBoundingClientRect().top / window.innerHeight;

    if (threshold > this.threshold) {
      this.setAttribute("visible", "");
    } else {
      this.removeAttribute("visible");
    }
  };

  protected connectedCallback() {
    window.addEventListener("scroll", this.handleScroll);
  }

  protected disconnectedCallback() {
    window.removeEventListener("scroll", this.handleScroll);
  }
}

customElements.define("ats-intersection-box", ATSIntersectionBox);
