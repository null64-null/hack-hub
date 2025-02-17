"use client";

import React from "react";

export default function DebatingSign() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 animate-in slide-in-from-top-4 duration-500">
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="text-4xl font-bold text-primary animate-pulse">
          LLMが ディベートをしています...
        </div>
        <div className="text-base font-light text-primary animate-pulse">
          処理には３０秒から１分ほどかかります
        </div>
      </div>
      <div className="flex gap-2">
        <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-3 h-3 bg-primary rounded-full animate-bounce" />
      </div>
    </div>
  );
}
