
import { useState } from "react";
import "../styles/Messages.css";

// Initial demo conversations matching Image 5
const INITIAL_CONVERSATIONS = [
  {
    id: 1,
    name: "Sarah Lin",
    title: "Lead AI Researcher & Writer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    lastMessage: "Hi! Really enjoyed your recent story on AI cognition.",
    time: "09:09 AM",
    unread: 1,
    online: true,
    type: "creators",
    messages: [
      { id: 1, sender: "them", text: "Hey! Loved your recent piece on RythCore.", time: "09:05 AM" },
      { id: 2, sender: "them", text: "Hi! Really enjoyed your recent story on AI cognition.", time: "09:09 AM" },
    ],
  },
  {
    id: 2,
    name: "Alex Rivera",
    title: "Systems Architect & Essayist",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    lastMessage: "Hey! Let's collaborate on the distributed systems piece.",
    time: "08:09 AM",
    unread: 0,
    online: true,
    type: "creators",
    messages: [
      { id: 1, sender: "them", text: "Hey! Let's collaborate on the distributed systems piece.", time: "08:09 AM" },
      { id: 2, sender: "me", text: "Sounds great Alex, I'll send over the draft outline shortly.", time: "08:15 AM" },
    ],
  },
  {
    id: 3,
    name: "Dr. Maya Patel",
    title: "Cognitive Neuroscientist",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
    lastMessage: "Welcome to RythCore! Let me know if you want feedback.",
    time: "07:09 AM",
    unread: 0,
    online: true,
    type: "creators",
    messages: [
      { id: 1, sender: "them", text: "Welcome to RythCore! Let me know if you want feedback on your mindset essays.", time: "07:09 AM" },
    ],
  },
];

function Messages() {
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [activeId, setActiveId] = useState(null);
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");

  const activeChat = conversations.find((c) => c.id === activeId);

  // Filter conversations based on search & tab
  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (tab === "unread") return c.unread > 0;
    if (tab === "creators") return c.type === "creators";
    return true;
  });

  const handleSelectChat = (id) => {
    setActiveId(id);
    // Mark as read when selected
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    );
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeId) return;

    const newMessage = {
      id: Date.now(),
      sender: "me",
      text: inputText.trim(),
      time: "Just now",
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeId) {
          return {
            ...c,
            lastMessage: inputText.trim(),
            time: "Just now",
            messages: [...c.messages, newMessage],
          };
        }
        return c;
      })
    );
    setInputText("");
  };

  return (
    <div className="messages-layout">
      {/* 1. LEFT CONVERSATION LIST */}
      <aside className="messages-sidebar">
        <div className="messages-header">
          <h2>Messages</h2>
          <button className="new-message-btn" onClick={() => setActiveId(1)}>
            <span>✎</span> New Message
          </button>
        </div>

        {/* Search */}
        <div className="messages-search">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <div className="messages-tabs">
          <button
            className={`tab-btn ${tab === "all" ? "active" : ""}`}
            onClick={() => setTab("all")}
          >
            All
          </button>
          <button
            className={`tab-btn ${tab === "unread" ? "active" : ""}`}
            onClick={() => setTab("unread")}
          >
            Unread (1)
          </button>
          <button
            className={`tab-btn ${tab === "creators" ? "active" : ""}`}
            onClick={() => setTab("creators")}
          >
            Creators
          </button>
        </div>

        {/* List items */}
        <div className="conversations-list">
          {filteredConversations.map((c) => (
            <div
              key={c.id}
              className={`conversation-item ${activeId === c.id ? "active" : ""}`}
              onClick={() => handleSelectChat(c.id)}
            >
              <div className="avatar-wrapper">
                <img src={c.avatar} alt={c.name} className="conv-avatar" />
                {c.online && <span className="online-dot"></span>}
              </div>

              <div className="conv-details">
                <div className="conv-top">
                  <div className="conv-name-row">
                    <strong>{c.name}</strong>
                    <span className="verified-badge">●</span>
                  </div>
                  <small className="conv-time">{c.time}</small>
                </div>

                <div className="conv-role">{c.title}</div>

                <div className="conv-bottom">
                  <p className="conv-snippet">{c.lastMessage}</p>
                  {c.unread > 0 && <span className="unread-badge">{c.unread}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* 2. RIGHT CHAT WINDOW */}
      <main className="messages-main">
        {activeChat ? (
          <div className="chat-window">
            {/* Chat Header */}
            <div className="chat-header">
              <div className="chat-user-info">
                <div className="avatar-wrapper">
                  <img src={activeChat.avatar} alt={activeChat.name} className="chat-avatar" />
                  {activeChat.online && <span className="online-dot"></span>}
                </div>
                <div>
                  <h4>{activeChat.name}</h4>
                  <small>{activeChat.title} • {activeChat.online ? "Active Now" : "Offline"}</small>
                </div>
              </div>
            </div>

            {/* Chat Message Stream */}
            <div className="chat-messages">
              {activeChat.messages.map((m) => (
                <div key={m.id} className={`message-bubble-row ${m.sender}`}>
                  <div className="message-bubble">
                    <p>{m.text}</p>
                    <small className="bubble-time">{m.time}</small>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input Field */}
            <form className="chat-input-row" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Write a message to connect..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button type="submit" disabled={!inputText.trim()}>
                Send →
              </button>
            </form>
          </div>
        ) : (
          /* Empty placeholder prompt */
          <div className="chat-empty">
            <div className="empty-bubble-icon">💬</div>
            <h3>Select a conversation</h3>
            <p>
              Choose a conversation from the left or click "New Message"
              <br />
              to connect with creators.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Messages;