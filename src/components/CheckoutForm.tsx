"use client";

import { FC, useState } from "react";
import { ShippingFormInputs } from "@/types";
import { ConfirmError } from "@stripe/stripe-js";
import { useCheckout, PaymentElement } from "@stripe/react-stripe-js/checkout";

interface CheckoutFormProps {
  shippingForm: ShippingFormInputs;
}

const CheckoutForm: FC<CheckoutFormProps> = ({ shippingForm }) => {
  const checkoutState = useCheckout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ConfirmError | null>(null);

  if (checkoutState.type === "loading") {
    return <div>Loading...</div>;
  } else if (checkoutState.type === "error") {
    return <div>Error: {checkoutState.error.message}</div>;
  }

  const handleClick = async () => {
    setLoading(true);
    await checkoutState.checkout.updateEmail(shippingForm.email);
    await checkoutState.checkout.updateShippingAddress({
      name: "shipping_address",
      address: {
        line1: shippingForm.address,
        city: shippingForm.city,
        country: "BR",
      },
    });

    const res = await checkoutState.checkout.confirm();

    if (res.type === "error") {
      setError(res.error);
    }
    setLoading(false);
  };

  return (
    <form>
      <PaymentElement options={{ layout: "accordion" }} />
      <button disabled={loading} onClick={handleClick}>
        {loading ? "Loading..." : "Pay"}
      </button>
      {error && <div className="">{error.message}</div>}
    </form>
  );
};

export default CheckoutForm;
