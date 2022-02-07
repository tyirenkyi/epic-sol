/* eslint-disable @next/next/no-img-element */
import { Product } from "@prisma/client";

const CartItem = ({game, removeItem} : {game: Product, removeItem: (id) => void}) => {
  return (
    <li
      className="flex flex-row items-start justify-between w-full p-6 mb-4 rounded bg-appBlack1"
    >
      <div className="flex flex-row space-x-4">
        <img 
          alt=""
          src={game.image}
          className="w-[131px] h-[174.66px] rounded"
        />
        <div className="flex flex-col justify-between">
          <div>
            <span className="py-1 px-2 uppercase rounded text-appGray2 text-[12px] font-medium tracking-wider bg-appGray text-center w-[fit-content]">
              Base game
            </span>
            <p className="text-[20px] text-appGray2 mt-1">{game.title}</p>
          </div>
          <p className="uppercase text-appGray2 text-[12px] font-semibold">Windows</p>
        </div>
      </div>
      <div className="flex flex-col justify-between h-full">
        <p className="text-right text-appGray2">${game.price}</p>
        <div className="h-32"></div>
        <button
          onClick={() => removeItem(game.id)}
          className="border-b border-b-appGray1 text-appGray1"
        >
          Remove
        </button>
      </div>
    </li>
  )
}

export default CartItem;
