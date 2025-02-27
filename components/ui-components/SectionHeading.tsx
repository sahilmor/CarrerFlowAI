
import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  children?: ReactNode;
}

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "center",
  children,
}: SectionHeadingProps) => {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <div className={`max-w-3xl mb-12 ${alignmentClasses[align]}`}>
      {eyebrow && (
        <div className="inline-block px-3 py-1 mb-4 text-xs font-medium text-primary bg-primary/10 rounded-full">
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4 text-balance">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      )}
      {children}
    </div>
  );
};
