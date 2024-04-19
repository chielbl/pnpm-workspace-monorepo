import { Static, Type } from "@sinclair/typebox";

export const itemSchema = Type.Object(
  {
    id: Type.String(),
    title: Type.String(),
    description: Type.String(),
    shortDescription: Type.Optional(Type.String()),
    price: Type.Number(),
    discountPercentage: Type.Optional(Type.Number()),
    rating: Type.Optional(Type.Number()),
    stock: Type.Number(),
    category: Type.String(),
    thumbnail: Type.String(),
    images: Type.Array(Type.String()),
    createdAt: Type.String(),
    updatedAt: Type.String(),
  },
  { $id: "Item" }
);

// DTO stands for Data Transfer Object
export type ItemDTO = Static<typeof itemSchema>;
