import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/_libs/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (req.method === "POST") {
    const { name } = req.body
    const upName = name.toUpperCase()
    const post = await prisma.guests.create({
      data: {
        name: upName
      },
    });
      
    return res.status(201).json(post);
  }else{

    try {
      const users = await prisma.guests.findMany();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users', details: error });
    }
  }
}
