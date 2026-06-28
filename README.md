# 🏋️ MomentumX - Fitness & Gym Management Platform

MomentumX is a modern full-stack fitness and gym management platform built to streamline the experience for Members, Trainers, and Administrators through a secure role-based system. The platform enables users to discover fitness classes, book sessions using Stripe Checkout, participate in community discussions, manage trainer applications, and track their fitness journey through a responsive and interactive dashboard.

---

# 🌐 Live Website

**Live Site:** https://momentum-x-client.vercel.app/

---

# 👤 Admin Credentials (For Evaluation)

**Email:** [admin@momentumx.com](mailto:admin@momentumx.com)

**Password:** Password@123#

---

# 🔗 GitHub Repositories

### Client Repository

https://github.com/ayanstack94b/MomentumX-Client

### Server Repository

https://github.com/ayanstack94b/MomentumX-server

---

# ✨ Key Features

* 🔐 Secure authentication using Better Auth and JWT
* 👥 Dedicated dashboards for Members, Trainers, and Admins
* 🏋️ Browse, search and filter fitness classes
* 💳 Secure Stripe Checkout payment integration
* 📑 Automatic booking confirmation after successful payment
* ❤️ Save and manage favorite classes
* 🚫 Duplicate booking and duplicate favorite prevention
* 📊 Transaction history with Stripe transaction ID
* 📝 Trainer application with approval, rejection and demotion workflow
* 👨‍🏫 Trainers can create and manage fitness classes
* 💬 Community forum with posts, comments, replies, likes and dislikes
* 🖼️ ImageBB integration for trainer/admin forum image uploads
* 🚫 Blocked users are restricted from protected platform actions
* 📱 Fully responsive design for Mobile, Tablet and Desktop
* ⚡ Smooth page transitions and animations powered by Framer Motion
* 🎨 Modern glassmorphism-inspired dark UI built with Tailwind CSS

---

# 🚀 Core Functionalities

## 👤 Member

* Register and Login
* Browse Available Fitness Classes
* Book Classes using Stripe Checkout
* View Booked Classes
* Save Favorite Classes
* Apply to Become a Trainer
* Participate in Community Discussions
* Update Personal Profile

---

## 🏋️ Trainer

* Create New Fitness Classes
* Manage Created Classes
* View Enrolled Members
* Publish Community Forum Posts
* Upload Custom Forum Cover Images
* Manage Personal Forum Posts

---

## 👨‍💼 Admin

* Manage All Users
* Promote Members to Admin
* Block and Unblock Users
* Review Trainer Applications
* Approve or Reject Trainer Requests
* Demote Trainers
* Manage Fitness Classes
* Approve, Reject or Delete Classes
* Monitor Transactions
* Manage Community Forum Posts

---

# 💳 Payment Workflow

MomentumX uses Stripe Checkout for secure class booking.

### Booking Flow

1. Browse available fitness classes.
2. Select a class.
3. Redirect to the payment summary page.
4. Complete payment using Stripe Checkout.
5. Verify payment after successful checkout.
6. Automatically create the booking.
7. Store payment information including:

   * Stripe Transaction ID
   * Stripe Session ID
   * Payment Status
   * Booking Date
8. Redirect to the Payment Success page.
9. View the booked class from the dashboard.

---

# 💬 Community Forum

### Members

* Read Community Posts
* Like and Dislike Posts
* Comment on Posts
* Reply to Comments
* Edit and Delete Their Own Comments
* Select Built-in Cover Templates

### Trainers & Admins

* Create Community Posts
* Upload Custom Cover Images
* Use Template Covers
* Manage Their Own Posts

---

# 🖼️ Image Upload System

* Integrated with ImageBB
* JPG, JPEG, PNG and WEBP support
* Maximum upload size: **5 MB**
* Live image preview
* Upload progress feedback
* Automatic image URL storage
* Template and uploaded image selection are mutually exclusive
* Upload permission restricted to Trainers and Admins

---

# 🔒 Security Features

* JWT Protected APIs
* Better Auth Authentication
* Role-Based Authorization
* Protected Routes
* Environment Variable Protection
* MongoDB Credential Protection
* Stripe Secret Key Protection
* Soft Block Validation
* Duplicate Booking Prevention
* Duplicate Favorite Prevention
* Protected Payment Verification

---

# 🛠️ Tech Stack

## Frontend

* Next.js
* React
* Tailwind CSS
* DaisyUI
* Framer Motion
* Axios
* React Hook Form
* TanStack Query
* SweetAlert2
* CountUp
* React Icons
* Stripe.js

---

## Backend

* Node.js
* Express.js
* MongoDB
* Better Auth
* JWT
* Stripe API
* CORS
* dotenv

---

# 📦 Installation

## Clone the repositories

```bash
git clone https://github.com/ayanstack94b/MomentumX-Client.git
git clone https://github.com/ayanstack94b/MomentumX-server.git
```

---

## Install Dependencies

```bash
npm install
```

---

## Start the Client

```bash
npm run dev
```

---

## Start the Server

```bash
npm start
```

---

# ⚙️ Environment Variables

MomentumX uses environment variables to securely manage application configuration and sensitive credentials.

## Client

* API Configuration
* Application URL
* Stripe Publishable Key
* ImageBB API Key

---

## Server

* MongoDB Configuration
* JWT Secret
* Better Auth Configuration
* Google OAuth Credentials
* Client URL
* Stripe Secret Key
* Server Port


---

## Server

```env
PORT=
MONGODB_URI=
JWT_SECRET=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
CLIENT_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
STRIPE_SECRET_KEY=
```

---

# 📱 Responsive Design

MomentumX is fully optimized for:

* 📱 Mobile Devices
* 📲 Tablets
* 💻 Laptops
* 🖥️ Desktop Screens

---

# 🚀 Future Improvements

* Google Authentication
* Email Notifications
* Trainer Analytics Dashboard
* Attendance Tracking
* Workout Progress Tracking
* Fitness Goal Monitoring
* Push Notifications

---

# 👨‍💻 Developed By

**Ayon Banerjee**

If you found this project useful, consider giving the repositories a ⭐.
