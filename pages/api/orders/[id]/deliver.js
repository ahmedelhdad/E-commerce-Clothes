import { createRouter } from "next-connect";
import orderModel from '../../../../models/orders'
import db from '../../../../utils/db'
import {middleware} from '../../middleware'



const router = createRouter()

router.use(middleware);
router.put(async (req, res) => {
    await db.connect();
    const order = await orderModel.findById(req.query.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const deliveredOrder = await order.save();
      await db.disconnect();
      res.send({ message: 'order delivered', order: deliveredOrder });
    } else {
      await db.disconnect();
      res.status(404).send({ message: 'order not found' });
    }

})
export default router.handler()
