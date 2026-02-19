const fs = require('fs'); 

fs.rmdir('new-direcotry',(err)=> {
    if(err) {

        return console.error('Error deleting directory:', err);
    }
    console.log('Direcctory deleted successfully');
});

    console.log("Deleting directory...");