import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <h1>Welcome to ArtQuest</h1>
      <p>Your ultimate platform for creating, sharing, and participating in art quizzes.</p>

      <section className="sample-quiz">
        <Link to="/sample-quiz" className="btn btn-tertiary">Try a quiz</Link>
      </section>
    </div>
  );
}
