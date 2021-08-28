/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';

const ChatTypingIndicator = () => {
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        height: 8px;
      `}
    >
      <Dot delay="0s" />
      <Dot delay="80ms" />
      <Dot delay="160ms" />
    </div>
  );
};

const wave = keyframes`
  0%, 30%, 100% {
    transform: initial;
  }
  15% {
    transform: translateY(-8px);
  }
}
`;

const Dot = ({ delay }) => {
  return (
    <div
      css={css`
        position: relative;
        display: block;
        height: 5px;
        width: 5px;
        margin: 0 2px;
        background-color: #bec7cf;
        border-radius: 50%;
        animation: ${wave} 1s ease-out infinite;
        animation-delay: ${delay};
      `}
    />
  );
};

export default ChatTypingIndicator;
