import axios from "axios";
import { useState } from "react";

export default function Response({ messages, setMessages, textAreaRef }) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!question.trim() || loading) return;

    const userQuestion = question.trim();
    setQuestion("");

    // Add user question to messages immediately
    const newMessages = [...messages, { type: "user", content: userQuestion }];
    setMessages(newMessages);

    try {
      setLoading(true);

      const res = await axios.get(
        `https://gen.pollinations.ai/text/${encodeURIComponent(userQuestion)}`,
        {
          params: {
            model: "gemini-search",
            temperature: 0.7,
          },
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_POLLINATIONS_KEY}`,
          },
        },
      );

      // Add AI response to messages
      setMessages([...newMessages, { type: "assistant", content: res.data }]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        {
          type: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      fetchData();
    }
  };

  return (
    <div className="flex flex-col gap-4 flex-1 min-h-0">
      {/* Empty State */}
      {messages.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <h2 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">
              Start a conversation
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              Ask me anything and I'll help you find answers or generate
              content.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => {
                  setQuestion("What is React?");
                  textAreaRef.current?.focus();
                }}
                className="text-xs px-3 py-1.5 rounded-md border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-secondary)]"
              >
                What is React?
              </button>
              <button
                onClick={() => {
                  setQuestion("Explain JavaScript closures");
                  textAreaRef.current?.focus();
                }}
                className="text-xs px-3 py-1.5 rounded-md border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-secondary)]"
              >
                Explain JavaScript closures
              </button>
              <button
                onClick={() => {
                  setQuestion("How does async/await work?");
                  textAreaRef.current?.focus();
                }}
                className="text-xs px-3 py-1.5 rounded-md border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-secondary)]"
              >
                How does async/await work?
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Messages Thread */}
      {messages.length > 0 && (
        <div className="flex-1 min-h-0 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-md px-3 py-2 ${
                  msg.type === "user"
                    ? "bg-[var(--accent)] text-white"
                    : "bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)]"
                }`}
              >
                <pre className="text-sm leading-relaxed whitespace-pre-wrap break-words font-sans">
                  {msg.content}
                </pre>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-[var(--bg-surface-secondary)] border border-[var(--border-subtle)] rounded-md px-3 py-2">
                <span className="text-sm text-[var(--text-secondary)]">…</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Input */}
      <div className="mt-auto">
        <div className="flex items-center gap-2 w-full bg-[var(--bg-input)] border border-[var(--border-subtle)] rounded-md px-3 py-2">
          <textarea
            ref={textAreaRef}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question or describe what you need help with."
            className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none resize-none max-h-32 min-h-[40px] leading-relaxed"
          />

          <button
            type="button"
            onClick={fetchData}
            disabled={!question.trim() || loading}
            className="h-9 px-3 rounded-md bg-[var(--accent)] text-xs font-medium text-white disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "…" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
