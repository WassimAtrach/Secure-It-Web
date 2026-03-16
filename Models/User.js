const db = require('../Utils/database');

module.exports = class User {
    constructor(id, email, password, name, phone, username, gender, country, zipcode) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.username = username;
        this.gender = gender;
        this.country = country;
        this.zipcode = zipcode;
    }

    // שמירת משתמש חדש במסד הנתונים
    save() {
        return db.execute(
            'INSERT INTO users (email, password, name, phone_number, username, gender, country, zipcode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [this.email, this.password, this.name, this.phone, this.username, this.gender, this.country, this.zipcode]
        );
    }

    //Finding a user by username (used in the login process)
    static async findByUsername(username) {
        //When using mysql2, the answer is returned as an array where the first element is the rows.
        const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        return rows; 
    }

  
    static async findById(id) {
        try {
            const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
            // Returns the first object found (or undefined if not found)
            return rows[0]; 
        } catch (err) {
            console.error('Error in User.findById:', err);
            throw err;
        }
    }
};