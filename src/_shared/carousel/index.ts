import {parseStyle, parseTpl, findOrFail} from "../dom-utils";
import style from "./index.css";
import tpl from "./index.html";

import "./item";

export class ATSCarousel extends HTMLElement {
  private activeItemIndex = 0;
  private resizeTimeout = 0;
  private items: HTMLElement[] = [];
  private prevBtn: HTMLButtonElement;
  private nextBtn: HTMLButtonElement;

  public constructor() {
    super();
    this.attachShadow({mode: "open"}).append(parseStyle(style), parseTpl(tpl));
    this.prevBtn = findOrFail(this.shadowRoot, HTMLButtonElement, "prev");
    this.nextBtn = findOrFail(this.shadowRoot, HTMLButtonElement, "next");
    this.querySelectorAll("ats-carousel-item").forEach(item => {
      if (item instanceof HTMLElement) {
        this.items.push(item);
      }
    });
  }

  private updateItemsPositionWithDebounce = () => {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = window.setTimeout(this.updateItemsPosition, 200);
  };

  private updateItemsPosition = () => {
    const shift = this.items.slice(0, this.activeItemIndex).reduce((trans, item) => trans + item.clientWidth, 0);

    this.items.reduce((trans, item, index) => {
      item.style.transform = `translateX(${trans - shift}px)`;
      item.style.zIndex = index === this.activeItemIndex ? "1" : "inherit";
      return trans + item.clientWidth + 16;
    }, 0);
  };

  private showPrevItem = () => {
    this.activeItemIndex = Math.max(0, this.activeItemIndex - 1);
    this.updateItemsPosition();
  };

  private showNextItem = () => {
    this.activeItemIndex = Math.min(this.activeItemIndex + 1, this.items.length - 1);
    this.updateItemsPosition();
  };

  protected connectedCallback() {
    this.updateItemsPositionWithDebounce();
    window.addEventListener("resize", this.updateItemsPositionWithDebounce);
    this.prevBtn.addEventListener("click", this.showPrevItem);
    this.nextBtn.addEventListener("click", this.showNextItem);
  }

  protected disconnectedCallback() {
    window.removeEventListener("resize", this.updateItemsPositionWithDebounce);
    this.prevBtn.removeEventListener("click", this.showPrevItem);
    this.nextBtn.removeEventListener("click", this.showNextItem);
  }
}

customElements.define("ats-carousel", ATSCarousel);
