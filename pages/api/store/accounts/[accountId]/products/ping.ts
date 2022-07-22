import type { NextApiRequest, NextApiResponse } from 'next';

type ProductsPingData = {
  needsRefresh: boolean
}

// returns a boolean that says if the user made edits to their products and we should ask them to sync or not
export default function (req: NextApiRequest, res: NextApiResponse<ProductsPingData>) {

  const pricesData = {};

  // const structuredPrices = formatProductsDataFromStripe();

  const currentProducts = {};

  // check if currentProducts === structuredPrices

  res.status(200).json({ needsRefresh: true })
}