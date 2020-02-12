import { get, post } from './networking';

// end point
export const endpoint = {
  getListUser: async page => get(`/users?page=${page}`),
  getUserById: async id => get(`/users/${id}`),
  login: async params => post('http://cdp-api-dev.vsan-apps.playcourt.id/api/v1/login', params)
};

export default { endpoint };
