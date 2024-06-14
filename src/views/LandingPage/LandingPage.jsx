import { useState } from 'react';
import Button from '../../components/Button/Button';

export default function LandingPage() {
    const [count, setCount] = useState(0)

    return (
        <>
        <div>
        </div>
        <h1>Welcome to ArtQuest</h1>
        <div className="card">
          <Button onClick={() => setCount((count) => count + 1)}>count is {count}</Button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </>
    )
}