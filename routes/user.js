
const db = require('./con'),
bcrypt = require('bcryptjs');

class User {
constructor (id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
}


static async addUser(name, email, password) {
    try {
        const query = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}') RETURNING id;`;
        const response = await db.one(query);
        return response;
    }catch (error){
        return error.message;
    }
}

checkPassword(hashedPassword) {
    return bcrypt.compareSync(this.password, hashedPassword);
}

async login() {
    try {
        const query = `SELECT * FROM users WHERE email = ${this.email}`;
        const response = await db.one(query);

        const isValid = this.checkPassword(response.password);
        if(!!isValid) {
            const { id, name, } = response;
            return { isValid, user_id: id, name }
        }else {
            return { isValid }
        }
    } catch (error) {
        return error.message;
    }
}
}

module.exports = User;