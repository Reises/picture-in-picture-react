import { useRef } from 'react';
import Clock from './components/Clock';
import PipButton from './components/PipButton';
import './App.css';

export default function App() {
  const pipRef = useRef(null);

  return (
    <main className="flex items-center justify-center min-h-screen bg-black text-white">
      {/* PiPに表示させる要素全体にrefを設定 */}
      <div ref={pipRef} className="relative rounded-lg shadow-lg p-8 bg-zinc-800">
        <Clock />
        <PipButton pipRef={pipRef} />
      </div>
    </main>
  );
}