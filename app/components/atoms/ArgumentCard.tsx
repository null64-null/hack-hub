import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

type Props = {
  text: string;
  title: string;
};
export default function ArgumentCard({ text, title }: Props) {
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ReactMarkdown className="prose prose-sm">{text}</ReactMarkdown>
      </CardContent>
    </Card>
  );
}
