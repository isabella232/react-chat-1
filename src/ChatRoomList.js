/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import ChatScroll from './ChatScroll';
import ChatAvatar from './ChatAvatar';
import { useChat } from './context';

// TODO: rename to chat sidebar
export default function ChatRoomList({ title }) {
  const { rooms, currentUser, dispatch } = useChat();

  function switchRoom(room) {
    console.log('switchRoom', room);

    dispatch({ type: 'currentRoom', room });
  }

  return (
    <div>
      {currentUser ? (
        <div>
          <ChatAvatar user={currentUser} />
          <div>{currentUser.name}</div>
          <button>Logout</button>
        </div>
      ) : null}
      <ChatScroll>
        {rooms.map((room) => (
          <div
            key={room.id}
            onClick={() => switchRoom(room)}
            css={css`
              padding: 8px 6px;
              display: flex;
              align-items: center;
              border-bottom: 1px solid #eee;
              cursor: pointer;

              &:hover {
                opacity: 0.7;
              }
            `}
          >
            {room.avatar ? (
              <div>
                <img
                  src={room.avatar}
                  alt={room.title}
                  width="40"
                  css={css`
                    border-radius: 50%;
                  `}
                />
              </div>
            ) : null}
            <div
              css={css`
                margin-left: 8px;
              `}
            >
              <div>{room.title}</div>
              {room.desc ? (
                <div
                  css={css`
                    color: #999;
                  `}
                >
                  {room.desc}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </ChatScroll>
    </div>
  );
}
