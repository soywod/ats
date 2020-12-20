import {parseStyle, parseTpl, findOrFail} from "../../_shared/dom-utils";
import style from "./index.css";
import tpl from "./index.html";

import img1 from "./image-1.svg";
import img2 from "./image-2.svg";
import img3 from "./image-3.svg";
import img4 from "./image-4.svg";

const imgs = [img1, img2, img3, img4];
const alts = ["Vêtements EPI", "Mobilier urbain", "Signalétique", "Mobilier de loisirs"];

class ATSSection2 extends HTMLElement {
  private imgIdx = 0;
  private img: HTMLImageElement;
  private alt: HTMLSpanElement;

  public constructor() {
    super();
    const root = this.attachShadow({mode: "open"});
    root.append(parseStyle(style), parseTpl(tpl));
    this.img = findOrFail(root, HTMLImageElement, "image");
    this.alt = findOrFail(root, HTMLSpanElement, "alt");
  }

  private handleAnimationEnd = () => {
    this.imgIdx = (this.imgIdx + 1) % imgs.length;
    this.img.src = imgs[this.imgIdx];
    this.alt.textContent = alts[this.imgIdx];
  };

  protected connectedCallback() {
    this.img.addEventListener("animationiteration", this.handleAnimationEnd);
  }

  protected disconnectedCallback() {
    this.img.removeEventListener("animationiteration", this.handleAnimationEnd);
  }
}

customElements.define("ats-section-2", ATSSection2);
