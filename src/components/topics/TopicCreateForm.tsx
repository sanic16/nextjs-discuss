"use client";

import * as actions from "@/actions";
import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useFormState } from "react-dom";
import FormButton from "../common/FormButton";

const TopicCreateForm = () => {
  const [formSate, action] = useFormState(actions.createTopicAction, {
    errors: {},
  });
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Topic</h3>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!!formSate.errors.name}
              errorMessage={formSate.errors.name?.join(", ")}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Describe your topic"
              isInvalid={!!formSate.errors.description}
              errorMessage={formSate.errors.description?.join(", ")}
            ></Textarea>

            {formSate.errors._form ? (
              <div className="p-2 bg-red-200 border border-red-400 rounded-2xl">
                {formSate.errors._form.join(", ")}
              </div>
            ) : null}

            <FormButton>Create Topic</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default TopicCreateForm;
