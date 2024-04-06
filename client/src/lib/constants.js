import {
  Computer,
  Laptop,
  Smartphone,
  ShoppingBasket,
  Home,
  MessageCircle,
  Users,
  Layers3,
  Mail,
  StickyNote,
} from "lucide-react";

export const headerLinks = [
  {
    id: 1,
    path: "/",
    title: "Home",
  },
  {
    id: 2,
    path: "/shop",
    title: "Shop",
  },
  {
    id: 3,
    path: "/blog",
    title: "Blog",
  },
  {
    id: 4,
    path: "/about-us",
    title: "About us",
  },
  {
    id: 5,
    path: "/contact-us",
    title: "Contact us",
  },
];

export const categories = [
  {
    name: "Computer",
    icon: <Computer size={20} strokeWidth={1} />,
  },
  {
    name: "Laptop",
    icon: <Laptop size={20} strokeWidth={1} />,
  },
  {
    name: "Phone",
    icon: <Smartphone size={20} strokeWidth={1} />,
  },
];

export const brands = [
  {
    name: "Apple",
  },
  {
    name: "Samsung",
  },
  {
    name: "Huawei",
  },
  {
    name: "Xiaomi",
  },
  {
    name: "Asus",
  },
  {
    name: "Acer",
  },
];

export const AdminDashboardLinks = [
  {
    id: 1,
    title: "Home",
    path: "/p-admin/",
    icon: Home,
  },
  {
    id: 2,
    title: "Products",
    path: "/p-admin/products",
    icon: ShoppingBasket,
  },
  {
    id: 3,
    title: "Orders",
    path: "/p-admin/orders",
    icon: Layers3,
  },
  {
    id: 4,
    title: "Users",
    path: "/p-admin/users",
    icon: Users,
  },
  {
    id: 5,
    title: "Blog",
    path: "/p-admin/blog",
    icon: StickyNote,
  },
  {
    id: 6,
    title: "Comments",
    path: "/p-admin/comments",
    icon: MessageCircle,
  },
  {
    id: 7,
    title: "Messages",
    path: "/p-admin/messages",
    icon: Mail,
  },
];
