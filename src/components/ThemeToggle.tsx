"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "auto";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>("auto");

    const applyTheme = (theme: Theme) => {
        const root = document.documentElement;
    
        switch (theme) {
          case "dark":
            root.classList.add("dark");
            break;
          case "light":
            root.classList.remove("dark");
            break;
          case "auto":
            break;
        }
    
        localStorage.setItem("theme", theme);
      };

      useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as Theme | null;
        const initialTheme = savedTheme || "auto";
        setTheme(initialTheme);
        applyTheme(initialTheme);
      }, []);

      const cycleTheme = () => {
        const next: Theme =
          theme === "auto" ? "light" : theme === "light" ? "dark" : "auto";
        setTheme(next);
        applyTheme(next);
      };
    
    return (
        <button
            onClick={cycleTheme}
            className="text-sm px-3 py-2 border rounded-xl transition"
        >
            Theme: {theme}
        </button>
    );
}
