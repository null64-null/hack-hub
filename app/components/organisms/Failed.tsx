"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useSetAtom } from "jotai";
import { processAtom } from "@/app/atoms";

export default function Failed() {
  const setProcess = useSetAtom(processAtom);

  return (
    <div className="flex flex-col items-center justify-center gap-10 ">
      <div className="text-4xl font-bold text-primary animate-in slide-in-from-top-4 duration-500">
        ディベートに失敗しました
      </div>
      <div className="animate-in slide-in-from-top-2 duration-500">
        <Button
          variant="outline"
          onClick={() => {
            setProcess("before");
          }}
        >
          もう一度実行する
        </Button>
      </div>
    </div>
  );
}
