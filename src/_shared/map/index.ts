import Leaflet from "leaflet";

import {cssOfStr, tplOfStr, findOrFail} from "../dom-utils";
import css from "./index.css";
import tpl from "./index.html";

import iconUrl from "./marker.svg";

console.log(iconUrl);

const lat = 43.4481999;
const lng = 3.4144988;

class ATSMap extends HTMLElement {
  private map: Leaflet.Map;

  public constructor() {
    super();
    const root = this.attachShadow({mode: "open"});
    root.append(cssOfStr(css), tplOfStr(tpl));

    this.map = Leaflet.map(findOrFail(root, HTMLDivElement, "map")).setView([lat, lng], 15);
    this.map.scrollWheelZoom.disable();

    // TODO: add icon + popup
    new Leaflet.Marker({lat, lng}, {icon: new Leaflet.Icon({iconUrl, iconSize: [50, 50]})}).addTo(this.map);

    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; <a href=http://osm.org/copyright>OpenStreetMap</a> contributors",
    }).addTo(this.map);
  }
}

customElements.define("ats-map", ATSMap);
