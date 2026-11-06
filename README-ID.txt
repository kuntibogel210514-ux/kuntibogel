NEBULA MENU — PANDUAN CLOUDFLARE PAGES

Isi paket:
- index.html, styles.css, app.js: halaman publik responsif + animasi.
- admin.html, admin.css, admin.js: panel admin untuk tambah/edit/hapus tautan.
- functions/api/: API Pages Functions untuk login, logout, dan penyimpanan D1.
- schema.sql: struktur dan data awal database.
- wrangler.toml: konfigurasi Cloudflare Pages + D1.

PENTING
Template ini adalah portal tautan umum. Ganti nama, deskripsi, ikon, dan URL contoh.
Gunakan hanya untuk layanan dan tautan yang legal. Jangan menaruh kredensial rahasia di file HTML/JS.

LANGKAH 1 — BUAT DATABASE D1
1. Login ke https://dash.cloudflare.com/
2. Buka Workers & Pages > D1 SQL Database > Create database.
3. Beri nama: nebula-menu-db.
4. Buka database > Console, lalu jalankan seluruh isi schema.sql.
5. Salin Database ID.

LANGKAH 2 — HUBUNGKAN D1 KE PROJECT
1. Buka wrangler.toml.
2. Ganti GANTI_DENGAN_DATABASE_ID dengan ID database yang disalin.
3. Simpan file.

LANGKAH 3 — DEPLOY KE CLOUDFLARE PAGES
Cara yang mudah:
1. Buat repository GitHub baru dan upload seluruh isi folder project ini.
2. Di Cloudflare Dashboard buka Workers & Pages > Create > Pages > Connect to Git.
3. Pilih repository tersebut.
4. Framework preset: None.
5. Build command: kosongkan.
6. Build output directory: . (titik, folder root project).
7. Deploy.

LANGKAH 4 — SET ENVIRONMENT DAN D1
Di project Pages > Settings > Functions:
1. Tambahkan D1 database binding dengan Variable name: DB dan pilih nebula-menu-db.
2. Di Settings > Variables and Secrets, tambahkan dua secret:
   Name: ADMIN_USERNAME
   Value: username admin pilihan kamu.
   Name: ADMIN_PASSWORD
   Value: gunakan password panjang, unik, dan tidak dipakai di tempat lain.
3. Simpan lalu lakukan redeploy jika diminta.

Catatan: Jika memakai wrangler.toml untuk konfigurasi D1, pastikan database_id sudah benar dan binding bernama DB. Jangan mendefinisikan binding ganda dengan nama berbeda.

LANGKAH 5 — BUKA DAN KELOLA
- Halaman utama: alamat Pages project kamu.
- Panel admin: alamat Pages project kamu diikuti /admin.html
- Login memakai secret ADMIN_USERNAME dan ADMIN_PASSWORD.
- Isi nama menu, URL HTTPS, deskripsi, dan ikon; tekan Simpan tautan.
- Edit atau hapus tautan dari daftar di panel admin.

GANTI LINK AWAL
Setelah login admin, edit empat tautan contoh (example.com) atau hapus dan buat tautan baru. Perubahan tersimpan di D1.

CATATAN KEAMANAN
- Jangan bagikan ADMIN_PASSWORD.
- Aktifkan autentikasi dua faktor pada akun Cloudflare.
- Gunakan password unik yang panjang.
- Batasi akses admin melalui Cloudflare Access bila situs dipakai secara internal.
- Template ini memakai sesi cookie HttpOnly, Secure, SameSite=Strict selama 8 jam.
- Gunakan HTTPS untuk semua tautan. Maksimum 30 tautan.
- Sebelum produksi, uji login, logout, tambah/edit/hapus, dan akses dari ponsel.

TROUBLESHOOTING
- "ADMIN_PASSWORD belum dikonfigurasi": buat secret ADMIN_USERNAME dan ADMIN_PASSWORD di Pages Settings > Variables and Secrets.
- "Database D1 belum terhubung": pastikan binding bernama DB sudah terpasang.
- Daftar kosong: jalankan schema.sql di D1 Console.
- Perubahan tidak muncul: periksa API /api/links dan binding D1; refresh halaman.
