import api from "./axios";

export const getDocuments = () => {
  return api.get("/documents");
};

export const uploadDocument = (formData) => {
  return api.post("/documents", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteDocument = (id) => {
  return api.delete(`/documents/${id}`);
};

export const getDocument = (id) => {
  return api.get(`/documents/${id}`);
};