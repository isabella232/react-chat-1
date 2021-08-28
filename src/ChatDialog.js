/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import ChatScroll from './ChatScroll';
import ChatActivityList from './ChatActivityList';
import ChatInput from './ChatInput';

export default function ChatDialog({
  activities,
  currentUser,
  onSend,
  renderActivity,
  renderToolbar,
}) {
  // TODO: useReducer
  const [text, setText] = useState('');

  function renderActivities() {
    return (
      <ChatActivityList
        currentUser={currentUser}
        activities={activities}
        renderActivity={renderActivity}
      />
    );
  }

  return (
    <div
      css={css`
        height: 100%;
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={css`
          flex-grow: 1;
          min-height: 0;
        `}
      >
        <ChatScroll>{renderActivities()}</ChatScroll>
      </div>
      {renderToolbar({ value: text, onChange: setText, onSend })}
    </div>
  );
}

ChatDialog.defaultProps = {
  renderToolbar: (props) => <ChatInput {...props} />,
};
