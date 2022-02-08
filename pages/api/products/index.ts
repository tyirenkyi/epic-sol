import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.get(async(req, res) => {
    prisma.product.findMany().then((products) => {
        res.json(products);
    });
})

export default handler;