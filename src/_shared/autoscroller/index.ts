import {cssOfStr, tplOfStr, findOrFail} from "../dom-utils";
import style from "./index.css";
import tpl from "./index.html";

import "./item";

class ATSAutoscroller extends HTMLElement {
  public constructor() {
    super();
    const root = this.attachShadow({mode: "open"});
    root.append(cssOfStr(style), tplOfStr(tpl));

    const scroller = findOrFail(root, HTMLDivElement, "slow-scroller");
    const slot = root.querySelector("slot");
    if (!slot) throw new Error("ATSAutoscroller: slot not found");

    this.querySelectorAll("ats-autoscroller-item").forEach(item => {
      scroller.append(item.cloneNode(true));
    });
  }
}

customElements.define("ats-autoscroller", ATSAutoscroller);
