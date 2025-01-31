import { NextApiRequest, NextApiResponse } from 'next';

import prisma from "@/_libs/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
  
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'Invalid guest ID' });
    }
  
    try {
    if(req.method === 'GET'){
        const guest =await prisma.guests.findUnique({where:{id:Number(id)}});
        return res.status(200).json(guest);
    } else if  (req.method === 'PUT') {
        // Handle guest update
        const { name } = req.body;
  
        const updatedUser = await prisma.guests.update({
          where: { id: Number(id) },
          data: { name },
        });
  
        return res.status(200).json({ message: 'User updated successfully', updatedUser });
  
      } else if (req.method === 'DELETE') {
        // Handle guest deletion
        await prisma.guests.delete({ where: { id: Number(id) } });
        return res.status(200).json({ message: 'User deleted successfully' });
  
      } else {
        return res.status(405).json({ error: 'Method not allowed' });
      }
    } catch (error) {
      res.status(400).json({ error: 'Failed to process request', details: error });
    }
  }