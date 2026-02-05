const fs = require('fs');
const path = require('path');

const messagesDir = path.join(process.cwd(), 'messages');
const enPath = path.join(messagesDir, 'en.json');
const trPath = path.join(messagesDir, 'tr.json');

const enContent = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const files = fs.readdirSync(messagesDir).filter(file => file.endsWith('.json') && file !== 'en.json' && file !== 'tr.json');

files.forEach(file => {
    const filePath = path.join(messagesDir, file);
    let content = {};
    try {
        content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
        console.error(`Error reading ${file}, initializing empty.`);
    }

    // Sync specific sections from EN
    content.PrivacyPolicy = enContent.PrivacyPolicy;
    content.TermsOfUse = enContent.TermsOfUse;
    content.Footer = enContent.Footer;
    content.CookieBanner = enContent.CookieBanner;

    // Sync ContactPage specific keys usually missing
    if (!content.ContactPage) content.ContactPage = {};
    content.ContactPage.checkbox_consent = enContent.ContactPage.checkbox_consent;
    content.ContactPage.checkbox_required_error = enContent.ContactPage.checkbox_required_error;

    // Ensure structure exists if missing
    if (!content.ContactPage.contact_info) content.ContactPage.contact_info = enContent.ContactPage.contact_info;

    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
    console.log(`Updated ${file}`);
});
