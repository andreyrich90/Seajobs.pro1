import { NEWS } from "@/lib/data";
import ArticleClient from "./ArticleClient";

export const dynamicParams = true;

export async function generateStaticParams() {
  return NEWS.map((n) => ({ id: n.slug }));
}

export default async function NewsArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ArticleClient id={id} />;
}
