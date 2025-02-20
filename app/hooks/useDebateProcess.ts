"use client";

import { ApiError, Arg, getErrorMessage } from "@/app/types/types";
import { ChangeEvent, useState, useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { debateAtom, processAtom } from "@/app/atoms/atoms";
import { argIds } from "@/app/utils/values";

export const useDebateProcess = () => {
  const [debate, setDebate] = useAtom(debateAtom);
  const { motion, limit } = debate;
  const [sendable, setSendable] = useState<boolean>(false);
  const [formMessage, setFormMessage] = useState<string>("");
  const setProcess = useSetAtom(processAtom);

  useEffect(() => {
    validate(motion);
  }, []);

  const manageValidationMessage = (motion: string) => {
    if (motion.length === 0) {
      setFormMessage("議題を入力してください");
    } else if (motion.length > 100) {
      setFormMessage("100文字未満で入力してください");
    } else {
      setFormMessage("");
    }
  };

  const validate = (motion: string) => {
    if (motion.length > 0 && motion.length <= 100) {
      setSendable(true);
    } else {
      setSendable(false);
    }
  };

  const editMotion = (e: ChangeEvent<HTMLInputElement>) => {
    const newMotion = e.target.value;
    setDebate({ ...debate, motion: newMotion });
    validate(newMotion);
    manageValidationMessage(newMotion);
  };

  const editLimit = (newLimit: number) => {
    setDebate({ ...debate, limit: newLimit });
  };

  const runDebateProcess = async () => {
    setProcess("inProcess");
    setDebate({ ...debate, args: [] as Arg[] });

    let newArgs: Arg[] = [] as Arg[];

    try {
      for (let i = 0; i < argIds.length; i++) {
        const requestBody = {
          motion: motion,
          limit: limit,
          args: newArgs,
        };

        const requestHeaders = {
          "Content-Type": "application/json",
        };

        const url = `${process.env.NEXT_PUBLIC_API_URL}/debate/${argIds[i].id}`;

        const response = await fetch(url, {
          method: "POST",
          headers: requestHeaders,
          body: JSON.stringify(requestBody),
        });

        if (!response.ok || !response.body) {
          setProcess("error");
          const message = await getErrorMessage(response, argIds[i].id);
          console.log(message);
          return;
        }

        newArgs = [...newArgs, { title: argIds[i].title, content: "" }];
        setDebate({ ...debate, args: newArgs });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulatedText += decoder.decode(value, { stream: true });
          newArgs = [
            ...newArgs.slice(0, -1),
            {
              ...newArgs.at(-1)!,
              content: accumulatedText,
            },
          ];
          setDebate({ ...debate, args: newArgs });
        }
      }

      setProcess("finish");
    } catch (e: unknown) {
      setProcess("error");
      const message: ApiError = {
        message: `unknown error occured: ${e}`,
        status: 500,
      };
      console.log(message);
    }
  };

  const initializeDebateProcess = () => {
    setDebate({ motion: "", limit: 300, args: [] as Arg[] });
    setProcess("before");
  };

  const initializeDebateProcessAfterError = () => {
    setDebate({ ...debate, args: [] as Arg[] });
    setProcess("before");
  };

  return {
    editMotion,
    editLimit,
    runDebateProcess,
    initializeDebateProcess,
    initializeDebateProcessAfterError,
    sendable,
    formMessage,
  };
};
