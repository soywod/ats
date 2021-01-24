import {cssOfStr, tplOfStr, findOrFail} from "../dom-utils";
import css from "./index.css";
import tpl from "./index.html";

import {ATSButtonContact} from "../button-contact";

class ATSNav extends HTMLElement {
  private sticky = false;
  private contactBtn: ATSButtonContact;
  private subnavBtn: HTMLButtonElement;
  private subnav: HTMLDivElement;

  public constructor() {
    super();
    const root = this.attachShadow({mode: "open"});
    root.append(cssOfStr(css), tplOfStr(tpl));
    this.contactBtn = findOrFail(root, ATSButtonContact, "button");
    this.subnavBtn = findOrFail(root, HTMLButtonElement, "subnav-btn");
    this.subnav = findOrFail(root, HTMLDivElement, "subnav");
  }

  private handleScroll = () => {
    if (window.scrollY === 0) {
      this.removeAttribute("sticky");
      this.sticky = false;
      this.contactBtn.setAttribute("theme", "dark");
    } else if (!this.sticky) {
      this.setAttribute("sticky", "");
      this.sticky = true;
      this.contactBtn.setAttribute("theme", "light");
    }
  };

  private handleMouseEnter = () => {
    this.contactBtn.setAttribute("theme", "light");
  };

  private handleMouseLeave = () => {
    if (!this.sticky) {
      this.contactBtn.setAttribute("theme", "dark");
    }

    this.subnav.setAttribute("hidden", "");
  };

  private handleSubnavBtnMouseEnter = () => {
    this.subnav.removeAttribute("hidden");
  };

  protected connectedCallback() {
    window.addEventListener("scroll", this.handleScroll);
    this.addEventListener("mouseenter", this.handleMouseEnter);
    this.addEventListener("mouseleave", this.handleMouseLeave);
    this.subnavBtn.addEventListener("mouseenter", this.handleSubnavBtnMouseEnter);
  }

  protected disconnectedCallback() {
    window.removeEventListener("scroll", this.handleScroll);
    this.removeEventListener("mouseenter", this.handleMouseEnter);
    this.removeEventListener("mouseleave", this.handleMouseLeave);
    this.subnavBtn.removeEventListener("mouseenter", this.handleSubnavBtnMouseEnter);
  }
}

customElements.define("ats-nav", ATSNav);
