'use strict';

const db = require('./conn');

class Workout {
    constructor (id, name) {
        this.id = id;
        this.name = name;
    }

    static async getAllTypes() {
        const query = `SELECT * FROM types ORDER BY name DESC;`;
        try {
            const response = await db.any(query);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async getAllWorkoutsByType(type_id) {
        const query = `
            SELECT * 
            FROM workouts 
            WHERE type_id = '${type_id}'
            ORDER BY name DESC;`;
        try {
            const response = await db.any(query);
            return response;
        } catch {
            return err.message;
        }
    }

    static async getAllWorkoutsByPartAndType(part_id, type_id) {
        const query = `
            SELECT * 
            FROM workouts 
            INNER JOIN parts_workouts
            ON part_id = '${part_id}'
            WHERE workouts.type_id = '${type_id}' AND parts_workouts.part_id = '${part_id}'
            ORDER BY name DESC;`;
        try {
            const response = await db.any(query);
            return response;
        } catch {
            return err.message;
        }
    }

    static async getWorkoutById(workout_id) {
        const query = `SELECT * FROM workouts
            INNER JOIN parts_workouts
            ON workouts.id = parts_workouts.workout_id
            INNER JOIN parts_of_body
            ON parts_workouts.part_id = parts_of_body.id;`;
    }
}

module.exports = Workout;