import { address } from "./address";
import { author } from "./author";
import { banner } from "./banner";
import { blogCategory } from "./blogCategory";
import { category } from "./category";
import { food } from "./food";
import { foodVariety } from "./foodVariety";
import { ingredient } from "./ingredient";
import { menu } from "./menu";
import { openingHours } from "./openingHours";
import { order } from "./order";
import { orderStatus } from "./orderStatus";
import { post } from "./post";
import { restaturant } from "./restaturant";
import { review } from "./review";
import { size } from "./size";
import { user } from "./user";
import { userRole } from "./userRole";

// export const schema: { types: SchemaTypeDefinition[] } = {
//   types: [banner],
// };
export const schemaTypes = [
  banner,
  category,
  food,
  foodVariety,
  ingredient,
  menu,
  size,
  order,
  orderStatus,
  user,
  userRole,
  address,
  review,
  restaturant,
  openingHours,
  post,
  author,
  blogCategory,
];
