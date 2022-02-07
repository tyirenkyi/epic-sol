import { useState, useContext } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Link from 'next/link';
import { Popover } from "@mui/material";
import { FiShoppingCart } from "react-icons/fi";

import { CartContext } from "../../contexts/CartProvider";

const Navbar = () => {
  const { products } = useContext(CartContext);
  const router = useRouter();
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header>
      <nav
        className="bg-appGray h-[52px] flex flex-row items-center px-[20px] justify-between"
      >
        <Link href={'/'} passHref={true}>
          <p
            className="text-appGray1 uppercase text-[14px] tracking-widest font-medium cursor-pointer"
          >Game Store</p>
        </Link>
        {session ? (
          <div className="flex flex-row items-center space-x-8">
            <button
              disabled={products.length === 0}
              onClick={() => router.push('/cart')}
              className="flex flex-row items-center tracking-wider text-appGray1"
            >
              <FiShoppingCart size={20}/>
              {products.length !== 0 && (
                <span className="px-[10px] ml-2 bg-white rounded-xl text-black font-bold">
                  {products.length}
                </span>
              )}
            </button>
            <button
              aria-describedby={"simple-popover"}
              onClick={handleClick}
              className="h-full"
            >
              <p className="tracking-wider text-appGray1">{session.user.name}</p>
            </button>
            <Popover
              id={'simple-popover'}
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <button
                onClick={() => signOut()}
                className="w-[150px] h-[40px] hover:bg-appBlue hover:bg-opacity-10"
              >
                Sign Out
              </button>
            </Popover>
          </div>
        ) : (
          <button
            className="font-medium tracking-widest text-appGray1"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
      </nav>
    </header>
  )
}

export default Navbar;
