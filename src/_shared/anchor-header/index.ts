import {cssOfStr, tplOfStr, findOrFail} from "../dom-utils";
import css from "./index.css";
import tpl from "./index.html";

export class ATSAnchorHeader extends HTMLElement {
  private anchor: HTMLAnchorElement;

  public constructor() {
    super();
    this.attachShadow({mode: "open"}).append(cssOfStr(css), tplOfStr(tpl));
    this.anchor = findOrFail(this.shadowRoot, HTMLAnchorElement, "anchor");
    this.style.animationDuration = `${Math.random() * 750 + 500}ms`;

    if (this.hasAttribute("top")) this.style.top = String(this.getAttribute("top"));
    if (this.hasAttribute("right")) this.style.right = String(this.getAttribute("right"));
    if (this.hasAttribute("bottom")) this.style.bottom = String(this.getAttribute("bottom"));
    if (this.hasAttribute("left")) this.style.left = String(this.getAttribute("left"));

    const label = findOrFail(this.shadowRoot, HTMLLabelElement, "label");
    if (this.hasAttribute("label-top")) label.style.top = String(this.getAttribute("label-top"));
    if (this.hasAttribute("label-right")) label.style.right = String(this.getAttribute("label-right"));
    if (this.hasAttribute("label-bottom")) label.style.bottom = String(this.getAttribute("label-bottom"));
    if (this.hasAttribute("label-left")) label.style.left = String(this.getAttribute("label-left"));
  }

  private scrollToTarget = (evt: MouseEvent) => {
    evt.preventDefault();
    const targetId = String(this.getAttribute("to"));
    const target = findOrFail(document, HTMLElement, targetId);
    window.scrollTo({top: target.getBoundingClientRect().top - 128, behavior: "smooth"});
  };

  protected connectedCallback() {
    this.anchor.addEventListener("click", this.scrollToTarget);
  }

  protected disconnectedCallback() {
    this.anchor.removeEventListener("click", this.scrollToTarget);
  }
}

customElements.define("ats-anchor-header", ATSAnchorHeader);
