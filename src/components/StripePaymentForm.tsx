"use client";

import { FC, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import { useAuth } from "@clerk/nextjs";
import { ShippingFormInputs } from "@/types";
import CheckoutForm from "./CheckoutForm";
import useCartStore from "@/stores/cartStore";
import { CartItemsType } from "@repo/types";

const stripe = loadStripe(
  "pk_test_51SLCINL9CviYml4frOBB0CfILgbEUyxOcl5IlzE3KheEewKMdWXF1mff3EY7Xtlvy0XkXjljih4gwHEnA3Ek9SiB00B91NQJfW"
);

const fetchClientSecret = async (token: string, cart: CartItemsType) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/sessions/create-checkout-session`,
    {
      method: "POST",
      body: JSON.stringify({ cart }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => response.json())
    .then((json) => json.checkoutSessionClientSecret);
};

interface StripePaymentFormProps {
  shippingForm: ShippingFormInputs;
}

const StripePaymentForm: FC<StripePaymentFormProps> = ({ shippingForm }) => {
  const { getToken } = useAuth();
  const { cart } = useCartStore();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const loadClientSecret = async () => {
      const token = await getToken();

      if (token) {
        const secret = await fetchClientSecret(token, cart);
        setClientSecret(secret);
      }
    };

    loadClientSecret();
  }, [getToken]);

  if (!clientSecret) {
    return <div className="">Loading...</div>;
  }

  return (
    <CheckoutProvider stripe={stripe} options={{ clientSecret }}>
      <CheckoutForm shippingForm={shippingForm} />
    </CheckoutProvider>
  );
};

export default StripePaymentForm;
