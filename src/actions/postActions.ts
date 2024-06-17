"use server";

import type { Post } from "@prisma/client";
import { z } from "zod";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import paths from "@/utils/paths";

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

type CreateFormState = {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
};

export async function createPostAction(
  topicId: string,
  slug: string,
  formState: CreateFormState,
  formData: FormData
): Promise<CreateFormState | never> {
  // TODO: revalidate the topic show page
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    console.error(result.error.flatten().fieldErrors);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ["You must be signed in to do this"],
      },
    };
  }

  let post: Post;

  try {
    post = await prisma.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topicId,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["An unknown error occurred"],
        },
      };
    }
  }

  revalidatePath(paths.topicShowPath(topicId));
  redirect(paths.postShowPath(slug, post.id));
}
