import React from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const markdownText: string = `
# Hello World

This is **Markdown** rendered in Next.js.

- Bullet list  
- **Bold text**  
- *Italic text*  
- \`Inline code\`

\`\`\`js
console.log("Code block example");
\`\`\`
`;
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <ReactMarkdown>{markdownText}</ReactMarkdown>
      </main>
    </div>
  );
}
