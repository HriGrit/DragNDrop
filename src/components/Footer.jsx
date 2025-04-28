/**
 * @file Footer.jsx
 * @description Renders the Footer area for the site
 */

import React from 'react'

/**
 * Footer - Page footer with copyright.
 *
 * @component
 * @returns {JSX.Element} The application footer.
 */
export const Footer = () => {
  return (
    <footer className="absolute bottom-4 text-sm text-[var(--sidebar-text)]">
      &copy; {new Date().getFullYear()} Build Your Website Org
    </footer>
  );
};

export default Footer
