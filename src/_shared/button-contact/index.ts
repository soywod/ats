import {parseStyle, parseTpl} from "../dom-utils";
import style from "./index.css";
import tpl from "./index.html";

export class ATSButtonContact extends HTMLElement {
  public constructor() {
    super();
    this.attachShadow({mode: "open"}).append(parseStyle(style), parseTpl(tpl));
  }
}

customElements.define("ats-button-contact", ATSButtonContact);
