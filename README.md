
---

# ✅ README.md

````md
# 🚀 Main-AK-Frontend

Modern React + TypeScript frontend built using Vite.  
Designed to work with Django REST API backend.

---

## 📦 Tech Stack

- ⚛ React
- 🔷 TypeScript
- ⚡ Vite
- 🎨 Tailwind / Custom CSS (if using)
- 🔗 Axios (API communication)

---

## 🛠️ Project Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/s-akhil-08/cadverse-frontend.git
cd cadverse-frontend
```

````

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Setup environment variables

Create a `.env` file in the root of the `Frontend` folder.

Example:

```
VITE_API_BASE_URL=http://localhost:8000
```

⚠️ All Vite environment variables must start with `VITE_`

---

### 4️⃣ Run development server

```bash
npm run dev
```

App will run at:

```
http://localhost:5173
```


---

## 🌍 Environment Variables

| Variable          | Description          |
| ----------------- | -------------------- |
| VITE_API_BASE_URL | Backend API base URL |

---

## 🔗 Backend Connection

Make sure Django backend is running:

```bash
python manage.py runserver
```

Default backend URL:

```
http://localhost:8000
```

---


---

# ✅ Now Create `env.example`

Create a file called:

```

.env.example

```

Inside:

```

VITE_API_BASE_URL=[http://localhost:8000]

```

This helps other developers know what environment variables are required.

---



