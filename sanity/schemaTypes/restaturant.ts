import { defineField, defineType } from "sanity";

export const restaturant = defineType({
  name: "restaturant",
  title: "Restaturants",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Restaturant Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Restaurant Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "object",
      fields: [
        {
          name: "address",
          title: "Address",
          type: "string",
          validation: (rule) => rule.required(),
        },
        {
          name: "latitude",
          title: "Latitude",
          type: "number",
          validation: (rule) => rule.required(),
        },
        {
          name: "longitude",
          title: "Longitude",
          type: "number",
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone Nuber",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "text",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "openingHours",
      title: "Opening Hours",
      type: "reference",
      to: [{ type: "openingHours" }],
      description: "Select the opening hours schedule for this restaurant",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "allFoodItemsAvailable",
      title: "Enable All Food Items",
      type: "boolean",
      description:
        "If enabled, all food items will be available at this restaurant",
    }),
    defineField({
      name: "foodItems",
      title: "Avalilable Food Items",
      type: "array",
      of: [{ type: "reference", to: [{ type: "food" }] }],

      description: "Select food items available at this restaurant",
      hidden: ({ document }) => document?.allFoodItemsAvailable === true,
    }),
    defineField({
      name: "categories",
      title: "Food Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      description: "Categories of food available at this restaurant",
    }),
    defineField({
      name: "rating",
      title: "Average Rating",
      type: "number",
      validation: (rule) => rule.min(0).max(5),
      readOnly: true,
    }),
    defineField({
      name: "totalReviews",
      title: "Total Rating",
      type: "number",
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: true,
      description: "Is the restaurant currently accepting orders?",
    }),
    defineField({
      name: "deliveryFee",
      title: "Delivery Fee",
      type: "number",
      validation: (rule) => rule.required().min(0),
      initialValue: 0,
    }),
    defineField({
      name: "minimunOrder",
      title: "Minimum order Amount",
      type: "number",
      validation: (rule) => rule.min(0),
      initialValue: 0,
    }),
    defineField({
      name: "estimatedDelivertTime",
      title: "Estimated Delivery Time (minutes)",
      type: "number",
      validation: (rule) => rule.required().min(0),
      initialValue: 30,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Used for sorting restaurants",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "name",
      address: "location.address",
      media: "image",
      isActive: "isActive",
    },
    prepare({ title, address, media, isActive }) {
      return {
        title,
        subtitle: `${address} ${isActive ? "✅" : "❌"}`,
        media,
      };
    },
  },
});
