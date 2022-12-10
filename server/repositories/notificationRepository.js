const Notification = require('../models/Notification')
const db = require('../db')
const GetNotificationDto = require("../dto/NotficationDtos/GetNotificationDto");

module.exports = class NotificationRepository {
    async getAsync(userId) {
        const data = db.notifications
            .select('notifications.id', 'type', 'date', 'comment', 'completed', 'user_id', 'student_id')
            .leftJoin('student_notification', {'notification_id': 'notifications.id'})
            .where({user_id: userId})

        return new GetNotificationDto(data)
    }


    async createAsync(createNotificationDto, userId) {

        let model = new Notification(createNotificationDto)
        model.user_id = userId

        let notification_id = await db.notifications.insert(model)
        notification_id = notification_id[0]

        const trx = await db.transaction()

        try {
            for (let student_id of createNotificationDto.students_id)
                await db.studentNotification.insert({student_id, notification_id}).transacting(trx)

            await trx.commit()

        } catch (err) {
            await trx.rollback()
            throw err
        }
    }


    async updateAsync(updateNotificationDto, notification_id) {
        const model = new Notification(updateNotificationDto)
        const trx = await db.transaction()

        try {
            await db.notifications.where({id: notification_id}).update(model).transacting(trx)
            await db.studentNotification.where({notification_id}).delete().transacting(trx)

            for (let student_id of updateNotificationDto.students_id)
                await db.studentNotification.insert({student_id, notification_id}).transacting(trx)

            await trx.commit()

        } catch (err) {
            await trx.rollback()
            throw err
        }
    }


    async deleteAsync(notificationIds) {
        await db.notifications.whereIn('id', notificationIds).delete()
    }
}