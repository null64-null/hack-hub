"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import ArgumentCard from "@/app/components/atoms/ArgumentCard";
import { useAtomValue } from "jotai";
import { debateAtom, processAtom } from "@/app/atoms";
import { useDebateProcess } from "@/app/hooks";
import { argIds } from "@/app/values";

export default function ResultDisplay() {
  const { args } = useAtomValue(debateAtom);
  const process = useAtomValue(processAtom);
  const {
    initializeDebateProcess,
    initializeDebateProcessAfterError,
    cancelDebate,
  } = useDebateProcess();

  const style = (index: number) => {
    if (index === argIds.length - 1) {
      return { marginTop: 40, justifyContent: "center" };
    } else if (index % 2 === 0) {
      return { marginLeft: 40, justifyContent: "start" };
    } else {
      return { marginRight: 40, justifyContent: "end" };
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-10">
      {args.map((arg, index) => (
        <div
          style={style(index)}
          className="w-full flex"
          key={`${arg.title}${index}`}
        >
          <ArgumentCard arg={arg} />
        </div>
      ))}
      {process === "inProcess" && (
        <Button variant="outline" onClick={cancelDebate} className="w-60">
          ディベートを中止
        </Button>
      )}
      {process === "finish" && (
        <Button
          variant="outline"
          onClick={initializeDebateProcess}
          className="w-60"
        >
          ホームに戻る
        </Button>
      )}
      {(process === "error" || process === "abort") && (
        <div className="flex flex-col items-center">
          <div className="text-base font-bold text-primary">
            {process === "error" && "ディベートに失敗しました"}
            {process === "abort" && "ディベートを中止しました"}
          </div>
          <Button
            variant="outline"
            onClick={initializeDebateProcessAfterError}
            className="w-60"
          >
            もう一度ディベートを行う
          </Button>
        </div>
      )}
    </div>
  );
}
