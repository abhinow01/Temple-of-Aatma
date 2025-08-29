import { cookies } from "next/headers";
import React from "react";
import { jwtFuncs } from "@/utils";
import "../globals.css";
import LoginPage from "./components/login-form";
import { Button } from "@/components/ui/button";
import LogoutButton from "./components/logout-button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { collections } from "@/utils/constants/enums";
import Link from "next/link";
import Image from "next/image";

const Layout = async ({ children }) => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authorization")?.value;
  console.log(authToken);
  let isVerified = false;
  let decodedToken = null;

  if (authToken) {
    try {
      isVerified = jwtFuncs.verifyJWT(authToken);
    } catch (error) {
      console.error("Invalid or expired token:", error.message);
    }
  }

  if (!isVerified) {
    return <LoginPage />;
  }
  decodedToken = jwtFuncs.decodeJWT(authToken);
  const filteredCollections =
    decodedToken?.email === "admin@chronicleexhibits.com"
      ? collections
      : collections.filter((collection) => collection.slug !== "users");

  return (
    <div className="flex h-screen">
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader className="p-6">
            <Link href={"/admin"}>
              <Image
loading="eager"
                src={"/chronicle-logo-2.svg"}
                alt="Chronicle Logo"
                width={100}
                height={100}
              />
            </Link>
          </SidebarHeader>
          <SidebarContent className="px-4 justify-between">
            <SidebarMenu>
              {filteredCollections.map((collection, ind) => (
                <Link
                  key={ind}
                  className="text-primary tracking-wider text-[16px] font-semibold"
                  href={`/admin/${collection.slug}`}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <>
                        {collection.icon}

                        {collection.name}
                      </>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
              ))}
            </SidebarMenu>
            <LogoutButton />
          </SidebarContent>
        </Sidebar>
        {children}
      </SidebarProvider>
    </div>
  );
};

export default Layout;
