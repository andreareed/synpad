import client from '../../client';

export const GET_NOTEBOOKS = 'GET_NOTEBOOKS';
export const POST_NOTEBOOK = 'POST_NOTEBOOK';

export const getNotebooks = () => ({
  type: GET_NOTEBOOKS,
  promise: client.get('/notebooks'),
});

export const postNotebook = values => ({
  type: POST_NOTEBOOK,
  promise: client.post('/notebooks', values),
});
