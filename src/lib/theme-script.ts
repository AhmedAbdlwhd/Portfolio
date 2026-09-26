export const THEME_STORAGE_KEY = "theme";

/** Runs before first paint so a saved dark theme never flashes light. Light is the default. */
export const themeInitScript = `try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark")document.documentElement.classList.add("dark")}catch(e){}`;
