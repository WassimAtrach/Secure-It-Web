const db = require('../Utils/database');

module.exports = class Goal {
    constructor(userId, category, targetDevice, priority, cost, frequency, status) {
        this.userId = userId;
        this.category = category;
        this.targetDevice = targetDevice;
        this.priority = priority;
        this.cost = cost;
        this.frequency = frequency;
        this.status = status;
    }

    save() {
        return db.execute(
            'INSERT INTO goals (user_id, category, target_device, priority, cost, frequency, your_status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [this.userId, this.category, this.targetDevice, this.priority, this.cost, this.frequency, this.status]
        );
    }

    static fetchAllByUserId(userId) {
        return db.execute('SELECT * FROM goals WHERE user_id = ?', [userId]);
    }
};