import { Static, Type } from "@sinclair/typebox";

// Item schema + Type
export const itemSchema = Type.Object({
  id: Type.Number(),
  title: Type.String(),
  price: Type.Number(),
  description: Type.String(),
});
export type Item = Static<typeof itemSchema>;

// All items schema
export const allItemResponseSchema = {
  200: {
    items: Type.Object({
      products: Type.Array(itemSchema),
    }),
  },
};
export const getAllItemSchema = {
  schema: {
    response: allItemResponseSchema,
  },
};

// One item schema
export const itemParamsSchema = Type.Object({
  id: Type.String(),
});
export const itemResponseSchema = {
  200: {
    item: itemSchema,
  },
};
export const getItemSchema = {
  schema: {
    params: itemParamsSchema,
    response: itemResponseSchema,
  },
};
