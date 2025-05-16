/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // ← これが重要 ./index.html: Vite のルート HTML ファイル ./src/**/*.{js,ts,jsx,tsx}: React コンポーネント全体
  theme: {
    extend: {},
  },
  plugins: [],
}

