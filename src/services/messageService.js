// src/services/messageService.js

const MSG_KEY = "gohome_messages";

const readMessages = () => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(MSG_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const writeMessages = (list) => {
  try {
    localStorage.setItem(MSG_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
};

export const getConversations = () => readMessages();

export const getConversationByPropertyId = (propertyId) => {
  const all = readMessages();
  return all.find((c) => c.propertyId === propertyId) || null;
};

/**
 * Add a message in conversation for a property.
 * If conversation for that propertyId exists, append.
 * Otherwise create new conversation.
 */
export const addMessage = (property, text) => {
  const all = readMessages();
  const now = new Date().toISOString();

  let convo = all.find((c) => c.propertyId === property.id);

  if (!convo) {
    convo = {
      id: Date.now(),
      propertyId: property.id,
      propertyTitle: property.title,
      propertyLocation: property.location,
      messages: [],
      lastUpdated: now,
    };
    all.push(convo);
  }

  convo.messages.push({
    id: Date.now(),
    text,
    from: "user",
    createdAt: now,
  });
  convo.lastUpdated = now;

  writeMessages(all);
  return convo;
};
