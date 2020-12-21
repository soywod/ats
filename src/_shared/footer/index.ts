import {cssOfStr, tplOfStr} from "../dom-utils";
import style from "./index.css";
import tpl from "./index.html";

import "../button-contact";

class ATSFooter extends HTMLElement {
  public constructor() {
    super();
    this.attachShadow({mode: "open"}).append(cssOfStr(style), tplOfStr(tpl));
  }
}

customElements.define("ats-footer", ATSFooter);
