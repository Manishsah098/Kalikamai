const db = require('./db');

const posts = [
    {
        title: 'Anti-Dowry Campaign (दहेज बहिष्कार अभियान)',
        subtitle: 'Eradicating social evils through community mobilization and legislative awareness sessions across Kalikamai.',
        content: '<p>The <strong>Kalikamai Youth Society (KYS)</strong> has launched a comprehensive Anti-Dowry Campaign aimed at eradicating the deep-rooted social practice of dowry that affects countless families in our region.</p><h2>Major Objectives of the Campaign</h2><ul><li><strong>Social Awareness:</strong> Conducting street plays (Sadak Natak) and community meetings to highlight the negative impact of dowry on society and individual families.</li><li><strong>Empowering Youth:</strong> Engaging young men and women to sign pledges against accepting or giving dowry, fostering a generational shift in values.</li><li><strong>Legal Support & Counseling:</strong> Providing a safe platform for victims of dowry-related harassment to seek legal advice and emotional support.</li><li><strong>Mass Mobilization:</strong> Involving local leaders, religious figures, and influencers to advocate for dowry-free marriages and simpler ceremonies.</li></ul><p>Through these continuous efforts, KYS aims to build a society where every individual is valued for their character and contribution, rather than their financial background. Join us in making Kalikamai a model for social reform.</p>',
        image_url: '',
        type: 'project'
    },
    {
        title: 'Drug Awareness Training Program in Kalikamai RM',
        subtitle: 'A comprehensive program designed to educate and protect students in Kalikamai RM schools through awareness and resistance skills training.',
        content: '<p>Our Drug Awareness Training Program aims to educate the youth about the dangers of substance abuse. We conduct workshops and seminars in various schools across Kalikamai RM.</p><p>We believe that prevention is better than cure, and by equipping our youth with the right knowledge, we can build a drug-free community.</p>',
        image_url: 'assets/defence.jpg',
        type: 'news'
    }
];

db.serialize(() => {
    const stmt = db.prepare(`INSERT INTO posts (title, subtitle, content, image_url, type) VALUES (?, ?, ?, ?, ?)`);
    for (const post of posts) {
        stmt.run(post.title, post.subtitle, post.content, post.image_url, post.type);
    }
    stmt.finalize();
    console.log("Database seeded with sample posts.");
});
