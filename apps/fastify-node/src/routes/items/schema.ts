import { Static, Type } from "@sinclair/typebox";

export const itemSchema = Type.Object(
  {
    id: Type.Number(),
    title: Type.String(),
    price: Type.Number(),
    description: Type.String(),
  },
  { $id: "Item" },
);
export type Item = Static<typeof itemSchema>;
