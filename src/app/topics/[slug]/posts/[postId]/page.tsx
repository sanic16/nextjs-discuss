import PostShow from "@/components/posts/PostShow";
import paths from "@/utils/paths";
import Link from "next/link";
import React from "react";

export default function PostShowPage({
  params,
}: {
  params: {
    slug: string;
    postId: string;
  };
}) {
  const { slug, postId } = params;

  return (
    <div className="space-y-3">
      <Link
        className="underline decoration-solid"
        href={paths.topicShowPath(slug)}
      >
        {"< "}Back to {slug}
      </Link>
      <PostShow postId={postId} />
    </div>
  );
}
