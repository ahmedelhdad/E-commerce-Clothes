import { createRouter } from "next-connect";
import orderModel from '../../../models/orders'
import db from '../../../utils/db'
import UserModel from '../../../models/User';
import Product from '../../../models/Product'
import {middleware,isAdmin} from '../middleware'

const router = createRouter()


router.use(middleware)
router.use(isAdmin)

router.post(async (req, res) => {

    await db.connect();
    const ordersCount = await orderModel.countDocuments();
    const productsCount = await Product.countDocuments();
    const usersCount = await UserModel.countDocuments();
    const ordersPriceGroup = await orderModel.aggregate([
        {
            $group: {
                _id: null,
                sales: { $sum: '$totalPrice' },
            },
        },
    ]);
    const ordersPrice =ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales : 0;
    const salesData = await orderModel.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
                totalSales: { $sum: '$totalPrice' },
            },
        },
    ]);
    await db.disconnect();
    res.send({ ordersCount, productsCount, usersCount, ordersPrice, salesData });
})
export default router.handler()