import React from "react";
import SideBar from "../../components/templates/Admin/SideBar";
import OrdersTable from "../../components/templates/Admin/Orders/OrdersTable";

const Orders = () => {
  return (
    <div className="flex h-screen">
      <div className="w-2/12">
        <SideBar />
      </div>
      <div className="flex w-10/12 flex-col gap-3 p-5">
        <h2 className="font-bold">Orders</h2>
        <OrdersTable />
      </div>
    </div>
  );
};

export default Orders;
