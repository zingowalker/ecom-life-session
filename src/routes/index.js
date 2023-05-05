// import { Router } from "express";
// import authRoutes from "./auth.route.js";

// const router = Router()
// router.use("/auth", authRoutes)



// export default router;

import { Router } from "express";
import authRoutes from "./auth.route.js"
// import couponRoutes from "./coupon.route.js"
// import collectionRoutes from "./collection.route.js"

const router = Router()
router.use("/auth", authRoutes)
// router.use("/coupon", couponRoutes)
// router.use("/collection", collectionRoutes)



export default router;