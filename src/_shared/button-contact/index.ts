import {cssOfStr, tplOfStr} from "../dom-utils";
import css from "./index.css";
import cssLg from "./index.lg.css";
import tpl from "./index.html";

export class ATSButtonContact extends HTMLElement {
  public constructor() {
    super();
    this.attachShadow({mode: "open"}).append(cssOfStr(css), cssOfStr(cssLg), tplOfStr(tpl));
  }
}

customElements.define("ats-button-contact", ATSButtonContact);
