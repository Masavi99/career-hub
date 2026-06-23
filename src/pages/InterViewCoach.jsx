import { useState, useRef, useEffect } from "react";
import { useAI } from "../hooks/useAI";

const SYSTEM_PROMPT =
  "You are an experienced interview coach conducting a mock job interview. " +
  "Ask one interview question at a time, wait for the candidate's answer, then give brief constructive " +
  "feedback before asking the next question. Keep responses concise and encouraging. " +
  "Start by asking the candidate what role they're practicing for.";

export default function InterviewCoach() {
  const { ask, loading, error } = useAI();
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your interview coach. What role are you practicing for today?" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const nextMessages = [...messages, { role: "user", content: input }];
    setMessages(nextMessages);
    setInput("");

    try {
      const reply = await ask(nextMessages, SYSTEM_PROMPT);
      setMessages([...nextMessages, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        ...nextMessages,
        { role: "assistant", content: "Sorry, something went wrong. Try again." },
      ]);
    }
  };

  return (
    <div className="interview-coach">
      <h1>Interview Coach</h1>

      <div className="chat-window">
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-bubble chat-bubble-${msg.role}`}>
              {msg.content}
            </div>
          ))}

          {loading && (
            <div className="chat-bubble chat-bubble-assistant chat-typing">Thinking…</div>
          )}

          <div ref={bottomRef} />
        </div>

        <form className="chat-input-row" onSubmit={sendMessage}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer…"
            disabled={loading}
          />
          <button type="submit" className="btn-add" disabled={loading || !input.trim()}>
            Send
          </button>
        </form>

        {error && <p className="field-error">{error}</p>}
      </div>
    </div>
  );
}
