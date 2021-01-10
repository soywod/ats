import {cssOfStr, tplOfStr} from "../dom-utils";
import css from "./index.css";
import tpl from "./index.html";

type Type = "translate-x" | "rotate-y";

function isType(type: any): type is Type {
  switch (type) {
    case "translate-x":
    case "rotate-y":
      return true;

    default:
      return false;
  }
}

type Direction = "normal" | "reverse";

function isDirection(direction: any): direction is Direction {
  return direction === "normal" || direction === "reverse";
}

export class ATSParallaxeBox extends HTMLElement {
  private ratio = 1;
  private type: Type = "translate-x";
  private direction: Direction = "normal";

  public constructor() {
    super();
    this.attachShadow({mode: "open"}).append(cssOfStr(css), tplOfStr(tpl));

    const ratio = this.getAttribute("ratio");
    if (ratio) this.ratio = parseFloat(ratio);

    const type = this.getAttribute("type");
    if (isType(type)) this.type = type;

    const direction = this.getAttribute("direction");
    if (isDirection(direction)) this.direction = direction;
  }

  private handleMouseOver = (evt: MouseEvent) => {
    const direction = this.direction === "normal" ? 1 : -1;
    const deltaX = direction * (this.clientWidth * 0.5 - evt.clientX) * this.ratio;
    this.style.transform = (() => {
      const scale = "scale(1.05)";

      switch (this.type) {
        case "translate-x":
          return `${scale} translateX(${deltaX}px)`;

        case "rotate-y":
          return `${scale} perspective(120rem) rotateY(${deltaX}deg)`;

        default:
          return scale;
      }
    })();
  };

  protected connectedCallback() {
    document.addEventListener("mousemove", this.handleMouseOver);
  }

  protected disconnectedCallback() {
    document.removeEventListener("mousemove", this.handleMouseOver);
  }
}

customElements.define("ats-parallaxe-box", ATSParallaxeBox);
