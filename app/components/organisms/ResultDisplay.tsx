"use client";

import React from "react";
import { DebateResult } from "@/app/type/debate";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";

import ArgumentCard from "@/app/components/atoms/ArgumentCard";
import {
  setProcess,
  setResult,
  setLimit,
  setMotion,
} from "@/app/store/features/debate/debateSlice";

interface ResultDisplayProps {
  result: DebateResult;
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  const dispatch = useDispatch();

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="w-full ml-10 flex justify-start">
        <ArgumentCard title="肯定側立論" text={result.govArgument} />
      </div>
      <div className="w-full mr-10 flex justify-end">
        <ArgumentCard title="否定側立論" text={result.oppArgument} />
      </div>
      <div className="w-full ml-10 flex justify-start">
        <ArgumentCard title="肯定側反駁" text={result.govRebuttal} />
      </div>
      <div className="w-full mr-10 flex justify-end">
        <ArgumentCard title="否定側反駁" text={result.oppRebuttal} />
      </div>
      <div className="w-full ml-10 flex justify-start">
        <ArgumentCard title="肯定側まとめ" text={result.govSummary} />
      </div>
      <div className="w-full mr-10 flex justify-end">
        <ArgumentCard title="否定側まとめ" text={result.oppSummary} />
      </div>
      <div className="w-full mt-10 flex justify-center">
        <ArgumentCard title="判定" text={result.judge} />
      </div>
      <div className="w-full mt-10 flex justify-center">
        <Button
          variant="outline"
          onClick={() => {
            dispatch(setMotion(""));
            dispatch(setLimit(0));
            dispatch(setProcess("before"));
            dispatch(
              setResult({
                govArgument: "",
                oppArgument: "",
                govRebuttal: "",
                oppRebuttal: "",
                govSummary: "",
                oppSummary: "",
                judge: "",
              } as DebateResult)
            );
          }}
        >
          終了
        </Button>
      </div>
    </div>
  );
}
