import { atom } from "recoil";

export interface IBoard {
  id: string;
  board: string;
  date: string;
  title: string;
  userId: string;
  username: string;
  dog: string;
  youtbue?: string;
}

export const boardInfoState = atom<IBoard>({
  key: "boardInfo",
  default: {
    board: "",
    date: "",
    title: "",
    userId: "",
    username: "",
    youtbue: "",
    dog: "",
    id: "",
  },
});
