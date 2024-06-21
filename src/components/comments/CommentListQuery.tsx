import { fetchCommentsByPostId } from "@/queries/comments";
import CommentShow from "./CommentShow";
import CommentShowQuery from "./CommentShowQuery";

interface CommentShowProps {
  postId: string;
}

export default async function CommentListQuery({ postId }: CommentShowProps) {
  const comments = await fetchCommentsByPostId(postId);

  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );

  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShowQuery
        key={comment.id}
        commentId={comment.id}
        postId={postId}
      />
    );
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
