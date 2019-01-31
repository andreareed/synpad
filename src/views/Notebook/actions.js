import client from '../../client';

export const GET_NOTEBOOK = 'GET_NOTEBOOK';
export const POST_NOTE = 'POST_NOTE';

export const getNotebook = id => ({
  type: GET_NOTEBOOK,
  promise: client.get(`/notebooks/${id}`),
});

export const postNote = notebookId => ({
  type: POST_NOTE,
  promise: client.post(`/notebooks/${notebookId}/note`),
  notebookId,
});