"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { AlignJustify } from "lucide-react";
import { IsMarriedContext } from "@/app/providers";
import { useContext } from "react";

const mainNav = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "My Profile",
    href: "/profile",
  },
  {
    title: "Edit Profile",
    href: "/profile/edit",
  },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [metaColor, setMetaColor] = useState("#09090b");
  const { isMarried } = useContext(IsMarriedContext);

  const mobileNav = isMarried
    ? [
        {
          title: "My Profile",
          href: "/profile",
        },
        {
          title: "Additional Details",
          href: "/profile/details",
        },
        {
          title: "Spouse Details",
          href: "/profile/spouse",
        },
        {
          title: "Personal Preferences",
          href: "/profile/preferences",
        },
      ]
    : [
        {
          title: "My Profile",
          href: "/profile",
        },
        {
          title: "Additional Details",
          href: "/profile/details",
        },
        {
          title: "Personal Preferences",
          href: "/profile/preferences",
        },
      ];

  const onOpenChange = React.useCallback(
    (open: boolean) => {
      setOpen(open);
      setMetaColor(open ? "#09090b" : metaColor);
    },
    [setMetaColor, metaColor]
  );

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="fixed right-5 top-3 h-10 w-10 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <AlignJustify size={30} />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[100vh] p-0">
        <div className="overflow-auto p-6">
          <div className="flex flex-col space-y-3">
            {mainNav?.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                  >
                    {item.title}
                  </MobileLink>
                )
            )}
            <button
              onClick={() =>
                signOut({
                  callbackUrl: "/login",
                })
              }
              className="text-left"
            >
              Logout
            </button>
          </div>
          <div className="flex md:hidden flex-col space-y-3 mt-5 pt-5 border-t">
            {mobileNav?.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                  >
                    {item.title}
                  </MobileLink>
                )
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn("text-base", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
