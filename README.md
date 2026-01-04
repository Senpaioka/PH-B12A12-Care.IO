# Care.IO - Compassionate Care Platform

Care.IO is a modern web application designed to bridge the gap between families and professional caregivers. Whether you need a nanny for your baby, medical assistance for the elderly, or specialized care for recovering individuals, Care.IO ensures a safe, genuine, and seamless experience.

* Preview Link: https://ph-b12-a12-care-io.vercel.app

## ✨ Features

- **Service Discovery**: Browse and find verified caregivers for Baby Care, Elderly Care, and Special Needs.
- **Secure Authentication**: User and Caregiver registration/login via Credentials or Google OAuth.
- **Dynamic Dashboard**: Personalized dashboards for users to manage their hire requests and for caregivers to manage their availability and profiles.
- **Notification System**: Real-time-like notifications for hire status updates and approvals.
- **Integrated Payments**: Secure checkout process using **Stripe** for hiring services.
- **Profile Management**: Detailed profiles for caregivers including experience, bio, and availability status.
- **Professional Verification**: A dedicated process/UI for caregivers to apply and be verified.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Library**: [React 19](https://reactjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

### Backend & Database
- **Runtime**: Node.js
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Email Service**: [Nodemailer](https://nodemailer.com/)

### Integrations
- **Payments**: [Stripe](https://stripe.com/)
- **Social Login**: Google Cloud (OAuth 2.0)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- MongoDB instance (Local or Atlas)
- Stripe Account (for API keys)
- Google Cloud Project (for OAuth keys)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd care
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret

   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # Stripe
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

   # Email (Nodemailer)
   EMAIL_SERVER_HOST=smtp.example.com
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=your_email_user
   EMAIL_SERVER_PASSWORD=your_email_password
   EMAIL_FROM=noreply@care.io
   ```

### Running Locally

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Usage

1. **As a User**:
   - Register and log in.
   - Navigate to **Find a Caregiver**.
   - Select a caregiver and choose a service.
   - Complete the payment via Stripe.
   - Monitor your dashboard for notifications.

2. **As a Caregiver**:
   - Register as a caregiver.
   - Complete your profile and wait for verification.
   - Toggle your availability.
   - Manage incoming hire requests from your dashboard.

---

## 🔐 Credentials

```bash
# Admin Login
email: admin@mail.com
password: Admin@26
```

```bash
# Caregiver Login
email: doe@mail.com
password: Sakura@26
```

```bash
# User Login
email: sakura@mail.com
password: Sakura@26
```

