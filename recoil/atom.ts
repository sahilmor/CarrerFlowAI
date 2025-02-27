import { atom, selector } from "recoil";

export const quizFormAtom = atom({
  key: "quizFormState",
  default: {
    name: "",
    email: "",
    currentRole: "",
    yearsExperience: "",
    educationLevel: "",
    skills: [],
    interests: [],
    careerGoals: "",
    preferredWorkEnvironment: "",
    learningStyle: "",
  },
});

export const quizFormSelector = selector({
  key: "quizFormSelector",
  get: ({ get }) => {
    return get(quizFormAtom);
  },
  set: ({ set }, newValue) => {
    set(quizFormAtom, newValue);
  },
});
