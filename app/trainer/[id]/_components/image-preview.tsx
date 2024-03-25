import { X } from "lucide-react";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import AppBar from "@/components/common/app-bar";
import Button from "@/components/common/button";
import { cn } from "@/lib/utils/tailwind.utils";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export default function ImagePreview({
  className,
  ...props
}: ImageProps): JSX.Element {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <img
          aria-label="preview"
          className={cn("rounded-lg", className)}
          {...props}
        />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-neutral-950 opacity-50 fixed w-full h-full left-0 top-0" />
        <Dialog.Content className="w-full h-full max-w-md bg-white top-0 fixed left-1/2 -translate-x-1/2 flex flex-col z-20">
          <AppBar sticky>
            <Dialog.Close asChild>
              <Button size="icon" variant="ghost">
                <X />
              </Button>
            </Dialog.Close>
            <AppBar.Title>이미지 미리보기</AppBar.Title>
          </AppBar>
          <Dialog.Description className="sr-only" hidden>
            이미지를 미리보기합니다.
          </Dialog.Description>

          <div className="flex-auto p-4">
            <img
              aria-label="preview"
              className="rounded-lg w-full aspect-square"
              {...props}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
