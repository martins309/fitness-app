'use strict';

const db = require('./conn');

class Charts {
    constructor (id) {
        this.id = id;
    }
    static async getTotalWeightByDate(date) {
        try {
            const query = `SELECT SUM(weight) AS total_weight FROM logged_workouts WHERE DATE(date) = '${date}';`;
            const response = await db.one(query);
            return response;
        } catch(err) {
            return err.message;
        }
    }
}

module.exports = Charts;