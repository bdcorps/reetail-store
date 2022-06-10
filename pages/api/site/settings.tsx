import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

const PostSiteSettings = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { at_apiKey, at_base, at_table, siteId } = req.body;

    try {
      await prisma.site.update({
        where: {
          id: siteId,
        },
        data: {
          at_apiKey,
          at_base,
          at_table,
        },
      });

      res.status(200).json({ done: "ok" });
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong! 😕" });
    }
  } else if (req.method === "GET") {
  } else {
    return res.status(200).json({
      message: "This is not a post",
    });
  }
};

export default PostSiteSettings;
