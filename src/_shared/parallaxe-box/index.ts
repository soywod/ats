import {cssOfStr, tplOfStr} from "../dom-utils";
import css from "./index.css";
import tpl from "./index.html";

type Direction = "normal" | "reverse";

function isDirection(direction: any): direction is Direction {
  return direction === "normal" || direction === "reverse";
}

export class ATSParallaxeBox extends HTMLElement {
  private value = 1;
  private direction: Direction = "normal";

  public constructor() {
    super();
    this.attachShadow({mode: "open"}).append(cssOfStr(css), tplOfStr(tpl));

    const value = this.getAttribute("value");
    if (value) this.value = parseFloat(value);

    const direction = this.getAttribute("direction");
    if (isDirection(direction)) this.direction = direction;
  }

  private handleMouseOver = (evt: MouseEvent) => {
    const direction = this.direction === "normal" ? 1 : -1;
    const deltaX = (direction * (this.clientWidth * 0.5 - evt.clientX)) / this.value;
    this.style.transform = `scale(1.05) translateX(${deltaX}px)`;
  };

  protected connectedCallback() {
    document.addEventListener("mousemove", this.handleMouseOver);
  }

  protected disconnectedCallback() {
    document.removeEventListener("mousemove", this.handleMouseOver);
  }
}

customElements.define("ats-parallaxe-box", ATSParallaxeBox);
