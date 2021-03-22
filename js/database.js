const { Pool } = require('pg');
const { db } = require('../config');
const pool = new Pool(db);

const CRUD = {

    /*
     * Creating user
     * @param {Object} userRecord
     * @param {Array} fields in database
     * @param {Array} fields in record
     * @returns {Int} record's id in database      
     * 
    */

    createUser: async (dbFields, fieldValues) => {
        let values = '$1',
                res;

        try {
            const client = await pool.connect();
            dbFields = dbFields.join(', ');

            for (let i = 1; i < fieldValues.length; i++ ) {
                values += `, $${i + 1}`;
            }

            try {
                await client.query('BEGIN');
                const queryText = `INSERT INTO users(${dbFields}) VALUES(${values}) RETURNING id`;
                res = await client.query(queryText, fieldValues);
                await client.query('COMMIT');
            } catch (e) {
                await client.query('ROLLBACK');
                throw e;
            } finally {
                client.release();
            }
        } catch (e) {
            console.error(e.stack);
        }
        return res;
    },

    /*
     * Updating user
     * @param {Object} userRecord
     * @param {Array} fields in database
     * @param {Array} fields in record
     * @returns {Int} record's id in database      
     * 
    */

    updateUser: async (record, dbFields, params) => {
        const client = await pool.connect();
        let fields = [],
            res;
        try {

            for (let i = 0; i < params.length; i++ ) {
                fields[i] = `${dbFields[i]} = $${i + 1}`;
            }
            fields = fields.join(', ');
            try {
                await client.query('BEGIN');
                const queryText = `
                UPDATE users
                    SET 
                    ${fields}
                WHERE telegramCode = ${record.telegramId}
                RETURNING id`;
                res = await client.query(queryText, params);
                await client.query('COMMIT');
            } catch (e) {
                await client.query('ROLLBACK');
                throw e;
            } finally {
                client.release();
            }
        } catch (e) {
            console.error(e.stack);
        }
        return res;
    },

    /*
     * Reading users from database
     * @param {Object}
     * @returns {Array}
     */

    readUsers: async (params = {}) => {
        const client = await pool.connect();
        let res,
        where = '',
        queryText,
        queryParams = [];

        if (params.telegramId) {
            where += `WHERE U.telegramCode = $1`;
            queryParams.push(params.telegramId);
        }

        queryText = `
        SELECT 
            U.id "id",
            U.telegramCode "telegramId",
            U.balance "balance",
            U.twitter "twitter",
            U.ethaddress "ethAddress",
            U.airdropTasksCompleted "tasksCompleted",
            U.payrollDate "payDate",
			(SELECT 
                telegramcode 
            FROM userreferral 
            WHERE referraltelegramcode = U.telegramcode) "inviterId",
            SUM(UR.referralBalance) "refBalance"
        FROM users U 
        LEFT JOIN userreferral UR
        ON U.telegramCode = UR.telegramCode
        ${where}
        GROUP BY U.id`;


        try {
            res = await client.query(queryText, queryParams);
        } catch (e) {
            console.error(e);
        } finally {
            // Make sure to release the client before any error handling,
            // just in case the error handling itself throws an error.
            client.release();
        }
        
        return res ? res.rows.length > 1 ? res.rows : res.rows[0] : false;
    },

    /*
     * Creating userReferral
     * @param {Array} fields in database
     * @param {Array} fields in record
     * @returns {Int} record's id in database      
     * 
    */

    createUserReferral: async (dbFields, fieldValues) => {
        let values = '$1',
                res;

        try {
            const client = await pool.connect();
            dbFields = dbFields.join(', ');

            for (let i = 1; i < fieldValues.length; i++ ) {
                values += `, $${i + 1}`;
            }

            try {
                await client.query('BEGIN');
                const queryText = `INSERT INTO userreferral(${dbFields}) VALUES(${values}) RETURNING telegramcode`;
                res = await client.query(queryText, fieldValues);
                await client.query('COMMIT');
            } catch (e) {
                await client.query('ROLLBACK');
                throw e;
            } finally {
                client.release();
            }
        } catch (e) {
            console.error(e.stack);
        }
        return res;
    },

    /*
     * Updating userReferral
     * @param {Object} userRecord
     * @param {Array} fields in database
     * @param {Array} fields in record
     * @returns {Int} record's id in database      
     * 
    */

    updateUserReferral: async (userRef, dbFields, params) => {
        const client = await pool.connect();
        let fields = [],
            res;
        try {

            for (let i = 0; i < params.length; i++ ) {
                fields[i] = `${dbFields[i]} = $${i + 1}`;
            }
            fields = fields.join(', ');
            try {
                await client.query('BEGIN');
                const queryText = `
                UPDATE userreferral
                    SET 
                    ${fields}
                WHERE telegramCode = ${userRef.inviterId} 
                    AND
                    referraltelegramcode = ${userRef.telegramId}  
                RETURNING id`;
                res = await client.query(queryText, params);
                await client.query('COMMIT');
            } catch (e) {
                await client.query('ROLLBACK');
                throw e;
            } finally {
                client.release();
            }
        } catch (e) {
            console.error(e.stack);
        }
        return res;
    },
};


module.exports = CRUD;