import { Static, Type } from "@sinclair/typebox";

// Item schema
export const itemSchema = Type.Object({
  id: Type.Number(),
  title: Type.String(),
  price: Type.Number(),
  description: Type.String(),
});
// Type
export type Item = Static<typeof itemSchema>;

// Items schema
export const itemsResponseSchema = {
  200: {
    items: Type.Object({
      products: Type.Array(itemSchema),
    }),
  },
};

export const getItemsSchema = {
  response: itemsResponseSchema,
};

// One item schema
export const itemParamsSchema = Type.Object({
  id: Type.String(),
});
// Type
export type ItemParams = Static<typeof itemParamsSchema>;

export const itemResponseSchema = {
  200: {
    item: itemSchema,
  },
};

export const getItemSchema = {
  params: itemParamsSchema,
  response: itemResponseSchema,
};
