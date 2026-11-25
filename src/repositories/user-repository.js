import { getByIndex, getRecord, putRecord } from '../db/database.js';

export const userRepository = {
  findByUsername(username) {
    return getByIndex('users', 'username', username.trim().toLowerCase()).then(rows => rows[0] ?? null);
  },
  findById(id) {
    return getRecord('users', id);
  },
  create(user) {
    return putRecord('users', user);
  },
  async update(user) {
    return putRecord('users', user);
  }
};