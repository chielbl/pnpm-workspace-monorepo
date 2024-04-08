import { Static, Type } from "@sinclair/typebox";

// ### GET item(s) schema
export const itemSchema = Type.Object({
  id: Type.Number(),
  title: Type.String(),
  price: Type.Number(),
  description: Type.String(),
});
export type Item = Static<typeof itemSchema>;

export const itemParamsSchema = Type.Object({
  id: Type.String(),
});
export type ItemParams = Static<typeof itemParamsSchema>;

export const getItemSchema = {
  params: itemParamsSchema,
  response: {
    200: {
      item: itemSchema,
    },
  },
};

export const getItemsSchema = {
  response: {
    200: {
      items: {
        products: Type.Array(itemSchema),
      },
    },
  },
};
//

// ### ADD item schema
export const itemBodySchema = Type.Object({
  title: Type.String(),
  price: Type.Number(),
  description: Type.String(),
});
export type ItemBody = Static<typeof itemBodySchema>;

export const addItemSchema = {
  body: itemBodySchema,
  response: {
    201: {
      item: itemSchema,
    },
  },
};
//

// DELETE item schema
export const deleteItemSchema = {
  params: itemParamsSchema,
  response: {
    200: {
      message: Type.String(),
    },
  },
};
