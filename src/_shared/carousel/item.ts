import {cssOfStr, tplOfStr} from "../dom-utils";
import style from "./item.css";
import tpl from "./item.html";

class ATSCarouselItem extends HTMLElement {
  public constructor() {
    super();
    this.attachShadow({mode: "open"}).append(cssOfStr(style), tplOfStr(tpl));
  }
}

customElements.define("ats-carousel-item", ATSCarouselItem);
