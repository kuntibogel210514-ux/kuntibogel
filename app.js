const defaults=[
 {id:"welcome",title:"Website Resmi",url:"https://example.com",description:"Kunjungi halaman utama",icon:"✦"},
 {id:"support",title:"Pusat Bantuan",url:"https://example.com",description:"Bantuan dan informasi",icon:"◈"},
 {id:"updates",title:"Informasi Terbaru",url:"https://example.com",description:"Lihat pembaruan",icon:"↗"},
 {id:"contact",title:"Hubungi Kami",url:"https://example.com",description:"Kanal komunikasi",icon:"✉"}
];
const target=document.querySelector("#menu");
function safeUrl(value){try{const u=new URL(value);return u.protocol==="https:"?u.href:null}catch{return null}}
function render(items){
 target.innerHTML="";
 if(!items.length){target.innerHTML='<div class="empty">Belum ada tautan yang ditambahkan.</div>';return}
 items.forEach((item,i)=>{
  const url=safeUrl(item.url);if(!url)return;
  const a=document.createElement("a");a.className="menu-card";a.href=url;a.target="_blank";a.rel="noopener noreferrer";a.style.animationDelay=`${i*70}ms`;
  const icon=document.createElement("span");icon.className="menu-icon";icon.textContent=item.icon||"↗";
  const copy=document.createElement("span");copy.className="menu-copy";
  const title=document.createElement("span");title.className="menu-title";title.textContent=item.title;
  const sub=document.createElement("span");sub.className="menu-sub";sub.textContent=item.description||"Buka tautan";
  copy.append(title,sub);const arrow=document.createElement("span");arrow.className="arrow";arrow.textContent="→";
  a.append(icon,copy,arrow);target.append(a);
 });
}
document.querySelector("#year").textContent=new Date().getFullYear();
fetch("/api/links").then(r=>{if(!r.ok)throw Error();return r.json()}).then(data=>render(Array.isArray(data.links)?data.links:defaults)).catch(()=>render(defaults));