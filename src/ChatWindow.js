import React, { useState, useEffect } from 'react';

export default function ChatWindow({ children, ...props }) {
  const { width, height } = useWindowSize();

  return (
    <div style={{ width, height }} {...props}>
      {children}
    </div>
  );
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
