import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

type Props = {
  text: string;
  title: string;
  width?: number;
};
export default function ArgumentCard({ text, title, width }: Props) {
  return (
    <Card style={{ width: width ?? 500 }}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ReactMarkdown className="prose prose-sm">{text}</ReactMarkdown>
      </CardContent>
    </Card>
  );
}
