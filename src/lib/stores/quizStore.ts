import { writable } from 'svelte/store';

interface UserAnswer {
  questionIndex: number;
  answer: string;
}

export const userAnswersStore = writable<UserAnswer[]>([]); 