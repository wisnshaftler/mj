import mysql from "mysql";
import util from "util";
import siteSettings from "../config.mjs";

class dbconnection {
    #connection;
    #host = siteSettings.dbhost
    #username = siteSettings.dbuser
    #password = siteSettings.dbpassword
    #dbname = siteSettings.dbname
    #query;

    constructor() {
        this.#connection = mysql.createConnection({
            host: this.#host,
            user: this.#username,
            password: this.#password,
            database: this.#dbname,
            charset : 'utf8mb4'
        });

        this.#query = util.promisify(this.#connection.query).bind(this.#connection);
    }

    /**
     * 
     * @param {String} sql SQL query
     * @param {Array} parameters values that pass in the SQL query
     * @returns promise (if await data)
     */
    async query(sql, parameters) {
        let result;
        try {
            if (!parameters || parameters == "") {
                result = await this.#query(sql);
            }

            if (parameters != (null || undefined) && parameters != "") {
                result = await this.#query(sql, parameters);
            }
        } catch (e) {
            console.log(e)
            return null
        }
        return JSON.parse(JSON.stringify(result));

    }
}

export default dbconnection = new dbconnection();