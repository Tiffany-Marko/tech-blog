const router = require('express').Router();
const apiRoutes = require('./api');
const dashboardRoutes = require("./dashboardRoutes")
const homeRoutes = require("./homeRoutes")

router.use('/api', apiRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/", homeRoutes);
module.exports = router;