/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { format } from 'date-fns';
import ChatBubble from './ChatBubble';
import ChatAvatar from './ChatAvatar';
import { useChat } from './context';

export const formatTime = (date) => format(date, 'HH:mm');

export default function ChatMessage({ activity, sending, children }) {
  const { currentUser } = useChat();
  const user = activity.user;
  const reversed = currentUser && currentUser.id === user.id;

  function handleAvatarClick() {}

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;

        &:first-of-type {
          margin-top: 0;
        }
      `}
    >
      <div
        css={[
          css`
            display: flex;
            width: 100%;
            margin-top: 20px;
            flex-direction: row;
          `,
          reversed &&
            css`
              flex-direction: row-reverse;
            `,
        ]}
      >
        <div
          css={css`
            padding-top: 5px;
          `}
        >
          <ChatAvatar user={user} onClick={handleAvatarClick} />
        </div>
        <div
          css={css`
            margin-left: 10px;
            margin-right: 10px;
            flex: 1;
          `}
        >
          <div
            css={[
              css`
                display: flex;
                color: #999;
                margin-bottom: 6px;
                font-size: 12px;
              `,
              reversed
                ? css`
                    justify-content: flex-end;
                  `
                : css``,
            ]}
          >
            {user.name}
          </div>
          <div
            css={[
              css`
                position: relative;
                display: flex;
                align-items: flex-end;
              `,
              reversed &&
                css`
                  flex-direction: row-reverse;
                `,
            ]}
          >
            <ChatBubble reversed={reversed}>{children}</ChatBubble>
            {activity.createdAt ? (
              <div
                css={css`
                  font-size: 8px;
                  font-weight: 500;
                  color: #86754d;
                  margin-left: 4px;
                  margin-right: 4px;
                `}
              >
                {formatTime(new Date(activity.createdAt))}
              </div>
            ) : null}

            {sending ? (
              <div
                css={css`
                  font-size: 8px;
                  font-weight: 500;
                  color: #86754d;
                  margin-left: 4px;
                  margin-right: 4px;
                `}
              >
                发送中...
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
