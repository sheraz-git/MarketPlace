const Notification = require("../../model/Notification/notification");
const { success, error, validation } = require("../../helper/response");

exports.notificationAddCtrl = async (req, res) => {
  try {
    const newNotification = await Notification.create(req.body);
    await newNotification.save();
    success("Notification send Successfully", { newNotification }, "CREATED", res);
  } catch (err) {
    error(err.message, "INTERNAL_SERVER_ERROR", res);
  }
};

  exports.getNotificationCtrl = async (req, res) => {
    try {
        const notification = await Notification.find({}).sort({created:-1})
      success("notification", { data: notification }, "OK", res);
    } catch (err) {
      error(err.message, "INTERNAL_SERVER_ERROR", res);
    }
  };

  exports.deleteNotification = async (req, res) => {
    try {
      const id = req.params.id;
      const notification = await Notification.findById(id);
      if (notification) {
        await Notification.findByIdAndDelete(notification);
        success("Notification-deleted", { data: notification }, "OK", res);
      } else {
        error("NotificationNotFound", "NOT_FOUND", res);
      }
    } catch (err) {
      error(err.message, "INTERNAL_SERVER_ERROR", res);
    }
  };



  exports.readAllNotificationCtrl = async (req, res) => {
    try {
        const notification = await Notification.updateMany(
            {user:req.body.userId, read:false},  
            {$set:{read:true}}
          )
      success("notification", { data: notification }, "OK", res);
    } catch (err) {
      error(err.message, "INTERNAL_SERVER_ERROR", res);
    }
  };