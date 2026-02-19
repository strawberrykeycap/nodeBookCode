const fs = require('fs');
const data = 'Appending some text...\n';
fs.appendFile('example',data,(err)=>{
    if(err){

        return console.error('Error appending to file:', err);

    }
  console.log('File appended succesfully'); 
});

console.log('Appending to file...');