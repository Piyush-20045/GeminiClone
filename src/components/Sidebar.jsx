import { assets } from "../assets/assets";

function Sidebar({ onNewChat, chatHistory, onLoadChat, currentChatId }) {
  const getChatTitle = (chat) => {
    const firstUserMessage = chat.messages.find((msg) => msg.type === "user");
    if (firstUserMessage) {
      const text = firstUserMessage.content;
      return text.length > 30 ? text.substring(0, 30) + "..." : text;
    }
    return "New chat";
  };

  return (
    <aside className="hidden md:flex w-56 h-full flex-col gap-3 bg-[var(--bg-sidebar)] border border-[var(--border-subtle)] rounded-lg p-3">
      <div className="flex items-center gap-2 mb-2">
        <img src={assets.gemini_icon} className="w-5 h-5" alt="Gemini logo" />
        <span className="text-sm font-semibold">Gemini</span>
      </div>

      <button
        onClick={onNewChat}
        className="h-9 rounded-md bg-[var(--accent)] text-xs font-medium text-white px-3"
        type="button"
      >
        New chat
      </button>

      <div className="mt-3 flex-1 overflow-y-auto">
        <p className="text-[11px] text-[var(--text-secondary)] mb-2">History</p>
        {chatHistory.length === 0 ? (
          <p className="text-xs text-[var(--text-secondary)]">No chats yet</p>
        ) : (
          <div className="space-y-1">
            {chatHistory.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onLoadChat(chat.id)}
                className={`w-full text-left px-2 py-1.5 rounded-md text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] transition-colors ${
                  currentChatId === chat.id
                    ? "bg-[var(--bg-surface)] border border-[var(--border-subtle)]"
                    : ""
                }`}
              >
                <div className="truncate font-medium mb-0.5">
                  {getChatTitle(chat)}
                </div>
                <div className="text-[10px] opacity-70">minutes ago</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
