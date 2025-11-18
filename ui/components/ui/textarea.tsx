import * as React from "react";

import { cn } from "@/lib/utils";

type TextAreaProps = React.ComponentProps<"textarea"> & {
  ref?: React.Ref<HTMLTextAreaElement>;
};

const TextArea = ({ className, ref, ...props }: TextAreaProps) => {
  return (
    <textarea
      className={cn(
        "flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
};
TextArea.displayName = "TextArea";

export { TextArea };
