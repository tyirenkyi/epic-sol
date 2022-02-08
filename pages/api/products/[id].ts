import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async(req, res) => {

    const { id } = req.query

    prisma.product.findMany({
        where: {
            id: id.toString()
        }
    }).then((products) => {
        res.json(products);
    });
})

export default handler;
