



let http = require('http')
let fs = require('fs')
let url = require('url')


http.createServer((request, response) =>{
    response.writeHead(200)
   /* let query = url.parse(require.url).query*/
  
   let query = url.parse(request.url, true).query
   let name = query.name === undefined ? 'anonyme' : query.name
    fs.readFile('index.html', 'utf-8',(err, data) => {
        if (err) {
            response.writeHead(404)
            response.end("ce fichier n'existe pas")
        }
        else{
        response.writeHead(200, {
            'content-type': 'text/html; charset=utf-8'
            
    })
    data = data.replace("{{ name }}", name)
    response.end(data)
}
    
    
})
}).listen(8080)


