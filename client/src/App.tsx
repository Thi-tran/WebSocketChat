import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import './App.css';

interface Message {
  author: string, 
  message: string
}

const socket = io('http://localhost:6060');
function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<Message>({author: '', message: ''});
  const [input, setInput] = useState<string>('');
  const [author, setAuthor] = useState<string>('');

  useEffect(() => {
    socket.on("operations-recieveMessage", (newMessage: Message) => {
      setNewMessage(newMessage);
    });

    return () => {
      socket.off("operations-recieveMessage");
    }
  }, []);

  useEffect(() => {
    if (newMessage.author && newMessage.message) {
      setMessages([...messages, newMessage]);
    }
  }, [newMessage]);

  const onSubmitMessage = () => {
    const newMessage = {
      author,
      message: input
    }
    setInput('');

    socket.emit("operation-sendMessage", newMessage);
  }

  return (
    <div className="App">
      <div className="message-list">
        {messages.map((el, index) => (
          <div className="message" key={index} >{el.author}: {el.message}</div>
        ))}
      </div>
      <div className="input-section">
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter Author"  
        />

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter message"  
        />

        <button onClick={onSubmitMessage}>Submit</button>
      </div>
    </div>
  );
}

export default App;
