/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment, useEffect, useRef } from 'react';
import { differenceInMilliseconds, differenceInCalendarDays } from 'date-fns';
import ChatScroll from './ChatScroll';
import ChatMessage from './ChatMessage';

const DIFF = 86400000;

const ChatRoom = ({
  currentUser,
  room,
  sendingMessages,
  activities,
  typings,
  scrollToBottom,
}) => {
  let lastActivity = null;

  // useEffect(() => {
  //   if (currentRoom) {
  //     if (scroll.current) {
  //       scroll.current.scrollToBottom();
  //     }

  //     getRoomActivities(currentRoom.id).then(activities => {
  //       dispatch({ type: 'activities', payload: activities });

  //       scroll.current.scrollToBottom();
  //     });

  //     return createActivityListener(activity => {
  //       dispatch({ type: 'activity', payload: activity });

  //       scroll.current.scrollToBottom();
  //     });
  //   }
  // }, [currentRoom]);

  // useEffect(() => {
  //   if (currentRoom) {
  //     return createPresenceListener(payload => {
  //       dispatch({ type: 'presence', payload });
  //       scroll.current.scrollToBottom();
  //     });
  //   }
  // }, [currentRoom]);

  // const typings = state.presence
  //   ? Object.keys(state.presence)
  //       .map(userId => {
  //         const { metas } = state.presence[userId];
  //         const meta = metas[0];
  //         return meta;
  //       })
  //       .filter(user => user.typing && user.id !== currentUser.id)
  //   : [];

  return (
    <ChatScroll scrollToBottom={scrollToBottom}>
      {activities.map((activity) => {
        const showTime =
          !lastActivity ||
          differenceInMilliseconds(
            new Date(activity.created_at),
            new Date(lastActivity.created_at)
          ) > DIFF ||
          differenceInCalendarDays(
            new Date(activity.created_at),
            new Date(lastActivity.created_at)
          ) > 0;

        return (
          <Fragment key={activity.id}>
            {renderActivity(activity, {
              currentUser,
              room,
              showTime,
            })}
          </Fragment>
        );
      })}

      {sendingMessages.map((message) => (
        <ChatMessage
          key={message.id}
          currentUser={currentUser}
          sending
          activity={{
            user: message.user,
            message_type: message.type,
            message_payload: message.payload,
          }}
        />
      ))}

      {typings.map((typing) => (
        <div key={typing.id}>{typing.name}正在输入</div>
      ))}
    </ChatScroll>
  );
};

function renderActivity(activity, props) {
  switch (activity.activity_type) {
    case 0: {
      return <ChatMessage activity={activity} {...props} />;
    }
    default: {
      return null;
    }
  }
}

export default ChatRoom;
