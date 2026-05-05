const db = require('./db');

db.serialize(() => {
    db.run(`ALTER TABLE posts ADD COLUMN icon TEXT`, (err) => {
        if (err) {
            console.log("Column icon might already exist:", err.message);
        } else {
            console.log("Added icon column to posts table");
        }
    });
});
