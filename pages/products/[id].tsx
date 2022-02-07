/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Product } from "@prisma/client";
import axios from "axios";

//contexts
import { CartContext } from "../../contexts/CartProvider";
import { toast } from "react-toastify";

const GamePage = () => {
  const { updateProducts, products } = useContext(CartContext);
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product>(null);

  const findGame = async () => {
    const res = await axios.get(`https://epic-sol.vercel.app/api/products/${id}`);
    console.log(res.data);
    
    const prod = res.data[0];
    setProduct(prod);
  };

  const addToCart = () => {    
    if(products.length > 0) {
      const index = products.findIndex(item => item.id === product.id);
      console.log(index);
      
      if(index === -1)
        updateProducts([...products, product]);
      else
        toast.info("You already have this item in your cart")
    } else
      updateProducts([product])
  }

  const buyNow = () => {
    addToCart();
    router.push('/checkout');
  }

  useEffect(() => {
    findGame();
  }, []);

  return (
    <div className="min-h-screen bg-appBlack pt-[60px] pb-[100px]">
      {product && (
        <div className="w-[75%] mx-auto">
          <h1 className="text-[50px] text-appGray2 font-medium">
            {product?.title}
          </h1>
          <div className="grid grid-cols-4 gap-8 mt-6">
            {/* video embed */}
            <div className="col-span-3 rounded-xl">
              <iframe
                src={product?.youtube_url}
                title={`${product.title} Trailer"`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full rounded aspect-video"
              ></iframe>
              <p className="text-appGray2 text-[20px] mt-10">{product?.desc}</p>
            </div>
            {/* actions column */}
            <div>
              <img
                alt=""
                src={product?.image}
                className="max-h-[150px] mx-auto"
              />
              <p className="mt-8 text-appGray2">${product?.price}</p>
              <button
                onClick={buyNow} 
                className="uppercase text-appGray2 bg-appBlue rounded w-full h-[50px] text-[14px] font-medium my-4">
                Buy Now
              </button>
              <button 
                onClick={addToCart}
                className="border border-appGray2 rounded w-full h-[50px] text-appGray2 uppercase text-[14px] font-medium mb-8">
                Add to Cart
              </button>
              <GameDetail label="Developer" value={product?.developer} />
              <GameDetail label="Publisher" value={product?.publisher} />
              <GameDetail label="Release Date" value={product?.release_date} />
              <GameDetail label="Platform" value={product?.platform} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const GameDetail = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-row items-center justify-between pb-3 mb-3 border-b border-b-appGray">
    <p className="text-appGray2 text-opacity-60 text-[16px]">{label}</p>
    <p className="text-appGray2 text-[16px]">{value}</p>
  </div>
);

export default GamePage;
