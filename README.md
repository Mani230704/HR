# 💼 HR Dashboard 

An interactive and responsive HR Performance Dashboard built with **Next.js**, **Tailwind CSS**, and modern React practices. This dashboard allows HR managers to view employee details, analyze performance, manage bookmarks, and explore visual insights.

---

## 🔧 Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Language:** JavaScript (ES6+)
- **State Management:** Context API / Zustand
- **Charts:** Chart.js
- **Authentication:** (Optional) NextAuth.js
- **Animations:** (Optional) Framer Motion

---

## ✨ Features

### 🏠 Dashboard Homepage (`/`)

- Fetches data from `https://dummyjson.com/users?limit=20`
- Displays user cards with:
  - Name, Email, Age, Department
  - Performance Rating (1–5 stars)
  - Buttons: `View`, `Bookmark`, `Promote`

### 🔍 Search & Filter

- Real-time filtering by name, email, and department
- Multi-select filter for department or rating

### 👤 Employee Details (`/employee/[id]`)

- Detailed profile with:
  - Address, Phone, Bio, Past Performance History
- Tabbed UI:
  - `Overview`, `Projects`, `Feedback` (dynamic loading)

### 📌 Bookmark Manager (`/bookmarks`)

- View and manage bookmarked employees
- UI actions for Promote and Assign to Project

### 📊 Analytics Page (`/analytics`)

- Charts showing:
  - Department-wise average ratings
  - Bookmark trends
- Built using Chart.js

---

## ⚙️ Technical Highlights

- ✅ **App Router** (Next.js 13+)
- ✅ **Custom Hooks:** `useBookmarks`, `useSearch`
- ✅ **Reusable Components:** `Card`, `Badge`, `Modal`, `Button`
- ✅ **Responsive Design** (mobile-first with Tailwind)
- ✅ **Dark/Light Mode Toggle**
- ✅ **Modular Project Structure**
- ✅ **Form Handling** in Feedback Tab
- ✅ **Loading & Error UI States**

---

## ⭐ Bonus Features

- 🔐 Mock Authentication (NextAuth.js or Login Page)
- 📝 "Create User" Form with Validation
- 📄 Pagination / Infinite Scrolling for user list
- 🎞️ Animated Tab/Content Transitions with Framer Motion


# HR Project Setup Guide

```bash
# 📥 Download or Clone the Code
# If you haven't already, get the project code from https://github.com/Mani230704/HR
# Option 1: Download the ZIP file and extract it.
# Option 2: Clone the repository using Git
git clone https://github.com/Mani230704/HR.git

# 📂 Navigate to the Project Directory
cd path/to/your-project-directory

# 📦 Install Dependencies
npm install
# Or, if you prefer Yarn:
# yarn install

# 🚀 Run the Development Server
npm run dev
# This typically starts the app on http://localhost:9002
# Check the terminal output for the exact address.

# 🧠 Run the Genkit Development Server (for AI Features)
# Open a new terminal window/tab, navigate to the project directory again:
npm run genkit:dev
# This starts Genkit tools, often on http://localhost:4000
# This needs to run alongside the Next.js app to use AI-powered features.

# 📝 Summary
# Terminal 1:
npm install  # (Run once initially)
npm run dev  # Starts the Next.js app
# Terminal 2:
npm run genkit:dev  # Starts the Genkit server

# After completing these steps, open your browser and visit http://localhost:9002
# The Next.js server usually auto-reloads when code changes.

