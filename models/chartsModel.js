'use strict';

const db = require('./conn');

class Charts {
    constructor (id) {
        this.id = id;
    }
    static async getTotalColumnByDate(user_id, date, label) {
        try {
            const query = `SELECT SUM(${label}) AS total FROM logged_workouts WHERE DATE(date) = '${date}' AND user_id = '${user_id}';`;
            const response = await db.one(query);
            return response;
        } catch(err) {
            return err.message;
        }
    }

    static async getTotalDurationByDate(date) {
        try {
            const query = `SELECT SUM(duration_min) AS total_duration_min FROM logged_workouts WHERE DATE(date) = '${date}';`;
            const response = await db.one(query);
            return response;
        } catch(err) {
            return err.message;
        }
    }
    static async getTotalDistanceByDate(date) {
        try {
            const query = `SELECT SUM(distance) AS total_distance FROM logged_workouts WHERE DATE(date) = '${date}';`;
            const response = await db.one(query);
            return response;
        } catch(err) {
            return err.message;
        }
    }
}

module.exports = Charts;