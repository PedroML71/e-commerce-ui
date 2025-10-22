import { FC } from "react";
import { auth } from "@clerk/nextjs/server";

interface TestPageProps {}

const TestPage: FC<TestPageProps> = async ({}) => {
  const { getToken } = await auth();
  const token = await getToken();
  console.log({ token });

  const resProduct = await fetch("http://localhost:8000/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataProduct = await resProduct.json();

  const resOrder = await fetch("http://localhost:8001/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataOrder = await resOrder.json();

  const resPayment = await fetch("http://localhost:8002/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const dataPayment = await resPayment.json();

  console.log({ dataProduct, dataOrder, dataPayment });

  return (
    <>
      <div>page</div>
    </>
  );
};

export default TestPage;
