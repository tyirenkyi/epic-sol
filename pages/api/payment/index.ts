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
