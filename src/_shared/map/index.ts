import * as GoogleMaps from "@googlemaps/js-api-loader";

import {cssOfStr, tplOfStr, findOrFail} from "../dom-utils";
import css from "./index.css";
import tpl from "./index.html";

import iconUrl from "./marker.svg";

const lat = 43.4491423;
const lng = 3.4162896;

class ATSMap extends HTMLElement {
  public constructor() {
    super();
    const root = this.attachShadow({mode: "open"});
    root.append(cssOfStr(css), tplOfStr(tpl));
    const loader = new GoogleMaps.Loader({
      apiKey: "AIzaSyAuEN_xiE_vdoeo2javFrvDlAFBPBcsiQ4",
      version: "weekly",
    });

    loader.load().then(() => {
      const map = new window.google.maps.Map(findOrFail(root, HTMLDivElement, "map"), {
        center: {lat, lng},
        zoom: 15,
      });

      new google.maps.Marker({
        position: {lat, lng},
        icon: iconUrl,
        map: map,
      });
    });
  }
}

customElements.define("ats-map", ATSMap);
