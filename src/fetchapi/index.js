import { request } from './localApi';

// No backend: `http` keeps the same interface the Vuex stores expect
// (axios-like get/post/delete returning a Promise of { data }), but routes
// every call to the local reimplementation in ./localApi.
export const http = {
  get(url) {
    return request('GET', url);
  },
  post(url, body) {
    return request('POST', url, body);
  },
  delete(url) {
    return request('DELETE', url);
  },
};

export const status = {
  start: 'START',
  load: 'LOAD',
  success: 'SUCCESS',
  fail: 'FAIL',
  initial: 'INITIAL',
  error: 'ERROR',
};
