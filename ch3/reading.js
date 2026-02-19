const fs = require('fs'); 
try { 

    const data = fs.readFileSync('example.txt', 'utf-8'); 
    console.log(data); 

} catch (err) {
    console.log('Error reading file:', err);
}
