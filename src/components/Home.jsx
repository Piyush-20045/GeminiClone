import { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import Response from "./Response";
import { useTheme } from "../theme/ThemeContext.jsx";

const STORAGE_KEY = "gemini-clone-chats";

function Home() {
  const [messages, setMessages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const textAreaRef = useRef(null);
  const { theme, toggleTheme } = useTheme();

  // Load chat history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setChatHistory(parsed);
      } catch (err) {
        console.error("Failed to load chat history:", err);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length === 0) return;

    const stored = localStorage.getItem(STORAGE_KEY);
    let history = stored ? JSON.parse(stored) : [];

    if (currentChatId) {
      // Update existing chat
      const index = history.findIndex((chat) => chat.id === currentChatId);
      if (index !== -1) {
        history[index] = { id: currentChatId, messages, updatedAt: Date.now() };
      }
    } else {
      // Create new chat
      const newChatId = Date.now().toString();
      setCurrentChatId(newChatId);
      history.unshift({
        id: newChatId,
        messages,
        updatedAt: Date.now(),
      });
    }

    // Keep only last 20 chats
    history = history.slice(0, 20);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    setChatHistory(history);
  }, [messages, currentChatId]);

  const handleNewChat = () => {
    setMessages([]);
    setCurrentChatId(null);
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  const handleLoadChat = (chatId) => {
    const chat = chatHistory.find((c) => c.id === chatId);
    if (chat) {
      setMessages(chat.messages);
      setCurrentChatId(chatId);
      if (textAreaRef.current) {
        textAreaRef.current.focus();
      }
    }
  };

  const isLight = theme === "light";

  return (
    <div className="flex gap-4 h-[calc(100vh-3rem)]">
      <Sidebar
        onNewChat={handleNewChat}
        chatHistory={chatHistory}
        onLoadChat={handleLoadChat}
        currentChatId={currentChatId}
      />

      <main className="flex flex-col flex-1 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg p-4 md:p-5">
        <header className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-base md:text-lg font-semibold">Gemini</h1>
            <p className="text-xs text-[var(--text-secondary)]">
              Simple chat interface like Gemini.
            </p>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="text-xs px-3 py-1.5 rounded-md border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-secondary)] cursor-pointer"
          >
            <span className="mr-1" aria-hidden="true">
              {isLight ? "🌙" : "☀"}
            </span>
            <span>{isLight ? "Dark mode" : "Light mode"}</span>
          </button>
        </header>

        <div className="flex-1 min-h-0 flex flex-col border-t border-[var(--border-subtle)] pt-4 mt-2">
          <Response
            messages={messages}
            setMessages={setMessages}
            textAreaRef={textAreaRef}
          />
          <p className="text-[10px] text-center mt-4 text-[var(--text-secondary)]">
            Gemini responses can be incorrect. Check important information
            before using it.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Home;
