# GeminiClone – Minimal AI Chat Interface

GeminiClone is a React project that provides a simple AI chat experience with a clean, distraction-free interface.
The focus of this project is UI clarity, state management, and user experience.

### **Live:** [`GeminiClone`](https://geminiiclone.netlify.app/)

---

## Preview  

![GeminiClone_Preview](https://res.cloudinary.com/dhhhr2skx/image/upload/v1771505502/Screenshot_from_2026-02-19_18-21-27_sbhgbo.png)

---

## Features

- **Chat Interface** – Ask questions and get AI‑generated answers  
- **Light / Dark Mode** – Simple theme toggle with local storage persistence  
- **Chat History** – Previous conversations are listed in a sidebar and restored on refresh  
- **New Chat** – Start a fresh conversation with a single click  
- **Responsive Layout** – Works on desktop and mobile screens  

---

## Tech Stack

- React + Vite  
- Tailwind CSS  
- Axios  
- Pollinations.ai(public text api)

---

## Setup Instructions

### Prerequisites
- Node.js and npm installed  
- A valid API key from the pollinations ai(go to enter.pollinations.ai and create a new api key)

#### 1. Clone the repo
```bash
git clone https://github.com/Piyush-20045/GeminiClone.git
cd GeminiClone
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Create a `.env` file
```bash
VITE_POLLINATIONS_KEY=pk_sKnzqn3pfYoR5AJI
```

Restart the dev server after creating or changing `.env`.

#### 4. Run the app
```bash
npm run dev
```

---

## Folder Structure
```bash
GeminiClone/
├── src/
│   ├── components/
│   ├── assets/
│   ├── theme/
│   └── main.jsx
├── public/
├── .env
└── README.md
```

---

## What I Learned
- Making API requests using Axios and handling responses safely
- Using a public AI API to keep frontend architecture simple
- Persisting chat data with localStorage
- Managing light/dark themes using Context API

---

## Author
**Piyush Yadav**  
- Twitter/X: [@Piyush9436](https://x.com/Piyush9436)  
- LinkedIn: [@piyushyadav](https://www.linkedin.com/in/piyushyadav0011/)
