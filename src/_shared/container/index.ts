import {cssOfStr, tplOfStr} from "../../_shared/dom-utils";
import css from "./index.css";
import tpl from "./index.html";

class ATSContainer extends HTMLElement {
  public constructor() {
    super();
    this.attachShadow({mode: "open"}).append(cssOfStr(css), tplOfStr(tpl));
  }
}

customElements.define("ats-container", ATSContainer);
