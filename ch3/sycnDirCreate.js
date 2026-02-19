const fs = require('fs'); 

try{
    const files =  fs.readdirSync('.');
    console.log("Files in directory;"); 
    files.forEach(file=> {
        console.log(file); 
    }); 
} catch(err){
    console.error('Error reading directory:', err);
} 
