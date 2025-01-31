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
    const { userId, message } = req.body;

    const guest = await prisma.guests.findUnique({
      where: { id: userId },
    });

    if (!guest) {
      return res.status(400).json({ error: "Invalid Guest" });
    }
    const post = await prisma.comments.create({
      data: {
        guestId: guest.id,
        message: message,
      }
    });

    return res.status(201).json(post);
  } else {
    try {
      const comments = await prisma.comments.findMany({ orderBy: { id: "desc" },
        include: {
          guest: true
        } });
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch comments", details: error });
    }
  }
}
