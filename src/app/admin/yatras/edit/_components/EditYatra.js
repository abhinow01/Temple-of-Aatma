"use client";
import React, { useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateData } from "@/server/actions/yatras";
import { deleteUTFiles } from "@/server/services/delete-ut";
import CkEditor from "@/components/CkEditor";
import { UploadButton } from "@/utils/uploadthing";
import { updateYatra } from "@/server/actions/yatras";
const EditYatra = ({ singleYatra }) => {
  const [yatra, setYatra] = useState(singleYatra);
  const router = useRouter();
    console.log("yatra data ",yatra)

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const resp = await updateYatra(yatra._id, yatra);

    if (!resp.success) {
      console.log("Error in updating yatra:", resp.err);
      toast.error(resp.err || "Failed to update Yatra");
      return;
    }

    toast.success("Yatra updated successfully");
    router.push("/admin/yatras");
  };

  return (
    <div className="flex pl-[250px] flex-col items-center justify-start min-h-screen bg-gray-200 overflow-auto p-8 gap-y-6 w-full">
      <form
        onSubmit={handleEditSubmit}
        className="w-full flex flex-col justify-around gap-y-10 bg-white p-6 rounded-lg shadow-lg"
      >
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <hr className="flex-1 border-gray-300" />
          <h2 className="text-2xl font-bold text-black text-center">Edit Yatra</h2>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* General Fields */}
        <div className="grid grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="mb-2 block text-black font-medium">Title</label>
            <input
              className="w-full border rounded px-3 py-2 text-black"
              value={yatra.title || ""}
              onChange={(e) => setYatra({ ...yatra, title: e.target.value })}
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="mb-2 block text-black font-medium">Slug</label>
            <input
              className="w-full border rounded px-3 py-2 text-black"
              value={yatra.slug || ""}
              onChange={(e) =>
                setYatra({ ...yatra, slug: e.target.value.replaceAll(" ", "-").toLowerCase() })
              }
              required
              title="No spaces, only lowercase letters and dashes"
            />
          </div>

          {/* Summary */}
          <div className="col-span-2">
            <label className="mb-2 block text-black font-medium">Summary</label>
            <textarea
              className="w-full border rounded px-3 py-2 text-black"
              rows="3"
              value={yatra.summary || ""}
              onChange={(e) => setYatra({ ...yatra, summary: e.target.value })}
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="mb-2 block text-black font-medium">Description</label>
            <CkEditor
              value={yatra.description || ""}
              onChange={(value) => setYatra({ ...yatra, description: value })}
            />
          </div>

          {/* Highlights */}
          <div className="col-span-2">
            <label className="mb-2 block text-black font-medium">Highlights</label>
            <TagsInput
              value={yatra.highlights ?? []}
              onChange={(tags) => setYatra({ ...yatra, highlights: tags })}
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="mb-2 block text-black font-medium">Start Date</label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2 text-black"
              value={yatra.startDate ? yatra.startDate.slice(0, 10) : ""}
              onChange={(e) => setYatra({ ...yatra, startDate: e.target.value })}
              required
            />
          </div>

          {/* End Date */}
          <div>
            <label className="mb-2 block text-black font-medium">End Date</label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2 text-black"
              value={yatra.endDate ? yatra.endDate.slice(0, 10) : ""}
              onChange={(e) => setYatra({ ...yatra, endDate: e.target.value })}
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block text-black font-medium">Location Title</label>
            <input
              className="w-full border rounded px-3 py-2 text-black"
              value={yatra.locationTitle || ""}
              onChange={(e) => setYatra({ ...yatra, locationTitle: e.target.value })}
            />
          </div>

          {/* Price */}
          <div>
            <label className="mb-2 block text-black font-medium">Price</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2 text-black"
              value={yatra.price || ""}
              onChange={(e) => setYatra({ ...yatra, price: Number(e.target.value) })}
              required
            />
          </div>

          {/* Currency */}
          <div>
            <label className="mb-2 block text-black font-medium">Currency</label>
            <input
              className="w-full border rounded px-3 py-2 text-black"
              value={yatra.currency || "INR"}
              onChange={(e) => setYatra({ ...yatra, currency: e.target.value })}
            />
          </div>

          {/* Seats */}
          <div>
            <label className="mb-2 block text-black font-medium">Seats Total</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2 text-black"
              value={yatra.seatsTotal || 0}
              onChange={(e) => setYatra({ ...yatra, seatsTotal: Number(e.target.value) })}
            />
          </div>

          <div>
            <label className="mb-2 block text-black font-medium">Seats Available</label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2 text-black"
              value={yatra.seatsAvailable || 0}
              onChange={(e) => setYatra({ ...yatra, seatsAvailable: Number(e.target.value) })}
            />
          </div>

          {/* Main Image Upload */}
          <div>
            <label className="mb-2 block text-black font-medium">Main Image</label>
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
                setYatra((prev) => ({ ...prev, images: [uploadedFile.url] }));
                toast.success("Image uploaded successfully");
              }}
              onUploadError={(error) => toast.error(`Upload failed: ${error.message}`)}
            />
            {yatra.images?.[0] && (
              <div className="relative w-max mt-2">
                <button
                  type="button"
                  onClick={() => {
                    deleteUTFiles([yatra.images[0].split("f/")[1]]);
                    setYatra({ ...yatra, images: [] });
                  }}
                  className="absolute top-0 -right-8 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
                <img
                  src={yatra.images[0]}
                  alt="Main Yatra"
                  className="w-16 h-16 rounded"
                />
              </div>
            )}
          </div>

          {/* Image Alt Text */}
          <div>
            <label className="mb-2 block font-medium text-black">Image Alt Text</label>
            <input
              className="w-full border rounded px-3 py-2 text-black"
              value={yatra.image_alt_text || ""}
              onChange={(e) => setYatra({ ...yatra, image_alt_text: e.target.value })}
            />
          </div>

          {/* Yatra Status */}
          <div>
            <label className="mb-2 block font-medium text-black">Yatra Status</label>
            <select
              className="w-full border rounded px-3 py-2 text-black"
              value={String(yatra.isDraft)}
              onChange={(e) => setYatra({ ...yatra, isDraft: e.target.value === "true" })}
            >
              <option value="">Select Status</option>
              <option value="true">Draft</option>
              <option value="false">Publish</option>
            </select>
          </div>

          {/* Featured */}
          <div>
            <label className="mb-2 block font-medium text-black">Featured</label>
            <select
              className="w-full border rounded px-3 py-2 text-black"
              value={String(yatra.featured)}
              onChange={(e) => setYatra({ ...yatra, featured: e.target.value === "true" })}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
        </div>

        {/* SEO Section */}
        <div className="bg-white rounded shadow p-6 mt-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <hr className="flex-1 border-gray-300" />
            <h2 className="text-2xl font-bold text-black text-center">SEO Data</h2>
            <hr className="flex-1 border-gray-300" />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="mb-2 block font-medium text-black">Meta Title</label>
              <input
                className="w-full border rounded px-3 py-2 text-black"
                value={yatra.meta_title || ""}
                onChange={(e) => setYatra({ ...yatra, meta_title: e.target.value })}
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-black">Meta Description</label>
              <input
                className="w-full border rounded px-3 py-2 text-black"
                value={yatra.meta_description || ""}
                onChange={(e) => setYatra({ ...yatra, meta_description: e.target.value })}
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-black">Meta Keywords</label>
              <TagsInput
                value={yatra.meta_keywords ?? []}
                onChange={(tags) => setYatra({ ...yatra, meta_keywords: tags })}
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
            Update Yatra
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditYatra;
