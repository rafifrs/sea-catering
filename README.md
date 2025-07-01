# SEA Catering - Healthy Meals Delivery Platform

![SEA Catering](https://img.shields.io/badge/SEA%20Catering-Healthy%20Meals-green?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=for-the-badge&logo=next.js)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)

**Slogan**: "Healthy Meals, Anytime, Anywhere"

SEA Catering is a comprehensive web application for managing customizable healthy meal subscriptions with delivery across Indonesia. This platform was developed as part of the COMPFEST 17 Software Engineering Academy technical challenge.

## 🌟 Features Overview

### Level 1: Homepage & Business Introduction
- ✅ Professional landing page with business introduction
- ✅ Company information display (Manager: Brian, Phone: 08123456789)
- ✅ Key features and services showcase
- ✅ Responsive design for all devices

### Level 2: Interactive User Experience
- ✅ **Responsive Navigation Bar** with active page highlighting
- ✅ **Interactive Meal Plans Display** with detailed modals (**Modified**)
  - Breakfast - Rp30,000 per meal
  - Lunch - Rp40,000 per meal  
  - Dinner - Rp35,000 per meal
- ✅ **Dynamic Testimonials System** with rating display and submission form
- ✅ Mobile-friendly navigation and interactions

### Level 3: Subscription Management System
- ✅ **Comprehensive Subscription Form** with real-time price calculation
  - Personal information (Name, Phone)
  - Plan selection with pricing
  - Meal type selection (Breakfast, Lunch, Dinner)
  - Flexible delivery days selection
  - Allergy and dietary restrictions input
- ✅ **Automated Price Calculation**
- ✅ **Database Integration** with Prisma ORM
- ✅ **Data persistence** for subscriptions, meal plans, and testimonials

### Level 4: Security & Authentication
- ✅ **User Authentication System**
  - User registration with email
  - Secure login/logout functionality
  - Password hashing with bcrypt
  - Strong password requirements
- ✅ **Role-based Authorization** (User & Admin roles)
- ✅ **Input Validation & Sanitization**
  - XSS prevention with input escaping
  - SQL injection protection via Prisma parameterized queries
  - CSRF token implementation
  - Email and phone number format validation

### Level 5: Dashboard Management
- ✅ **User Dashboard**
  - View active subscriptions with full details
  - Pause subscription functionality with date range selection
  - Cancel subscription with confirmation process
  - Subscription status tracking
- ✅ **Admin Dashboard**
  - Date range filtering for analytics
  - New subscriptions tracking
  - Monthly Recurring Revenue (MRR) calculation
  - Subscription reactivations monitoring
  - Overall subscription growth metrics

## 🚀 Technology Stack

- **Frontend**: Next.js 14+ with TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with bcrypt
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React

## ✅ Prerequisites

Sebelum menjalankan project ini, pastikan kamu sudah menginstal dan menyiapkan hal-hal berikut:

---

### 1. Node.js (v20 atau lebih tinggi)

Pastikan Node.js sudah terinstal:

```bash
node -v
# Output yang diharapkan: v20.x.x atau lebih
```

📥 [Download Node.js](https://nodejs.org)

---

### 2. npm (v10 atau lebih tinggi)

Pastikan juga npm sudah tersedia:

```bash
npm -v
# Output yang diharapkan: v10.x.x atau lebih
```

> Bisa juga menggunakan package manager lain seperti `pnpm` atau `yarn` jika diinginkan.

---

### 3. PostgreSQL Database (Lokal atau Remote)

Project ini menggunakan Prisma ORM yang memerlukan PostgreSQL.

- Bisa pakai database lokal atau layanan seperti Supabase.
- Setelah database tersedia, buat file `.env.local` di root project dengan format:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/sea_catering"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

🔒 Gantilah `username`, `password`, dan `your-secret-key` sesuai environment kamu.

---

### 4. Prisma CLI

Setelah dependensi terinstal, jalankan perintah berikut untuk setup database:

```bash
npm run db:migrate   # Apply database schema
npm run db:studio    # Buka Prisma Studio untuk eksplorasi data
```

---

### 5. Environment File (.env.local)

Pastikan file `.env.local` sudah dibuat untuk menyimpan variabel environment seperti `DATABASE_URL` dan `NEXTAUTH_SECRET`.


---

### 6. Package Installation

Setelah semua environment siap, jalankan:

```bash
npm install
```

Untuk menginstal semua dependency yang terdaftar di `package.json`.

---

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd sea-catering
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory. **Important**: The environment variables and admin/user credentials are provided in the submitted PDF file.

Required environment variables:
```env
DATABASE_URL="your-postgresql-connection-string"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Database Setup
```bash
# Run database migrations
npm run db:migrate
```

### 5. Run the Application
```bash
# Development mode
npm run dev
```

The application will be available at `http://localhost:3000`

## 🗄️ Database Management

### Available Database Commands
```bash
# Open Prisma Studio (Database GUI)
npm run db:studio

# Create and apply new migrations
npm run db:migrate

# Seed database with sample data
npm run db:seed
```

## 👥 User Accounts & Authentication

### Admin Access
**Note**: Admin credentials and user test accounts are provided in the submitted PDF file.

### User Registration
New users can register through the `/register` page with:
- Full name
- Valid email address
- Strong password (meeting security requirements)

## 🎯 Key Features Walkthrough

### For Customers:
1. **Meal Plans**: View available subscription options with detailed information
2. **Subscribe**: Fill out the subscription form with automatic price calculation
3. **Manage Account**: Register and login
4. **Dashboard**: View, pause, or cancel subscriptions
5. **Testimonials**: Share experiences and read other customer reviews

### For Administrators:
1. **User Management**: Monitor all user accounts and subscriptions
2. **Analytics Dashboard**: Track business metrics and revenue
3. **Subscription Oversight**: Monitor active, paused, and cancelled subscriptions

## 🔒 Security Features

- **Authentication**: Secure user registration and login
- **Authorization**: Role-based access control
- **Password Security**: Bcrypt hashing with salt
- **Input Validation**: Comprehensive form validation and sanitization
- **XSS Prevention**: Input escaping and content security
- **SQL Injection Protection**: Parameterized queries via Prisma

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers (1024px and above)
- Tablets (768px - 1023px)
- Mobile devices (320px - 767px)

*This README provides comprehensive setup instructions. For any technical issues during setup, please refer to the submitted PDF file for additional configuration details.*