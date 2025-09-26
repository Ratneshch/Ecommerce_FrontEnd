import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const status = searchParams.get("status"); // PhonePe returns status query param
    const orderId = searchParams.get("orderId");

    if (status === "SUCCESS") {
      toast.success("Payment successful!");
      navigate(`/order-success/${orderId}`);
    } else {
      toast.error("Payment failed or cancelled!");
      navigate("/checkout");
    }
  }, [searchParams, navigate]);

  return <div className="text-center mt-20 text-xl">Processing Payment...</div>;
};

export default PaymentCallback;
