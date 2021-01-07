import "./group";

import {cssOfStr, tplOfStr} from "../dom-utils";
import css from "./index.css";
import tpl from "./index.html";

export class ATSIntersectionBox extends HTMLElement {
  /**
   * Intersection threshold (between 0 and 1)
   */
  private threshold: number;

  /**
   * Intersection observable
   */
  private obs$: IntersectionObserver;

  public constructor() {
    super();
    this.attachShadow({mode: "open"}).append(cssOfStr(css), tplOfStr(tpl));
    this.threshold = parseFloat(this.getAttribute("threshold") || "") || 0;

    this.obs$ = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          console.log(entry);

          if (entry.isIntersecting) {
            this.setAttribute("intersecting", "");
          } else {
            this.removeAttribute("intersecting");
          }
        });
      },
      {threshold: [this.threshold]},
    );
  }

  protected connectedCallback() {
    this.obs$.observe(this);
  }

  protected disconnectedCallback() {
    this.obs$.unobserve(this);
  }
}

customElements.define("ats-intersection-box", ATSIntersectionBox);
