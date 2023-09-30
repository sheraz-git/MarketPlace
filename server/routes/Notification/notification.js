const express = require("express");
const Notification = require("../../controller/Notification/notification");
const { authenticate } = require("../../middleware/Authentication");
const router = express.Router();

router.post(
  "/notificationAddCtrl",
  authenticate,
  Notification.notificationAddCtrl
);
router.get(
  "/getNotificationCtrl",
  // authenticate,
  Notification.getNotificationCtrl
);
router.delete(
  "/deleteNotification:/id",
  authenticate,
  Notification.deleteNotification
);
router.put(
    "/readAllNotificationCtrl",
    authenticate,
    Notification.readAllNotificationCtrl
  );

module.exports = router;
