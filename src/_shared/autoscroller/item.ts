import {cssOfStr, tplOfStr} from "../dom-utils";
import style from "./item.css";
import tpl from "./item.html";

class ATSAutoscrollerItem extends HTMLElement {
  public constructor() {
    super();
    this.attachShadow({mode: "open"}).append(cssOfStr(style), tplOfStr(tpl));
  }
}

customElements.define("ats-autoscroller-item", ATSAutoscrollerItem);
