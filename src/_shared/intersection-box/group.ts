import {cssOfStr, tplOfStr} from "../dom-utils";
import style from "./group.css";
import tpl from "./group.html";

export class ATSIntersectionBoxGroup extends HTMLElement {
  public constructor() {
    super();
    this.attachShadow({mode: "open"}).append(cssOfStr(style), tplOfStr(tpl));
  }
}

customElements.define("ats-intersection-box-group", ATSIntersectionBoxGroup);
