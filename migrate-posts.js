const db = require('./db');

db.serialize(() => {
    db.run(`ALTER TABLE posts ADD COLUMN icon TEXT`, (err) => {
        if (err) {
            console.log("Column icon might already exist:", err.message);
        } else {
            console.log("Added icon column to posts table");
        }
    });

    db.run(`ALTER TABLE posts ADD COLUMN location TEXT`, (err) => {
        if (err) {
            console.log("Column location might already exist:", err.message);
        } else {
            console.log("Added location column to posts table");
        }
    });

    db.run(`ALTER TABLE posts ADD COLUMN event_date TEXT`, (err) => {
        if (err) {
            console.log("Column event_date might already exist:", err.message);
        } else {
            console.log("Added event_date column to posts table");
        }
    });
});
