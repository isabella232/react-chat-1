import React, { useRef } from 'react';
import { useChat } from './context';

const TYPING_TIMEOUT = 1500; // ms
const KEY_ENTER = 13;

export default function ChatInput({
  component,
  onTypingStart,
  onTypingStop,
  typingTimeout,
  onSubmit,
  ...props
}) {
  const { inputValue, setInputValue, handleMessageSubmit } = useChat();
  const typingRef = useRef(false);
  const timerRef = useRef(null);

  function handleChange(value) {
    setInputValue(value);
  }

  function handleKeyDown(e) {
    if (e.keyCode === KEY_ENTER && e.shiftKey === false) {
      e.preventDefault();
      handleSubmit();
    } else {
      removeTimer();
      startTyping();
    }
  }

  function handleKeyUp(e) {
    if (e.keyCode === KEY_ENTER && e.shiftKey === false) {
      // TODO: submit & typing conflict
    } else {
      removeTimer();
      timerRef.current = setTimeout(stopTyping, typingTimeout);
    }
  }

  function startTyping() {
    if (typingRef.current) return;

    if (onTypingStart) {
      onTypingStart();
    }

    typingRef.current = true;
  }

  function stopTyping() {
    removeTimer();
    if (onTypingStop) {
      onTypingStop();
    }
    typingRef.current = false;
  }

  function handleSubmit() {
    handleMessageSubmit();
    stopTyping();
  }

  function removeTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }

  return React.createElement(component, {
    ...props,
    value: inputValue,
    onChange: handleChange,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
  });
}

ChatInput.defaultProps = {
  component: 'input',
  typingTimeout: TYPING_TIMEOUT,
};
