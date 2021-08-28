/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect } from 'react';
import { differenceInCalendarDays, format } from 'date-fns';
import { useChat } from './context';
import ChatMessage from './ChatMessage';

function formatDate(date) {
  return format(date, 'EEEE dd MMMM');
}

export default function ChatActivityList({ diff, ...props }) {
  const {
    currentUser,
    activities,
    currentRoom,
    getRoomActivities,
    dispatch,
    enterRoom,
  } = useChat();
  let last = null;

  useEffect(() => {
    if (currentRoom) {
      console.log('currentRoom', currentRoom);

      getRoomActivities(currentRoom.id).then((activities) => {
        dispatch({ type: 'activities', payload: activities });
      });

      return enterRoom(currentRoom, (activity) => {
        dispatch({ type: 'activity', payload: activity });
      });
    }
  }, [currentRoom, dispatch, getRoomActivities]);

  // function renderActivity({ activity, index }) {
  //   const prev = activities[index - 1] || {};
  //   const next = activities[index + 1] || {};

  //   const itemProps = {
  //     key: activity.id,
  //     currentUser,
  //     activity: activity,
  //     prevActivity: prev,
  //     nextActivity: next,
  //   };

  //   return <ChatActivity {...itemProps} />;
  // }

  if (activities && currentUser) {
    return (
      <div
        css={css`
          display: flex;
          flex: 1;
          min-height: 100%;
          flex-direction: column;
          justify-content: flex-end;
          padding-left: 11px;
          padding-right: 11px;
          padding-top: 10px;
          padding-bottom: 10px;
        `}
      >
        {activities.map((activity, index) => {
          const showTime =
            !last ||
            activity.createdAt - last.createdAt > diff ||
            differenceInCalendarDays(
              new Date(activity.createdAt),
              new Date(last.createdAt)
            ) > 0;

          return (
            <div key={activity.id}>
              {showTime && activity.createdAt ? (
                <div
                  key={activity.id + 'time'}
                  css={css`
                    margin-top: 20px;
                    width: 100%;
                    text-align: center;
                  `}
                >
                  <span
                    css={css`
                      display: inline-block;
                      color: #999;
                      font-size: 12px;
                    `}
                  >
                    {formatDate(new Date(activity.createdAt))}
                  </span>
                </div>
              ) : null}

              <ChatMessage activity={activity}>
                <div
                  css={css`
                    word-break: break-word;
                    // todo: ie 11 wrap fix,
                    overflow: hidden;
                    word-wrap: break-word;
                    padding: 8px 12px;
                  `}
                >
                  {activity.payload.text}
                </div>
              </ChatMessage>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
}

ChatActivityList.defaultProps = {
  diff: 86400000,
};
