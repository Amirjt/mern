import { useState, useEffect } from "react";

import {
  MessageCircle,
  Package,
  PackageCheck,
  ShoppingBasket,
  UserX,
  UsersRound,
} from "lucide-react";
import ReviewBox from "../../components/modules/ReviewBox";
import SideBar from "../../components/templates/Admin/SideBar";
import Chart from "../../components/templates/Admin/Chart";

const Index = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/quickreview", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const devliverd = data?.orders.filter(
    (order) => order.status === "devliverd",
  );

  const banned = data?.users.filter((user) => user.isBanned);

  return (
    <div className="flex h-screen">
      <div className="w-2/12">
        <SideBar />
      </div>
      <div className="flex w-10/12 flex-col gap-3 p-5">
        <h2 className="font-bold">Admin Panel</h2>
        <div className="grid grid-cols-2 md:grid-cols-9">
          <ReviewBox
            title={"Products"}
            count={data?.products.length}
            icon={<ShoppingBasket strokeWidth={1.1} />}
          />
          <ReviewBox
            title={"Orders"}
            count={data?.orders.length}
            icon={<Package strokeWidth={1.1} />}
          />
          <ReviewBox
            title={"Devliverd"}
            count={devliverd?.length}
            icon={<PackageCheck strokeWidth={1.1} />}
          />
          <ReviewBox
            title={"Users"}
            count={data?.users.length}
            icon={<UsersRound strokeWidth={1.1} />}
          />
          <ReviewBox
            title={"Banned Users"}
            count={banned?.length}
            icon={<UserX className="text-rose-500" strokeWidth={1.1} />}
          />
          <ReviewBox
            title={"Comments"}
            count={data?.comments.length}
            icon={<MessageCircle strokeWidth={1.1} />}
          />
        </div>
        <Chart />
      </div>
    </div>
  );
};

export default Index;
