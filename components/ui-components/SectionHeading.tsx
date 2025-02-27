import { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  children?: ReactNode;
}

export function SectionHeading({ title, children }: SectionHeadingProps) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold tracking-tight mb-4">{title}</h2>
      {children}
    </div>
  );
}