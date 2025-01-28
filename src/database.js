const sqlite3 = require('sqlite3').verbose();

// Open or create the database file
const db = new sqlite3.Database('./bot.db', (err) => {
    if (err) {
        console.error('❌ Failed to connect to database:', err.message);
    } else {
        console.log('✅ Connected to SQLite database.');
    }
});

// Create the kick_logs table if it doesn't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS kick_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL,
            kicked_by TEXT NOT NULL,
            timestamp TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error('❌ Failed to create table:', err.message);
        } else {
            console.log('✅ kick_logs table is ready.');
        }
    });
});

// Export the database connection
module.exports = db;
