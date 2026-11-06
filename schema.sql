CREATE TABLE IF NOT EXISTS links (
 id TEXT PRIMARY KEY,
 title TEXT NOT NULL,
 url TEXT NOT NULL,
 description TEXT DEFAULT '',
 icon TEXT DEFAULT '↗',
 sort_order INTEGER NOT NULL DEFAULT 0
);
INSERT OR IGNORE INTO links (id,title,url,description,icon,sort_order) VALUES
('welcome','Website Resmi','https://example.com','Kunjungi halaman utama','✦',0),
('support','Pusat Bantuan','https://example.com','Bantuan dan informasi','◈',1),
('updates','Informasi Terbaru','https://example.com','Lihat pembaruan','↗',2),
('contact','Hubungi Kami','https://example.com','Kanal komunikasi','✉',3);