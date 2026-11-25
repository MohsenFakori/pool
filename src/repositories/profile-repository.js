import { getRecord, putRecord } from '../db/database.js';

export const profileRepository = {
  findByUserId(userId) {
    return getRecord('profiles', userId);
  },
  save(profile) {
    return putRecord('profiles', profile);
  }
};