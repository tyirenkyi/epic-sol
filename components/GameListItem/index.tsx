/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";

//models
import Game from "../../models/Game";

interface Props {
  game: Game
}

const GameListItem = ({game} : Props) => {
  const router = useRouter();

  return (
    <li
      className="relative flex flex-col cursor-pointer aspect-poster"
      onClick={() => router.push(`/products/${game.id}`)}
    >
      <img 
        alt=""
        src={game.image}
        className="object-cover w-full h-full rounded"
      />
      <p
        className="line-clamp-1 text-appGray2 text-[16px] mt-2"
      >{game.title}</p>
      <p
        className="text-appGray2 text-[16px]"
      >${game.price}</p>
    </li>
  )
}

export default GameListItem;
