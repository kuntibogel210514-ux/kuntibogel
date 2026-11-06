// Ganti judul, URL, deskripsi, dan ikon sesuai tautan milik Anda.
// Gunakan alamat lengkap yang diawali https://
const links = [
  { title: "Website Resmi", url: "https://example.com", description: "Kunjungi halaman utama", icon: "✦" },
  { title: "Instagram", url: "https://instagram.com/", description: "Ikuti akun Instagram", icon: "◎" },
  { title: "WhatsApp", url: "https://wa.me/6285371716381", description: "Hubungi kami melalui WhatsApp", icon: "✉" },
  { title: "Informasi Terbaru", url: "https://example.com", description: "Lihat pembaruan", icon: "↗" }
];

const target = document.querySelector("#menu");
function safeUrl(value) {
  try { const u = new URL(value); return u.protocol === "https:" ? u.href : null; }
  catch { return null; }
}
function render(items) {
  target.innerHTML = "";
  const valid = items.filter(item => safeUrl(item.url));
  if (!valid.length) {
    target.innerHTML = '<div class="empty">Belum ada tautan yang ditambahkan.</div>';
    return;
  }
  valid.forEach((item, i) => {
    const a = document.createElement("a");
    a.className = "menu-card"; a.href = safeUrl(item.url); a.target = "_blank";
    a.rel = "noopener noreferrer"; a.style.animationDelay = `${i * 70}ms`;
    const icon = document.createElement("span"); icon.className = "menu-icon"; icon.textContent = item.icon || "↗";
    const copy = document.createElement("span"); copy.className = "menu-copy";
    const title = document.createElement("span"); title.className = "menu-title"; title.textContent = item.title;
    const sub = document.createElement("span"); sub.className = "menu-sub"; sub.textContent = item.description || "Buka tautan";
    copy.append(title, sub);
    const arrow = document.createElement("span"); arrow.className = "arrow"; arrow.textContent = "→";
    a.append(icon, copy, arrow); target.append(a);
  });
}
document.querySelector("#year").textContent = new Date().getFullYear();
render(links);
