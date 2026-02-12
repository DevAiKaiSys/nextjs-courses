import { defineType } from "sanity";

export const order = defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    {
      name: "orderNumber",
      title: "Order Number",
      type: "string",
      description: "Unique order number (auto-generated)",
      readOnly: true,
    },
    {
      name: "user",
      type: "reference",
      to: [{ type: "user" }],
      validation: (rule) => rule.required(),
    },
    {
      name: "userEmail",
      title: "User Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    },
    {
      name: "userName",
      title: "User Name",
      type: "string",
    },
    {
      name: "items",
      type: "array",
      title: "Order Items",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "foodId",
              type: "string",
              title: "Food ID",
              validation: (rule) => rule.required(),
            },
            {
              name: "name",
              type: "string",
              title: "Item Name",
              validation: (rule) => rule.required(),
            },
            {
              name: "image",
              type: "url",
              title: "Item Image",
              description: "URL to the food item image",
            },
            {
              name: "price",
              type: "number",
              title: "Price",
              validation: (rule) => rule.required().min(0),
            },
            {
              name: "quantity",
              type: "number",
              title: "Quantity",
              validation: (rule) => rule.required().min(1),
            },
            {
              name: "size",
              type: "string",
              title: "Size",
            },
            {
              name: "variety",
              type: "string",
              title: "Variety",
            },
          ],
          preview: {
            select: {
              title: "name",
              quantity: "quantity",
              price: "price",
            },
            prepare({ title, quantity, price }) {
              return {
                title: `${quantity}x ${title}`,
                subtitle: `$${(price * quantity).toFixed(2)}`,
              };
            },
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    },
    {
      name: "deliveryAddress",
      type: "object",
      title: "Delivery Address",
      fields: [
        {
          name: "type",
          type: "string",
          title: "Type",
        },
        {
          name: "label",
          type: "string",
          title: "Label",
        },
        {
          name: "street",
          type: "string",
          title: "Street",
          validation: (rule) => rule.required(),
        },
        {
          name: "apartment",
          type: "string",
          title: "Apartment/Suite",
        },
        {
          name: "city",
          type: "string",
          title: "City",
          validation: (rule) => rule.required(),
        },
        {
          name: "state",
          type: "string",
          title: "State",
          validation: (rule) => rule.required(),
        },
        {
          name: "zipCode",
          type: "string",
          title: "ZIP Code",
          validation: (rule) => rule.required(),
        },
        {
          name: "country",
          type: "string",
          title: "Country",
        },
        {
          name: "phone",
          type: "string",
          title: "Phone",
          validation: (rule) => rule.required(),
        },
        {
          name: "instructions",
          type: "text",
          title: "Delibery Instructions",
          rows: 2,
        },
      ],
      validation: (rule) => rule.required().min(0),
    },
    {
      name: "subtotal",
      type: "number",
      title: "Subtotal",
      validation: (rule) => rule.required().min(0),
    },
    {
      name: "deliveryFee",
      type: "number",
      title: "Delivery Fee",
      validation: (rule) => rule.required().min(0),
    },
    {
      name: "tax",
      type: "number",
      title: "Tax",
      validation: (rule) => rule.required().min(0),
    },
    {
      name: "total",
      type: "number",
      title: "Total Amount",
      validation: (rule) => rule.required().min(0),
    },
    {
      name: "originalTotal",
      type: "number",
      title: "Original Total",
      description:
        "Original order total before modifications (for refund tracking)",
      readOnly: true,
    },
    {
      name: "paymentMethod",
      type: "string",
      title: "Payment Method",
      options: {
        list: [
          { title: "Online (Strip)", value: "online" },
          { title: "Cash on Delivery", value: "cod" },
        ],
      },
      validation: (rule) => rule.required(),
    },
    {
      name: "paymentStatus",
      type: "string",
      title: "Payment Status",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Failed", value: "failed" },
        ],
      },
      initialValue: "pending",
      validation: (rule) => rule.required(),
    },
    {
      name: "status",
      type: "reference",
      title: "Order Status",
      to: [{ type: "orderStatus" }],
      validation: (rule) => rule.required(),
      options: {
        filter: "isActive == true",
      },
    },
    {
      name: "estimatedDeliveryTime",
      type: "string",
      title: "Estimated Delivery Time",
      description: 'E.g., "30-45 minutes"',
    },
    {
      name: "notes",
      type: "text",
      title: "Order Notes",
      description: "Internal notes about the order",
      rows: 3,
    },
    {
      name: "stripeSessionId",
      type: "string",
      title: "Stripe Seesion ID",
      description: "Stripe checkout session ID",
      readOnly: true,
    },
    {
      name: "stripePaymentIntext",
      type: "string",
      title: "Stripe Payment Intent",
      description: "Stripe payment intent ID",
      readOnly: true,
    },
  ],
  preview: {
    select: {
      orderNumber: "orderNumber",
      userEmail: "userEmail",
      total: "total",
      status: "status.title",
      createdAt: "_createdAt",
    },
    prepare({ orderNumber, userEmail, total, status, createdAt }) {
      return {
        title: orderNumber || "New Order",
        subtitle: `${userEmail} • $${total?.totFixed(2)} • ${status || "No Status"}`,
        description: new Date(createdAt).toLocaleDateString(),
      };
    },
  },
  orderings: [
    {
      title: "Created Date (Newest First)",
      name: "createdDesc",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
    {
      title: "Total Amount (Highest First)",
      name: "totalDesc",
      by: [{ field: "total", direction: "desc" }],
    },
  ],
});
