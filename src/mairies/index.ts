import "../_shared/autoscroller";
import "../_shared/carousel";
import "../_shared/container";
import "../_shared/footer";
import "../_shared/frame";
import "../_shared/img";
import "../_shared/intersection-box";
import "../_shared/nav";

import section2cImg from "./section-2-c.jpeg";
import section2dImg from "./section-2-d.jpeg";
import section5bImg from "./section-5-b.jpeg";
import section5dImg from "./section-5-d.jpeg";

import {findOrFail, cssOfStr} from "../_shared/dom-utils";
import css from "./index.css";
import cssLg from "./index.lg.css";

findOrFail(document, HTMLDivElement, "section-2-c").style.backgroundImage = `url(${section2cImg})`;
findOrFail(document, HTMLDivElement, "section-2-d").style.backgroundImage = `url(${section2dImg})`;
findOrFail(document, HTMLDivElement, "section-5-b").style.backgroundImage = `url(${section5bImg})`;
findOrFail(document, HTMLDivElement, "section-5-d").style.backgroundImage = `url(${section5dImg})`;

document.head.append(cssOfStr(css), cssOfStr(cssLg));
