"use client";

import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMotion,
  setLimit,
  setProcess,
  setResult,
} from "@/app/store/features/debate/debateSlice";
import { RootState } from "@/app/store/store";
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

export default function InstructionsCard() {
  const dispatch = useDispatch();
  const { motion, limit } = useSelector((state: RootState) => state.debate);

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>ディベートの設定</CardTitle>
        <CardDescription>議題と制限時間を設定してください</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>議題</Label>
          <Input
            type="text"
            value={motion}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch(setMotion(e.target.value))
            }
            placeholder="「〇〇すべき、であるべき」のような肯定系の文にしてください"
          />
        </div>
        <div className="space-y-2">
          <Label>ラリーごとの制限文字数</Label>
          <Input
            type="number"
            value={limit}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch(setLimit(Number(e.target.value)))
            }
            placeholder="制限時間を入力してください"
          />
        </div>
      </CardContent>
      <div className="p-6">
        <Button
          onClick={async () => {
            dispatch(setProcess("inProgress"));
            const response = await fetch("/api/debate", {
              method: "POST",
              body: JSON.stringify({ motion, limit }),
            });
            const result = await response.json();
            console.log(result);
            dispatch(setResult(result));
            dispatch(setProcess("completed"));
          }}
          className="w-full"
        >
          始める
        </Button>
      </div>
    </Card>
  );
}
