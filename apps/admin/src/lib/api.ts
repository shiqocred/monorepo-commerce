import { apiUrl } from "@/config";
import { treaty } from "@elysiajs/eden";

import type { App } from "api";

export const dataApi = treaty<App>(apiUrl);
