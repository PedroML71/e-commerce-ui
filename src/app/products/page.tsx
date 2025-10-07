import { FC } from "react";
import ProductList from "@/components/ProductList";

interface ProductsPageProps {
  searchParams: Promise<{ category: string }>;
}

const ProductsPage: FC<ProductsPageProps> = async ({ searchParams }) => {
  const category = (await searchParams).category;

  return (
    <div className="">
      <ProductList category={category} params="products" />
    </div>
  );
};

export default ProductsPage;
