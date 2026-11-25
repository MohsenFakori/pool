import { deleteRecord, getRecord, putRecord } from '../db/database.js';

export const sessionRepository = {
  find(id) {
    return getRecord('sessions', id);
  },
  create(session) {
    return putRecord('sessions', session);
  },
  remove(id) {
    return deleteRecord('sessions', id);
  }
};