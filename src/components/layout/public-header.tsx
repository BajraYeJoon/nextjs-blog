"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggle";

export function PublicHeader() {
  return (
    <header className="main-header sticky top-0 mb-8 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="flex justify-between items-center h-16">
        <div className="logo-container flex-shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                B
              </span>
            </div>
            <span className="font-bold text-lg text-foreground">Blog</span>
          </Link>
        </div>

        <div className="right-content flex items-center gap-3">
          <ModeToggle />
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
