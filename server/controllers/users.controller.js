const Users = require('../models/users.model.js');
const Notification = require('../models/notification.model');


const getAllNotifications = async (req, res) => {
    try {
        const notifi = await Notification.find({});
        res.status(200).json(notifi);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getNotification = async (req,res) => {
    const { userId, entryId, sendUsername } = req.body;
  
    await Users.findByIdAndUpdate(userId, { $inc: { notificationCount: 1 } });

    // Entry beğenme işlemi

    // Bildirim oluşturma
    const notification = new Notification({
        sender: userId,
        content: 'Gönderinizi beğendi!',
        sendUsername : sendUsername,
        relatedEntry: entryId
    });

    await notification.save();

    // Kullanıcıya bildirimi ekleme
    await Users.findByIdAndUpdate(userId, { $push: { notifications: notification._id } });

    res.send('Gönderi beğenildi ve bildirim gönderildi.');
}

const deleteNotification = async (req, res) => {
    try {
        const { userId, entryId } = req.body;

        // Kullanıcıya ve girişe ait tüm bildirimleri bul
        const notifications = await Notification.find({ sender: userId, relatedEntry: entryId });

        // Bildirimleri sil
        await Notification.deleteMany({ sender: userId, relatedEntry: entryId });

        // Kullanıcının bildirimlerinden bu bildirimleri çıkar
        await Users.findByIdAndUpdate(userId, { $pull: { notifications: { $in: notifications.map(notification => notification._id) } } });

        res.status(200).json({ message: 'Bildirimler başarıyla silindi.' });
    } catch (error) {
        console.error('Bildirimler silinemedi:', error);
        res.status(500).json({ error: 'Bildirimler silinirken bir hata oluştu.' });
    }
}

const resetNotificationCount = async (req, res) => {
    const userId = req.params.id; // req.params kullanarak URL'den userId'yi alın

    try {
        const user = await Users.findByIdAndUpdate(userId, { notificationCount: 0 }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User bulunamadı❓" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const user = await Users.find({});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addUser = async (req, res) => {
    try {
        const user = await Users.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findByIdAndUpdate(id, req.body);
        if (!user) {
            res.status(404).json({ message: "User bulunamadı❓" });
        }

        const updatedUser = await Users.findById(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllUsers,
    addUser,
    editUser,
    getNotification,
    deleteNotification,
    resetNotificationCount,
    getAllNotifications
}