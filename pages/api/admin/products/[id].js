import { createRouter } from "next-connect";
import Product from '../../../../models/Product'
import db from '../../../../utils/db'
import {middleware,isAdmin} from '../../middleware'


const router = createRouter()


router.use(middleware)
router.use(isAdmin)



router.post(async (req, res) => {
    await db.connect();
    const product = await Product.findById(req.query.id);
    await db.disconnect();
    res.send(product);
});

router.put(async (req, res) => {
    await db.connect();
    const product = await Product.findById(req.query.id);
    if (product) {
        product.name = req.body.product.name;
        product.slug = req.body.product.slug;
        product.price = req.body.product.price;
        product.category = req.body.product.category;
        product.image = req.body.product.image;
        product.brand = req.body.product.brand;
        product.countInStock = req.body.product.countInStock;
        product.description = req.body.product.description;
        await product.save();
        await db.disconnect();
        return  res.send({ message: 'Product Updated Successfully' });
    } else {
        await db.disconnect();
      return  res.status(404).send({ message: 'Product Not Found' });
    }


});


export default router.handler()