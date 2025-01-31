import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/_libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: "Invalid guest ID" });
  }

  const nm: string = name.toString();

  try {
    if (req.method === "POST") {
      const { gender } = req.body
      const guest = await prisma.guests.findFirst({ where: { name: nm } });
      if (!guest) {
        const post = await prisma.guests.create({
          data: {
            name: nm,
            gender
          },
        });
        1;
        return res.status(200).json(post);
      }
      return res.status(200).json(guest);
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to process request", details: error });
  }
}
