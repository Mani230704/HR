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



