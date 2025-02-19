import { Arg } from "@/app/types/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

type Props = {
  arg: Arg;
  width?: number;
};

export default function ArgumentCard({ arg, width }: Props) {
  return (
    <Card style={{ width: width ?? 500 }}>
      <CardHeader>
        <CardTitle>{arg.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ReactMarkdown className="prose prose-sm">{arg.content}</ReactMarkdown>
      </CardContent>
    </Card>
  );
}
