const fs = require('fs'); 

try {
    if(!fs.existsSync('new-directory')) {
        fs.mkdirSync('new-directory'); 
        console.log('Director created successfully');
    } else {
        console.log('Directory already exists');
    }
} catch(err){
    console.log('Error creating directory;', err);
}