import {parseStyle, parseTpl} from "../../_shared/dom-utils";
import style from "./index.css";
import tpl from "./index.html";

export class ATSNav extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: "open"}).append(parseStyle(style), parseTpl(tpl));
  }
}

customElements.define("ats-nav", ATSNav, {extends: "nav"});
