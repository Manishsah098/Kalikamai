const db = require('./db');
const bcrypt = require('bcryptjs');

const setup = async () => {
    const password = 'admin';
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, ['admin', hashedPassword], function(err) {
        if (err) {
            console.error('Error creating admin user:', err.message);
        } else {
            console.log('Admin user created successfully. Username: admin, Password: admin');
        }
        db.close();
    });
};

setup();
