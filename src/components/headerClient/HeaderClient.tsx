"use client";

import {
  NavbarItem,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import React from "react";
import { useSession } from "next-auth/react";
import * as actions from "../../actions";

const HeaderClient = () => {
  const session = useSession();
  let authContent: React.ReactNode;
  if (session.status === "loading") {
    authContent = null;
  } else if (session?.data?.user) {
    authContent = (
      <div>
        <Popover placement="left">
          <PopoverTrigger>
            <Avatar src={session.data.user.image || ""} />
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-4">
              <form action={actions.signOutAction}>
                <Button type="submit">Sign Out</Button>
              </form>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  } else {
    authContent = (
      <>
        <NavbarItem>
          <form action={actions.signInAction}>
            <Button type="submit" color="secondary" variant="bordered">
              Sign In
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form action={actions.signOutAction}>
            <Button type="submit" color="primary" variant="flat">
              Sign Up
            </Button>
          </form>
        </NavbarItem>
      </>
    );
  }
  return authContent;
};

export default HeaderClient;
