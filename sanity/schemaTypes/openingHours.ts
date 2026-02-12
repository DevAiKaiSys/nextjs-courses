import { defineField, defineType } from "sanity";

export const openingHours = defineType({
  name: "openingHours",
  title: "Opening Hours",
  type: "document",
  initialValue: () => ({
    name: "Standard Hours",
    scheduler: [
      { day: "monday", openTime: "10:00", closeTime: "23:00", isclosed: false },
      {
        day: "tuesday",
        openTime: "10:00",
        closeTime: "23:00",
        isclosed: false,
      },
      {
        day: "wednesday",
        openTime: "10:00",
        closeTime: "23:00",
        isclosed: false,
      },
      {
        day: "thursday",
        openTime: "10:00",
        closeTime: "23:00",
        isclosed: false,
      },
      { day: "friday", openTime: "10:00", closeTime: "23:00", isclosed: false },
      {
        day: "saturday",
        openTime: "10:00",
        closeTime: "23:00",
        isclosed: false,
      },
      { day: "sunday", openTime: "10:00", closeTime: "23:00", isclosed: false },
    ],
  }),
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "e.g., 'Standard Hours', 'Holiday Hours', 'Weekend Hours'",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "scheduler",
      title: "Scheduler",
      type: "array",
      initialValue: [
        {
          day: "monday",
          openTime: "10:00",
          closeTime: "23:00",
          isclosed: false,
        },
        {
          day: "tuesday",
          openTime: "10:00",
          closeTime: "23:00",
          isclosed: false,
        },
        {
          day: "wednesday",
          openTime: "10:00",
          closeTime: "23:00",
          isclosed: false,
        },
        {
          day: "friday",
          openTime: "10:00",
          closeTime: "23:00",
          isclosed: false,
        },
        {
          day: "monday",
          openTime: "10:00",
          closeTime: "23:00",
          isclosed: false,
        },
        {
          day: "saturday",
          openTime: "10:00",
          closeTime: "23:00",
          isclosed: false,
        },
        {
          day: "sunday",
          openTime: "10:00",
          closeTime: "23:00",
          isclosed: false,
        },
      ],
      of: [
        {
          type: "object",
          fields: [
            {
              name: "day",
              title: "Day",
              type: "string",
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
              validation: (rule) => rule.required(),
            },
            {
              name: "openTime",
              title: "Opening Time",
              type: "string",
              description: "Format: HH:MM (24-hour format)",
              validation: (rule) => rule.required(),
            },
            {
              name: "closeTime",
              title: "Closing Time",
              type: "string",
              description: "Format: HH:MM (24-hour format)",
              validation: (rule) => rule.required(),
            },
            {
              name: "isClosed",
              title: "Closed",
              type: "boolean",
              initialValue: false,
            },
          ],
          preview: {
            select: {
              day: "day",
              openTime: "openTime",
              closeTime: "closeTime",
              isClosed: "isClosed",
            },
            prepare({ day, openTime, closeTime, isClosed }) {
              return {
                title: day.charAt(0).toUpperCase() + day.slice(1),
                subtitle: isClosed ? "Closed" : `${openTime} - ${closeTime}`,
              };
            },
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Optional description for this schedule",
    }),
  ],
  preview: {
    select: {
      title: "name",
      description: "description",
    },
    prepare({ title, description }) {
      return {
        title,
        subtitle: description || "Opening Hours Schedule",
      };
    },
  },
});
