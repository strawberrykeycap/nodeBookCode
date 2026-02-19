const fs = require('fs');
fs.mkdir('new-directory', (err) => {
    if (err) {
        return console.error('Error creating directory:', err);
    }
    console.log('Directory created successfully');
});

console.log('Creating directory...'); 