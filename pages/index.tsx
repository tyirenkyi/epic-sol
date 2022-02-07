import { useEffect, useState, useContext } from "react";
import type { NextPage } from "next";
import axios from "axios";
import { useSession } from "next-auth/react";

//components
import Carousel from "../components/Carousel/index";
import GameListItem from "../components/GameListItem/index";

//contexts
import { AuthContext } from "../contexts/AuthProvider";


const Home: NextPage = (props) => {
  const { updateUser } = useContext(AuthContext);
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);

  const fetchUserData = async() => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/users/${session.user.email}`);
      updateUser(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    (async () => {
      const data = await axios.get("http://localhost:3000/api/products");
      setProducts(data.data);
    })();
  }, []);

  useEffect(() => {
    if(session && session.user)
      fetchUserData();
  }, [session])

  return (
    <div className="bg-appBlack min-h-screen py-[100px]">
      <div className="w-[75%] mx-auto">
        <Carousel />
        <ul className="grid grid-cols-6 gap-6 mt-14">
          {products.map((item, index) => (
            <GameListItem key={index} game={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
