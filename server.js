const express = require('express');
const session = require('express-session');
const path = require('path');
const db = require('./db');
const bcrypt = require('bcryptjs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Setup Multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'kalikamai_secret_key',
    resave: false,
    saveUninitialized: false
}));

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(__dirname));

// Auth Middleware
const requireAuth = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/admin/login');
    }
};

// =======================
// Public Routes
// =======================

app.get('/', (req, res) => {
    db.all(`SELECT * FROM vacancies ORDER BY created_at DESC`, [], (err, vacancies) => {
        if (err) {
            console.error(err);
            vacancies = [];
        }
        db.all(`SELECT * FROM posts WHERE type IN ('project', 'news') ORDER BY created_at DESC LIMIT 6`, [], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Database error");
            }
            res.render('index', { posts: rows, vacancies });
        });
    });
});

app.get('/index.html', (req, res) => {
    res.redirect('/');
});

app.get('/projects.html', (req, res) => {
    db.all(`SELECT * FROM posts WHERE type IN ('project', 'news') ORDER BY created_at DESC`, [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
        }
        res.render('projects-dynamic', { posts: rows });
    });
});

app.get('/work.html', (req, res) => {
    db.all(`SELECT * FROM posts WHERE type = 'work' ORDER BY created_at DESC`, [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
        }
        res.render('work-dynamic', { works: rows });
    });
});

app.get('/impact.html', (req, res) => {
    db.all(`SELECT * FROM posts WHERE type = 'impact' ORDER BY created_at DESC`, [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
        }
        res.render('impact-dynamic', { impacts: rows });
    });
});

app.get('/members.html', (req, res) => {
    db.all(`SELECT * FROM members ORDER BY display_order ASC`, [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
        }
        res.render('members-dynamic', { members: rows });
    });
});

app.get('/news/:id', (req, res) => {
    db.get(`SELECT * FROM posts WHERE id = ?`, [req.params.id], (err, row) => {
        if (err || !row) {
            return res.status(404).send("Post not found");
        }
        res.render('news-detail', { post: row });
    });
});

app.post('/api/volunteers', (req, res) => {
    const { name, email, phone, reason } = req.body;
    db.run(`INSERT INTO volunteers (name, email, phone, reason) VALUES (?, ?, ?, ?)`,
        [name, email, phone, reason],
        function(err) {
            if (err) {
                console.error("Error inserting volunteer:", err);
                return res.status(500).json({ success: false, error: 'Database error' });
            }
            res.json({ success: true, id: this.lastID });
        }
    );
});

app.post('/api/contacts', (req, res) => {
    const { name, email, message } = req.body;
    db.run(`INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`,
        [name, email, message],
        function(err) {
            if (err) {
                console.error("Error inserting contact message:", err);
                return res.status(500).json({ success: false, error: 'Database error' });
            }
            res.json({ success: true, id: this.lastID });
        }
    );
});

// =======================
// Admin Routes
// =======================

app.get('/admin', (req, res) => {
    res.redirect('/admin/dashboard');
});

app.get('/admin/login', (req, res) => {
    res.render('admin/login', { error: null });
});

app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
        if (user && await bcrypt.compare(password, user.password)) {
            req.session.userId = user.id;
            res.redirect('/admin/dashboard');
        } else {
            res.render('admin/login', { error: 'Invalid username or password' });
        }
    });
});

app.get('/admin/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
});

app.get('/admin/dashboard', requireAuth, (req, res) => {
    db.all(`SELECT * FROM posts ORDER BY created_at DESC`, [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
        }
        res.render('admin/dashboard', { posts: rows });
    });
});

app.get('/admin/create', requireAuth, (req, res) => {
    res.render('admin/create');
});

app.post('/admin/create', requireAuth, upload.single('image'), (req, res) => {
    const { title, subtitle, content, type, icon, location, event_date } = req.body;
    const image_url = req.file ? 'assets/' + req.file.filename : '';

    db.run(`INSERT INTO posts (title, subtitle, content, image_url, type, icon, location, event_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [title, subtitle, content, image_url, type, icon, location, event_date],
        (err) => {
            if (err) console.error(err);
            res.redirect('/admin/dashboard');
        }
    );
});

app.get('/admin/edit/:id', requireAuth, (req, res) => {
    db.get(`SELECT * FROM posts WHERE id = ?`, [req.params.id], (err, row) => {
        if (!row) return res.redirect('/admin/dashboard');
        res.render('admin/edit', { post: row });
    });
});

app.post('/admin/edit/:id', requireAuth, upload.single('image'), (req, res) => {
    const { title, subtitle, content, type, icon, location, event_date } = req.body;
    const id = req.params.id;
    
    if (req.file) {
        const image_url = 'assets/' + req.file.filename;
        db.run(`UPDATE posts SET title = ?, subtitle = ?, content = ?, type = ?, icon = ?, location = ?, event_date = ?, image_url = ? WHERE id = ?`,
            [title, subtitle, content, type, icon, location, event_date, image_url, id], (err) => {
                res.redirect('/admin/dashboard');
            });
    } else {
        db.run(`UPDATE posts SET title = ?, subtitle = ?, content = ?, type = ?, icon = ?, location = ?, event_date = ? WHERE id = ?`,
            [title, subtitle, content, type, icon, location, event_date, id], (err) => {
                res.redirect('/admin/dashboard');
            });
    }
});

app.post('/admin/delete/:id', requireAuth, (req, res) => {
    db.run(`DELETE FROM posts WHERE id = ?`, [req.params.id], (err) => {
        res.redirect('/admin/dashboard');
    });
});

// Members Admin Routes
app.get('/admin/members', requireAuth, (req, res) => {
    db.all(`SELECT * FROM members ORDER BY display_order ASC`, [], (err, rows) => {
        res.render('admin/members', { members: rows });
    });
});

app.get('/admin/members/create', requireAuth, (req, res) => {
    res.render('admin/members-create');
});

app.post('/admin/members/create', requireAuth, upload.single('image'), (req, res) => {
    const { name, role, department, phone, facebook_url, twitter_url, google_url, linkedin_url, display_order } = req.body;
    const image_url = req.file ? 'assets/' + req.file.filename : '';

    db.run(`INSERT INTO members (name, role, department, phone, image_url, facebook_url, twitter_url, google_url, linkedin_url, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, role, department, phone, image_url, facebook_url, twitter_url, google_url, linkedin_url, display_order || 0],
        (err) => {
            if (err) console.error(err);
            res.redirect('/admin/members');
        }
    );
});

app.get('/admin/members/edit/:id', requireAuth, (req, res) => {
    db.get(`SELECT * FROM members WHERE id = ?`, [req.params.id], (err, row) => {
        if (!row) return res.redirect('/admin/members');
        res.render('admin/members-edit', { member: row });
    });
});

app.post('/admin/members/edit/:id', requireAuth, upload.single('image'), (req, res) => {
    const { name, role, department, phone, facebook_url, twitter_url, google_url, linkedin_url, display_order } = req.body;
    const id = req.params.id;
    
    if (req.file) {
        const image_url = 'assets/' + req.file.filename;
        db.run(`UPDATE members SET name=?, role=?, department=?, phone=?, facebook_url=?, twitter_url=?, google_url=?, linkedin_url=?, display_order=?, image_url=? WHERE id=?`,
            [name, role, department, phone, facebook_url, twitter_url, google_url, linkedin_url, display_order || 0, image_url, id], (err) => {
                res.redirect('/admin/members');
            });
    } else {
        db.run(`UPDATE members SET name=?, role=?, department=?, phone=?, facebook_url=?, twitter_url=?, google_url=?, linkedin_url=?, display_order=? WHERE id=?`,
            [name, role, department, phone, facebook_url, twitter_url, google_url, linkedin_url, display_order || 0, id], (err) => {
                res.redirect('/admin/members');
            });
    }
});

app.post('/admin/members/delete/:id', requireAuth, (req, res) => {
    db.run(`DELETE FROM members WHERE id = ?`, [req.params.id], (err) => {
        res.redirect('/admin/members');
    });
});

// Volunteers Admin Routes
app.get('/admin/volunteers', requireAuth, (req, res) => {
    db.all(`SELECT * FROM volunteers ORDER BY created_at DESC`, [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
        }
        res.render('admin/volunteers', { volunteers: rows });
    });
});

app.post('/admin/volunteers/delete/:id', requireAuth, (req, res) => {
    db.run(`DELETE FROM volunteers WHERE id = ?`, [req.params.id], (err) => {
        if (err) console.error(err);
        res.redirect('/admin/volunteers');
    });
});

// Contacts Admin Routes
app.get('/admin/contacts', requireAuth, (req, res) => {
    db.all(`SELECT * FROM contacts ORDER BY created_at DESC`, [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
        }
        res.render('admin/contacts', { contacts: rows });
    });
});

app.post('/admin/contacts/delete/:id', requireAuth, (req, res) => {
    db.run(`DELETE FROM contacts WHERE id = ?`, [req.params.id], (err) => {
        if (err) console.error(err);
        res.redirect('/admin/contacts');
    });
});

// Vacancies Admin Routes
app.get('/admin/vacancies', requireAuth, (req, res) => {
    db.all(`SELECT * FROM vacancies ORDER BY created_at DESC`, [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
        }
        res.render('admin/vacancies', { vacancies: rows });
    });
});

app.get('/admin/vacancies/create', requireAuth, (req, res) => {
    res.render('admin/vacancies-create');
});

app.post('/admin/vacancies/create', requireAuth, (req, res) => {
    const { title, description, location, type, deadline } = req.body;
    db.run(`INSERT INTO vacancies (title, description, location, type, deadline) VALUES (?, ?, ?, ?, ?)`,
        [title, description, location, type, deadline],
        (err) => {
            if (err) console.error(err);
            res.redirect('/admin/vacancies');
        }
    );
});

app.get('/admin/vacancies/edit/:id', requireAuth, (req, res) => {
    db.get(`SELECT * FROM vacancies WHERE id = ?`, [req.params.id], (err, row) => {
        if (!row) return res.redirect('/admin/vacancies');
        res.render('admin/vacancies-edit', { vacancy: row });
    });
});

app.post('/admin/vacancies/edit/:id', requireAuth, (req, res) => {
    const { title, description, location, type, deadline } = req.body;
    const id = req.params.id;
    db.run(`UPDATE vacancies SET title = ?, description = ?, location = ?, type = ?, deadline = ? WHERE id = ?`,
        [title, description, location, type, deadline, id],
        (err) => {
            if (err) console.error(err);
            res.redirect('/admin/vacancies');
        }
    );
});

app.post('/admin/vacancies/delete/:id', requireAuth, (req, res) => {
    db.run(`DELETE FROM vacancies WHERE id = ?`, [req.params.id], (err) => {
        if (err) console.error(err);
        res.redirect('/admin/vacancies');
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
