export const THEME_STORAGE_KEY = "theme";

/** Browser UI colour (address bar on mobile, Safari tab bar) for each theme. */
export const THEME_COLORS = { light: "#F6F6F4", dark: "#0B0B0C" } as const;

/** Keeps <meta name="theme-color"> in sync with the site's own theme (not the OS setting). */
export function setThemeColor(dark: boolean) {
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? THEME_COLORS.dark : THEME_COLORS.light);
}

/**
 * Runs before first paint so a saved dark theme never flashes light. Light is the default.
 * The theme-color tag may not be parsed yet, so it's set again once the page has loaded.
 */
export const themeInitScript = `try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark"){document.documentElement.classList.add("dark");var s=function(){var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content","${THEME_COLORS.dark}")};s();document.addEventListener("DOMContentLoaded",s)}}catch(e){}`;
