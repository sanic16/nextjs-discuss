import PostCreateForm from "@/components/posts/PostCreateForm";
import prisma from "@/lib/prisma";
import { Divider } from "@nextui-org/react";
import React from "react";
import PostList from "@/components/posts/PostList";
import { fetchPostsByTopicSlug } from "@/queries/posts";

export default async function TopicShowPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const { slug } = params;
  const topic = await prisma.topic.findUnique({
    where: {
      slug,
    },
  });

  if (!topic) {
    return (
      <div>
        <h1>Topic Not Found</h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
      </div>
      <div className="border shadow py-3 px-2">
        <PostCreateForm topicId={topic.id} slug={topic.slug} />
        <Divider className="my-2" />
        <h3 className="text-lg font-bold">Comments</h3>
      </div>
    </div>
  );
}
