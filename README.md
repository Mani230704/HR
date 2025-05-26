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

Welcome to the HR project! Follow the steps below to set up and run the project on your local machine.

---

## 📥 Download or Clone the Code

If you haven't already, get the project code from [GitHub](https://github.com/Mani230704/HR):

- **Option 1:** Download the ZIP file and extract it.
- **Option 2:** Clone the repository using Git:
  ```bash
  git clone https://github.com/Mani230704/HR.git
````


## 📂 Navigate to the Project Directory

Open your terminal or command prompt and navigate to the root directory of the project (the one containing `package.json`):

```bash
cd path/to/your-project-directory
```


## 📦 Install Dependencies

Run the following command to install all necessary packages defined in `package.json`:

```bash
npm install
```

> Or, if you prefer using Yarn:
>
> ```bash
> yarn install
> ```

---

## 🚀 Run the Development Server

Start the **Next.js** application by running:

```bash
npm run dev
```

This will typically start the app on [http://localhost:9002](http://localhost:9002) (as specified by the `-p 9002` flag in your `dev` script).
Check your terminal for the exact address.

---

## 🧠 Run the Genkit Development Server (for AI Features)

This application uses **Genkit** for its AI functionalities. To run the Genkit development server:

1️⃣ Open a new terminal window or tab.
2️⃣ Navigate back to the project directory.
3️⃣ Run the following command:

```bash
npm run genkit:dev
```

This will start the Genkit tools, typically on [http://localhost:4000](http://localhost:4000) or another port.
This server needs to run **alongside** the Next.js app if you want to use the AI-powered features.

---

## 📝 Summary

* **Terminal 1:**

  ```bash
  npm install   # (Run only once initially)
  npm run dev   # Starts the Next.js app
  ```
* **Terminal 2:**

  ```bash
  npm run genkit:dev   # Starts the Genkit server
  ```

After completing these steps, open your browser and visit [http://localhost:9002](http://localhost:9002) to see the application running!

If you make changes to the code, the **Next.js** development server will usually auto-reload the page.


Happy coding! 💻✨

```

Would you like me to also add **badges** (e.g., for Node version, license, or GitHub stars) to the top of the README?
```


