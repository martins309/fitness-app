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
    
    static async getUserInfo(user_id) {
        const query = `SELECT * FROM users WHERE id = '${user_id}';`; 
        try {
            const response = await db.one(query);
            return response; 
        } catch (err) {
            return err.message;
        }
    }

    static async editUser(username, first_name, last_name, weight, height_ft, height_in, age, phone_num, user_id) {
        try {
            const query = `UPDATE users SET username = '${username}', first_name = '${first_name}', last_name = '${last_name}', weight = '${weight}', height_ft = '${height_ft}', height_in = '${height_in}' , age = '${age}', phone_num = '${phone_num}'  WHERE id = '${user_id}';`;
            const response = await db.one(query);
            return response;
        }catch (error){
            return error.message;
        }
    }
    
    static async getLoggedWorkouts(user_id) {
        try {
            const query = `SELECT to_char(logged_workouts.date, 'Mon DD, YYYY') as date, logged_workouts.id, logged_workouts.user_id, logged_workouts.workout_id, logged_workouts.weight, logged_workouts.reps, logged_workouts.duration_min, logged_workouts.duration_sec, logged_workouts.distance, logged_workouts.calories_burned, workouts.name  FROM logged_workouts
                INNER JOIN workouts 
                ON logged_workouts.workout_id = workouts.id
                WHERE logged_workouts.user_id = '${user_id}';`;
            const response = await db.any(query);
            return response;
        } catch (err) {
        return err.message;
        }
    } 
};



module.exports = User;