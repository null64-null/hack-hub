"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useDispatch } from "react-redux";
import { setProcess } from "@/app/store/features/debate/debateSlice";

export default function Failed() {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center gap-10 ">
      <div className="text-4xl font-bold text-primary animate-in slide-in-from-top-4 duration-500">
        ディベートに失敗しました
      </div>
      <div className="animate-in slide-in-from-top-2 duration-500">
        <Button
          variant="outline"
          onClick={() => {
            dispatch(setProcess("before"));
          }}
        >
          もう一度実行する
        </Button>
      </div>
    </div>
  );
}
