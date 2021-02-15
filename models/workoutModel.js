'use strict';

const db = require('./conn');

class Workout {
    constructor (id, name) {
        this.id = id;
        this.name = name;
    }

    static async getAllTypes() {
        const query = `SELECT * FROM types ORDER BY name;`;
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
            ORDER BY name;`;
        try {
            const response = await db.any(query);
            return response;
        } catch {
            return err.message;
        }
    }

    static async getAllUserWorkoutsByType(type_id, user_id) {
        const query = `
            SELECT * 
            FROM user_workouts 
            WHERE user_id = '${user_id}'
            AND type_id = '${type_id}';`;
        try {
            const response = await db.any(query);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async getAllWorkoutsByPart(part_id) {
        const query = `
            SELECT workouts.id, workouts.name, workouts.picture, workouts.link, workouts.type_id 
            FROM workouts 
            INNER JOIN parts_workouts 
            ON workouts.id = parts_workouts.workout_id
            WHERE parts_workouts.part_id = '${part_id}'
            ORDER BY workouts.name;`;
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
            ORDER BY name;`;
        try {
            const response = await db.any(query);
            return response;
        } catch {
            return err.message;
        }
    }

    static async getWorkoutById(workout_id) {
        const query = `SELECT * FROM workouts
            WHERE workouts.id = '${workout_id}';`;
        try {
            const response = await db.one(query);
            return response;
        } catch (err) {
            return message.err;
        }
    }

    static async getUserWorkoutById(workout_id) {
        const query = `SELECT * FROM user_workouts
            WHERE id = '${workout_id}';`;
        try {
            const response = await db.one(query);
            return response;
        } catch (err) {
            return message.err;
        }
    }

    static async getPartInfo(part_id) {
        const query = `SELECT * FROM parts_of_body
        WHERE id = '${part_id}';`;
        try {
            const response = await db.one(query);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async getTypeInfo(type_id) {
        const query = `SELECT * FROM types
        WHERE id = '${type_id}';`;
        try {
            const response = await db.one(query);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async getPartsByWorkoutId(workout_id) {
        const query = `SELECT parts_of_body.id, parts_of_body.name FROM parts_of_body
            INNER JOIN parts_workouts
            ON parts_workouts.part_id = parts_of_body.id
            INNER JOIN workouts
            ON workouts.id = parts_workouts.workout_id
            WHERE workouts.id = '${workout_id}';`;
        try {
            const response = await db.any(query);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async logWorkout(workout_id, weight, duration_min, duration_sec, reps, user_id) {
        const query = `INSERT INTO logged_workouts (workout_id, weight, duration_min, duration_sec, reps, user_id) VALUES (${workout_id}, ${weight}, ${duration_min}, ${duration_sec}, ${reps}, ${user_id});`;
        try {
            const response = await db.result(query);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async logUserWorkout(user_workout_id, weight, duration_min, duration_sec, reps, user_id) {
        const query = `INSERT INTO logged_workouts (user_workout_id, weight, duration_min, duration_sec, reps, user_id) VALUES (${user_workout_id}, ${weight}, ${duration_min}, ${duration_sec}, ${reps}, ${user_id});`;
        try {
            const response = await db.result(query);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async addUserWorkout (user_id, name, type_id) {
        const query = `INSERT INTO user_workouts (user_id, type_id, name) VALUES (${user_id}, ${type_id}, '${name}');`;
        try {
            const response = await db.result(query);
            return response;
        } catch (err) {
            return err.message;
        }
    }
}

module.exports = Workout;