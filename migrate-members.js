const db = require('./db');

const members = [
    { name: 'Mr. Aakash Chaurasiya', role: 'President', department: 'B.A.LL.B', phone: '+977-9763368173', image_url: 'assets/president.jpg', fb: 'https://facebook.com/', tw: 'https://twitter.com/', gp: 'https://google.com/', li: 'https://linkedin.com/' },
    { name: 'Mr. Aakash Kumar Kewat', role: 'Senior Vice-President', department: '+2 passed', phone: '+977-9862545566', image_url: 'assets/aakash kewat.jpg', fb: 'https://www.facebook.com/share/1ApAzqS6kh/', tw: 'https://twitter.com/', gp: 'mailto:akashchaurasiyabrj2019@Gmail.com', li: 'https://linkedin.com/' },
    { name: 'Mr. Bharat Sah Teli', role: 'Vice President', department: 'BSC', phone: '+977-9861238906', image_url: '', fb: 'https://facebook.com/', tw: 'https://twitter.com/', gp: 'https://google.com/', li: 'https://linkedin.com/' },
    { name: 'Mr. Bullet Tiwari', role: 'Treasurer', department: 'BLE(8th)', phone: '+977-9763368173', image_url: 'assets/bullet.png', fb: 'https://facebook.com/', tw: 'https://twitter.com/', gp: 'https://google.com/', li: 'https://linkedin.com/' },
    { name: 'Mr. Bishal Kushwaha', role: 'Senior-Secretary', department: 'Bachelor', phone: '+977-9806824046', image_url: 'assets/bishal.jpg', fb: 'https://facebook.com/', tw: 'https://twitter.com/', gp: 'https://google.com/', li: 'https://linkedin.com/' },
    { name: 'Mr. Sudeep Kr Chaurasiya', role: 'Joint-Secretary', department: 'Intermediate', phone: '+977-9817289513', image_url: '', fb: 'https://facebook.com/', tw: 'https://twitter.com/', gp: 'https://google.com/', li: 'https://linkedin.com/' },
    { name: 'Mr. Binay Kr Chaurasiya', role: 'Executive Member', department: 'Masters in Business Studies', phone: '+977-9763368173', image_url: '', fb: 'https://facebook.com/', tw: 'https://twitter.com/', gp: 'https://google.com/', li: 'https://linkedin.com/' },
    { name: 'Mr. Mohan Kushwaha', role: 'Executive Member', department: 'Intermediate', phone: '+977-9826877767', image_url: 'assets/mohan.jpg', fb: 'https://facebook.com/', tw: 'https://twitter.com/', gp: 'https://google.com/', li: 'https://linkedin.com/' },
    { name: 'Mr.Ramesh Pd Chaurasiya', role: 'Executive Member', department: 'Intermediate', phone: '+977-9811282533', image_url: 'assets/ramesh.jpg', fb: 'https://facebook.com/', tw: 'https://twitter.com/', gp: 'https://google.com/', li: 'https://linkedin.com/' },
    { name: 'Mr. Chandra Shekhar Patel', role: 'Executive Member', department: 'Intermediate', phone: '+977-9808699643', image_url: '', fb: 'https://facebook.com/', tw: 'https://twitter.com/', gp: 'https://google.com/', li: 'https://linkedin.com/' },
    { name: 'Mr. Sabir Alam', role: 'Executive Member', department: 'BBS', phone: '+977-9816222137', image_url: '', fb: 'https://facebook.com/', tw: 'https://twitter.com/', gp: 'https://google.com/', li: 'https://linkedin.com/' },
    { name: 'Mr. Rakesh Sarraf', role: 'Executive Member', department: 'Intermediate', phone: '+977-9811234422', image_url: '', fb: 'https://facebook.com/', tw: 'https://twitter.com/', gp: 'https://google.com/', li: 'https://linkedin.com/' },
    { name: 'Mr. Yuvraj Patel', role: 'Executive Member', department: 'Intermediate', phone: '+977-9821877531', image_url: '', fb: 'https://facebook.com/', tw: 'https://twitter.com/', gp: 'https://google.com/', li: 'https://linkedin.com/' },
    { name: 'Mr. Sahajad Alam', role: 'Executive Member', department: 'Intermediate', phone: '+977-9824281122', image_url: '', fb: 'https://facebook.com/', tw: 'https://twitter.com/', gp: 'https://google.com/', li: 'https://linkedin.com/' },
    { name: 'Mr. Sujit Kr Kushwaha', role: 'Executive Member', department: 'Intermediate', phone: '+977-9824284687', image_url: '', fb: 'https://facebook.com/', tw: 'https://twitter.com/', gp: 'https://google.com/', li: 'https://linkedin.com/' },
    { name: 'Mr. Nitesh Kushwaha', role: 'Executive Member', department: 'Intermediate', phone: '+977-9811290956', image_url: 'assets/nitesh.jpg', fb: 'https://facebook.com/', tw: 'https://twitter.com/', gp: 'https://google.com/', li: 'https://linkedin.com/' }
];

db.serialize(() => {
    db.run(`DELETE FROM members`, (err) => {
        if(err) console.error(err);
        
        const stmt = db.prepare(`INSERT INTO members (name, role, department, phone, image_url, facebook_url, twitter_url, google_url, linkedin_url, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
        
        members.forEach((m, index) => {
            stmt.run(m.name, m.role, m.department, m.phone, m.image_url, m.fb, m.tw, m.gp, m.li, index);
        });
        
        stmt.finalize();
        console.log("Database seeded with 16 members.");
    });
});
