# SGE Chem / Dr. Aum Store — เว็บ rebrand (ขั้นดีไซน์ HTML)

## งานนี้คืออะไร
- Rebrand เว็บ **Dr. Aum Store** (แบรนด์อาหารเสริมของ ดร. วสุวัชร วงษ์จันทร์ / อั้ม) ในเครือ **SGE Chem**
- ทั้งเว็บประมาณ **10 หน้า** ตอนนี้ทำแล้ว 3 หน้า (Home, About, Contact)
- ตอนนี้ยังเป็น **ดราฟต์ HTML/CSS/JS ล้วน** ใช้ให้ลูกค้าดูและ approve แบบเท่านั้น
- พอแบบ approve ครบ 100% แล้ว ทีมจะ**สร้างใหม่ใน WordPress ธีม Avada** (ใช้ element ของ Avada เอง) โค้ดในโฟลเดอร์นี้จึง**ไม่ได้ขึ้นเว็บจริง** แต่ต้องเขียนให้แปลงลง Avada ได้ง่าย

## ไฟล์
| ไฟล์ | หน้าที่ |
|---|---|
| `index.html` | หน้าแรก (เดิมชื่อ HOME.html) — ลิงก์ "หน้าแรก" ในเมนูทุกหน้าชี้มาที่ไฟล์นี้ |
| `about.html` | เกี่ยวกับเรา (ประวัติ, ดร.อั้ม, โรงงาน `#factory`, OEM) |
| `contact.html` | ติดต่อเรา (ช่องทางติดต่อ, เวลาทำการ, OEM/ตัวแทน, `#locations`, FAQ) |
| `styles.css` | CSS กลางของทุกหน้า |
| `app.js` | ปุ่มเพิ่ม/ลดจำนวนสินค้า, เพิ่มลงตะกร้า (เดโม), ส่วน "Why Dr.Aum" แบบ interactive, พื้นหลังแคปซูล canvas + ปุ่ม pause |
| `images/` | รูปทั้งหมด (โลโก้ `dr-aum-logo.png`, `sge-chem-logo.png`, แบนเนอร์, สินค้า `prod-*`, รีวิว `rev-full-*`, หมวด `cat-*`) |

> โฟลเดอร์ `idea/` เป็นเวอร์ชันเก่า **ไม่ต้องแก้และไม่ต้องอ้างอิง**

## Deploy
- GitHub repo (public): https://github.com/anawat34115/Web-Test-Draum
- เว็บ (GitHub Pages จาก branch `main` ที่ root): https://anawat34115.github.io/Web-Test-Draum/
- push เข้า `main` แล้วเว็บอัปเดตเองภายใน ~1 นาที ไฟล์เว็บทั้งหมดต้องอยู่ที่ root ของ repo

## Design tokens (อยู่ใน `:root` ของ styles.css)
- ฟอนต์: **Noto Sans Thai** (300–700) ทั้งเว็บ ห้ามเพิ่มฟอนต์อื่น
- สีหลัก: `--blue-primary #0066FF` (hover `--blue-600 #0052CC`), กรมท่า `--navy-800 #0B2E4C` / `--navy-900 #071E33`
- ข้อความ: `--text-main #111827`, `--text-body #374151`, `--text-muted #6B7280`
- พื้นหลังอ่อน: `--bg-soft #EAF3FF`, `--bg-ice #DCEBFA`, section ฟ้า `#E7F2FE`, highlight `#F5FCFF`
- ขอบ: `--border-light #E5E7EB`, `--border-blue #D4E4F7`
- เงา: `--shadow-card`, `--shadow-hover`
- สีชมพู (`#FF2E7E`) ใช้เฉพาะเครื่องหมายถูก/ป้าย HOT นิดหน่อย ไม่ใช้เป็นสีหลัก

## โครงที่ต้องใช้ซ้ำ
- ความกว้างเนื้อหา: `.container` (max 1200px) อยู่ใน section ที่พื้นเต็มจอ
- Section: `.sec-block` (padding บน 72px), `.sec-padded-bottom` (เพิ่ม padding ล่าง 72px), `.sec-blue-bg`, `.sec-highlight-bg`
- หัวข้อ: `.eyebrow-plain` (14px ฟ้า) + `.sec-title` (32px/700 กรมท่า)
- ปุ่ม: `.btn` + `.btn-primary` / `.btn-outline` / `.btn-white` / `.btn-gray-pill` (pill, สูง 44px)
- Header: `.orig-header` (sticky, โลโก้ + ช่องค้นหา + ไอคอน + เมนู `.orig-header-nav`) / Footer: `.orig-footer` — **ทุกหน้าต้องใช้ header/footer ชุดเดียวกัน** (คัดลอกจาก index.html)
- การ์ด: หมวด `.cat-card`, สินค้า `.prod-card`, บทความ `.article-card`
- Grid: `.cat-grid-6`, `.product-grid-4`, `.article-grid-3`, `.grid-3-to-1`, `.grid-2-to-1`
- Breakpoints: 1240px / 1024px / 768px

## กฎการทำงาน
1. **ห้ามเปลี่ยนโทน สี ฟอนต์ หรือ layout ของหน้าที่ทำแล้วเอง** ถ้าลูกค้าไม่ได้สั่ง แก้เฉพาะจุดที่ได้รับคำสั่ง
2. หน้าใหม่ให้ใช้ `styles.css` และคลาสที่มีอยู่ก่อน ถ้าต้องเพิ่มสไตล์ใหม่ ให้เพิ่มคลาสต่อท้ายใน `styles.css` พร้อมคอมเมนต์หัวข้อ — **อย่าเพิ่ม inline `style=""`** (หน้าเดิมมี inline อยู่บ้าง ไม่ต้องรื้อ แต่ไม่เพิ่มอีก)
3. เขียนให้แปลงลง Avada ได้ง่าย: โครงเป็น section → container → คอลัมน์ → ชิ้นเนื้อหา (หัวข้อ, ข้อความ, รูป, ปุ่ม) ไม่ซ้อน div ลึกโดยไม่จำเป็น และไม่ทำเอฟเฟกต์ที่ต้องใช้ JS ซับซ้อนถ้าไม่ได้สั่ง
4. ข้อความหน้าเว็บเป็นภาษาไทย อ่านง่าย ไม่โฆษณาเกินจริง ห้ามอ้างสรรพคุณรักษาโรค (สินค้าอาหารเสริม ต้องเป็นไปตามกฎ อย.)
5. รูปใหม่วางใน `images/` ตั้งชื่อตัวพิมพ์เล็กคั่นด้วย `-` ตามแบบเดิม (`prod-…`, `banner-…`, `cat-…`)
6. เพิ่มหน้าใหม่แล้ว ให้ใส่ลิงก์ในเมนู `.orig-header-nav` และ footer ของ**ทุกหน้า**ให้ตรงกัน
7. ทุกครั้งที่แก้เสร็จ ตรวจทั้งจอคอม (≥1200px) และมือถือ (~390px) ว่าไม่ล้น ไม่เพี้ยน
8. ถ้าคำสั่งไม่ชัด ให้ถามก่อนลงมือ

## หน้าที่ยังต้องทำ (รวม ~10 หน้า)
ยังไม่ได้กำหนดรายการ — ถามลูกค้า/ทีมก่อนเริ่มหน้าใหม่ แล้วอัปเดตรายการไว้ตรงนี้
- [x] Home (`index.html`)
- [x] About (`about.html`)
- [x] Contact (`contact.html`)
