export type Arg = {
  title: string;
  content: string;
};

export type Debate = {
  motion: string;
  limit: number;
  args: Arg[];
};

export type Process = "before" | "inProcess" | "finish" | "error" | "abort";
