import { type SchemaTypeDefinition } from "sanity";

import brand from "./brand";
import navigation from "./navigation";
import home from "./home";
import about from "./about";
import portfolio from "./portfolio";
import people from "./people";
import invest from "./invest";
import contact from "./contact";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [brand, navigation, home, about, portfolio, people, invest, contact],
};
