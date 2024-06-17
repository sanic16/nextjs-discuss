import type { Post } from "@prisma/client";
import prisma from "@/lib/prisma";

export type PostWithData = Post & {
  topic: { slug: string };
  _count: { comments: number };
  user: { name: string | null };
};

// export type PostWithData = Awaited<
//   ReturnType<typeof fetchPostsByTopicSlug>
// >[number];

export function fetchPostsByTopicSlug(slug: string): Promise<PostWithData[]> {
  return prisma.post.findMany({
    where: {
      topic: {
        slug: slug,
      },
    },
    include: {
      topic: {
        select: {
          slug: true,
        },
      },
      user: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });
}
