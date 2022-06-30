import { NextApiRequest, NextApiResponse } from "next";

const handler = (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'OPTIONS') {
    return response.status(200).send('ok');
  }

  // handle incoming request as usual
};

export default handler;