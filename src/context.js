import React, { createContext, useContext, useReducer, useEffect } from 'react';

export const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

const initialState = {
  inputValue: '',
  currentUser: null,
  currentRoom: null,
  typings: {},
  rooms: [],
  activities: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'inputValue': {
      return { ...state, inputValue: action.payload };
    }
    case 'currentUser': {
      return { ...state, currentUser: action.payload };
    }
    case 'rooms': {
      return { ...state, rooms: action.payload };
    }
    case 'currentRoom': {
      return { ...state, currentRoom: action.payload };
    }
    case 'activities': {
      return { ...state, activities: action.payload };
    }
    case 'activity': {
      return { ...state, activities: [...state.activities, action.payload] };
    }
    case 'presence': {
      return { ...state, presence: action.payload.state };
    }
    default: {
      return state;
    }
  }
}

export const Chat = ({
  getCurrentUser,
  getRoom,
  getRooms,
  getRoomActivities,
  sendMessage,
  createActivityListener,
  createPresenceListener,
  handleTypingStart,
  handleTypingStop,
  enterRoom,

  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // TODO: add initial loading
  useEffect(() => {
    getCurrentUser().then((user) => {
      dispatch({ type: 'currentUser', payload: user });
    });
  }, [getCurrentUser]);

  useEffect(() => {
    getRooms().then((rooms) => {
      dispatch({ type: 'rooms', payload: rooms });
      dispatch({ type: 'currentRoom', payload: rooms[0] });
    });
  }, [getRooms]);

  // TODO: add locale support
  function t() {}

  function setInputValue(value) {
    dispatch({ type: 'inputValue', payload: value });
  }

  function handleMessageSubmit() {
    sendMessage(state.currentRoom.id, {
      payload: {
        type: 'text',
        text: state.inputValue,
      },
    });
    setInputValue('');
  }

  return (
    <ChatContext.Provider
      value={{
        t,
        state,
        dispatch,
        currentUser: state.currentUser,
        currentRoom: state.currentRoom,
        rooms: state.rooms,
        activities: state.activities,
        inputValue: state.inputValue,
        setInputValue,
        getRooms,
        getRoomActivities,
        sendMessage,
        handleMessageSubmit,
        createActivityListener,
        createPresenceListener,
        handleTypingStart,
        handleTypingStop,
        enterRoom: enterRoom,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
