import api from "./axios";

export const createChatSession = (title) => {
  return api.post("/chat/session", {
    title,
  });
};

export const getChatSessions = () => {
  return api.get("/chat/sessions");
};

export const getChatMessages = (id) => {
  return api.get(`/chat/session/${id}`);
};

export const sendMessage = (id, message) => {
  return api.post(`/chat/session/${id}/message`, {
    message,
  });
};