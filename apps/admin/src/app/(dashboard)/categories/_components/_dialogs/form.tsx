import { Dropzone } from "@/components/ui/dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/field";
import { Input } from "@repo/ui/components/input";
import { Send, X } from "lucide-react";
import React, { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { useCreateCategory } from "../../_api";
import { Spinner } from "@repo/ui/components/spinner";

export const FILE_RULES = {
  imageMimeTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
  maxSize: 10 * 1024 * 1024,
};

const formSchema = z.object({
  name: z.string().min(3, "Name minimal 3 characters"),
  image: z
    .array(
      z
        .file()
        .max(FILE_RULES.maxSize, "Ukuran maksimal 10MB")
        .mime(FILE_RULES.imageMimeTypes),
    )
    .min(1, "Gambar wajib diunggah")
    .max(1, "Hanya boleh 1 file"),
});

type FormSchema = z.infer<typeof formSchema>;

export const FormDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (e: boolean) => void;
}) => {
  const idCategoryForm = useId();
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    values: {
      name: "",
      image: [],
    },
  });

  const { mutate: createCategory, isPending: isCreating } =
    useCreateCategory(form);

  const handleSubmit = (data: FormSchema) => {
    createCategory(
      {
        name: data.name,
        image: data.image[0] as File,
      },
      {
        onSuccess: () => {
          form.reset();
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className={"min-w-md"}>
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-6 w-full"
        >
          <FieldGroup className="flex flex-col gap-6 w-full">
            <Controller
              control={form.control}
              name="image"
              render={({ field, fieldState }) => (
                <Field className="gap-1" data-invalid={fieldState.invalid}>
                  <FieldLabel>Image</FieldLabel>
                  <Dropzone
                    onChange={field.onChange}
                    value={field.value}
                    error={fieldState.invalid}
                    ratio="square"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field className="gap-1" data-invalid={fieldState.invalid}>
                  <FieldLabel
                    required
                    htmlFor={`${idCategoryForm}_${field.name}`}
                  >
                    Name
                  </FieldLabel>
                  <Input
                    id={`${idCategoryForm}_${field.name}`}
                    {...field}
                    placeholder="e.g. Obat jamur"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose
              render={
                <Button type="button">
                  <X />
                  Close
                </Button>
              }
            />
            <Button type="submit">
              {isCreating ? <Spinner /> : <Send />}
              {isCreating ? "Creating..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
