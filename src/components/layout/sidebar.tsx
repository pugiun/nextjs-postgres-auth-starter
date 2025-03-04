"use client";
import { IsMarriedContext } from "@/app/providers";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

export default function Sidebar() {
  const pathName = usePathname();
  const { isMarried } = useContext(IsMarriedContext); // Add non-null assertion
  const nav = isMarried
    ? [
        {
          href: "/profile",
          label: "Basic Details",
          routes: ["/profile", "/profile/edit"],
        },
        {
          href: "/profile/details",
          label: "Additional Details",
          routes: ["/profile/details", "/profile/details/edit"],
        },
        {
          href: "/profile/spouse",
          label: "Spouse Details",
          routes: ["/profile/spouse", "/profile/spouse/edit"],
        },
        {
          href: "/profile/preferences",
          label: "Personal Preferences",
          routes: ["/profile/preferences", "/profile/preferences/edit"],
        },
      ]
    : [
        {
          href: "/profile",
          label: "Basic Details",
          routes: ["/profile", "/profile/edit"],
        },
        {
          href: "/profile/details",
          label: "Additional Details",
          routes: ["/profile/details", "/profile/details/edit"],
        },
        {
          href: "/profile/preferences",
          label: "Personal Preferences",
          routes: ["/profile/preferences", "/profile/preferences/edit"],
        },
      ];

  console.log("pathName", pathName);
  return (
    <div className="items-start mt-20 hidden md:flex">
      <NavigationMenu orientation="vertical" className="w-full">
        <NavigationMenuList className="flex-col items-start w-[250px]">
          {nav.map((item, index) => {
            return (
              <Link
                href={item.href}
                legacyBehavior
                passHref
                key={`nav-${item.href}`}
              >
                <NavigationMenuLink
                  className={cn(
                    "w-full",
                    index === 0
                      ? item.routes.includes(pathName)
                        ? "border-y-2 font-bold"
                        : "border-y"
                      : item.routes.includes(pathName)
                        ? "border-b-2 font-bold"
                        : "border-b"
                  )}
                >
                  {item.label}
                </NavigationMenuLink>
              </Link>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
