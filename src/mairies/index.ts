import "../_shared/container";
import "../_shared/nav";
import "../_shared/carousel";
import "../_shared/autoscroller";
import "../_shared/img";
import "../_shared/frame";
import "../_shared/footer";

import section2cImg from "./section-2-c.jpeg";
import section2dImg from "./section-2-d.jpeg";

import {cssOfStr} from "../_shared/dom-utils";
import css from "./index.css";
import cssLg from "./index.lg.css";

const section2c = document.getElementById("section-2-c");
if (section2c) {
  section2c.style.backgroundImage = `url(${section2cImg})`;
}

const section2d = document.getElementById("section-2-d");
if (section2d) {
  section2d.style.backgroundImage = `url(${section2dImg})`;
}

document.head.append(cssOfStr(css), cssOfStr(cssLg));
