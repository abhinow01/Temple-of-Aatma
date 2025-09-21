"use client";
import React, { useEffect, useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateData } from "@/server/actions/blogs";
import { deleteUTFiles } from "@/server/services/delete-ut";
import CkEditor from "@/components/CkEditor";
import { UploadButton } from "@/utils/uploadthing";

const EditBlog = ({ singleBlog }) => {
  const [blog, setBlog] = useState(singleBlog || {});
  const router = useRouter();

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const resp = await updateData(blog._id, {
      title: blog.title,
      slug: blog.slug,
      image: blog.image,
      image_alt_text: blog.image_alt_text,
      body: blog.body,
      meta_title: blog.meta_title,
      meta_description: blog.meta_description,
      meta_keywords: blog.meta_keywords ?? [],
      blog_count: blog.blog_count,
      isDraft: blog.isDraft,
    });

    if (!resp.success) {
        console.log("error in updating blog", resp.err);
      toast.error(resp.err);
      return;
    }

    toast.success("Blog updated successfully");
    router.push("/admin/blogs");
  };

  return (
    <div className="flex pl-[250px] flex-col items-center justify-start min-h-screen bg-gray-200 overflow-auto p-8 gap-y-6 w-full">
    <form
      onSubmit={handleEditSubmit}
      className="w-full flex flex-col justify-around gap-y-10 bg-white  p-6 "
    >
      <div className="bg-white rounded-lg shadow-lg p-6 ">
        <div className="flex items-center justify-center gap-4 mb-6 ">
          <hr className="flex-1 border-gray-300" />
          <div className="text-2xl font-bold text-black text-center">
            Edit page data
          </div>
          <hr className="flex-1 border-gray-300" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Title */}
        <div>
          <label className="mb-2 block text-black font-medium">Title</label>
          <input
            className="w-full border rounded px-3 py-2 text-black "
            value={blog.title || ""}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="mb-2 block text-black font-medium">Slug</label>
          <input
            className="w-full border rounded px-3 py-2 text-black "
            value={blog.slug || ""}
            onChange={(e) => setBlog({ ...blog, slug: e.target.value })}
            required
            title="No spaces, only lowercase letters and dashes"
          />
        </div>

        {/* Icon Upload */}
        <div>
          <label className="mb-2 block text-black font-medium ">Icon</label>
          <UploadButton
            endpoint="imageUploader"
            appearance={{
              button:
                "bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-black border transition-colors",
              allowedContent: "text-xs text-gray-500 mt-1",
            }}
            onClientUploadComplete={(res) => {
              if (!res || res.length === 0) {
                toast.error("Upload failed: No response");
                return;
              }

              const uploadedFile = res[0];
              const url = uploadedFile.url;

              setBlog((prev) => ({
                ...prev,
                image: url,
              }));

              toast.success("Icon uploaded successfully");
            }}
            onUploadError={(error) => {
              toast.error(`Upload failed: ${error.message}`);
            }}
            onUploadBegin={() => {
              toast.loading("Uploading image...", { id: "upload-toast" });
            }}
          />
          {blog.image && (
            <div className="relative w-max mt-2">
              <button
                type="button"
                onClick={() => {
                  deleteUTFiles([blog.image.split("f/")[1]]);
                  setBlog({ ...blog, image: null });
                }}
                className="absolute top-0 -right-8 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
              >
                <Trash2 className="h-3 w-3" />
              </button>
              <img
                src={blog.image}
                alt="Event Icon"
                className="w-16 h-16 rounded"
              />
            </div>
          )}
        </div>

        {/* Image Alt Text */}
        <div>
          <label className="mb-2 block font-medium text-black ">Icon Alt Text</label>
          <input
            className="w-full border rounded px-3 py-2 text-black "
            value={blog.image_alt_text || ""}
            onChange={(e) =>
              setBlog({
                ...blog,
                image_alt_text: e.target.value,
              })
            }
            required
          />
        </div>

        {/* Blog Count */}
        <div>
          <label className="mb-2 block font-medium text-black ">Blog Count</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2 text-black "
            value={blog.blog_count || 0}
            onChange={(e) =>
              setBlog({
                ...blog,
                blog_count: Number(e.target.value),
              })
            }
            min="0"
            step="1"
            required
          />
        </div>

        {/* Blog Status */}
        <div>
          <label className="mb-2 block font-medium text-black ">Blog Status</label>
          <select
            className="w-full border rounded px-3 py-2 text-black "
            value={String(blog.isDraft)}
            onChange={(e) =>
              setBlog({ ...blog, isDraft: e.target.value === "true" })
            }
          >
            <option value="">Select Status</option>
            <option value="true">Draft</option>
            <option value="false">Publish</option>
          </select>
        </div>

        {/* Body */}
        <div className="col-span-2">
          <label className="mb-2 block font-medium text-black ">Body</label>
          <CkEditor
            value={blog.body || ""}
            onChange={(value) => setBlog({ ...blog, body: value })}
          />
        </div>
      </div>

      {/* SEO Section */}
      <div className="bg-white rounded shadow p-6">
        <div className="flex items-center justify-center gap-4 mb-6">
          <hr className="flex-1 border-gray-300" />
          <h2 className="text-2xl font-bold text-cente text-black ">Add SEO Data</h2>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="mb-2 block font-medium text-black ">Meta Title</label>
            <input
              className="w-full border rounded px-3 py-2 text-black "
              value={blog.meta_title || ""}
              onChange={(e) => setBlog({ ...blog, meta_title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-black ">Meta Description</label>
            <input
              className="w-full border rounded px-3 py-2 text-black "
              value={blog.meta_description || ""}
              onChange={(e) =>
                setBlog({
                  ...blog,
                  meta_description: e.target.value,
                })
              }
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-black not-first:">Meta Keywords</label>
            <TagsInput
              value={blog.meta_keywords ?? []}
              onChange={(e) => setBlog({ ...blog, meta_keywords: e })}
              style={{ color: "black" }}
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-end justify-end mb-4 gap-x-4  ">
        <button
          type="submit"
          className="border bg-black text-white font-semibold px-6 py-3 rounded hover:bg-gray-800 transition"
        >
          Edit Blog
        </button>
      </div>
    </form>
    </div>
  );
};

export default EditBlog;
