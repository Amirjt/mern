import { useParams } from "react-router-dom";
import Gallery from "../components/templates/SingleProduct/Gallery";
import ProductDetails from "../components/templates/SingleProduct/ProductDetails";
import Header from "../components/modules/Header";
import Footer from "../components/modules/Footer";
import Comments from "../components/modules/Comments";
import { useEffect, useState } from "react";

import DOMpurify from "dompurify";

const SingleProductPage = () => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  return (
    <>
      <Header />
      <div className="my-5 flex flex-col gap-12 p-5 sm:flex-row">
        <div data-aos="fade-left" className="sm:w-4/12">
          <Gallery images={product?.images} />
        </div>
        <div data-aos="fade-down" className="sm:w-8/12">
          <ProductDetails product={product} />
        </div>
      </div>
      <div className="rounded-lg border border-muted bg-gray-100 p-5 shadow-sm">
        <h2 className="font-bold text-main">Product Description</h2>
        <div
          className="mt-3 leading-9"
          dangerouslySetInnerHTML={{
            __html: DOMpurify.sanitize(product?.description),
          }}
        ></div>
      </div>
      <Comments productId={productId} comments={product?.comments} />
      <Footer />
    </>
  );
};

export default SingleProductPage;
