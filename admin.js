const $=s=>document.querySelector(s), msg=$("#message");
let links=[];
async function api(path,options={}){const r=await fetch(path,{...options,headers:{"content-type":"application/json",...(options.headers||{})}});let data={};try{data=await r.json()}catch{}if(!r.ok)throw Error(data.error||"Permintaan gagal");return data}
function say(s){msg.textContent=s}
function reset(){ $("#edit-id").value="";$("#link-form").reset(); }
function render(){
 const list=$("#link-list");list.innerHTML="";
 if(!links.length){list.textContent="Belum ada tautan.";return}
 links.forEach(item=>{
  const row=document.createElement("div");row.className="link-row";
  const info=document.createElement("div");info.className="info";const strong=document.createElement("strong");strong.textContent=(item.icon||"↗")+" "+item.title;const small=document.createElement("small");small.textContent=item.url;info.append(strong,small);
  const edit=document.createElement("button");edit.textContent="Edit";edit.onclick=()=>{ $("#edit-id").value=item.id;$("#title").value=item.title;$("#url").value=item.url;$("#description").value=item.description||"";$("#icon").value=item.icon||"";window.scrollTo({top:0,behavior:"smooth"})};
  const del=document.createElement("button");del.textContent="Hapus";del.onclick=async()=>{if(!confirm("Hapus tautan ini?"))return;links=links.filter(x=>x.id!==item.id);await save()};
  row.append(info,edit,del);list.append(row);
 });
}
async function load(){const data=await api("/api/links");links=data.links||[];$("#login-form").hidden=true;$("#manager").hidden=false;render();say("Berhasil masuk.");}
$("#login-form").addEventListener("submit",async e=>{e.preventDefault();try{await api("/api/login",{method:"POST",body:JSON.stringify({username:$("#username").value.trim(),password:$("#password").value})});await load()}catch(err){say(err.message)}});
async function save(){try{await api("/api/links",{method:"PUT",body:JSON.stringify({links})});render();reset();say("Perubahan berhasil disimpan.")}catch(err){say(err.message)}}
$("#link-form").addEventListener("submit",async e=>{e.preventDefault();const url=$("#url").value.trim();if(!url.startsWith("https://")){say("Gunakan URL HTTPS.");return}
 const item={id:$("#edit-id").value||crypto.randomUUID(),title:$("#title").value.trim(),url,description:$("#description").value.trim(),icon:$("#icon").value.trim()||"↗"};
 const i=links.findIndex(x=>x.id===item.id);if(i>=0)links[i]=item;else links.push(item);await save();
});
$("#cancel").onclick=reset;
$("#logout").onclick=async()=>{try{await api("/api/logout",{method:"POST"});location.reload()}catch(e){say(e.message)}};
api("/api/session").then(s=>{if(s.authenticated)load();else{$("#manager").hidden=true;$("#login-form").hidden=false;}}).catch(()=>{ $("#manager").hidden=true;$("#login-form").hidden=false;});