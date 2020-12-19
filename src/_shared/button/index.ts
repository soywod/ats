import {parseStyle, parseTpl} from "../dom-utils";
import style from "./index.css";
import tpl from "./index.html";

class Button extends HTMLButtonElement {
  protected _togglable: boolean;
  protected _active: boolean;

  protected static get observedAttributes() {
    return ["togglable", "active"];
  }

  protected attributeChangedCallback(name: string, _prevVal: string, nextVal: string) {
    switch (name) {
      case "togglable": {
        this._togglable = nextVal === null;
        break;
      }

      case "active": {
        this._active = nextVal === null;
        break;
      }

      default:
        break;
    }
  }

  public constructor() {
    super();

    this._togglable = this.hasAttribute("togglable");
    this._active = this.hasAttribute("active");

    this.append(parseTpl(tpl));
  }

  protected connectedCallback() {
    this.addEventListener("click", this.toggle);
  }

  protected disconnectedCallback() {
    this.removeEventListener("click", this.toggle);
  }

  public get togglable() {
    return this.hasAttribute("togglable");
  }

  public set togglable(togglable: boolean) {
    if (togglable) {
      this.setAttribute("togglable", "");
    } else {
      this.removeAttribute("togglable");
      this.removeAttribute("active");
    }
  }

  public get active() {
    return this.hasAttribute("active");
  }

  public set active(active: boolean) {
    if (active) {
      this.setAttribute("active", "");
    } else {
      this.removeAttribute("active");
    }
  }

  public toggle = () => {
    if (!this.togglable) {
      return false;
    }

    this.active = !this.hasAttribute("active");
    return this.active;
  };
}

customElements.define("ats-button", Button, {extends: "button"});
customElements.whenDefined("ats-button").then(() => document.head.prepend(parseStyle(style)));
