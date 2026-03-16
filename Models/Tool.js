const db = require('../Utils/database');

module.exports = class Tool {
    constructor(userId, toolName, vpnType, priceModel, rating, notes, link) {
        this.userId = userId;
        this.toolName = toolName;
        this.vpnType = vpnType;
        this.priceModel = priceModel;
        this.rating = rating;
        this.notes = notes;
        this.link = link;
    }

    save() {
        return db.execute(
            'INSERT INTO tools (user_id, tool_name, vpn_type, price_model, rating, notes, link) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [this.userId, this.toolName, this.vpnType, this.priceModel, this.rating, this.notes, this.link]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM tools');
    }
};