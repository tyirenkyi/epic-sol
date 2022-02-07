import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import Cors from 'cors'

const cors = Cors({
    methods: ['POST', 'HEAD'],
  })
const handler = nc<NextApiRequest, NextApiResponse>();

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
  
        return resolve(result)
      })
    })
  }
  

handler.post(async(req,res) => {
    try {
        await runMiddleware(req, res, cors)
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