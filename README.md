# 🍽️ TasteNest — Premium Food Ordering & Fine Dining Website

A modern, responsive, and feature-packed web application designed for a luxury fine dining restaurant and artisanal coffee house. Built with **React 19**, **Tailwind CSS**, and modern **Vite**, TasteNest delivers a visually captivating dark-mode aesthetic with rich GPU-accelerated micro-animations, glassmorphic styling, and seamless interactive experiences.

---

## 🌟 Comprehensive Project Features

### 1. 🧭 Navigation & Header (`Navbar`)
- **Dynamic Scroll-Spy Navigation**: Automatically highlights the active nav link corresponding to the section currently in the viewport.
- **Glassmorphic Sticky Header**: Smoothly transitions from a transparent background to a blurred dark backdrop with a subtle amber border and shadow on page scroll.
- **Interactive Shimmer CTA**: "RESERVATION" button with animated light shine sweep (`btn-shimmer`), glowing amber hover shadow, and active press feedback.
- **Mobile Navigation Drawer**: Smooth slide-in menu drawer with staggered list transitions and backdrop blur overlay for seamless mobile browsing.

### 2. 🏰 Hero Section (`Hero`)
- **Cinematic Ken-Burns Motion**: Subtle background zoom animation on the restaurant interior imagery.
- **Ambient Lighting Orbs**: Glowing background light spheres that drift and morph to create visual depth.
- **Pulsing Tagline & Typography**: Bold headlines styled in high-contrast typography with glowing accent lines.
- **Quick Action Triggers**: Direct dual CTAs for "Book a Table" and "Open Menu".

### 3. 👨‍🍳 About Us & Culinary Showcase (`About`)
- **Curated Multi-Block Stories**: Dedicated storytelling blocks highlighting:
  - *Coffee House & Dining Experience*
  - *100% Organic Micro-Lot Coffee Beans*
  - *World-Class Chef Recipes & Tips*
- **Expanding Gold Accent Lines**: Accent divider lines that dynamically expand in width when revealed into view.
- **Interactive Image Cards**: Image hover zoom paired with floating glassmorphic quality badges (*"Master Chef Curated"*, *"100% Organic Micro-lots"*, *"World-Class Baristas"*).

### 4. ⭐ Why Choose Us (`WhyChooseUs`)
- **Floating 3D Feature Icons**: Custom feature icons with continuous floating animations and staggered delays.
- **Glassmorphic Feature Cards**: Dark charcoal cards with glowing amber gradient borders, icon tilt, and elevation lift on hover.

### 5. ⏰ Working Hours & Service Schedule (`WorkingHours`)
- **Ambient Schedule Overlay**: Solid charcoal card overlay framed with an ambient glowing light aura.
- **Live Status Indicators**: Real-time service badges (*"OPEN"*, *"LATE NIGHT"*) with pulsing emerald status dots.
- **Interactive Time Slot Rows**: Highlight and slide transition when hovering over operating hours.

### 6. 💬 Guest Reviews & Live Statistics (`Reviews`)
- **Dynamic Animated Number Counters**: Smooth count-up counter that increments from 0 to live numbers (`1,287+ Visitors Daily`, `578+ Deliveries Monthly`, `1,440+ Positive Feedback`, `40+ Awards & Honors`) triggered via `IntersectionObserver` and `requestAnimationFrame`.
- **Testimonial Cards**: Features customer feedback, rating stars with hover micro-animations, and floating quotation marks.
- **Carousel Pagination**: Interactive pagination indicator dots with active pill expand animations.

### 7. 🍕 Food Menu & Ordering (`Menu`)
- **Gourmet Dishes Grid**: High-resolution dish showcases with prep time, serving size, and pricing.
- **Floating Tag Badges**: Visual highlights such as *"🔥 Chef Special"*, *"⭐ Best Seller"*, and *"🌱 Fresh Organic"*.
- **Shimmer "Order Now" Buttons**: Interactive buttons with light-sweep hover animations.

### 8. 📱 Mobile App Download Banner (`AppDownload`)
- **Edge-to-Edge Responsive Banner**: Full-width promotional banner highlighting mobile ordering capabilities.
- **App Store Download Buttons**: Styled download badges for Google Play and Apple App Store with spring lift and icon hover scaling.
- **Floating Feature Pill**: Glass badge highlighting *"Fast Mobile App"*.

### 9. 📩 Newsletter Subscription (`Newsletter`)
- **Focus Glow Input**: Form input with glowing amber focus rings and backdrop blur.
- **Animated Submission State**: Interactive loading spinner and checkmark confirmation banner upon subscription.

### 10. 🏷️ Footer & Contact Section (`Footer`)
- **Spring-Hover Social Icons**: Circular social buttons with spring elevation, slight rotation, and glowing amber halos.
- **Sliding Arrow Links**: Navigation links with animated chevron indicators (`›`) appearing on hover.
- **Opening Hours & Contact Details**: Formatted contact address, direct phone line, and operating times.

### 11. 🔄 Global Micro-Interactions & Experience
- **Animated Moving Browser Tab Title**: Continuous marquee scroll effect in `document.title` displaying restaurant details, switching to a friendly reminder when the tab is blurred.
- **Smart Back-to-Top Button**: Automatically appears when scrolled past 320px, featuring a continuous pulsing radar ring aura and smooth scroll-to-top trigger.
- **GPU-Accelerated Design System**: High performance CSS using `transform`, `opacity`, and `will-change` to maintain a consistent 60 FPS across devices.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Modern UI component hierarchy and state management |
| **Vite 8** | Next-generation frontend build tool and dev server |
| **Tailwind CSS 3** | Utility-first styling framework |
| **Vanilla CSS** | Custom keyframe animations, glow filters, and design tokens |
| **Google Fonts** | *Playfair Display* (luxury serif) & *Inter* (modern sans) |
| **Oxlint** | High-performance linter for clean, maintainable code |

---

## 📂 Project Structure

```
TasteNest-Food-Ordering-App/
├── public/                     # Static assets (images, icons, logos, banners)
│   ├── chef_1.jpg
│   ├── chef_2.jpg
│   ├── chef_3.jpg
│   ├── feature_icon_1.png
│   ├── feature_icon_2.png
│   ├── feature_icon_3.png
│   ├── food_1.jpg
│   ├── food_2.jpg
│   ├── food_3.jpg
│   ├── hero_bg.jpg
│   ├── logo.svg
│   ├── newsletter_bg.jpg
│   ├── order_banner.png
│   └── working_hours_bg.jpg
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   └── BackToTop.jsx   # Floating back-to-top button with pulse ring
│   │   ├── layout/
│   │   │   ├── Navbar.jsx      # Sticky navbar, scroll-spy, and mobile drawer
│   │   │   └── Footer.jsx      # Footer with spring icons and newsletter
│   │   └── sections/
│   │       ├── Hero.jsx        # Ken-Burns hero with reservation CTAs
│   │       ├── About.jsx       # Story blocks with expanding lines & floating badges
│   │       ├── WhyChooseUs.jsx # Feature highlights with 3D floating icons
│   │       ├── WorkingHours.jsx# Operating hours with live status indicators
│   │       ├── Reviews.jsx     # Testimonials & live count-up stats counter
│   │       ├── AppDownload.jsx # Edge-to-edge mobile app banner
│   │       ├── Menu.jsx        # Food dishes with pricing and order CTAs
│   │       └── Newsletter.jsx  # Interactive newsletter signup form
│   ├── App.jsx                 # Main application component & moving title marquee
│   ├── index.css               # Global styling, keyframes, and animation utilities
│   └── main.jsx                # React root entry point
├── index.html                  # HTML template with SEO tags & Google Fonts
├── package.json                # Project dependencies and scripts
├── tailwind.config.js          # Tailwind CSS theme configuration
└── vite.config.js              # Vite bundler plugins and configuration
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18 or above) installed on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/Sushanth666/TasteNest-Food-Ordering-Website.git
cd TasteNest-Food-Ordering-Website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser to explore the live application.

### 4. Build for Production
```bash
npm run build
```

---

## 📄 License & Credits

Developed with ❤️ by **Sushanth**. Designed for modern culinary dining and coffee house experiences.
