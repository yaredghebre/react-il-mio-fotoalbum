import React, { useRef } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import homeCover1 from '../assets/placeHolders/homeCover1.jpg';
import homeCover6 from '../assets/placeHolders/homeCover6.jpg';
import homeCover7 from '../assets/placeHolders/homeCover7.jpg';
import '../css/styles.modules.css';

const Home = () => {
  const ref = useRef();
  return (
    <div>
      <Parallax pages={3} ref={ref}>
        <ParallaxLayer
          offset={0}
          speed={1}
          onClick={() => ref.current.scrollTo(1)}
          className="flex items-center justify-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${homeCover6})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
          }}
        >
          <h2 className="text-5xl font-bold text-white">
            Welcome to My Photo Album
          </h2>
        </ParallaxLayer>
        <ParallaxLayer
          offset={1}
          speed={0.8}
          onClick={() => ref.current.scrollTo(2)}
          className="flex items-center justify-center"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${homeCover7})`,
            backgroundSize: 'cover',
            opacity: 0.85,
          }}
        >
          <h2 className="text-5xl font-bold text-white">
            Where you can post your fav pics
          </h2>
        </ParallaxLayer>
        <ParallaxLayer
          offset={2}
          speed={0.1}
          onClick={() => ref.current.scrollTo(0)}
          className="flex items-center justify-center"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url(${homeCover1})`,
            backgroundSize: 'cover',
            opacity: 0.85,
          }}
        >
          <h2 className="text-5xl font-bold text-white">REGISTER</h2>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default Home;
