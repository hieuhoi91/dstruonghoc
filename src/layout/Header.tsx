import Logo from "@/components/logo";
import { ThemeSwitcher } from "@/components/theme";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="container mx-auto h-20 items-center justify-between px-4 grid grid-cols-4 ">
        <div className="col-span-1 flex items-center justify-center">
          <Logo className="w-8 h-8" />
        </div>
        <div className="flex items-center gap-4 col-span-2 justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className="font-medium">
                  <Link href="/">Trang chủ</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className="font-medium">
                  <Link href="/about">Giới thiệu</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className="font-medium">
                  <Link href="/contact">Liên hệ</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-2 col-span-1 justify-center">
          <ThemeSwitcher />
          <Button asChild variant="outline" size="sm">
            <a href="/login">Đăng nhập</a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
