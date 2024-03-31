import { createRouter } from "next-connect";
import orderModel from '../../../models/orders'
import db from '../../../utils/db'
import {middleware,isAdmin} from '../middleware'



const router = createRouter()


router.use(middleware)
router.use(isAdmin)
router.post(async (req, res) => {
    await db.connect();
    const orders = await orderModel.find({}).populate('user', 'name');
    await db.disconnect();
    res.send(orders);


})
export default router.handler()