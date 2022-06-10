import Airtable from 'airtable';
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../lib/prisma";

const PostRecords = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { siteId } = req.body;

    const site: any = await prisma.site.findUnique({
      where: {
        id: siteId
      },
    })

    const { at_apiKey, at_base, at_table } = site;

    Airtable.configure({
      apiKey: at_apiKey,
    });
    const base = Airtable.base(at_base || "");
    const table = base(at_table || "");

    try {
      const records: any = await table.select({}).firstPage();
      const filteredRecords = records.filter((record: any) => Object.keys(record.fields).length !== 0)


      const data = filteredRecords.map((rec: any) => {
        const { name, ...data } = rec.fields;
        return { data, name, type: "P1", siteId }
      })

      await prisma.page.deleteMany({
        where: {
          siteId
        },
      })

      await prisma.page.createMany({
        data
      })


      res.status(200).json(filteredRecords);
    } catch (error) {
      // console.error(error);
      res.status(500).json({ msg: "Something went wrong! 😕" });
    }


  } else {
    return res.status(200).json({
      message: "This is not a post",
    });
  }



}

export default PostRecords;