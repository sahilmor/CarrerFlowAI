'use client';

import { atom } from 'jotai';

export const quizFormAtom = atom({
    name: "",
    email: "",
    currentRole: "",
    yearsExperience: "",
    educationLevel: "",
    skills: [] as string[],
});
export const quizFormSelector = atom(
  (get) => get(quizFormAtom),  
  (get, set, newValue) => set(quizFormAtom, newValue as any)  
);

export const roadmapDataAtom = atom([] as any);