const fs = require('fs'); 
fs.readFile('example.txt', 'utf-8',(err,data)=> {

    if(err){
        return console.error("Error reading file:", err); 
        console.log(data);
    }
});
console.log('Reading file...')
