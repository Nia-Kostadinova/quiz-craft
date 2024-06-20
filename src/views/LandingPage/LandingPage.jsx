import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import Button from '../../components/Button/Button';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className='containerDarker'>
        <div className="text">
          <h1>Welcome to ArtQuest</h1>
          <p>Your ultimate platform for creating, sharing, and participating in art quizzes.</p>
          <Button className="button">Try a quiz</Button>
        </div>
      </div>
    </div>
  );
}
