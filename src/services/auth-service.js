import { APP_CONFIG } from '../app/config.js';
import { createId } from '../app/utils.js';
import { userRepository } from '../repositories/user-repository.js';
import { profileRepository } from '../repositories/profile-repository.js';
import { sessionRepository } from '../repositories/session-repository.js';

const { session: SESSION_KEY, welcome: WELCOME_KEY } = APP_CONFIG.storageKeys;

async function hashPassword(password) {
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

export const authService = {
  hasSeenWelcome() {
    return localStorage.getItem(WELCOME_KEY) === 'true';
  },
  markWelcomeSeen() {
    localStorage.setItem(WELCOME_KEY, 'true');
  },
  async register(username) {
    const normalized = username.trim().toLowerCase();
    if (!normalized) throw new Error('نام کاربری را وارد کنید.');
    if (await userRepository.findByUsername(normalized)) throw new Error('این نام کاربری قبلاً ثبت شده است.');

    const userId = createId();
    const now = new Date().toISOString();
    await userRepository.create({
      id: userId,
      username: normalized,
      passwordHash: await hashPassword(APP_CONFIG.defaultPassword),
      createdAt: now,
      updatedAt: now
    });
    await profileRepository.save({
      userId,
      displayName: username.trim(),
      avatar: APP_CONFIG.avatarOptions[0],
      createdAt: now,
      updatedAt: now
    });
    return this.login(normalized, APP_CONFIG.defaultPassword);
  },
  async login(username, password) {
    const normalized = username.trim().toLowerCase();
    const user = await userRepository.findByUsername(normalized);
    if (!user || user.passwordHash !== await hashPassword(password)) {
      throw new Error('نام کاربری یا رمز عبور صحیح نیست.');
    }

    const now = new Date().toISOString();
    const session = { id: createId(), userId: user.id, createdAt: now, lastSeenAt: now };
    await sessionRepository.create(session);
    localStorage.setItem(SESSION_KEY, session.id);
    this.markWelcomeSeen();
    return { user, session };
  },
  async currentUser() {
    const sessionId = localStorage.getItem(SESSION_KEY);
    if (!sessionId) return null;
    const session = await sessionRepository.find(sessionId);
    if (!session) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    const user = await userRepository.findById(session.userId);
    if (!user) {
      await sessionRepository.remove(sessionId);
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return { user, session };
  },
  async logout() {
    const sessionId = localStorage.getItem(SESSION_KEY);
    if (sessionId) await sessionRepository.remove(sessionId);
    localStorage.removeItem(SESSION_KEY);
  },
  getProfile(userId) {
    return profileRepository.findByUserId(userId);
  },
  saveProfile(profile) {
    return profileRepository.save({ ...profile, updatedAt: new Date().toISOString() });
  }
};