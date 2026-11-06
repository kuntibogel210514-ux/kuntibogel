import {makeCookie,json} from "../_shared/auth.js";
export async function onRequestPost({request,env}){
 if(!env.ADMIN_USERNAME||!env.ADMIN_PASSWORD)return json({error:"ADMIN_USERNAME dan ADMIN_PASSWORD belum dikonfigurasi."},500);
 let body;try{body=await request.json()}catch{return json({error:"Data tidak valid."},400)}
 if(typeof body.username!=="string"||typeof body.password!=="string"||body.username!==env.ADMIN_USERNAME||body.password!==env.ADMIN_PASSWORD)return json({error:"Username atau password salah."},401);
 return new Response(JSON.stringify({ok:true}),{headers:{"content-type":"application/json","set-cookie":await makeCookie(env.ADMIN_PASSWORD),"cache-control":"no-store"}});
}