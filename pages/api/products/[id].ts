import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import Cors from 'cors'

const cors = Cors({
    methods: ['GET', 'HEAD'],
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

handler.get(async(req, res) => {
    await runMiddleware(req, res, cors)

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
