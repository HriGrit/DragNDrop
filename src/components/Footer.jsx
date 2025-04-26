import React from 'react'

const Footer = () => {
  return (
    <footer className="absolute bottom-4 text-sm text-[var(--sidebar-text)]">
      &copy; {new Date().getFullYear()} Build Your Website Org
    </footer>
  )
}

export default Footer
