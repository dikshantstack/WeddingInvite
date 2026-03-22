const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const anchor = `const fix = () => {`;

const injection = `const fix = () => {
        // --- ABSOLUTE EVENTS CARD SYNC LOCK (Locks against React Hydration Wipes) ---
        const eventsData = [
          { name: 'Haldi', date: 'Sunday, 22nd March, 2026', venue: 'Near Petrol Pump, Hisar Road, (Dhani) Dhansu (Blue Bells Public School)', time: '5:15 PM' },
          { name: 'Ladies Sangeet', date: 'Wednesday, 25th March, 2026', venue: 'Near Petrol Pump, Hisar Road, (Dhani) Dhansu (Blue Bells Public School)', time: '8:15 PM' },
          { name: 'Bhaat', date: 'Thursday, 26th March, 2026', venue: 'Near Petrol Pump, Hisar Road, (Dhani) Dhansu', time: '6:15 PM' },
          { name: 'Dinner', date: 'Thursday, 26th March, 2026', venue: 'Near Petrol Pump, Hisar Road, (Dhani) Dhansu (Blue Bells Public School)', time: '7:15 PM' },
          { name: 'Reception of Barat', date: 'Thursday, 26th March, 2026', venue: 'Near Petrol Pump, Hisar Road, (Dhani) Dhansu (Blue Bells Public School)', time: '8:15 PM' },
          { name: 'Doli', date: 'Thursday, 26th March, 2026', venue: 'Near Petrol Pump, Hisar Road, (Dhani) Dhansu (Blue Bells Public School)', time: ' ' }
        ];

        const nameCards = document.querySelectorAll('[data-framer-name="Event name"] p');
        const dateCards = document.querySelectorAll('[data-framer-name="Date and day"] p');
        const venueCards = document.querySelectorAll('[data-framer-name="Venue"] p');
        const timeCards = document.querySelectorAll('[data-framer-name="Time"] p');

        for (let i = 0; i < eventsData.length; i++) {
            if (nameCards[i] && nameCards[i].innerText !== eventsData[i].name) nameCards[i].innerText = eventsData[i].name;
            if (dateCards[i] && dateCards[i].innerText !== eventsData[i].date) dateCards[i].innerText = eventsData[i].date;
            if (venueCards[i] && venueCards[i].innerText !== eventsData[i].venue) venueCards[i].innerText = eventsData[i].venue;
            if (timeCards[i] && timeCards[i].innerText !== eventsData[i].time) timeCards[i].innerText = eventsData[i].time;
        }
        // ---------------------------------------------------------------------`;

if (html.includes(anchor)) {
    html = html.replace(anchor, injection);
    console.log('Successfully injected Events lock script in ultimate-watermark-killer-js!');
    fs.writeFileSync('index.html', html);
} else {
    console.log('Target script starting anchor not found!');
}
