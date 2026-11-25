import { APP_CONFIG } from '../app/config.js';

const STORES = {
  users: { keyPath: 'id', indexes: [['username', 'username', { unique: true }]] },
  profiles: { keyPath: 'userId' },
  sessions: { keyPath: 'id', indexes: [['userId', 'userId'], ['createdAt', 'createdAt']] },
  accounts: { keyPath: 'id', indexes: [['userId', 'userId']] },
  transactions: { keyPath: 'id', indexes: [['userId', 'userId'], ['accountId', 'accountId'], ['date', 'date']] },
  categories: { keyPath: 'id', indexes: [['userId', 'userId']] },
  budgets: { keyPath: 'id', indexes: [['userId', 'userId']] },
  goals: { keyPath: 'id', indexes: [['userId', 'userId']] },
  settings: { keyPath: 'userId' }
};

let databasePromise;

export function openDatabase() {
  if (databasePromise) return databasePromise;

  databasePromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(APP_CONFIG.database.name, APP_CONFIG.database.version);

    request.onupgradeneeded = event => {
      const db = event.target.result;
      for (const [name, definition] of Object.entries(STORES)) {
        const store = db.objectStoreNames.contains(name)
          ? event.target.transaction.objectStore(name)
          : db.createObjectStore(name, { keyPath: definition.keyPath });

        for (const [indexName, keyPath, options = {}] of definition.indexes ?? []) {
          if (!store.indexNames.contains(indexName)) store.createIndex(indexName, keyPath, options);
        }
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  return databasePromise;
}

export async function runTransaction(storeName, mode, operation) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, mode);
    const store = transaction.objectStore(storeName);
    let result;
    try {
      result = operation(store);
    } catch (error) {
      reject(error);
      return;
    }
    transaction.oncomplete = () => resolve(result?.result ?? result);
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}

export async function getRecord(storeName, key) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const request = db.transaction(storeName, 'readonly').objectStore(storeName).get(key);
    request.onsuccess = () => resolve(request.result ?? null);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllRecords(storeName) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const request = db.transaction(storeName, 'readonly').objectStore(storeName).getAll();
    request.onsuccess = () => resolve(request.result ?? []);
    request.onerror = () => reject(request.error);
  });
}

export async function putRecord(storeName, value) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const request = db.transaction(storeName, 'readwrite').objectStore(storeName).put(value);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function deleteRecord(storeName, key) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const request = db.transaction(storeName, 'readwrite').objectStore(storeName).delete(key);
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject(request.error);
  });
}

export async function getByIndex(storeName, indexName, value) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const request = db.transaction(storeName, 'readonly').objectStore(storeName).index(indexName).getAll(value);
    request.onsuccess = () => resolve(request.result ?? []);
    request.onerror = () => reject(request.error);
  });
}