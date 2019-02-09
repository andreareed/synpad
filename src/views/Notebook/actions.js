import client from '../../client';

export const GET_NOTEBOOK = 'GET_NOTEBOOK';
export const POST_NOTE = 'POST_NOTE';
export const PATCH_NOTE = 'PATCH_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const DELETE_NOTEBOOK = 'DELETE_NOTEBOOK';
export const PATCH_NOTEBOOK = 'PATCH_NOTEBOOK';

export const getNotebook = id => ({
  type: GET_NOTEBOOK,
  promise: client.get(`/notebooks/${id}`),
});

export const postNote = notebookId => ({
  type: POST_NOTE,
  promise: client.post(`/notebooks/${notebookId}/note`),
  notebookId,
});

export const patchNote = (noteId, payload) => ({
  type: PATCH_NOTE,
  promise: client.patch(`/notebooks/${payload.notebook_id}/notes/${noteId}`, payload),
  noteId,
  payload,
});

export const deleteNote = (noteId, notebookId) => ({
  type: DELETE_NOTE,
  promise: client.delete(`/notebooks/${notebookId}/notes/${noteId}`),
  noteId,
});

export const deleteNotebook = notebookId => ({
  type: DELETE_NOTEBOOK,
  promise: client.delete(`/notebooks/${notebookId}`),
  notebookId,
});

export const patchNotebook = (notebookId, payload) => ({
  type: PATCH_NOTEBOOK,
  promise: client.patch(`/notebooks/${notebookId}`, payload),
  notebookId,
});
