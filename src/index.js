//console.log("hola");
/* ctr + ALT + L ==> dar formato al código  debes intalar extensión: IntelliJ IDEA Keybindings*/
/* Shif + ALT + A ==> comentar */
var http = require('http'); 
var url = require('url'); 
var querystring = require("querystring")

/* var log = require('./modules/my-log') */
//Importación Parcial
var {info,error}= require('./modules/my-log')
var {countries} = require('countries-list') 
var server = http.createServer(function(request,response){
    var parsed = url.parse(request.url);
    console.log("parsed: ", parsed);
    var pathname = parsed.pathname;
    var query = querystring.parse(parsed.query);
    console.log("query: ", query);
    //var pais = query.code
    if (pathname ==="/"){
        response.writeHead(200,{"Content-Type":"text/html"});
        response.write('<html><body><p>HOME PAGE</html></body></p>');
        response.end();
    } else if (pathname ==="/exit"){
        response.writeHead(200,{"Content-Type":"text/html"});
        response.write('<html><body><p>BYE</html></body></p>');
        response.end();
    } else if (pathname ==="/info"){
        /* var result = log.info(pathname) */
        var result = info(pathname)
        response.writeHead(200,{"Content-Type":"text/html"});
        response.write(result);
        response.end();
    } else if (pathname ==="/error"){
        /* var result = log.error(pathname) */
        var result = error(pathname)
        response.writeHead(200,{"Content-Type":"text/html"});
        response.write(result);
        response.end();
    } else if (pathname ==="/country"){
        response.writeHead(200,{"Content-Type":"application/json"});
        // Como write espera un string, y countries devuelve un JSON, se realiza la transformación
        /* response.write(JSON.stringify(countries.EC)); */
        /* response.write(JSON.stringify(countries[query["code"]])); */
        response.write(JSON.stringify(countries[query.code]));
        response.end();
    } else {
        response.writeHead(404,{"Content-Type":"text/html"});
        response.write('<html><body><p>NOT FOUND</html></body></p>');
        response.end();        
    }
});

server.listen(4000);
console.log("running on 4000")

/* function suma(n1, n2) {
    return n1 + n2;
}

var result = suma(2, 4)
console.log("La suma de 2 +4 es: ", result) */