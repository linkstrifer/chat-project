function Messages({ messages }) {
  return (
    <ul>
      {messages.map(({ text, user, _id }) => (
        <li key={_id}>{`${user}: ${text}`}</li>
      ))}
    </ul>
  );
}

export default Messages;
