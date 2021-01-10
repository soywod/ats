import {ATSIntersectionBox} from "../intersection-box";

import {cssOfStr} from "../dom-utils";
import css from "./index.css";

export class ATSLazySection extends ATSIntersectionBox {
  public constructor() {
    super();

    if (!this.hasAttribute("threshold")) {
      this.threshold = 0.15;
    }

    if (this.shadowRoot) {
      this.shadowRoot.append(cssOfStr(css));
    }
  }
}

customElements.define("ats-lazy-section", ATSLazySection);
