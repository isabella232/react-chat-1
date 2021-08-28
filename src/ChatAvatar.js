/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const ChatAvatar = ({ user, onClick, ...props }) => {
  const src =
    user.avatar || 'https://api.westack.live/avatar?username=' + user.name;

  return (
    <div
      onClick={onClick}
      css={css`
        cursor: pointer;
      `}
      {...props}
    >
      <img
        src={src}
        alt={user.name}
        width="40"
        height="40"
        css={css`
          border-radius: 50%;
        `}
      />
    </div>
  );
};

export default ChatAvatar;
