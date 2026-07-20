# 🌿 Kalikamai Youth Society

> Official website for the **Kalikamai Youth Society** — a youth-led NGO dedicated to empowering communities in Nepal through sustainable development, social justice, and youth leadership.

[![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)](https://nodejs.org)
[![EJS](https://img.shields.io/badge/Template-EJS-orange)](https://ejs.co)
[![SQLite](https://img.shields.io/badge/Database-SQLite-blue?logo=sqlite)](https://sqlite.org)
[![License: ISC](https://img.shields.io/badge/License-ISC-lightgrey)](https://opensource.org/licenses/ISC)

---

## 🌟 About Us

Kalikamai Youth Society implements collaborative, community-led solutions for positive transformation. For over 2 years, we have delivered impactful programs across Nepal addressing:

- 🎓 Youth Development & Education
- 🏥 Healthcare & Child Protection
- ♀️ Women's Empowerment & Gender Equality
- 🌳 Environmental Sustainability & Tree Plantations
- 🍱 Food Security & Crisis Response
- 🎭 Preservation of Madhesi Folk Art and Culture

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🔐 Admin Panel | Secure login-protected dashboard to manage all content |
| 📰 Posts Management | Create, edit, and delete news, impact stories, and projects |
| 👥 Members Management | Add/update team members with photos and social links |
| 🤝 Volunteers | View and manage volunteer submissions |
| 📬 Messages | Read and manage contact form submissions |
| 💼 Vacancies | Post job openings with number of employees, type, deadline, and live preview |
| 🖼️ Image Uploads | Upload images directly for posts and member profiles |
| 📱 Responsive Design | Mobile-friendly across all pages |
| 🧑‍💻 Developer Page | Dedicated page for the site developer with social links |

---

## 🛠️ Technology Stack

- **Backend**: [Node.js](https://nodejs.org) + [Express.js](https://expressjs.com)
- **Template Engine**: [EJS](https://ejs.co) (Embedded JavaScript)
- **Database**: [SQLite3](https://sqlite.org) (via `sqlite3` npm package)
- **Authentication**: Session-based login with [bcryptjs](https://github.com/dcodeIO/bcrypt.js) password hashing
- **File Uploads**: [Multer](https://github.com/expressjs/multer)
- **Styling**: Vanilla CSS (`style.css`) with glassmorphism, gradient animations, and responsive grids
- **Icons**: [Font Awesome 6.4](https://fontawesome.com)
- **Fonts**: [Google Fonts](https://fonts.google.com) — Outfit & Inter

---

## 📂 Project Structure

```
kalikamai-youth-society/
├── server.js               # Express app, routes, and auth middleware
├── db.js                   # SQLite database initialization and schema
├── script.js               # Client-side JS (nav, modals, counters)
├── style.css               # Global stylesheet
├── package.json
├── database.sqlite         # SQLite database file (auto-created)
│
├── assets/                 # Images, logos, and media files
│   ├── logo.jpeg
│   ├── developer.jpg
│   └── ...
│
└── views/
    ├── index.ejs           # Homepage (hero, stats, news, vacancies)
    ├── developer.ejs       # Developer info page
    ├── members-dynamic.ejs # Members listing
    ├── projects-dynamic.ejs
    ├── impact-dynamic.ejs
    ├── work-dynamic.ejs
    ├── news-detail.ejs
    └── admin/
        ├── login.ejs           # Admin login page
        ├── dashboard.ejs       # Posts management
        ├── create.ejs          # Create post
        ├── edit.ejs            # Edit post
        ├── members.ejs         # Members management
        ├── members-create.ejs
        ├── members-edit.ejs
        ├── volunteers.ejs      # Volunteer submissions
        ├── contacts.ejs        # Contact messages
        ├── vacancies.ejs       # Vacancies management
        ├── vacancies-create.ejs
        └── vacancies-edit.ejs
```

---

## 💻 Running Locally

### Prerequisites
- [Node.js](https://nodejs.org) v16 or higher
- npm (comes with Node.js)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/Manishsah098/Kalikamai.git
cd Kalikamai

# 2. Install dependencies
npm install

# 3. Start the server
node server.js
```

The server will start at **http://localhost:3000**

### First-Time Admin Setup

On first run, create an admin account by running:

```bash
node setup-db.js
```

Then navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login) to log in.

---

## 🔐 Admin Panel

The admin panel is accessible at `/admin/login` and allows you to:

- **Manage Posts** — Add news, impact stories, and projects with images
- **Manage Members** — Team profiles with photos and social links
- **Manage Volunteers** — View volunteer sign-up requests
- **Manage Messages** — Read messages from the contact form
- **Manage Vacancies** — Post jobs with position count, type, location, and deadline

---

## 🤝 Contributing & Support

> *"Your Little Step Can Make a Huge Impact!"*

We welcome passionate individuals to contribute. If you wish to support our mission or contribute to the website:

- 📩 Use the contact form on the live site
- 💛 Visit the **Support Us** page to donate
- 🙌 Reach out to become a volunteer

---

## 🧑‍💻 Developer

Built and maintained by **Manish Kumar Sah**
Fullstack Developer | Founder of Bikrama Technosoft

[![Facebook](https://img.shields.io/badge/Facebook-1877F2?logo=facebook&logoColor=white)](https://www.facebook.com/share/1BrpTHK33A/)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?logo=instagram&logoColor=white)](https://www.instagram.com/manishshah2332)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/manish-kumar-sah-917116367)

📞 +977 9811807618 | +91 7250140014

---

## 📬 Contact Information

| | |
|---|---|
| 📍 Location | Kalikamai RM-02 (Bhedihari), Parsa, Nepal |
| 📞 Phone | +977-9763368173 |
| 📧 Email | kalikamaiyouthsociety@gmail.com |
| 🌐 Facebook | [Kalikamai Yuva Samaj](https://www.facebook.com/kalikama.i.yuva.samaja) |

---

© 2026 Kalikamai Youth Society. All Rights Reserved. Empowering Youth.
