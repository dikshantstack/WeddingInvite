const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const events = [
  { name: 'Haldi', date: 'Sunday, 22nd March, 2026', venue: 'Near Petrol Pump, Hisar Road, (Dhani) Dhansu', time: '5:15 PM' },
  { name: 'Ladies Sangeet', date: 'Wednesday, 25th March, 2026', venue: 'Near Petrol Pump, Hisar Road, (Dhani) Dhansu', time: '8:15 PM' },
  { name: 'Bhaat', date: 'Thursday, 26th March, 2026', venue: 'Near Petrol Pump, Hisar Road, (Dhani) Dhansu', time: '6:15 PM' },
  { name: 'Dinner', date: 'Thursday, 26th March, 2026', venue: 'Near Petrol Pump, Hisar Road, (Dhani) Dhansu', time: '7:15 PM' },
  { name: 'Reception of Barat', date: 'Thursday, 26th March, 2026', venue: 'Near Petrol Pump, Hisar Road, (Dhani) Dhansu', time: '8:15 PM' },
  { name: 'Doli', date: 'Thursday, 26th March, 2026', venue: 'Tarron Ki Chhaon Mein', time: '&nbsp;' }
];

let eventIndex = 0;

// Match the entire Event Card wrapper, down to the Event name, Date, Venue, Location, Time.
// We are going to incrementally replace them.
// We will find occurrences of `data-framer-name="Event name"` and replace the inner HTML of the next `<p>`.

html = html.replace(/data-framer-name="Event name"[\s\S]*?class="framer-text">(.*?)<\/p>/g, (match, p1) => {
    if (eventIndex < events.length) {
        const replacement = match.replace(p1, events[eventIndex].name);
        eventIndex++;
        return replacement;
    }
    return match;
});

eventIndex = 0;
html = html.replace(/data-framer-name="Date and day"[\s\S]*?class="framer-text">(.*?)<\/p>/g, (match, p1) => {
    if (eventIndex < events.length) {
        const replacement = match.replace(p1, events[eventIndex].date);
        eventIndex++;
        return replacement;
    }
    return match;
});

eventIndex = 0;
html = html.replace(/data-framer-name="Venue"[\s\S]*?class="framer-text">(.*?)<\/p>/g, (match, p1) => {
    if (eventIndex < events.length) {
        const replacement = match.replace(p1, events[eventIndex].venue);
        eventIndex++;
        return replacement;
    }
    return match;
});

eventIndex = 0;
html = html.replace(/data-framer-name="Time"[\s\S]*?class="framer-text">(.*?)<\/p>/g, (match, p1) => {
    if (eventIndex < events.length) {
        const replacement = match.replace(p1, events[eventIndex].time);
        eventIndex++;
        return replacement;
    }
    return match;
});

fs.writeFileSync('index.html', html);
console.log('Successfully updated 6 events');
