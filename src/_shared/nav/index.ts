import {parseStyle, parseTpl} from "../../_shared/dom-utils";
import style from "./index.css";
import tpl from "./index.html";

export class ATSNav extends HTMLElement {
  private sticky = false;

  public constructor() {
    super();
    this.attachShadow({mode: "open"}).append(parseStyle(style), parseTpl(tpl));
  }

  private handleScroll = () => {
    if (window.scrollY === 0) {
      this.removeAttribute("sticky");
      this.sticky = false;
    } else if (!this.sticky) {
      this.setAttribute("sticky", "");
      this.sticky = true;
    }
  };

  protected connectedCallback() {
    window.addEventListener("scroll", this.handleScroll);
  }

  protected disconnectedCallback() {
    window.removeEventListener("scroll", this.handleScroll);
  }
}

customElements.define("ats-nav", ATSNav);
