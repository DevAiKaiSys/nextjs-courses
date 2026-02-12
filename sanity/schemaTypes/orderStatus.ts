import { defineType } from "sanity";

export const orderStatus = defineType({
  name: "orderStatus",
  title: "Order Status",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Status Title",
      validation: (rule) => rule.required(),
    },
    {
      name: "value",
      type: "slug",
      title: "Status Value",
      description: "URL-friendly indentifier identifier for this status",
      options: {
        source: "name",
        maxLength: 50,
      },
      validation: (rule) => rule.required(),
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      description: "What this status means",
      rows: 2,
    },
    {
      name: "color",
      type: "string",
      title: "Color",
      description: "Enter hex color code (e.g., #3B82F6)",
      placeholder: "#3B82F6",
      initialValue: "#9CA3AF",
      validation: (rule) =>
        rule.custom((value: string | undefined) => {
          if (!value) return true;
          const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
          return (
            hexRegex.test(value) ||
            "Please enter a valid hex color code (e.g., #3B82F6)"
          );
        }),
    },
    {
      name: "order",
      type: "number",
      title: "Display Order",
      description: "Order in which this status appears in lists",
      validation: (rule) => rule.required().min(0),
    },
    {
      name: "isDefault",
      type: "boolean",
      title: "Is Default Status",
      description: "Use this status as the default for new orders",
      initialValue: false,
    },
    {
      name: "isActive",
      type: "boolean",
      title: "Is Active",
      description: "Whether this status is currently in use",
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      isDefault: "isDefault",
      isActive: "isActiver",
    },
    prepare({ title, description, isDefault, isActive }) {
      return {
        title: `${title}${isDefault ? " (Default)" : ""}${!isActive ? " (Inactive)" : ""}`,
        subtitle: description,
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
