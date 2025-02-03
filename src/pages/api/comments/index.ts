import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/_libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (req.method === "POST") {
    const { guestId, message } = req.body;
    const guest = await prisma.guests.findUnique({
      where: { id: guestId },
    });

    if (!guest) {
      return res.status(400).json({ error: "Invalid Guest" });
    }

    try {
      const comment = await prisma.comments.create({
        data: {
          guestId,
          message,
        },
        include: {
          guest: true
        },
      });    
  
      return res.status(201).json(comment);
    } catch (error) {
      return res.status(400).json({ error: error });
      
    }
  } else {
    try {
      const comments = await prisma.comments.findMany({ orderBy: { createdAt: 'asc' },
        include: {
          guest: true
        } });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch comments", details: error });
    }
  }
}


function generateRandomKey(length: number = 10): string {
  return Math.random().toString(36).substring(2, 2 + length);
}