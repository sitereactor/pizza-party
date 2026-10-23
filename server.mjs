import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
const root=new URL('./',import.meta.url);
const allowed=new Set(['index.html','style.css','app.js','store.js','art.js','sw.js','manifest.webmanifest','icon.svg']);
const types={html:'text/html',css:'text/css',js:'text/javascript',svg:'image/svg+xml',webmanifest:'application/manifest+json'};
createServer(async(req,res)=>{const path=new URL(req.url,'http://localhost').pathname;const file=path==='/'?'index.html':path.slice(1);if(!allowed.has(file)){res.writeHead(404);res.end('Not found');return;}try{const data=await readFile(new URL(file,root));res.writeHead(200,{'Content-Type':types[file.split('.').pop()]+'; charset=utf-8','Cache-Control':'no-cache'});res.end(data);}catch{res.writeHead(500);res.end('Unable to load file');}}).listen(Number(process.env.PORT)||4173,'0.0.0.0',()=>console.log('Slice Club: http://localhost:4173'));
