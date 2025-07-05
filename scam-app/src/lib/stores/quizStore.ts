import { writable } from 'svelte/store';

export interface UserAnswer {
  questionIndex: number;
  answer: string;
}

const STORAGE_KEY = 'sacm-user-answers';

function loadFromStorage(): UserAnswer[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveToStorage(val: UserAnswer[]) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  } catch {}
}

export const userAnswersStore = writable<UserAnswer[]>(loadFromStorage());

userAnswersStore.subscribe((val) => {
  saveToStorage(val);
}); 