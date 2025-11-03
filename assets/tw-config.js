/* Centralized Tailwind configuration used by the CDN build injection.
   Keeps the `primary` color consistent across pages. */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#1e40af'
      }
    }
  }
};
