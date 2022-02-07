import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async(req,res) => {
    try {
        const {email, products, quantity, amount} = req.body;

        const order = await prisma.order.create({
            data:{
                quantity:quantity,
                total:amount,
                products: {
                    connect: {
                        id: products[0]
                    }
                },
                user:{
                    connect:{
                        email:email
                    }
                },
   
            }
        })
        if(products.length > 1) {
            for (let index = 1; index < products.length; index++) {
                await prisma.order.update({
                    where: { id: order.id },
                    data: {
                        products: {
                            connect: {
                                id: products[index]
                            }
                        }
                    }
                })
            }
        }
        res.status(200).send(order);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})




export default handler;