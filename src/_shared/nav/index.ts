import {parseStyle, parseTpl, findOrFail} from "../dom-utils";
import style from "./index.css";
import tpl from "./index.html";

import {ATSButtonContact} from "../button-contact";

class ATSNav extends HTMLElement {
  private sticky = false;
  private button: ATSButtonContact;

  public constructor() {
    super();
    const root = this.attachShadow({mode: "open"});
    root.append(parseStyle(style), parseTpl(tpl));
    this.button = findOrFail(root, ATSButtonContact, "button");
  }

  private handleScroll = () => {
    if (window.scrollY === 0) {
      this.removeAttribute("sticky");
      this.sticky = false;
      this.button.setAttribute("theme", "dark");
    } else if (!this.sticky) {
      this.setAttribute("sticky", "");
      this.sticky = true;
      this.button.setAttribute("theme", "light");
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
