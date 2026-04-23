export const pricingCatalog = [
  {
    slug: "phan-mem-desktop",
    name: "Phần mềm Desktop",
    intro:
      "Phù hợp cho công việc nội bộ, từ app nhỏ đến hệ thống đầy đủ theo nghiệp vụ doanh nghiệp.",
    packages: [
      {
        tier: "Basic",
        timeline: "1-2 ngày",
        price: "700K - 1.500K",
        features: [
          "1-3 chức năng chính",
          "Giao diện đơn giản, dễ dùng",
          "Lưu dữ liệu local",
          "Không cần login",
          "Không kết nối server",
          "Code sạch, chạy ổn định",
        ],
      },
      {
        tier: "Standard",
        timeline: "3-5 ngày",
        price: "2.000K - 4.000K",
        features: [
          "3-5 chức năng (CRUD đầy đủ)",
          "UI rõ ràng, dễ dùng",
          "Database (MySQL hoặc SQLite)",
          "Login cơ bản",
          "Validate dữ liệu",
          "Xuất file Excel/PDF cơ bản",
        ],
      },
      {
        tier: "Advanced",
        timeline: "1-2 tuần",
        price: "5.000K+",
        features: [
          "6+ chức năng full nghiệp vụ",
          "Phân quyền admin/user",
          "Database chuẩn (MySQL hoặc PostgreSQL)",
          "Backup dữ liệu",
          "UI custom đẹp hơn",
          "Tối ưu hiệu năng, có thể tích hợp API",
        ],
      },
    ],
  },
  {
    slug: "landing-page",
    name: "Landing Page",
    intro: "Tối ưu conversion theo mục tiêu chiến dịch, phù hợp ads, lead generation và sales funnel.",
    packages: [
      {
        tier: "Basic",
        timeline: "1 ngày",
        price: "500K - 800K",
        features: [
          "1 trang duy nhất",
          "HTML/CSS cơ bản",
          "Có form liên hệ",
          "Responsive cơ bản",
        ],
      },
      {
        tier: "Standard",
        timeline: "2-3 ngày",
        price: "1.000K - 2.300K",
        features: [
          "UI đẹp theo thiết kế",
          "Responsive chuẩn mobile",
          "Hiệu ứng scroll animation",
          "Tối ưu tốc độ",
          "Form gửi email",
        ],
      },
      {
        tier: "Advanced",
        timeline: "3-5 ngày",
        price: "2.700K+",
        features: [
          "Chuẩn SEO (meta, schema)",
          "Tối ưu CTA theo conversion",
          "Animation nâng cao",
          "Tích hợp Facebook Pixel/Google Analytics",
          "Mục tiêu load nhanh dưới 3s",
        ],
      },
    ],
  },
  {
    slug: "website-thuong-mai",
    name: "Website Thương mại",
    intro: "Từ website bán hàng cơ bản đến hệ thống thương mại điện tử đầy đủ như sàn mini.",
    packages: [
      {
        tier: "Basic",
        timeline: "3-5 ngày",
        price: "2.900K - 4.500K",
        features: [
          "Trang sản phẩm",
          "Giỏ hàng đơn giản",
          "Không login",
          "Admin sửa sản phẩm",
        ],
      },
      {
        tier: "Standard",
        timeline: "1-2 tuần",
        price: "6.000K - 12.000K",
        features: [
          "Login/Đăng ký",
          "Giỏ hàng + thanh toán",
          "Trang admin quản lý đơn",
          "Tìm kiếm sản phẩm",
          "Responsive đầy đủ",
        ],
      },
      {
        tier: "Advanced",
        timeline: "2-4 tuần",
        price: "15.000K+",
        features: [
          "Full hệ thống như sàn mini",
          "Phân quyền user/admin",
          "Thanh toán online (Momo, VNPay)",
          "Backend API riêng",
          "Bảo mật + tối ưu",
          "Dashboard thống kê",
        ],
      },
    ],
  },
  {
    slug: "app-mobile",
    name: "App Android & iOS",
    intro: "Triển khai app theo lộ trình MVP đến full product, có backend và release store.",
    packages: [
      {
        tier: "Basic",
        timeline: "1-2 tuần",
        price: "3.000K - 7.000K",
        features: [
          "1 chức năng chính",
          "UI đơn giản",
          "Không cần backend (local data)",
        ],
      },
      {
        tier: "Standard",
        timeline: "2-4 tuần",
        price: "9.000K - 18.000K",
        features: [
          "CRUD đầy đủ",
          "Login/register",
          "Kết nối API",
          "UI đẹp cơ bản",
          "Push notification cơ bản",
        ],
      },
      {
        tier: "Advanced",
        timeline: "1-2 tháng",
        price: "20.000K+",
        features: [
          "Full app thực tế",
          "Backend riêng (Node.js/Spring Boot)",
          "Realtime (chat/thông báo)",
          "Tối ưu performance",
          "Hỗ trợ publish Google Play/App Store",
        ],
      },
    ],
  },
  {
    slug: "tool-scraping",
    name: "Tool Scraping Data",
    intro: "Lấy dữ liệu có cấu trúc, làm sạch dữ liệu và tự động hóa luồng crawl theo lịch.",
    packages: [
      {
        tier: "Basic",
        timeline: "1-2 ngày",
        price: "500K - 1.500K",
        features: [
          "Crawl 1 website tĩnh",
          "Lấy tên, giá, link",
          "Xuất Excel/CSV",
          "Chạy 1 lần",
        ],
      },
      {
        tier: "Standard",
        timeline: "2-5 ngày",
        price: "2.000K - 5.000K",
        features: [
          "Crawl nhiều trang có pagination",
          "Lọc dữ liệu theo điều kiện",
          "Xử lý trùng lặp + format",
          "Xuất Excel đẹp",
          "Có script chạy lại",
        ],
      },
      {
        tier: "Advanced",
        timeline: "1-2 tuần",
        price: "6.000K - 15.000K+",
        features: [
          "Crawl nhiều website",
          "Bypass cơ bản (anti-bot nhẹ)",
          "Tự động theo lịch",
          "Lưu database MySQL",
          "API lấy dữ liệu + dashboard xem data",
        ],
      },
    ],
  },
  {
    slug: "chrome-automation",
    name: "Chrome Automation",
    intro: "Tự động hóa thao tác trình duyệt theo kịch bản từ cơ bản đến luồng phức tạp.",
    packages: [
      {
        tier: "Basic",
        timeline: "1-2 ngày",
        price: "500K - 2.000K",
        features: [
          "Mở web, login tài khoản",
          "Click/nhập liệu tự động",
          "Chạy 1 luồng cố định",
        ],
      },
      {
        tier: "Standard",
        timeline: "3-7 ngày",
        price: "3.000K - 7.000K",
        features: [
          "Xử lý nhiều bước logic",
          "Loop nhiều tài khoản",
          "Đọc dữ liệu từ file Excel",
          "Có log hoạt động",
          "Xử lý lỗi cơ bản",
        ],
      },
      {
        tier: "Advanced",
        timeline: "1-3 tuần",
        price: "8.000K - 20.000K+",
        features: [
          "Điều khiển nhiều browser",
          "Proxy/đổi IP",
          "Kịch bản phức tạp",
          "GUI điều khiển",
          "Chạy nền/scheduler",
          "Tích hợp scraping + automation",
        ],
      },
    ],
  },
  {
    slug: "dich-vu-khac",
    name: "Dịch vụ khác",
    intro: "Xử lý task nhỏ đến hệ thống automation theo yêu cầu đặc thù.",
    packages: [
      {
        tier: "Basic",
        timeline: "Dưới 1h",
        price: "300K",
        features: ["Fix bug nhỏ", "Chỉnh sửa giao diện nhẹ"],
      },
      {
        tier: "Standard",
        timeline: "10h-36h",
        price: "800K",
        features: ["Viết tool automation", "Scraping data theo bài toán rõ"],
      },
      {
        tier: "Advanced",
        timeline: "1 tuần",
        price: "2.400K",
        features: [
          "Bot tự động (Facebook, Shopee...)",
          "Hệ thống automation lớn",
          "Tích hợp AI theo yêu cầu",
        ],
      },
    ],
  },
];
