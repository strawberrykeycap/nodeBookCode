const fs = require('fs');

console.log('Deleting directory...');

fs.rmdir('new-directory', (err) => {
    if (err) {
        console.error('Error deleting directory:', err);
        return;
    }
    console.log('Directory deleted successfully');
});