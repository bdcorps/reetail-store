
import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from 'next'


export async function getSite(siteId: string) {
  const page = await prisma.site.findFirst({ where: { id: siteId }, include: { pages: true } });

  return page;
}

const GetSite = async (req: NextApiRequest, res: NextApiResponse) => {
  const { siteId } = req.query;
  const site = await getSite(siteId as string);
  res.status(200).json({ site })
}

export default GetSite;