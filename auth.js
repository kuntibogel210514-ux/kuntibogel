const encoder=new TextEncoder();
async function signature(secret,message){
 const key=await crypto.subtle.importKey("raw",encoder.encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);
 const bytes=new Uint8Array(await crypto.subtle.sign("HMAC",key,encoder.encode(message)));
 return btoa(String.fromCharCode(...bytes)).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
}
export async function makeCookie(secret){
 const exp=String(Math.floor(Date.now()/1000)+60*60*8),sig=await signature(secret,exp);
 return `admin_session=${exp}.${sig}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=28800`;
}
export async function isAdmin(request,secret){
 const raw=request.headers.get("Cookie")||"",match=raw.match(/(?:^|;\s*)admin_session=([^;]+)/);if(!match)return false;
 const [exp,sig]=match[1].split(".");if(!exp||!sig||Number(exp)<Math.floor(Date.now()/1000))return false;
 return (await signature(secret,exp))===sig;
}
export const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}});
