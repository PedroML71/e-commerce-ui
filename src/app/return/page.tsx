import { FC } from "react";
import Link from "next/link";

interface ReturnPageProps {
  searchParams: Promise<{ session_id: string } | undefined>;
}

const ReturnPage: FC<ReturnPageProps> = async ({ searchParams }) => {
  const session_Id = (await searchParams)?.session_id;

  if (!session_Id) {
    return <div>No session id found</div>;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/${session_Id}`
  );
  const data = await res.json();

  return (
    <>
      <h1>Payment: {data.status}</h1>
      <p>Payment Status: {data.paymentStatus}</p>
      <Link href={"/orders"}>See your orders</Link>
    </>
  );
};

export default ReturnPage;
