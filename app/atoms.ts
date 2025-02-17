import { atom } from "jotai";
import { Debate, Arg, Process } from "@/app/types";

export const debateAtom = atom<Debate>({
  motion: "",
  limit: 300,
  args: [] as Arg[],
});

export const processAtom = atom<Process>("before");

export const abortController = atom<AbortController | null>(null);
