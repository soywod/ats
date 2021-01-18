import {cssOfStr, tplOfStr} from "../dom-utils";
import css from "./index.css";
import tplBasic from "./basic.html";
import tplComplete from "./complete.html";

class ATSContactLink extends HTMLElement {
  public constructor() {
    super();
    const tpl = this.hasAttribute("complete") ? tplComplete : tplBasic;
    this.attachShadow({mode: "open"}).append(cssOfStr(css), tplOfStr(tpl));
  }
}

customElements.define("ats-contact-link", ATSContactLink);
