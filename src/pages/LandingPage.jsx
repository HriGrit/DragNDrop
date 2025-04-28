/**
 * @file LandingPage.jsx
 * @description The landing page component for the website builder application.
 *              Displays a welcome message and a button to navigate to the site editor.
 */
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * LandingPage - Presents the introductory UI with a call-to-action
 *               to start building a website.
 *
 * @param {Function} [onStartBuilding] - Optional callback invoked when the "Start Building"
 *                                        button is clicked.
 * @returns {JSX.Element} The landing page markup.
 */
export default function LandingPage({ onStartBuilding }) {
  return (
    <div className="flex flex-col items-center justify-center mt-32 p-8 font-sans text-black">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Welcome to Your Website Builder</h1>
        <p className="text-xl">
          Create stunning websites with ease using our drag-and-drop interface.
        </p>
      </header>

      <section className="text-center">
        <p className="text-lg mb-6">
          Ready to bring your vision to life?
        </p>
        <Link to='/site-editor'>
          <button
            onClick={onStartBuilding}
            className="text-white font-bold py-3 px-8 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 bg-[var(--btn-yellow-bg)] border border-[var(--btn-yellow-border)] hover:bg-[var(--btn-yellow-border)] transition duration-300 ease-in-out"
          >
            Start Building Now
          </button>
        </Link>
      </section>
    </div>
  );
}
