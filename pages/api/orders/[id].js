import { createRouter } from "next-connect";
import orderModel from '../../../models/orders'
import db from '../../../utils/db'


const router = createRouter()



router.get(async (req, res) => {
    await db.connect();
    const order = await orderModel.findById(req.query.id);
    await db.disconnect();
    res.send(order);

})
export default router.handler()
