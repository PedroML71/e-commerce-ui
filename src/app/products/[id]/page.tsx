import { FC } from "react";
import Image from "next/image";
import { ProductType } from "@repo/types";
import ProductInteraction from "@/components/ProductInteraction";

interface ProductPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ color: string; size: string }>;
}

const fetchProduct = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products/${id}`
  );
  const data: ProductType = await res.json();
  return data;
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const product = await fetchProduct(id);

  return {
    title: product.name,
    description: product.description,
  };
};

const ProductPage: FC<ProductPageProps> = async ({ params, searchParams }) => {
  const { size, color } = await searchParams;
  const { id } = await params;

  const product = await fetchProduct(id);

  const selectedSize = size || (product.sizes[0] as string);
  const selectedColor = color || (product.colors[0] as string);

  return (
    <div className="flex flex-col gap-4 lg:flex-row md:gap-12 mt-12">
      {/* IMAGE */}
      <div className="w-full lg:w-5/12 relative aspect-[2/3]">
        <Image
          src={
            (product.images as Record<string, string>)?.[selectedColor] || ""
          }
          alt={product.name}
          fill
          className="object-contain rounded-md"
        />
      </div>

      {/* DETAILS */}
      <div className="w-full lg:w-7/12 flex flex-col gap-4">
        <h1 className="text-2xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <h2 className="text-2xl font-semibold">${product.price.toFixed(2)}</h2>

        {/* INTERACTION */}
        <ProductInteraction
          product={product}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
        />

        {/* CARD INFO */}
        <div className="flex items-center gap-2 mt-4">
          <Image
            src={"/klarna.png"}
            alt="klarna"
            width={50}
            height={25}
            className="rounded-md"
          />
          <Image
            src={"/cards.png"}
            alt="cards"
            width={50}
            height={25}
            className="rounded-md"
          />
          <Image
            src={"/stripe.png"}
            alt="stripe"
            width={50}
            height={25}
            className="rounded-md"
          />
        </div>
        <p className="text-gray-500 text-xs">
          By clicking Pay Now, you agree to our{" "}
          <span className="underline hover:text-black cursor-pointer">
            Terms & Conditions
          </span>{" "}
          and{" "}
          <span className="underline hover:text-black cursor-pointer">
            Privacy Policy
          </span>
          . You authorize us to charge your slected payment metehod for the
          total amount shown. All sales are subject to our return and{" "}
          <span className="underline hover:text-black cursor-pointer">
            Refund Policies
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
