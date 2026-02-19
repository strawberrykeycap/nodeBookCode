const fs = require('fs'); 

fs.watch('example.txt', (eventType, filename) => {
    if (filename) {
    console.log(`File ${filename} has been  modified`);
    }

}); 

console.log('Watching file....'); 