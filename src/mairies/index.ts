import "../_shared/container";
import "../_shared/nav";
import "../_shared/carousel";
import "../_shared/autoscroller";
import "../_shared/img";
import "../_shared/frame";
import "../_shared/footer";

import {cssOfStr} from "../_shared/dom-utils";
import css from "./index.css";
import cssLg from "./index.lg.css";

document.head.append(cssOfStr(css), cssOfStr(cssLg));
