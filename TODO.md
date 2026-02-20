# 12th Fail Pizza Wala - Project Plan

## Project Overview
- **Project Name**: 12th Fail Pizza Wala
- **Type**: Single Restaurant Food Ordering Website (React + Tailwind CSS)
- **Core Functionality**: Full-featured food ordering frontend with cart, menu browsing, and checkout flow
- **Target Users**: Customers looking to order pizza and other food items

---

## UI/UX Specification

### Color Palette (Zomato-inspired)
- **Primary Red**: #FF2D55 (Zomato red)
- **Primary Dark**: #D92B3A
- **Secondary**: #FFFFFF
- **Background**: #F8F8F8
- **Text Primary**: #1C1C1E
- **Text Secondary**: #686C76
- **Success**: #26A65B
- **Border**: #E8E8E8
- **Gray Light**: #F2F2F2

### Typography
- **Font Family**: 'Poppins' for headings, 'Inter' for body
- **Headings**: 24px-36px, font-weight 600-700
- **Body**: 14px-16px, font-weight 400
- **Small**: 12px

### Layout
- **Max Width**: 1280px
- **Navbar Height**: 64px (sticky)
- **Grid**: 12-column system
- **Responsive Breakpoints**:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

---

## Component Structure

### Core Components
1. **Navbar** - Logo, search bar, cart icon with badge, login button
2. **RestaurantBanner** - Hero image, restaurant info (rating, delivery time, offers)
3. **FoodCard** - Image, name, price, description, add to cart button
4. **CategoryFilter** - Horizontal scrollable category tabs
5. **CartItem** - Item image, name, quantity controls, price, remove button
6. **Footer** - Links, social media, copyright

### Pages
1. **Home Page** - Hero, categories, featured items
2. **Menu Page** - Full menu with category filters
3. **Cart Page** - Cart items, quantity controls, total, checkout
4. **Login/Signup Page** - Form with email/password
5. **Checkout Page** - Address form, order summary, place order

---

## Technical Implementation

### Folder Structure
```
12th-fail-pizza-wala/
├── public/
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── RestaurantBanner.jsx
│   │   ├── FoodCard.jsx
│   │   ├── CategoryFilter.jsx
│   │   ├── CartItem.jsx
│   │   ├── Footer.jsx
│   │   └── LoadingSkeleton.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Menu.jsx
│   │   ├── Cart.jsx
│   │   ├── Login.jsx
│   │   └── Checkout.jsx
│   ├── data/
│   │   └── foodData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

### State Management
- React Context API for Cart state
- CartContext provides: cartItems, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount

---

## Implementation Steps

### Phase 1: Project Setup
- [x] Initialize React project with Vite
- [x] Install and configure Tailwind CSS
- [x] Set up project folder structure

### Phase 2: Core Components
- [x] Create Navbar with search, cart badge, login
- [x] Create RestaurantBanner component
- [x] Create FoodCard component
- [x] Create CategoryFilter component
- [x] Create CartItem component
- [x] Create Footer component
- [x] Create LoadingSkeleton component

### Phase 3: Context & Data
- [x] Create CartContext for state management
- [x] Create dummy food data JSON

### Phase 4: Pages
- [x] Create Home page
- [x] Create Menu page
- [x] Create Cart page
- [x] Create Login/Signup page
- [x] Create Checkout page

### Phase 5: Integration & Polish
- [x] Set up React Router
- [x] Connect all components
- [x] Add hover effects and animations
- [x] Make fully responsive

---

## Acceptance Criteria
- [x] All 5 pages are functional
- [x] Cart operations work (add, remove, update quantity)
- [x] Navigation between pages works
- [x] Responsive on mobile, tablet, desktop
- [x] Zomato-inspired modern UI
- [x] No console errors
- [x] Clean, readable code with proper component separation
