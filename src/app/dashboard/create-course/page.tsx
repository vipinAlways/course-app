"use client";
import React, { useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { data } from "../curr.json";
import Dropzone, { type FileRejection } from "react-dropzone";
import { toast } from "sonner";
import { MousePointerSquareDashed } from "lucide-react";
import Image from "next/image";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
// import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

const Page = () => {
  const [thumbnail, setThumbnail] = useState<File[]>();
  const [dragLoader, setDragLoader] = useState<boolean>(false);

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;
    setDragLoader(false);

    toast(`${file?.file.type} type is not supported`);
  };

  const onDropAccepted = (acceptedFiles: File[]) => {
    console.log("📁 Files accepted:", acceptedFiles);
    setDragLoader(false);
    setThumbnail([acceptedFiles[0]!]);
    console.log({ thumbnail });
    if (acceptedFiles.length === 0) {
      toast("No file selected");
      return;
    }
  };

  const editor = useCreateBlockNote();
  return (
    <div>
      <form className="flex flex-col gap-2">
        <div>
          <Label className="text-xl " htmlFor="title">title</Label>
          <Input name="title" placeholder="Enter the course title" />
        </div>
        <div>
          <Label className="text-xl " htmlFor="descreption">descreption</Label>
          <Input name="descreption" placeholder="Enter the course title" />
        </div>
        <div className="space-y-3">
          <Label className="text-xl " htmlFor="descreption">Price</Label>
          <div className="flex items-center gap-3">
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select a Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Currency Label</SelectLabel>
                  {data.map((item) => (
                    <SelectItem value={item.name} key={item.code}>
                      <span>{item.code}</span> | <span>{item.symbol}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              name="descreption"
              placeholder="Enter the course title"
              type="number"
            />
          </div>
        </div>
        <div className="space-y-3 py-2">
          <Label className="text-xl " htmlFor="descreption">Thumbnail</Label>
          <Dropzone
            onDropRejected={onDropRejected}
            onDropAccepted={onDropAccepted}
            accept={{
              "image/png": [".png"],
              "image/jpeg": [".jpeg", ".jpg"],
            }}
            onDragEnter={() => setDragLoader(true)}
            onDragLeave={() => setDragLoader(false)}
            
          >
            {({ getRootProps, getInputProps }) => (
              <div
                className="flex h-40 rounded-lg w-full flex-1 flex-col items-center justify-center border"
                {...getRootProps()}
              >
                <Input
                  {...getInputProps()}
                  className="min-h-10 w-full border"
                  name="descreption"
                />

                {thumbnail && (
                  <Image
                    src={thumbnail && URL.createObjectURL(thumbnail[0]!)}
                    alt="ds"
                    height={300}
                    width={300}
                  />
                )}
              </div>
            )}
          </Dropzone>
        </div>
      </form>
      <BlockNoteView editor={editor} />;
    </div>
  );
};

export default Page;
