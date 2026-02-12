import { defineField, defineType } from "sanity";

export const address = defineType({
  name: "address",
  title: "Addresses",
  type: "document",
  fields: [
    defineField({
      name: "user",
      title: "User",
      type: "reference",
      to: [{ type: "user" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "type",
      title: "Address Type",
      type: "string",
      options: {
        list: [
          { title: "Home", value: "home" },
          { title: "Work", value: "work" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Address Label",
      type: "string",
      description: "Custom label for this address (e.g., Home, Work)",
    }),
    defineField({
      name: "street",
      title: "Street Address",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "apartment",
      title: "Apartment/Suite",
      type: "string",
    }),
    defineField({
      name: "ciry",
      title: "City",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "state",
      title: "State",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "zipCode",
      title: "ZIP Code",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      initialValue: "United States",
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "instructions",
      title: "Delivery Instructions",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "isDefault",
      title: "Default Address",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      street: "street",
      city: "city",
      state: "state",
      type: "type",
      isDefault: "isDefault",
    },
    prepare({ street, city, state, type, isDefault }) {
      return {
        title: `${street}`,
        subtitle: `${city}, ${state}${isDefault ? " (Default)" : ""}}`,
        description: type,
      };
    },
  },
});
