import './styles.scss';
import React from 'react';
import { render } from 'react-dom';
import {
  Chat,
  ChatInput,
  ChatRoomList,
  ChatActivityList,
  ChatScroll,
  ChatWindow,
  useChat,
} from '@swiftcarrot/react-chat';
import { TextInput } from 'components';
import Normalize from 'react-normalize';
import Request from '@swiftcarrot/request';

const request = new Request('http://localhost:9997').token(() =>
  window.localStorage.getItem('token')
);

const Pusher = window.Pusher;

Pusher.logToConsole = true;

const pusher = new Pusher('af2ef10c664242d9d4aa', {
  cluster: 'ap1',
});

pusher.subscribe('channels').bind('new-channel', (data) => {
  console.log('new channel', data);
});

async function uploadFile(file) {
  const data = await fetch('https://storage-caitouyun.caitouyun.com/uploads', {
    method: 'POST',
    body: JSON.stringify({
      directory: 'avatars',
      name: file.name,
    }),
  }).then((resp) => resp.json());

  console.log('uploadFile', data, file);

  const fd = new FormData();
  fd.append('key', data.key);
  fd.append('policy', data.policy);
  fd.append('OSSAccessKeyId', data.accessid);
  fd.append('success_action_status', '200');
  fd.append('signature', data.signature);
  fd.append('file', file);

  const req = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    req.open('POST', data.upload_url);

    req.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const progress = (e.loaded / e.total) * 100;
        console.log('uploading', progress);
      }
    });

    // TODO: req.upload failed here
    req.addEventListener('load', () => {
      resolve(data.key);
    });
    req.upload.addEventListener('error', () => {
      console.log('error');
    });
    req.upload.addEventListener('abort', () => {
      console.log('abort');
    });

    req.send(fd);
  });
}

function getCurrentUser() {
  return request.get('/user');
}

function sendMessage(roomId, message) {
  console.log('sendMessage', roomId, message);
  return request.post('/events', {
    channel: roomId,
    payload: message.payload,
  });
}

function getRooms() {
  return request.get('/channels');
}

function getRoomActivities(roomId) {
  return request.get('/events', { channel: roomId });
}

function enterRoom(room, cb) {
  pusher.subscribe(room.id).bind('new-event', (event) => {
    cb(event);
  });
}

const Root = () => {
  return (
    <Chat
      getCurrentUser={getCurrentUser}
      sendMessage={sendMessage}
      getRooms={getRooms}
      getRoomActivities={getRoomActivities}
      enterRoom={enterRoom}
    >
      <Normalize />
      <input type="file" onChange={(e) => uploadFile(e.target.files[0])} />
      <ChatWindow className="window">
        <div className="sidebar">
          <ChatRoomList />
        </div>
        <div className="main">
          <div className="activities">
            <ChatScroll>
              <ChatActivityList />
            </ChatScroll>
          </div>
          <div className="toolbar">
            <ChatInput component={TextInput} placeholder="Type a message..." />
          </div>
        </div>
      </ChatWindow>
    </Chat>
  );
};

render(<Root />, document.getElementById('root'));
