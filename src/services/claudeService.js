const API_BASE = import.meta.env.VITE_AI_SERVER_URL || "http://localhost:5174";

export async function sendChatMessage(messages, system) {
  const res = await fetch(`${API_BASE}/api/ai/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, system }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "AI request failed");
  }

  const data = await res.json();
  return data.reply;
}