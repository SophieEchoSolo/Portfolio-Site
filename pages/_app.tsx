import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [selectedStyle, setStyle] = useState('firstStyle-selected');
  return (
    <div id={selectedStyle}>
      <Navbar updateStyle={setStyle} />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
