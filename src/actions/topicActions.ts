"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import type { Topic } from "@prisma/client";
import paths from "@/utils/paths";
import prisma from "@/lib/prisma";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: "Must be lowercase letters and dashes without spaces",
    }),
  description: z.string().min(10),
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopicAction(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState | never> {
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });
  if (!result.success) {
    console.error(result.error.flatten().fieldErrors);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to create a topic"],
      },
    };
  }

  let topic: Topic;
  try {
    topic = await prisma.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
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
          _form: ["Something went wrong. Please try again."],
        },
      };
    }
  }

  revalidatePath(paths.topicShowPath("/"));
  return redirect(paths.topicShowPath(topic.slug));
}
