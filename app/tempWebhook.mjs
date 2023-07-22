import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

class DataProcessor {
    constructor() {
        this.dbConfig = {
            host: 'localhost',
            user: 'root',
            password: 'cudumahattaya',
            database: 'mjprompts'
        };
    }

    async connect() {
        this.connection = await mysql.createConnection(this.dbConfig);
    }

    async disconnect() {
        await this.connection.end();
    }

    async updateImageLinks(responseData) {
        const { ref, imageUrls } = responseData;
        const imageLinks = imageUrls.join(',');
        const updateQuery = 'UPDATE prompts SET imageLinks = ? WHERE promptHash = ?';
        await this.connection.query(updateQuery, [imageLinks, ref]);
        console.log(`Updated imageLinks for ref: ${ref}`);
    }

    async processResponse(responseData) {
        try {
            await this.connect();
            await this.updateImageLinks(responseData);
        } catch (err) {
            console.error('Error processing response:', err);
        } finally {
            await this.disconnect();
        }
    }
}

export default DataProcessor = new DataProcessor();
