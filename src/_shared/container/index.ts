import {cssOfStr, tplOfStr} from "../../_shared/dom-utils";
import style from "./index.css";
import tpl from "./index.html";

class ATSContainer extends HTMLElement {
  public constructor() {
    super();
    this.attachShadow({mode: "open"}).append(cssOfStr(style), tplOfStr(tpl));
  }
}

customElements.define("ats-container", ATSContainer);
