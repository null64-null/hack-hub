"use client";

import { useDebateProcess } from "@/app/hooks/useDebateProcess";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { debateAtom } from "@/app/atoms/atoms";
import { useAtomValue } from "jotai";
import { limitOptions } from "@/app/utils/values";

export default function InstructionsCard() {
  const { editMotion, editLimit, runDebateProcess, sendable, formMessage } =
    useDebateProcess();
  const { motion, limit } = useAtomValue(debateAtom);

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>ディベートの設定</CardTitle>
        <CardDescription>議題と制限文字数を設定してください</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>議題</Label>
          <Input
            type="text"
            value={motion}
            onChange={editMotion}
            placeholder="「〇〇すべき、であるべき」のような肯定系の文にしてください"
          />
          {formMessage !== "" && (
            <p className="text-red-500 text-sm">{formMessage}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>立論の制限文字数</Label>
          <div className="flex justify-around">
            {limitOptions.map((limitOption, index) => (
              <Button
                className={`transition-all border-2 rounded-lg px-4 py-2 ${
                  limitOption === limit
                    ? "border-gray-900 bg-gray-300 text-gray-900 font-bold shadow-lg hover:bg-gray-400"
                    : "border-gray-400 bg-white text-gray-700 hover:bg-gray-100"
                }`}
                key={`${limitOption}${index}`}
                onClick={() => {
                  editLimit(limitOption);
                }}
              >
                {limitOption}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
      <div className="p-6">
        <Button
          onClick={runDebateProcess}
          disabled={!sendable}
          className="w-full"
        >
          始める
        </Button>
      </div>
    </Card>
  );
}
