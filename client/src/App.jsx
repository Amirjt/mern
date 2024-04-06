import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import About from "./pages/About";

import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import PrivateAuth from "./private/Auth";

import MyAccount from "./pages/UserAccount/MyAccount";
import Orders from "./pages/UserAccount/Orders";
import Details from "./pages/UserAccount/Details";
import PrivateAccount from "./private/Account";

import SingleProductPage from "./pages/SingleProductPage";
import SinglePostPage from "./pages/SinglePostPage";

import Index from "./pages/Admin/Index";
import Products from "./pages/Admin/Products/Products";
import AddNewProduct from "./pages/Admin/Products/AddNewProduct";
import EditProduct from "./pages/Admin/Products/EditProduct";
import AdminPanelOrders from "./pages/Admin/Orders";
import Users from "./pages/Admin/Users";
import AdminBlog from "./pages/Admin/Blog/Blog";
import AddNewPost from "./pages/Admin/Blog/AddNewPost";
import EditPost from "./pages/Admin/Blog/EditPost";
import Comments from "./pages/Admin/Comments";
import Messages from "./pages/Admin/Messages";
import PrivateAdmin from "./private/AdminPanel";

import { Toaster } from "sonner";
import AOSInit from "./components/modules/AOSInit";
import BackToTop from "./components/modules/BackToTop";

function App() {
  const location = useLocation();

  return (
    <div
      className={`mx-auto ${!location.pathname.includes("my-account") && !location.pathname.includes("admin") ? "max-w-[1440px]" : ""}`}
    >
      <Toaster position="top-left" richColors />
      <AOSInit />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/products/:productId" element={<SingleProductPage />} />
        <Route path="/blog/:postId" element={<SinglePostPage />} />

        <Route element={<PrivateAuth />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<PrivateAccount />}>
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/my-account/orders" element={<Orders />} />
          <Route path="/my-account/details" element={<Details />} />
        </Route>

        <Route element={<PrivateAdmin />}>
          <Route path="/p-admin" element={<Index />} />
          <Route path="/p-admin/products" element={<Products />} />
          <Route
            path="/p-admin/products/add-new-product"
            element={<AddNewProduct />}
          />
          <Route
            path="/p-admin/products/edit-product/:id"
            element={<EditProduct />}
          />
          <Route path="/p-admin/orders" element={<AdminPanelOrders />} />
          <Route path="/p-admin/users" element={<Users />} />
          <Route path="/p-admin/blog" element={<AdminBlog />} />
          <Route path="/p-admin/blog/add-new-post" element={<AddNewPost />} />
          <Route path="/p-admin/blog/edit-post/:id" element={<EditPost />} />
          <Route path="/p-admin/comments" element={<Comments />} />
          <Route path="/p-admin/messages" element={<Messages />} />
        </Route>
      </Routes>
      <BackToTop />
    </div>
  );
}

export default App;
