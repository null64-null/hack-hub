"use client";

import { Arg } from "@/app/types";
import { ChangeEvent, useState, useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { debateAtom, processAtom } from "@/app/atoms";
import { argIds } from "@/app/values";
import { useRef } from "react";

export const useDebateProcess = () => {
  const [debate, setDebate] = useAtom(debateAtom);
  const { motion, limit, args } = debate;
  const setProcess = useSetAtom(processAtom);
  const [sendable, setSendable] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const validate = () => {
    if (motion !== "" && limit > 100) {
      setSendable(true);
    } else {
      setSendable(false);
    }
  };

  const editMotion = (e: ChangeEvent<HTMLInputElement>) => {
    const newMotion = e.target.value;
    setDebate({ ...debate, motion: newMotion });
    validate();
  };

  const editLimit = (e: ChangeEvent<HTMLInputElement>) => {
    const newLimit = Number(e.target.value);
    setDebate({ ...debate, limit: newLimit });
    validate();
  };

  const setDebateByStream = (accumulatedText: string) => {
    setDebate({
      ...debate,
      args: [
        ...args.slice(0, -1),
        {
          ...args.at(-1)!,
          content: accumulatedText,
        },
      ],
    });
  };

  const runDebateProcess = async () => {
    setProcess("inProcess");
    setDebate({ ...debate, args: [] as Arg[] });
    abortControllerRef.current = new AbortController();

    try {
      for (let i = 0; i < argIds.length; i++) {
        const requestBody = {
          motion: motion,
          limit: limit,
          history: args,
        };

        const requestHeaders = {
          "Content-Type": "application/json",
        };

        const url = `${process.env.API_URL}/debate/${argIds[i].id}`;

        const response = await fetch(url, {
          method: "POST",
          headers: requestHeaders,
          body: JSON.stringify(requestBody),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok || !response.body) {
          setProcess("error");
          return;
        }

        setDebate({
          ...debate,
          args: [...args, { title: argIds[i].title, content: "" }],
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulatedText += decoder.decode(value, { stream: true });
          setDebateByStream(accumulatedText);
        }
      }

      setProcess("finish");
    } catch (e: unknown) {
      if (e instanceof DOMException && e.name === "AbortError") {
        setProcess("abort");
      } else {
        setProcess("error");
      }
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

  const cancelDebate = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  return {
    editMotion,
    editLimit,
    runDebateProcess,
    initializeDebateProcess,
    initializeDebateProcessAfterError,
    cancelDebate,
    sendable,
  };
};

export const useTimer = () => {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 100);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return { time };
};

export const useAnimationStart = () => {
  const [move, setMove] = useState<boolean>(false);

  useEffect(() => {
    setMove(true);
  }, []);

  return { move };
};
