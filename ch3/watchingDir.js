const fs = require ('fs');
fs. watch ('new-directory', (eventType, filename) => {
if (filename) {
console. log (`Event: ${eventType} on file: ${filename}`);
} else {
console. log (`Event: ${eventType}`);
}
});
console. log ('Watching directory...');