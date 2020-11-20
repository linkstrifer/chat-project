import { useState, useEffect } from "react";

import Messages from "./messages.component";
import Compose from "./compose.component";

import { API } from "./constants";

function getMessages() {
  return fetch(`${API}/channel/general`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

function Chat() {
  const [messages, setMessages] = useState([]);

  function loadMessages() {
    getMessages().then(({ messages }) => {
      setMessages(messages);
    });
  }

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div>
      <Messages messages={messages} />
      <Compose
        onSuccess={() => {
          loadMessages();
        }}
      />
    </div>
  );
}

export default Chat;
