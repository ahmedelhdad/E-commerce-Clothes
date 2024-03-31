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
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        email_address: req.body.email_address,
      };
      const paidOrder = await order.save();
      await db.disconnect();
      res.send({ message: 'order paid', order: paidOrder });
    } else {
      await db.disconnect();
      res.status(404).send({ message: 'order not found' });
    }

})
export default router.handler()
