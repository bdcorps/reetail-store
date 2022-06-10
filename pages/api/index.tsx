import prisma from "../../lib/prisma";

export async function getAllPages(siteId: string, name: string) {
  const page = await prisma.page.findFirst({ where: { siteId, name } });

  return page;
}
