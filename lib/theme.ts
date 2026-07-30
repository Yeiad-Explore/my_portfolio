/**
 * Theme handling.
 *
 * Deliberately imperative and DOM-based rather than React state. The pre-paint
 * script in `app/layout.tsx` sets the `dark` class before first paint, which
 * means React's server render and its first client render must agree — so no
 * component may render differently based on the theme. Anything theme-dependent
 * is expressed with Tailwind's `dark:` variant, i.e. resolved by CSS, and this
 * module only ever mutates the class.
 *
 * That is the same constraint that caused the reduced-motion hydration failures
 * fixed during QA, applied ahead of time.
 */

export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'theme'

/**
 * The script injected before paint. Kept as a string so it can run blocking in
 * <head>, which is what prevents a flash of the wrong theme.
 */
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var dark = stored
      ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    var root = document.documentElement;
    root.classList.toggle('dark', dark);
    root.style.colorScheme = dark ? 'dark' : 'light';
  } catch (e) {}
})();
`.trim()

export function getTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function setTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // Private browsing / storage disabled — the theme still applies for this
    // page view, it just will not be remembered.
  }
}

export function toggleTheme(): Theme {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark'
  setTheme(next)
  return next
}
