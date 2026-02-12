import { ControlsIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const userRole = defineType({
  name: "userRole",
  title: "User Roles",
  type: "document",
  icon: ControlsIcon,
  fields: [
    defineField({
      name: "name",
      title: "Role Name",
      type: "string",
      validation: (rule) => rule.required(),
      description:
        "Display name for the role (e.g., 'Administrator', 'Customer')",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 50,
      },
      validation: (rule) => rule.required(),
      description:
        "Unique identifier for the role (e.g., 'admin'components, 'user')",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Description of what this role can do",
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: true,
      description: "Whether this role can be assigned to users",
    }),
    defineField({
      name: "priority",
      title: "Priority Level",
      type: "number",
      validation: (rule) => rule.required().min(0).max(100),
      initialValue: 10,
      description:
        "Higher numbers indicate higher priority (e.g., Admin = 100, User = 10)",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "description",
      isActive: "isActive",
      priority: "priority",
    },
    prepare({ title, subtitle, isActive, priority }) {
      return {
        title: `${title}${!isActive ? " (Inactive)" : ""}`,
        subtitle: `Priority: ${priority} - ${subtitle || "No description"}`,
      };
    },
  },
});
