import type { PropsWithChildren } from "react";

type AppShellProps = PropsWithChildren<{
  maxWidth?: number;
}>;

export function AppShell({ children, maxWidth = 960 }: AppShellProps) {
  return (
    <div className="min-h-screen bg-surface text-foreground">
      <main
        className="mx-auto flex w-full flex-col gap-8 px-6 py-10"
        style={{ maxWidth }}
      >
        {children}
      </main>
    </div>
  );
}
