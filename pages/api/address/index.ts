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
        const {firstName,lastName,email,address,suite,city,country,postalCode} = req.body;
        const result = await prisma.address.create({
            data:{
                first_name:firstName,
                last_name:lastName,
                City:city,
                Country:country,
                address:address,
                postal_code:postalCode,
                suite:suite,
                user:{
                    connect:{
                        email:email,
                }
            }}
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
