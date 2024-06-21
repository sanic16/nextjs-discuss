"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import paths from "@/utils/paths";

const createCommentSchema = z.object({
  content: z.string().min(3),
});

type CreateCommentFormState = {
  errors: {
    content?: string[];
    _form?: string[];
  };
  success?: boolean;
};

export async function createCommentAction(
  {
    postId,
    parentId,
  }: {
    postId: string;
    parentId?: string;
  },
  formState: CreateCommentFormState,
  formDate: FormData
): Promise<CreateCommentFormState | never> {
  // TODO: revalidate the post show page
  const result = createCommentSchema.safeParse({
    content: formDate.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ["You must sign in to do this."],
      },
    };
  }

  try {
    await prisma.comment.create({
      data: {
        content: result.data.content,
        postId: postId,
        parentId: parentId,
        userId: session.user.id,
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
          _form: ["Something went wrong..."],
        },
      };
    }
  }

  const topic = await prisma.topic.findFirst({
    where: {
      posts: {
        some: {
          id: postId,
        },
      },
    },
  });

  if (!topic) {
    return {
      errors: {
        _form: ["Failed to revalidate topic"],
      },
    };
  }

  revalidatePath(paths.homePath());
  revalidatePath(paths.postShowPath(topic.slug, postId));
  return {
    errors: {},
    success: true,
  };
}
