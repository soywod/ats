import Leaflet from "leaflet";

import {cssOfStr, tplOfStr, findOrFail} from "../dom-utils";
import css from "./index.css";
import tpl from "./index.html";

class ATSMap extends HTMLElement {
  private map: Leaflet.Map;

  public constructor() {
    super();
    const root = this.attachShadow({mode: "open"});
    root.append(cssOfStr(css), tplOfStr(tpl));

    this.map = Leaflet.map(findOrFail(root, HTMLDivElement, "map")).setView([43.4481999, 3.4144988], 15);
    this.map.scrollWheelZoom.disable();

    // TODO: add icon + popup
    /* new Leaflet.Marker({lat: 51.505, lng: -0.09}).addTo(this.map); */
    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; <a href=http://osm.org/copyright>OpenStreetMap</a> contributors",
    }).addTo(this.map);
  }
}

customElements.define("ats-map", ATSMap);
