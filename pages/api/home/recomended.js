import { createRouter } from "next-connect";
import Product from '../../../models/Product'
import db from '../../../utils/db'

const router = createRouter()

router.get(async(req,res) => {
  await db.connect();
  const products = await Product.find({brand:'Nike'});
  await db.disconnect();
  res.send(products);
})


export default router.handler()