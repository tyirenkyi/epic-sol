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

handler.get(async(req, res) => {
    await runMiddleware(req, res, cors)
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
