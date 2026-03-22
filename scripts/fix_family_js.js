const fs = require('fs');

const jsBundle = '/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/downloaded/sites/3bR6R2YrHoycodLqL6z8ep/6pW90hl_LWjZRtEVq1iartV66RJZ25zhIgPP6sQzSQg.CcXknUFo.mjs';
const indexHtml = '/Users/dikshantjangra/Documents/ProjectS/WeddingInvite/index.html';

function updateFamily() {
    console.log('--- UPDATING FAMILY NAMES IN JS & HTML ---');
    
    // 1. Files to update
    [jsBundle, indexHtml].forEach(file => {
        if (!fs.existsSync(file)) return;
        let content = fs.readFileSync(file, 'utf8');
        
        // Mantra
        content = content.replace(/!! श्री गणेशाय नम: !!/g, 'ॐ श्री गणेशाय नम');
        content = content.replace(/!! श्री गणेशाय नम !!/g, 'ॐ श्री गणेशाय नम');
        
        // Grandmother / Heavenly Blessings
        content = content.replace(/Smt\. Lata Devi & Sm\. Kamal Kapoor/g, 'Smt. Maanti Devi W/o Late Sh. Nathu Ram Jyani');
        
        // Parents (Groom)
        content = content.replace(/Mrs\. Reena & Mr\. Rajiv Kapoor/g, 'Smt. Roshani Devi & Sh. Mahender Singh Bhadu (Ex. AEO (Sports), Ed. Dept. Hisar)');
        
        // Parents (Bride)
        content = content.replace(/Mrs\. Shalini & Mr\. Aakash Mittal/g, 'Smt. Rajbala & Sh. Ugersain Jyani');
        
        // Additional Location details near Groom
        // (If it was "of H. No. 1244-P, Sec. 33, Hisar", I'll add it if I find the groom name)
        // Actually, the user already provided the replacement for the parent string.
        
        // Titles
        content = content.replace(/Daughter of/g, '(D/o Smt. Rajbala & Sh. Ugersain Jyani)');
        // Wait, the user said "Bride: Khushboo (D/o ...)"
        // I'll be careful not to double it.

        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    });
    
    console.log('--- FAMILY UPDATES COMPLETE ---');
}

updateFamily();
