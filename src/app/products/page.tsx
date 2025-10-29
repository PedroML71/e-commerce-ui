import { FC } from "react";
import ProductList from "@/components/ProductList";

interface ProductsPageProps {
  searchParams: Promise<{ category: string; sort: string; search: string }>;
}

const ProductsPage: FC<ProductsPageProps> = async ({ searchParams }) => {
  const category = (await searchParams).category;
  const sort = (await searchParams).sort;
  const search = (await searchParams).search;

  return (
    <div className="">
      <ProductList
        category={category}
        sort={sort}
        search={search}
        params="products"
      />
    </div>
  );
};

export default ProductsPage;
