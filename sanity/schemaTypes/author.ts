import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Event",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "user",
      title: "User",
      description: "Select a system user to associate with this author profile",
      type: "reference",
      to: [{ type: "user" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Override the user's name for display (optional).",
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
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Override the user's profile image (optional).",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "name",
      userTitle: "user.name",
      media: "image",
      userMedia: "user.image",
    },
    prepare({ title, userTitle, media, userMedia }) {
      return {
        title: title || userTitle || "Unnamed Author",
        subtitle: title ? `Linked to: ${userTitle}` : "Using User Name",
        media: media || userMedia,
      };
    },
  },
});
