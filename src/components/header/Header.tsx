import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
} from "@nextui-org/react";
import React from "react";
import Link from "next/link";
import HeaderClient from "../headerClient/HeaderClient";

const Header = () => {
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href={"/"} className="font-bold">
          Discuss
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Input />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderClient />
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
