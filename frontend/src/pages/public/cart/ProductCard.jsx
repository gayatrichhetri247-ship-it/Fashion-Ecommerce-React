import React from "react";
import CryptoJS from "crypto-js";
import { useLocation, Navigate } from "react-router-dom";

const Payment = () => {
  const { state } = useLocation();

  const total_amount = state?.total_amount;
  const transaction_uuid = state?.orderId;

  if (!total_amount || !transaction_uuid) {
    return <Navigate to="/" replace />;
  }

  const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=EPAYTEST`;

  const signature = CryptoJS.enc.Base64.stringify(
    CryptoJS.HmacSHA256(
      message,
      import.meta.env.VITE_ESEWA_SECRET_KEY
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-pink-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-pink-600">
          eSewa Payment
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Complete your payment securely
        </p>

        <div className="mt-8 bg-pink-50 rounded-lg p-4 border">
          <div className="flex justify-between">
            <span className="font-semibold">Amount</span>
            <span className="font-bold text-pink-600">
              Rs. {total_amount}
            </span>
          </div>

          <div className="flex justify-between mt-3 text-sm">
            <span>Order ID</span>
            <span>{transaction_uuid}</span>
          </div>
        </div>

        <form
          action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
          method="POST"
          className="mt-8"
        >
          <input
            type="hidden"
            name="amount"
            value={total_amount}
            readOnly
          />

          <input
            type="hidden"
            name="tax_amount"
            value="0"
            readOnly
          />

          <input
            type="hidden"
            name="total_amount"
            value={total_amount}
            readOnly
          />

          <input
            type="hidden"
            name="transaction_uuid"
            value={transaction_uuid}
            readOnly
          />

          <input
            type="hidden"
            name="product_code"
            value="EPAYTEST"
            readOnly
          />

          <input
            type="hidden"
            name="product_service_charge"
            value="0"
            readOnly
          />

          <input
            type="hidden"
            name="product_delivery_charge"
            value="0"
            readOnly
          />

          {/* CHANGE THIS TO YOUR DEPLOYED BACKEND */}
          <input
            type="hidden"
            name="success_url"
            value="https://fashion-ecommerce-react.onrender.com/api/orders/success"
            readOnly
          />

          <input
            type="hidden"
            name="failure_url"
            value="https://developer.esewa.com.np/failure"
            readOnly
          />

          <input
            type="hidden"
            name="signed_field_names"
            value="total_amount,transaction_uuid,product_code"
            readOnly
          />

          <input
            type="hidden"
            name="signature"
            value={signature}
            readOnly
          />

          <button
            type="submit"
            className="w-full mt-2 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Pay with eSewa
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;