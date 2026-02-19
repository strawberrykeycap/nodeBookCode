const fs = require('fs'); 

//This deletes asynchronously neato!
fs.unlink('example.txt', (err) => {
    if(err){
        return console.error('Error deleting file:', err); 
        
    }
    console.log('File deleted successfully');
})

console.log('Deleting file...');
