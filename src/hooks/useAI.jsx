import { useState, useCallback } from "react";
import { sendChatMessage } from "../services/claudeService";

export function useAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ask = useCallback(async (messages, system) => {
    setLoading(true);
    setError(null);
    try {
      return await sendChatMessage(messages, system);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { ask, loading, error };
}