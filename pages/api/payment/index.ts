import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async(req,res) => {
    try {
        console.log("IN CALL");
        const {order_id, status} = req.body;
        const result = await prisma.payment.create({
            data:{
                order: {
                  connect: {
                    id: order_id
                  },
                },
                status:status
            }
        })
        console.log(result);
        res.status(201).json(result);
    } catch (error) {
        console.log("-----In Error --------------------------------------------------");
        console.log("Address",error);
        res.status(500).send(error);
    }
})

export default handler;
