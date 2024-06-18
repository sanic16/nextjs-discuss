import { CommentWithAuthor, fetchCommentsByPostId } from "@/queries/comments";
import CommentShow from "./CommentShow";

interface CommentShowProps {
  fetchData: () => Promise<CommentWithAuthor[]>;
}

export default async function CommentList({ fetchData }: CommentShowProps) {
  const comments = await fetchData();

  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );

  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        comments={comments}
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
