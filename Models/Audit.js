const db = require('../Utils/database');

module.exports = class Audit {
    constructor(userId, deviceName, connectionType, osType, auditDate, antivirus, score) {
        this.userId = userId;
        this.deviceName = deviceName;
        this.connectionType = connectionType;
        this.osType = osType;
        this.auditDate = auditDate;
        this.antivirus = antivirus ? 1 : 0; 
        this.score = score;
    }

    //Save the new test
    save() {
        return db.execute(
            'INSERT INTO audits (user_id, device_name, connection_type, os_type, audit_date, antivirus_installed, score) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [this.userId, this.deviceName, this.connectionType, this.osType, this.auditDate, this.antivirus, this.score]
        );
    }

    // Retrieve all tests for a specific user (for display in the table below)
    static fetchAllByUserId(userId) {
        return db.execute('SELECT * FROM audits WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    }
};