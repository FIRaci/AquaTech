# AquaTech Project To-Do

## 0) Scope da chot
- [x] Giai doan 1 lam single-page cao cap bang HTML, CSS, JS thuan.
- [x] Theme mau chinh: xanh duong, trang, xam dam.
- [x] Muc animation: cinematic vua phai, uu tien muot va hieu nang.
- [x] Ngon ngu giai doan dau: tieng Viet.
- [x] Co smooth scroll + GSAP + ScrollTrigger + micro-animation CSS.
- [x] Background duoc tinh gon: bo sun/moon/bubble, giu motion o diem can nhan manh.

## 1) Frontend Architecture (P0)
- [x] Rebuild trang chu index thanh bo cuc conversion-first.
- [x] Tao bo design token CSS bang bien mau, radius, shadow, spacing.
- [x] Tach animation JS rieng (assets/js/main.js).
- [x] Tach style rieng (assets/css/main.css).
- [x] Tao section: Hero, Services, Process, Technology, Pricing, Showcase, FAQ, Contact.
- [ ] Chuan hoa ten file dich vu de de quan ly (slug thong nhat).
- [ ] Tao bo reusable component pattern (button, card, section title, chip).
- [ ] Chuan bi branch/page cho ban da trang (neu can): /services, /about, /case-studies.

## 2) Animation System (P0)
- [x] Bo preloader de giam lag va giu first paint nhanh.
- [x] Tao scroll progress bar.
- [x] Tao hero reveal timeline bang GSAP.
- [x] Tao reveal animation theo viewport bang ScrollTrigger.
- [x] Loai bo parallax sun/moon, giu transition nhe o section quan trong.
- [x] Loai bo bubble field de toi uu hieu nang tren mobile.
- [x] Tao micro hover cho button, card, nav.
- [x] Dung smooth scroll native + trigger animation nhe.
- [ ] Tinh chinh timing/curve theo mobile thuc te.
- [ ] Them motion variant cho CTA cuoi trang.
- [ ] Them reduced-motion profile nang cao cho tat ca hieu ung nang.

## 3) Content va Conversion (P0)
- [x] Doi branding trang chu sang AquaTech.
- [x] Chuan hoa thong tin dich vu va moc gia tham chieu tu banggia.txt.
- [x] Dat CTA kep: Bat dau du an + Xem nang luc dich vu.
- [ ] Viet lai copy theo outcome (khong chi tinh nang).
- [ ] Them 3 case study that voi metric da xac thuc.
- [ ] Them testimonial that (ten, chuc danh, cong ty).
- [ ] Them section cam ket SLA phan hoi va bao hanh.
- [ ] Chot bo thong tin doanh nghiep dung chuan (ten phap ly, dia chi, email, social).

## 4) Accessibility + SEO + Performance (P0)
- [x] Co skip-link va heading semantic co cau truc.
- [x] Co nav mobile co aria-expanded.
- [x] Co focus style cho input va button.
- [ ] Kiem tra contrast theo WCAG AA cho tat ca text/chip.
- [ ] Kiem tra full keyboard navigation (tab order, trap, close menu).
- [ ] Toi uu anh OG/logo va bo favicon day du size.
- [ ] Bo sung robots.txt va sitemap.xml.
- [ ] Kiem tra schema.org va metadata cho toan bo trang.
- [ ] Dat muc tieu Lighthouse: Perf >= 85, A11y >= 90, SEO >= 90.

## 5) Backend Planning (Elysia.js + PostgreSQL + Prisma) (P1)
- [ ] Khoi tao backend Elysia.js project structure.
- [ ] Cai dat Prisma va ket noi PostgreSQL.
- [ ] Tao model: Lead, ServiceInterest, ContactMessage, SourceTracking.
- [ ] Tao migration dau tien va seed mau.
- [ ] Tao API endpoints:
- [ ] POST /api/leads
- [ ] GET /api/health
- [ ] POST /api/newsletter (neu can)
- [ ] Add validation request (zod hoac equivalent).
- [ ] Them rate limit va anti-spam cho form.
- [ ] Noi form frontend voi API that.

## 6) Docker + Environment (P1)
- [ ] Tao Dockerfile cho backend Elysia.
- [ ] Tao docker-compose cho app + postgres.
- [ ] Tao file .env.example day du bien moi truong.
- [ ] Viet script startup local 1 lenh.
- [ ] Kiem tra migration khi chay trong container.
- [ ] Kiem tra backup/restore PostgreSQL co tai lieu.

## 7) QA va Testing (P1)
- [ ] Tao test checklist frontend theo viewport: 320, 768, 1024, 1440.
- [ ] Test animation tren Chrome, Edge, Safari iOS.
- [ ] Test form submit happy path va error path.
- [ ] Test payload xau va spam behavior.
- [ ] Viet unit test cho service validation backend.
- [ ] Viet integration test cho endpoint /api/leads.

## 8) Deployment + Monitoring (P1)
- [ ] Chot target host (VPS, Render, Railway, Fly.io, hoac khac).
- [ ] Thiet lap CI/CD (lint, test, build, deploy).
- [ ] Bat log co cau truc cho backend.
- [ ] Bat monitoring uptime va alert email/telegram.
- [ ] Bat web-vitals theo doi sau deploy.

## 9) Legal + Operational (P1)
- [ ] Cap nhat chinh sach bao mat theo brand AquaTech.
- [ ] Co dong y thu thap du lieu cho form (consent).
- [ ] Chot quy trinh luu tru va xoa lead data.
- [ ] Chot NDA mau neu lam du an doanh nghiep.

## 10) Expansion Roadmap (P2)
- [ ] Them trang About co profile team.
- [ ] Them trang Case Studies chi tiet.
- [ ] Them blog chia se giai phap ky thuat.
- [ ] Them dashboard admin quan ly lead.
- [ ] Them song ngu Viet/Anh.
- [ ] Them bo design system tai su dung.

## Current sprint ghi nhan
- [x] Khoi tao giao dien trang chu AquaTech moi.
- [x] Chuyen he thong motion sang ban nhe (GSAP + ScrollTrigger).
- [x] Tinh gon background de uu tien hieu nang va do muot.
- [x] Them icon brand custom cho AquaTech.
- [x] Tao file checklist tong the cho du an (to-do.md).
- [ ] Sprint tiep theo: chuan hoa du lieu lien he that + noi API backend cho form.
