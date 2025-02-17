"use client";

import { useDebateProcess } from "@/app/hooks";
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
import { debateAtom } from "@/app/atoms";
import { useAtomValue } from "jotai";

export default function InstructionsCard() {
  const { editMotion, editLimit, runDebateProcess, sendable } =
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
        </div>
        <div className="space-y-2">
          <Label>ラリーごとの制限文字数</Label>
          <Input
            type="number"
            value={limit}
            onChange={editLimit}
            placeholder="制限時間を入力してください"
          />
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
