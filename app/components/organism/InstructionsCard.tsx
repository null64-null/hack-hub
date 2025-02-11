import { useState, ChangeEvent } from "react";
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
  const [motion, setMotion] = useState("");
  const [limit, setLimit] = useState<string>("");

  return (
    <Card>
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
              setMotion(e.target.value)
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
              setLimit(e.target.value)
            }
            placeholder="制限時間を入力してください"
          />
        </div>
        <Button className="w-full">始める</Button>
      </CardContent>
    </Card>
  );
}
