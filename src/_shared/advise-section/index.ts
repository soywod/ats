import {cssOfStr, tplOfStr} from "../../_shared/dom-utils";
import {ATSLazySection} from "../lazy-section";
import css from "./index.css";
import tpl from "./index.html";

class ATSAdviseSection extends ATSLazySection {
  public constructor() {
    super();

    if (this.shadowRoot) {
      this.shadowRoot.append(cssOfStr(css), tplOfStr(tpl));
    }
  }
}

customElements.define("ats-advise-section", ATSAdviseSection);
