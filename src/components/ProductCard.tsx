"use client";

import { FC } from "react";
import { ProductType } from "@/types";

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <>
      <div>ProductCard</div>
    </>
  );
};

export default ProductCard;
