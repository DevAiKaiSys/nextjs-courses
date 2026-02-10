import { defineField, defineType } from "sanity";

export const banner = defineType({
  name: "banner",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
  ],
});
