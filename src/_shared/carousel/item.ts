import {parseStyle, parseTpl} from "../dom-utils";
import style from "./item.css";
import tpl from "./item.html";

export class ATSCarouselItem extends HTMLElement {
  public constructor() {
    super();
    this.attachShadow({mode: "open"}).append(parseStyle(style), parseTpl(tpl));
  }
}

customElements.define("ats-carousel-item", ATSCarouselItem);
