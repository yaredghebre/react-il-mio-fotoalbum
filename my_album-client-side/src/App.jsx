import { useState } from 'react';
import 'flowbite';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <div className="h-screen bg-slate-300">Home</div>
      <Footer />
    </>
  );
}

export default App;
