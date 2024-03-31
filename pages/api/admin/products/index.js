import { createRouter } from "next-connect";
import Product from '../../../../models/Product'
import db from '../../../../utils/db'
import {middleware,isAdmin} from '../../middleware'


const router = createRouter()



router.use(middleware)
router.use(isAdmin)

router.post(async (req, res) => {



    await db.connect();
    const products = await Product.find({});
    await db.disconnect();
    return  res.send(products);


})

router.put(async (req, res) => {
  
    await db.connect();
    const newProduct = new Product({
      name: 'sample name',
      slug: 'sample-slug-' + Math.random(),
      image: '/images/shirt1.jpg',
      price: 0,
      category: 'sample category',
      brand: 'sample brand',
      countInStock: 0,
      description: 'sample description',
      rating: 0,
      numReviews: 0,
    });
  
    const product = await newProduct.save();
    await db.disconnect();
    return  res.send({ message: 'Product Created', product });

})

export default router.handler()