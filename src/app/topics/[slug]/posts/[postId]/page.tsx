import CommentCreateForm from "@/components/comments/CommentCreateForm";
import PostShow from "@/components/posts/PostShow";
import paths from "@/utils/paths";
import Link from "next/link";
import React from "react";
import CommentList from "@/components/comments/CommentList";
import { fetchCommentsByPostId } from "@/queries/comments";

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
      <CommentCreateForm postId={postId} startOpen />
      <CommentList fetchData={() => fetchCommentsByPostId(postId)} />
    </div>
  );
}
