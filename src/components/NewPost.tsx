"use client";

import { FormEvent, useRef, useState } from "react";

import { AuthUser } from "@/model/user";
import Button from "./ui/Button";
import FilesIcon from "./ui/icons/FilesIcon";
import GridSpinner from "./ui/GridSpinner";
import Image from "next/image";
import PostUserAvatar from "./PostUserAvatar";
import { form } from "sanity/structure";
import { useRouter } from "next/navigation";

type Props = {
  user: AuthUser;
};
export default function NewPost({ user: { username, image } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };
  const handleDrag = (event: React.DragEvent<HTMLLabelElement>) => {
    if (event.type === "dragenter") {
      setDragging(true);
    } else if (event.type === "dragleave") {
      setDragging(false);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragging(false);
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", textRef.current?.value ?? "");

    fetch("/api/post", { method: "POST", body: formData })
      .then((res) => {
        if (!res.ok) {
          setError("Failed to upload image");
          return;
        }
        router.push("/");
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  };
  return (
    <section className="w-full max-w-xl flex flex-col items-center mt-6">
      {loading && (
        <div className=" absolute inset-0 z-20 text-center pt-[20%] bg-sky-300/20">
          <GridSpinner />
        </div>
      )}
      {error && (
        <p className="w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-bold">
          {error}
        </p>
      )}
      <PostUserAvatar username={username} image={image ?? ""} />
      <form className="w-full flex flex-col mt-2" onSubmit={handleSubmit}>
        <input
          className="hidden"
          name="input"
          id="input-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          className={`w-full h-60 flex flex-col items-center justify-center ${!file && "border-dashed border-2 border-sky-300"}`}
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (
            <div className="absolute inset-0 z-10 bg-sky-300/20 pointer-events-none"></div>
          )}
          {!file && (
            <div className="flex flex-col items-center pointer-events-none">
              <FilesIcon />
              <p>Drag and Drop your Image here or click</p>
            </div>
          )}
          {file && (
            <div className=" relative w-full aspect-square">
              <Image
                className="object-cover"
                src={URL.createObjectURL(file)}
                alt="Uploaded Image"
                fill
                sizes="650px"
              />
            </div>
          )}
        </label>
        <textarea
          className="outline-none text-lg border border-neutral-500/20"
          name="text"
          id="input-text"
          required
          rows={10}
          placeholder="Write a caption..."
          ref={textRef}
        />
        <Button text="Publish" onClick={() => {}} />
      </form>
    </section>
  );
}
