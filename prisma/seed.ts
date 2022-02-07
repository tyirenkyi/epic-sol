const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const dummyData = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/diyjjw5ke/image/upload/v1643992001/valorant_q2na9f.jpg",
    title: "Valorant",
    price: 19,
    youtube_url: "https://www.youtube.com/embed/hhlgphVf-1g",
    desc: "VALORANT is a character-based 5v5 tactical shooter set on the global stage. Outwit, outplay, and outshine your competition with tactical abilities, precise gunplay, and adaptive teamwork.",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/diyjjw5ke/image/upload/v1643991993/tomb-raider_qgnyry.jpg",
    title: "Rise of The Tomb Raider",
    price: 29,
    youtube_url: "https://www.youtube.com/embed/qiYiddjc6cU",
    desc: "Rise of the Tomb Raider: 20 Year Celebration includes the base game and Season Pass featuring all-new content. Explore Croft Manor in the new “Blood Ties” story, then defend it against a zombie invasion in “Lara’s Nightmare”."
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/diyjjw5ke/image/upload/v1643992049/star_wars_m74ht5.jpg",
    title: "Star Wars Battlefront II",
    price: 39,
    youtube_url: "https://www.youtube.com/embed/_q51LZ2HpbE",
    desc: "Put your mastery of the blaster, lightsaber, and the Force to the test online and offline in STAR WARS™ Battlefront™ II: Celebration Edition"
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/diyjjw5ke/image/upload/v1643992128/god_of_war_poster_zedurd.jpg",
    title: "God of War",
    price: 59,
    youtube_url: "https://www.youtube.com/embed/K0u_kAWLJOA",
    desc: "His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods and monsters. It is in this harsh, unforgiving world that he must fight to survive… and teach his son to do the same."
  },
  {
    id: 5,
    image:
      "https://res.cloudinary.com/diyjjw5ke/image/upload/v1643991965/borderlands_tshpmg.jpg",
    title: "Borderlands 3",
    price: 39,
    desc: "The original shooter-looter returns, packing bazillions of guns and a mayhem-fueled adventure! Blast through new worlds & enemies and save your home from the most ruthless cult leaders in the galaxy.",
    youtube_url: "https://www.youtube.com/embed/UKzMC90kaRw"
  },
  {
    id: 6,
    image:
      "https://res.cloudinary.com/diyjjw5ke/image/upload/v1643991974/cyberpunk_poster_uo4smj.png",
    title: "Cyberpunk 2077",
    price: 26,
    youtube_url: "https://www.youtube.com/embed/LembwKDo1Dk",
    desc: "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality.",
  },
  {
    id: 7,
    image:
      "https://res.cloudinary.com/diyjjw5ke/image/upload/v1643991955/abyss_fbouk0.jpg",
    title: "Neon Abyss",
    price: 6,
    youtube_url: "https://www.youtube.com/embed/gpSPCKiDPtk",
    desc: "Neon Abyss is a frantic, roguelike where you run ‘n’ gun your way into the Abyss as part of the ‘Grim Squad’. Featuring unlimited item synergies and a unique dungeon evolution system, each run diversifies the experience and every choice alters the ruleset."
  },
  {
    id: 8,
    image:
      "https://res.cloudinary.com/diyjjw5ke/image/upload/v1643992089/hitman_mnf3ao.jpg",
    title: "Hitman III",
    price: 15,
    youtube_url: "https://www.youtube.com/embed/Z29ORu6_p34",
    desc: "Death Awaits. Agent 47 returns in HITMAN 3, the dramatic conclusion to the World of Assassination trilogy."
  },
  {
    id: 9,
    image:
      "https://res.cloudinary.com/diyjjw5ke/image/upload/v1643992072/kena_poster_aiusgj.jpg",
    title: "Kena: Bridge of Spirits",
    price: 39,
    youtube_url: "https://www.youtube.com/embed/V44I1TSFpOc",
    desc: "A story-driven, action adventure combining exploration with fast-paced combat. As Kena, players find and grow a team of charming spirit companions called the Rot, enhancing their abilities and creating new ways to manipulate the environment."
  },
  {
    id: 10,
    image:
      "https://res.cloudinary.com/diyjjw5ke/image/upload/v1643992021/red_gkayla.jpg",
    title: "Red Dead Redemption 2",
    price: 59,
    youtube_url: "https://www.youtube.com/embed/eaW0tYpxyp0",
    desc: "Winner of over 175 Game of the Year Awards and recipient of over 250 perfect scores, Red Dead Redemption 2 is an epic tale of honor and loyalty at the dawn of the modern age. Includes Red Dead Redemption 2: Story Mode and Red Dead Online."
  },
];

async function main() {
  for (const iterator of dummyData) {
    await prisma.product.create({
      data: {
        developer: "Santa Monica Studio",
        publisher: "PlayStation PC LLC",
        image: iterator.image,
        platform: "Windows",
        merchant_address: "8ixmyB5JqXWSAUVxZgXudUMWjqtonCTqC5FennQ1dJc8",
        price: iterator.price,
        release_date: "01/14/22",
        title: iterator.title,
        youtube_url: iterator.youtube_url,
        desc: iterator.desc,
      }
    })
  }
}

export {}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
