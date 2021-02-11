'use strict';

const db = require('./conn'),
    bcrypt = require('bcryptjs');

class User {
    constructor (id, username, password, first_name, last_name, weight, height_ft, height_in, age, phone_num) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.weight = weight;
        this.height_ft = height_ft;
        this.height_in = height_in;
        this.age = age;
        this.phone_num = phone_num;
    }
    
    
    
    static async addUser(username, password, first_name, last_name, weight, height_ft, height_in, age, phone_num, picture) {
        try {
            const query = `INSERT INTO users (username, password, first_name, last_name, weight, height_ft, height_in, age, phone_num, picture) VALUES ('${username}', '${password}', '${first_name}', '${last_name}', '${weight}', '${height_ft}', '${height_in}', '${age}', '${phone_num}', '${picture}') RETURNING id;`;
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
            const query = `SELECT * FROM users WHERE username = '${this.username}';`;
            const response = await db.one(query);
            const isValid = this.checkPassword(response.password);
            if(!!isValid) {
                const { id, username, } = response;
                return { isValid, user_id: id, username }
            }else {
                return { isValid }
            }
        } catch (error) {
            return error.message;
        }
    }
    static async editUser(username, password, first_name, last_name, weight, height_ft, height_in, age, phone_num, picture) {
        try {
            const query = `INSERT INTO users (username, password, first_name, last_name, weight, height_ft, height_in, age, phone_num, picture) VALUES ('${username}', '${password}', '${first_name}', '${last_name}', '${weight}', '${height_ft}', '${height_in}', '${age}', '${phone_num}', '${picture}') RETURNING id;`;
            const response = await db.one(query);
            return response;
        }catch (error){
            return error.message;
        }
    }
    
};



module.exports = User;