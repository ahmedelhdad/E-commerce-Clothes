import { createRouter } from "next-connect";
import orderModel from '../../../models/orders'
import db from '../../../utils/db'
import UserModel from '../../../models/User';


const router = createRouter()

router.post(async (req, res) => {

    const { userInfo } = req.body
    await db.connect()
    const user = await UserModel.findOne({ email: userInfo.email })
    try {
        if (user) {
            const orderNew = new orderModel({
                ...req.body,
                user: user._id
            })
            const order = await orderNew.save()
            await db.disconnect()
            res.json(order)
        }
    }catch(err)
    {
        res.json(err)
    }

})
export default router.handler()
