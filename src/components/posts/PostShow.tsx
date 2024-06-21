import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
const PostShow = async ({ postId }: { postId: string }) => {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      <p className="p-4 border rounded">{post.content}</p>
    </div>
  );
};

export default PostShow;
