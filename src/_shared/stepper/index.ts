import "../lazy-section";

import {cssOfStr, tplOfStr} from "../dom-utils";
import css from "./index.css";
import tpl from "./index.html";

class ATSStepper extends HTMLElement {
  public constructor() {
    super();
    this.attachShadow({mode: "open"}).append(cssOfStr(css), tplOfStr(tpl));
  }
}

customElements.define("ats-stepper", ATSStepper);
