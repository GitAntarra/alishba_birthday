import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/_libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: "Invalid guest ID" });
  }

  try {
    if (req.method === "GET") {
      // Handle guest update
      const updatedUser = await prisma.guests.update({
        where: { id: Number(id) },
        data: { attend: 'attend' },
      });

      return res
        .status(200)
        .json(updatedUser);
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: "Failed to process request", details: error });
  }
}
