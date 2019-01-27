import client from '../../client';

export const GET_NOTEBOOK = 'GET_NOTEBOOK';

export const getNotebook = id => ({
  type: GET_NOTEBOOK,
  promise: client.get(`/notebooks/${id}`),
});
