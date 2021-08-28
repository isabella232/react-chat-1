/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const ChatBubble = ({ reversed, children, ...props }) => {
  return (
    <div
      {...props}
      css={[styles.container, reversed ? styles.reversed : styles.triangle]}
    >
      {children}
    </div>
  );
};

ChatBubble.defaultProps = {
  reversed: false,
};

const styles = {
  container: css`
    position: relative;
    display: flex;
    border-radius: 10px;
    background-color: #eee;
  `,

  triangle: css`
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 10px;
      width: 0;
      height: 0;
      margin-top: -6px;
      margin-left: -6px;
      border: 6px solid transparent;
      border-right-color: #eee;
      border-left: 0;
    }
  `,

  reversed: css`
    background-color: #eee;

    &:after {
      content: '';
      position: absolute;
      right: 0;
      bottom: 10px;
      width: 0;
      height: 0;
      margin-top: -6px;
      margin-right: -6px;
      border: 6px solid transparent;
      border-left-color: #eee;
      border-right: 0;
    }
  `,
};

export default ChatBubble;
