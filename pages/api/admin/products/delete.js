import { createRouter } from "next-connect";
import Product from '../../../../models/Product'
import db from '../../../../utils/db'
import {middleware,isAdmin} from '../../middleware'


const router = createRouter()


router.use(middleware)
router.use(isAdmin)





router.post(async (req, res) => {
    await db.connect();
    const product = await Product.findById(req.body.id);
    if (product) {
        await product.deleteOne();
        const products = await Product.find()
        await db.disconnect();
        return  res.send({ message: 'Product Deleted' ,products});
    } else {
        await db.disconnect();
        return  res.status(404).send({ message: 'Product Not Found' });
    }
});




export default router.handler()

