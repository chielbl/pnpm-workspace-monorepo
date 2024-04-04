import { Static, Type } from "@sinclair/typebox";

export const itemSchema = Type.Object({
  id: Type.Number(),
  title: Type.String(),
  price: Type.Number(),
  description: Type.String(),
});
export type Item = Static<typeof itemSchema>;

export const getAllItemSchema = {
  schema: {
    response: {
      200: Type.Object({
        items: Type.Object({
          products: Type.Array(itemSchema),
        }),
      }),
    },
  },
};

export const getItemSchema = {
  schema: {
    response: {
      200: {
        item: itemSchema,
      },
    },
  },
};
