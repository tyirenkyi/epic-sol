/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

const dummyData = [
  {
    image: "/god_of_war.webp",
    title: "God of War",
    description: "Venture into the brutal Norse realms and fight to fulfill a deeply personal quest.",
    date: "OUT NOW",
    price: "59.99"
  },
  {
    image: "/naraka.webp",
    title: "NARAKA: BLADEPOINT",
    description: "A battle royale for fighting game fans powered by parkour with an array of ranged and melee weapons to choose from.",
    date: "OUT NOW",
    price: "19.99"
  },
  {
    image: "/kena.jpeg",
    title: "Kena: Bridge of Spirits",
    description: "A story-driven, action adventure combining exploration with fast-paced combat.",
    date: "OUT NOW",
    price: "27.99"
  },
  {
    image: "/cyberpunk.jpeg",
    title: "Cyberpunk 2077",
    description: "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.",
    date: "OUT NOW",
    price: "26.50"
  },
  
]

const Carousel = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  let timerRef = useRef<NodeJS.Timeout>();
  const controls = useAnimation();

  useEffect(() => {
    setupTimer();
    return (() => {
      clearInterval(timerRef.current!);
    })
  }, [])

  const setupTimer = () => {
    timerRef.current = setInterval(() => {
      setActiveSlide((a) => {
        if(a === dummyData.length -1) {
          controls.set({opacity: 0, x: 50});
          controls.start({opacity: 1, x: 0, transition: { duration: 0.5}});
          return 0;
        }
        controls.set({opacity: 0, x: 50});
        controls.start({opacity: 1, x: 0, transition: { duration: 0.5}});
        return a + 1;
      });  
    }, 6100)
  }

  const changeActiveSlide = (index: number) => {
    clearTimeout(timerRef.current!);
    setActiveSlide(index);
    setupTimer();
  }

  return (
    <div
      className="grid grid-cols-4 gap-8"
    >
      <div
        className="col-span-3 rounded-xl h-[594px] relative overflow-hidden"
      >
        <AnimatePresence>
          <motion.img
            exit={{opacity: 0, x: -50}}
            animate={controls}
            src={dummyData[activeSlide].image}
            alt=""
            className="object-cover w-full h-full transition-opacity rounded-2xl"
          />
        </AnimatePresence>
        <div className="absolute top-0 left-0 pb-[100px] px-14 bg-opacity-20 bg-black w-full h-full flex flex-col justify-end">
          <p
            className="font-bold text-[12px] text-white"
          >{dummyData[activeSlide].date}</p>
          <p className="text-white font-bold w-[300px] leading-7">
            {dummyData[activeSlide].description}
          </p>
        </div>
      </div>
      <ul>
        {dummyData.map((item, index) => (
          <Thumbnail 
            key={index}
            index={index}
            image={item.image}
            title={item.title}
            activeSlide={activeSlide}
            onClick={() => changeActiveSlide(index)}
          />
        ))}
      </ul>
    </div>
  )
}

interface ThumbnailProps {
  image: string,
  title: string,
  activeSlide: number,
  index: number,
  onClick: () => void,
}

const Thumbnail = ({ image, title, activeSlide, index, onClick } : ThumbnailProps) => {
  return (
    <li 
      onClick={onClick}
      className={`h-[96.5px] rounded-2xl flex flex-row items-center space-x-3 cursor-pointer hover:bg-appGray mb-1 relative ${activeSlide === index ? "bg-appGray" : ""}`}
    >
      <div
        className={`bg-appGray4 ${activeSlide === index ? "animate-thumbnail" : ""} h-full absolute left-0`}
      ></div>
      <img 
        alt=""
        src={image}
        className="rounded-lg w-[43.5px] h-[58px] object-cover z-10"
      />
      <p
        className="text-white text-[16px] z-10"
      >{title}</p>
    </li>
  )
}

export default Carousel;
