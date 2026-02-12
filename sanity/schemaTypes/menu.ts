import { defineField, defineType } from "sanity";

export const menu = defineType({
  name: "menu",
  title: "Menus",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Menu Name",
      type: "string",
      description:
        "e.g., Breakfast Menu, Lunch Menu, Dinner Menu, Weekend Special",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "image",
      title: "Menu Image",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      description: "Categories included in this menu",
    }),
    defineField({
      name: "foodItems",
      title: "Food Items",
      type: "array",
      of: [{ type: "reference", to: [{ type: "food" }] }],
      description: "Specific food items in this menu",
    }),
    defineField({
      name: "availableFrom",
      title: "Available From (Time)",
      type: "string",
      description: "e.g., 06:00 AM",
    }),
    defineField({
      name: "availableTo",
      title: "Available To (Time)",
      type: "string",
      description: "e.g., 11:00 AM",
    }),
    defineField({
      name: "availableDays",
      title: "Available Days",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Monday", value: "monday" },
          { title: "Tuesday", value: "tuesday" },
          { title: "Wednesday", value: "wednesday" },
          { title: "Thursday", value: "thursday" },
          { title: "Friday", value: "friday" },
          { title: "Saturday", value: "saturday" },
          { title: "Sunday", value: "sunday" },
        ],
      },
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "Featured Menu",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "description",
      media: "image",
    },
  },
});
