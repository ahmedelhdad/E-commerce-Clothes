import { createRouter } from "next-connect";
import orderModel from '../../../models/orders'
import db from '../../../utils/db'
import {middleware} from '../middleware'

const router = createRouter()
import UserModel from '../../../models/User';

router.use(middleware);
router.post(async (req, res) => {
    
    const {_id} = req.user
    await db.connect();
    const user = await UserModel.findOne({ email: req.user.email })
    if(user.email === req.user.email)
    {
        const order = await orderModel.find({user:_id});
        await db.disconnect();
      return  res.send(order);
    }else
    {
        res.status(401).send({ message: 'User' });
    }
    
})
export default router.handler()
