import {isAdmin,json} from "../_shared/auth.js";
export async function onRequestGet({env}){
 if(!env.DB)return json({links:[]});
 const {results=[]}=await env.DB.prepare("SELECT id,title,url,description,icon FROM links ORDER BY sort_order ASC").all();
 return json({links:results});
}
export async function onRequestPut({request,env}){
 if(!env.ADMIN_PASSWORD||!(await isAdmin(request,env.ADMIN_PASSWORD)))return json({error:"Silakan login sebagai admin."},401);
 if(!env.DB)return json({error:"Database D1 belum terhubung."},500);
 let body;try{body=await request.json()}catch{return json({error:"Data tidak valid."},400)}
 const links=body.links;
 if(!Array.isArray(links)||links.length>30)return json({error:"Maksimal 30 tautan."},400);
 for(const x of links){
  if(!x||typeof x.id!=="string"||typeof x.title!=="string"||!x.title.trim()||x.title.length>60||typeof x.url!=="string"||x.url.length>2048||!x.url.startsWith("https://"))return json({error:"Periksa nama dan URL. URL harus HTTPS."},400);
 }
 const statements=[env.DB.prepare("DELETE FROM links")];
 links.forEach((x,i)=>statements.push(env.DB.prepare("INSERT INTO links (id,title,url,description,icon,sort_order) VALUES (?,?,?,?,?,?)").bind(x.id,x.title.trim(),x.url,x.description||"",x.icon||"↗",i)));
 await env.DB.batch(statements);
 return json({ok:true});
}