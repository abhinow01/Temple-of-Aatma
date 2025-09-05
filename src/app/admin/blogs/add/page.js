"use client";
import React, { useEffect, useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addData } from "@/server/actions/blogs";
import { deleteUTFiles } from "@/server/services/delete-ut";
import CkEditor from "@/components/CKeditor";
import { UploadButton } from "@/utils/uploadthing";
import { UploadCloud } from "lucide-react";
import { color } from "framer-motion";
const AddBlogPage = () => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [singleBlog, setSingleBlog] = useState({
    title: "",
    image: "",
    slug: "",
    image_alt_text: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: [],
    body: "",
    blog_count: "",
    isDraft: "",
  });

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await addData(singleBlog);
      if (!resp.success) {
        toast.error(resp.error);
        return;
      }
      toast.success("Blog added successfully");
      setSingleBlog({
        title: "",
        image: "",
        slug: "",
        image_alt_text: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: [],
        body: "",
        blog_count: "",
        isDraft: "false",
      });
      router.push("/admin/blogs");
    } catch (error) {
      console.error("error==", error);
      toast.error("Failed to add blog");
    }
  };

  useEffect(() => {
    setSingleBlog({
      ...singleBlog,
    });
  }, []);

  return (
    <div className="flex pl-[250px] flex-col items-center justify-start min-h-screen bg-gray-200 overflow-auto p-8 gap-y-6 w-full">
      <form
        onSubmit={handleAddSubmit}
        className="w-full flex flex-col justify-around gap-y-10"
      >
        {/* General Blog Data */}
        <div className="bg-white rounded shadow p-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <hr className="flex-1 border-gray-300" />
            <h2 className="text-2xl font-bold text-black  text-center">Add Page Data</h2>
            <hr className="flex-1 border-gray-300" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="mb-2 block text-black font-medium">Title</label>
              <input
                className="w-full border rounded px-3 py-2 text-black "
                value={singleBlog.title}
                onChange={(e) =>
                  setSingleBlog({ ...singleBlog, title: e.target.value })
                }
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label className="mb-2 block text-black font-medium">Slug</label>
              <input
                className="w-full border rounded px-3 py-2 text-black"
                value={singleBlog.slug}
                onChange={(e) =>
                  setSingleBlog({ ...singleBlog, slug: e.target.value })
                }
                required
                title="No spaces, only lowercase letters and dashes"
              />
            </div>

            {/* Icon Upload */}
            <div>
              <label className="mb-2 block text-black font-medium">Icon</label>
<UploadButton
    endpoint="imageUploader"
    appearance={{
      button: "bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-black border transition-colors",
      allowedContent: "text-xs text-gray-500 mt-1",
    }}
    onClientUploadComplete={(res) => {
      console.log("Upload response:", res);
      
      if (!res || res.length === 0) {
        console.log("No response from upload");
        toast.error("Upload failed: No response");
        return;
      }

      const uploadedFile = res[0];
      const url = uploadedFile.url; // Use .url instead of .ufsUrl
      
      setSingleBlog((prev) => ({
        ...prev,
        image: url,
      }));
      
      toast.success("Icon uploaded successfully");
      console.log("Upload complete:", url);
    }}
    onUploadError={(error) => {
      console.error("Upload error:", error);
      toast.error(`Upload failed: ${error.message}`);
    }}
    onUploadBegin={(name) => {
      console.log("Upload beginning for:", name);
      toast.loading("Uploading image...", { id: "upload-toast" });
    }}
    onUploadProgress={(progress) => {
      console.log("Upload progress:", progress);
    }}
  />
             {singleBlog.image && (
                <div className="relative w-max mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      deleteUTFiles([singleBlog.image.split("f/")[1]]);
                      setSingleBlog({ ...singleBlog, image: null });
                    }}
                    className="absolute top-0 -right-8 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                  <img
                    src={singleBlog.image}
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
                className="w-full border rounded px-3 py-2 text-black"
                value={singleBlog.image_alt_text}
                onChange={(e) =>
                  setSingleBlog({
                    ...singleBlog,
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
                className="w-full border rounded px-3 py-2 text-black"
                value={singleBlog.blog_count}
                onChange={(e) =>
                  setSingleBlog({
                    ...singleBlog,
                    blog_count: e.target.value,
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
                value={singleBlog.isDraft}
                onChange={(e) =>
                  setSingleBlog({ ...singleBlog, isDraft: e.target.value })
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
                value={singleBlog.body}
                onChange={(value) =>
                  setSingleBlog({ ...singleBlog, body: value })
                }
              />
            </div>
          </div>
        </div>

        {/* SEO Section */}
        <div className="bg-white rounded shadow p-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <hr className="flex-1 border-gray-300" />
            <h2 className="text-2xl font-bold text-center text-black ">Add SEO Data</h2>
            <hr className="flex-1 border-gray-300" />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="mb-2 block font-medium text-black">Meta Title</label>
              <input
                className="w-full border rounded px-3 py-2 text-black"
                value={singleBlog.meta_title}
                onChange={(e) =>
                  setSingleBlog({ ...singleBlog, meta_title: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-black">Meta Description</label>
              <input
                className="w-full border rounded px-3 py-2 text-black"
                value={singleBlog.meta_description}
                onChange={(e) =>
                  setSingleBlog({
                    ...singleBlog,
                    meta_description: e.target.value,
                  })
                }
                required
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-black ">Meta Keywords</label>
              <TagsInput
                value={singleBlog.meta_keywords ?? []}
                onChange={(e) =>
                  setSingleBlog({ ...singleBlog, meta_keywords: e })
                }
                style={{color : "black"}}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-end justify-end mb-4 gap-x-4">
          <button
            type="submit"
            className="border bg-black text-white font-semibold px-6 py-3 rounded hover:bg-gray-800 transition"
          >
            Create Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogPage;
