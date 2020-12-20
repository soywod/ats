import "../_shared/container";
import "../_shared/nav";
import "../_shared/carousel";
import "../_shared/autoscroller";
import "../_shared/frame";
import "../_shared/footer";

import {parseStyle} from "../_shared/dom-utils";
import style from "./index.css";

document.head.append(parseStyle(style));
