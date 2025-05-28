'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { dbTimeForHuman } from "@/libs/datetime";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { loading, data: profile } = useProfile();

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    setLoadingOrders(true);
    fetch('/api/orders')
      .then(res => res.json())
      .then(orders => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      });
  }

  if (loading || loadingOrders) {
    return (
      <div className="flex justify-center items-center h-64 text-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto mt-10 px-4 text-white">
      <UserTabs isAdmin={profile?.admin} />
      <h1 className="text-2xl font-semibold mt-8 mb-4">All Orders</h1>

      {orders?.length > 0 ? (
        <div className="space-y-4">
          {orders.map(order => (
            <div
              key={order._id}
              className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex flex-col md:flex-row justify-between gap-4 transition hover:bg-gray-700"
            >
              <div className="flex flex-col md:flex-row gap-4 grow">
                <div>
                  <div
                    className={`p-2 px-4 rounded-md text-sm text-white w-fit ${
                      order.paid ? 'bg-green-600' : 'bg-red-500'
                    }`}
                  >
                    {order.paid ? 'Paid' : 'Not Paid'}
                  </div>
                </div>
                <div className="text-sm grow">
                  <div className="text-white font-medium">{order.userEmail}</div>
                  <div className="text-gray-400 text-xs mb-1">
                    {dbTimeForHuman(order.createdAt)}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {order.cartProducts.map(p => p.name).join(', ')}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Link
                  href={`/orders/${order._id}`}
                  className="text-sm bg-primary hover:bg-primary-dark px-4 py-2 rounded text-white"
                >
                  Show Order
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-10 italic">No orders found.</div>
      )}
    </section>
  );
}
