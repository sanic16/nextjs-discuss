import type { Comment } from "@prisma/client";
import prisma from "@/lib/prisma";

export type CommentWithAuthor = Comment & {
  user: {
    name: string | null;
    image: string | null;
  };
};

export function fetchCommentsByPostId(
  postId: string
): Promise<CommentWithAuthor[]> {
  return prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
}
