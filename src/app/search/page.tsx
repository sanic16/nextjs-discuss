import { redirect } from "next/navigation";
import PostList from "@/components/posts/PostList";
import { fetchPostsByQuerySearch } from "@/queries/posts";

export default function SearchPage({
  searchParams,
}: {
  searchParams: {
    term: string;
  };
}) {
  const { term } = searchParams;
  if (!term) redirect("/");
  return (
    <div>
      <PostList fetchData={() => fetchPostsByQuerySearch(term)} />
    </div>
  );
}
