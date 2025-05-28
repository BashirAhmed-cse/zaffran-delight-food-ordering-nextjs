'use client';
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import SectionHeaders from "@/components/layout/SectionHeaders";
import CartProduct from "@/components/menu/CartProduct";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function OrderPage() {
  const { clearCart } = useContext(CartContext);
  const [order, setOrder] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.href.includes('clear-cart=1')) {
      clearCart();
    }

    if (id) {
      setLoadingOrder(true);
      fetch('/api/orders?_id=' + id)
        .then(res => res.json())
        .then(orderData => {
          setOrder(orderData);
          setLoadingOrder(false);
        });
    }
  }, []);

  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }

  return (
    <section className="max-w-4xl mx-auto mt-10 px-4 text-white">
      <div className="text-center">
        <SectionHeaders mainHeader="Your Order" />
        <div className="mt-4 mb-8 text-gray-400">
          <p>Thanks for your order.</p>
          <p>We will call you when your order is on the way.</p>
        </div>
      </div>

      {loadingOrder && (
        <div className="text-center text-gray-300 mt-8">Loading order...</div>
      )}

      {order && (
        <div className="grid md:grid-cols-2 md:gap-8">
          <div className="space-y-4">
            {order.cartProducts.map(product => (
              <CartProduct key={product._id} product={product} />
            ))}

            <div className="bg-gray-800 p-4 rounded-lg text-sm">
              <div className="flex justify-between border-b border-gray-700 pb-2 mb-2">
                <span className="text-gray-400">Subtotal:</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2 mb-2">
                <span className="text-gray-400">Delivery:</span>
                <span className="font-semibold">$5.00</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-white">
                <span>Total:</span>
                <span>${(subtotal + 5).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-800 p-4 rounded-lg mt-6 md:mt-0">
              <h2 className="text-lg font-semibold mb-4">Delivery Address</h2>
              <AddressInputs disabled={true} addressProps={order} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
