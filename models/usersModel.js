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
    
    
    
    static async addUser(username, password, first_name, last_name, weight, height_ft, height_in, age, phone_num) {
        try {
            const query = `INSERT INTO users (username, password, first_name, last_name, weight, height_ft, height_in, age, phone_num) VALUES ('${username}', '${password}', '${first_name}', '${last_name}', '${weight}', '${height_ft}', '${height_in}', '${age}', '${phone_num}') RETURNING id;`;
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
            const query = `SELECT to_char(l.date, 'Mon DD, YYYY') as date, l.id, l.user_id, l.workout_id, l.weight, l.reps, l.duration_min, l.duration_sec, l.distance, l.calories_burned, l.user_workout_id, w.name as name, uw.name as workout_name FROM logged_workouts l
            LEFT JOIN workouts w 
            ON l.workout_id = w.id
            LEFT JOIN user_workouts uw
            ON uw.id = l.user_workout_id 
            WHERE l.user_id = '${user_id}' ORDER BY l.date DESC;`;
            const response = await db.any(query);
            return response;
        } catch (err) {
        return err.message;
        }
    } 

    static async getLoggedWorkoutsByType(user_id, type_id) {
        try {
            const query = `SELECT to_char(l.date, 'Mon DD, YYYY') as date, l.id, l.user_id, l.workout_id, l.weight, l.reps, l.duration_min, l.duration_sec, l.distance, l.calories_burned, l.user_workout_id, w.name as name, uw.name as workout_name FROM logged_workouts l
            LEFT JOIN workouts w 
            ON l.workout_id = w.id
            LEFT JOIN user_workouts uw
            ON uw.id = l.user_workout_id 
            WHERE l.user_id = '${user_id}' AND w.type_id = '${type_id}' OR l.user_id = '${user_id}' AND uw.type_id = '${type_id}' ORDER BY l.date DESC;`;
            const response = await db.any(query);
            return response;
        } catch (err) {
        return err.message;
        }
    } 
};



module.exports = User;