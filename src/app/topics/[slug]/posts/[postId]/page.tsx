import CommentCreateForm from "@/components/comments/CommentCreateForm";
import PostShow from "@/components/posts/PostShow";
import paths from "@/utils/paths";
import Link from "next/link";
import React, { Suspense } from "react";
import CommentListQuery from "@/components/comments/CommentListQuery";
import LoadingSkeleton from "@/components/posts/LoadingSkeleton";

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
      <Suspense fallback={<LoadingSkeleton />}>
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <CommentListQuery postId={postId} />
    </div>
  );
}
