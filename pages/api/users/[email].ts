import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get((req, res) => {
    const { email } = req.query

    prisma.user.findUnique({
        where: {
            email: email as string
        },
        select: {
            name: true,
            email: true,
            Address: true
        }
    }).then((user) => {
        res.json(user);
    }).catch(err =>  console.error(err));
})

export default handler;
