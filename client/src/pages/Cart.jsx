import { useContext } from "react";
import useSession from "../custom/useSession";
import { Link } from "react-router-dom";

import Header from "../components/modules/Header";
import Footer from "../components/modules/Footer";
import Input from "../components/modules/Input";
import TextArea from "../components/modules/TextArea";
import Button from "../components/modules/Button";

import { Context } from "../context/MainContext";
import { toast } from "sonner";

const Cart = () => {
  const { cart, setCart } = useContext(Context);
  const { session } = useSession();

  const total = cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );

  const removeHandler = (id) => {
    const filtered = cart.filter((item) => item._id !== id);
    setCart(filtered);
    toast.success("Product Removed from cart");
  };

  const increaseHandler = (id) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item._id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  const decreaseHandler = (id) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item._id === id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  };

  return (
    <div>
      <Header />
      <section className="py-12">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-5">
          <h2 className="mb-8 text-center text-4xl font-bold tracking-tight text-black">
            Shopping Cart
          </h2>
          <div className="flex gap-3">
            <div className="w-9/12">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="mb-8 grid grid-cols-12 gap-y-4 rounded-3xl border-2 border-gray-200 p-4 max-lg:mx-auto max-lg:max-w-lg lg:p-8 "
                >
                  <div className="img box col-span-12 lg:col-span-2">
                    <img
                      src={item.images[0]}
                      className="max-lg:w-full lg:w-[180px]"
                      alt="imagee"
                    />
                  </div>
                  <div className="detail col-span-12 w-full lg:col-span-10 lg:pl-3">
                    <div className="mb-4 flex w-full items-center justify-between">
                      <h5 className="font-manrope text-2xl font-bold leading-9 text-gray-900">
                        {item.name.slice(0, 40)}...
                      </h5>
                      <button
                        onClick={() => removeHandler(item._id)}
                        className="group flex items-center justify-center rounded-full focus-within:outline-red-500"
                      >
                        <svg
                          width="34"
                          height="34"
                          viewBox="0 0 34 34"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            className="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
                            cx="17"
                            cy="17"
                            r="17"
                            fill=""
                          />
                          <path
                            className="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
                            d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                            stroke="#EF4444"
                          />
                        </svg>
                      </button>
                    </div>
                    <p className="mb-6 text-base font-normal leading-7 text-gray-500">
                      {item.shortdescription.slice(90)}
                      <Link
                        to={`/products/${item._id}`}
                        className="text-indigo-600"
                      >
                        More....
                      </Link>
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => decreaseHandler(item._id)}
                          className="group flex items-center justify-center rounded-[50px] border border-gray-200 bg-white p-2.5 shadow-sm shadow-transparent transition-all duration-500 focus-within:outline-gray-300 hover:border-gray-300 hover:bg-gray-50 hover:shadow-gray-200"
                        >
                          <svg
                            className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                            width="18"
                            height="19"
                            viewBox="0 0 18 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4.5 9.5H13.5"
                              stroke=""
                              stroke-width="1.6"
                            />
                          </svg>
                        </button>
                        <input
                          type="text"
                          id="number"
                          className="aspect-square w-10 rounded-full border border-gray-200 bg-gray-100 px-3 py-1.5 text-center text-sm font-semibold text-gray-900  outline-none"
                          placeholder={item.quantity}
                        />
                        <button
                          onClick={() => increaseHandler(item._id)}
                          className="group flex items-center justify-center rounded-[50px] border border-gray-200 bg-white p-2.5 shadow-sm shadow-transparent transition-all duration-500 focus-within:outline-gray-300 hover:border-gray-300 hover:bg-gray-50 hover:shadow-gray-200"
                        >
                          <svg
                            className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                            width="18"
                            height="19"
                            viewBox="0 0 18 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.75 9.5H14.25M9 14.75V4.25"
                              stroke=""
                              stroke-width="1.6"
                            />
                          </svg>
                        </button>
                      </div>
                      <h6 className="font-manrope text-right text-2xl font-bold leading-9 text-indigo-600">
                        ${item.price * item.quantity}
                      </h6>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex flex-col items-center justify-between border-b border-gray-200 pb-6 max-lg:mx-auto max-lg:max-w-lg md:flex-row md:items-center lg:px-6">
                <h5 className="font-manrope w-full text-2xl font-semibold leading-9 text-gray-900 max-md:mb-4 max-md:text-center">
                  Total
                </h5>

                <div className="flex items-center justify-between gap-5 ">
                  <h6 className="font-manrope lead-10 text-3xl font-bold text-indigo-600">
                    ${total}
                  </h6>
                </div>
              </div>
              <div className="max-lg:mx-auto max-lg:max-w-lg">
                <p className="mb-5 mt-6 text-center text-base font-normal leading-7 text-gray-500">
                  Shipping taxes, and discounts calculated at checkout
                </p>
                <button className="w-full rounded-full bg-indigo-600 px-6 py-4 text-center text-lg font-semibold text-white transition-all duration-500 hover:bg-indigo-700 ">
                  Checkout
                </button>
              </div>
            </div>
            <div className="w-3/12 rounded-lg border border-muted p-5 shadow-sm h-fit sticky top-3">
              <h2 className="font-semibold">Checkout</h2>
              {session.status === "authenticated" ? (
                <div className="mt-2 flex flex-col gap-2">
                  <Input placeholder={session.data.username} />
                  <Input placeholder={session.data.email} />
                  <TextArea
                    placeholder={
                      session.data.shippingAddress || "Your shipping Address"
                    }
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#4F46E5]">
                      {cart.length} Items
                    </span>
                    <span className="text-sm font-semibold text-[#4F46E5]">
                      ${total}
                    </span>
                  </div>
                  <Button
                    className="font-semibold"
                    styles={{
                      backgroundColor: "#4F46E5",
                    }}
                  >
                    Continue to Payment
                  </Button>
                </div>
              ) : (
                <div className="flex h-full  w-full flex-col items-center justify-center gap-3">
                  <span className="font-semibold">
                    You have to be loged in First.
                  </span>
                  <Button>
                    <Link to={"/login"}>Login</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Cart;
