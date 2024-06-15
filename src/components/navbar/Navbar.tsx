"use client";
import React from "react";
import useMathContext from "../../hooks/useMathContext";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { signInAction, signOutAction } from "@/actions";

export default function Nav() {
  const session = useSession().data;
  const { count } = useMathContext();

  return (
    <div>
      <div>
        <h1 className="mr-4">
          <Link href="/">Reddit Clone {count}</Link>
        </h1>
        <p className="font-bold text-inherit">ACME</p>
      </div>

      <div className="hidden sm:flex gap-4">
        {session && session.user ? (
          <>
            <div>
              <Link href="/profile">{session.user.name}</Link>
            </div>
            <div>
              <Link href="/createTopic">Crear Topic</Link>
            </div>
            <div>
              <Link href="/createPost">Crear Post</Link>
            </div>
          </>
        ) : (
          <>
            <div>
              <Link href="/posts">Últimos Posts</Link>
            </div>
            <div>
              <Link color="foreground" href="/about">
                Nosotros
              </Link>
            </div>
          </>
        )}
      </div>
      <div>
        <div>
          <form action={session && session.user ? signOutAction : signInAction}>
            <Button type="submit" color="primary" href="/" variant="flat">
              {session && session.user ? "Cerrar Sesión" : "Iniciar Sesión"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
