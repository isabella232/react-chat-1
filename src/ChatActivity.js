/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import ChatMessage from './ChatMessage';

const ChatActivity = ({ activity }) => {
  return (
    <ChatMessage user={{ id: '1', name: 'wangzuo' }}>
      <div
        css={css`
          word-break: break-word;
          // todo: ie 11 wrap fix,
          overflow: hidden;
          word-wrap: break-word;
          padding: 8px 12px;
        `}
      >
        hello world
      </div>
    </ChatMessage>
  );
};

export default ChatActivity;
