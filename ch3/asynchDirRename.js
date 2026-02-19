const fs = require('fs'); 
fs.rename('old-directory', 'new-directory',(err) => {

    if(err){

        return console.error('Error renaming directory:', err); 
    }
    console.log('Directory renamed successfully');

}); 

console.log("Renaming directory...");