import client from '../../client';

export const GET_NOTEBOOKS = 'GET_NOTEBOOKS';

export const getNotebooks = () => ({
  type: GET_NOTEBOOKS,
  promise: client.get('/notebooks'),
});
