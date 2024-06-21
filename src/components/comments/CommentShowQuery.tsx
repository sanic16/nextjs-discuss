import Image from "next/image";
import CommentCreateForm from "./CommentCreateForm";
import { fetchCommentsByPostId } from "@/queries/comments";

interface CommentShowProps {
  commentId: string;
  postId: string;
}

const CommentShowQuery = async ({ commentId, postId }: CommentShowProps) => {
  const comments = await fetchCommentsByPostId(postId);
  const comment = comments.find((comment) => comment.id === commentId);

  if (!comment) {
    return null;
  }

  const children = comments.filter((comment) => comment.parentId === commentId);
  const renderedChildren = children.map((child) => {
    return (
      <CommentShowQuery key={child.id} commentId={child.id} postId={postId} />
    );
  });

  return (
    <div className="p-4 border mt-2 mb-1">
      <div className="flex gap-3">
        <Image
          src={comment.user.image || ""}
          alt="user image"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 space-y-3">
          <p className="text-sm font-medium text-gray-500">
            {comment.user.name}
          </p>
          <p className="text-gray-900">{comment.content}</p>
          <CommentCreateForm postId={comment.postId} parentId={comment.id} />
        </div>
      </div>
      <div className="pl-4">{renderedChildren}</div>
    </div>
  );
};

export default CommentShowQuery;