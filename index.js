let connect = require('connect');
let http = require('http');
let serveStatic = require('serve-static');

let app = connect();

app.use(serveStatic(__dirname + '/public')).listen(8080, function(){
  console.log('Server running on 8080...');
});