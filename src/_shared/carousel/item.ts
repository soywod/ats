import {cssOfStr, tplOfStr} from "../dom-utils";
import css from "./item.css";
import tpl from "./item.html";

class ATSCarouselItem extends HTMLElement {
  public constructor() {
    super();
    this.attachShadow({mode: "open"}).append(cssOfStr(css), tplOfStr(tpl));
  }
}

customElements.define("ats-carousel-item", ATSCarouselItem);
