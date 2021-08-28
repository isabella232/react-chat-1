import React, { useEffect, useRef } from 'react';
import SimpleBar from 'simplebar-react';
import './SimpleBar.scss';

export default function ChatScroll({ children, scrollToBottom, ...props }) {
  const scroll = useRef();
  const node = useRef();

  useEffect(() => {
    if (node.current && scrollToBottom) {
      const el = node.current;
      el.scrollTop = el.scrollHeight;
    }
  }, [scrollToBottom]);

  return (
    <SimpleBar
      scrollableNodeProps={{ ref: node }}
      ref={scroll}
      style={{ height: '100%' }}
    >
      {children}
    </SimpleBar>
  );
}
