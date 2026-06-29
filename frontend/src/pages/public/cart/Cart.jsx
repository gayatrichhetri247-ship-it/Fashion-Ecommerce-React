import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  remove,
} from "../../../redux/features/cartSlice";
import { NavLink, useNavigate } from "react-router";
import { createOrder } from "../../../api/order.service";
import ProductCard from "./ProductCard";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total price dynamically
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const deliveryFee = 0;
  const total_amount = subtotal + deliveryFee;

  const handlePayment = async () => {
    const products = cart.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    }));

    const res = await createOrder(products);
    navigate("/payment", { state: { total_amount, orderId: res.order._id } });
    console.log(res);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-black tracking-tight text-pink-600 mb-8 font-serif">
          Your Products Cart
        </h1>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            {/* Cart Items List */}
            <div className="space-y-4 lg:col-span-7">
              {cart.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onIncrement={() => dispatch(increment(product._id))}
                  onDecrement={() => dispatch(decrement(product._id))}
                  onRemove={() => dispatch(remove(product._id))}
                />
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-5 lg:sticky lg:top-8">
              <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">
                Order Summary
              </h3>

              <div className="mt-4 space-y-3.5">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    Rs. {subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="font-bold text-green-500">Free</span>
                </div>

                <div className="border-t border-gray-100 pt-3.5 flex justify-between items-baseline">
                  <span className="text-base font-bold text-gray-900">
                    Total Amount
                  </span>
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">
                    Rs. {total_amount.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="mt-6 w-full cursor-pointer rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 py-3.5 px-4 text-center text-sm font-bold text-white shadow-md shadow-rose-500/10 hover:opacity-95 transition-all active:scale-[0.99]"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-pink-500 bg-pink-50 py-16 px-4 text-center shadow-lg">
            <div className="text-5xl animate-pulse text-pink-600">🛒</div>
            <h3 className="mt-4 text-xl font-bold text-pink-700">
              Your cart is empty
            </h3>
            <p className="mt-2 max-w-sm text-sm text-pink-400">
              Looks like you haven't added anything to your cart yet. Go ahead
              and explore our delicious menu items!
            </p>
            <NavLink to="/products">
              <button className="mt-6 rounded-xl bg-pink-700 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-pink-500 transition-all cursor-pointer">
                Browse Menu
              </button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;