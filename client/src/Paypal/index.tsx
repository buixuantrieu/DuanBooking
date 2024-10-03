/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalPaymentProps {
  callback: () => void;
  createBooking: () => void;
  amount: number;
  description?: string;
}

const PayPalPayment: React.FC<PayPalPaymentProps> = ({
  callback,
  createBooking,
  amount,
  description = "MingsuBooking",
}) => {
  const clientId = "AToEwf1qTO16y9oSeG_vE5_jeGAU7v8uC4KT9iwyHdBsZopg8T-1vG7qH5BYQ1UyMqWZqmpzO_qXtkkl";

  const createOrder = async (_data: any, actions: any) => {
    createBooking();
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount.toString(),
          },
          description,
        },
      ],
    });
  };
  const onApprove = async (_data: any, actions: any) => {
    try {
      await actions.order.capture();
      if (typeof callback === "function") {
        callback();
      }
      window.location.href = "http://localhost:5173/notification";
    } catch (error) {
      console.error("Error capturing order:", error);
    }
  };

  return (
    <PayPalScriptProvider options={{ clientId, currency: "USD" }}>
      <div style={{ width: "100%" }}>
        <PayPalButtons style={{ layout: "vertical" }} createOrder={createOrder} onApprove={onApprove} />
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalPayment;
