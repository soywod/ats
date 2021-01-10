import {cssOfStr, tplOfStr} from "../dom-utils";
import css from "./index.css";
import tpl from "./index.html";

import "../button-contact";

class ATSFooter extends HTMLElement {
  public constructor() {
    super();
    this.attachShadow({mode: "open"}).append(cssOfStr(css), tplOfStr(tpl));
  }
}

customElements.define("ats-footer", ATSFooter);
