"use client";
import React, { useEffect, useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addYatra } from "@/server/actions/yatras";
import { deleteUTFiles } from "@/server/services/delete-ut";
import CkEditor from "@/components/CkEditor";
import { UploadButton } from "@/utils/uploadthing";

export default function AddYatraPage() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  const [singleYatra, setSingleYatra] = useState({
    title: "",
    slug: "",
    summary: "",
    description: "",
    highlights: [],
    startDate: "",
    endDate: "",
    locationTitle: "",
    price: "",
    currency: "INR",
    seatsTotal: "",
    seatsAvailable: "",
    brochureUrl: "",
    images: [],
    image_alt_text: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: [],
    tags: [],
    published: false,
    featured: false,
    isDraft: true,
    metadata: {
      durationDays: "",
      difficulty: "",
    },
  });

  // === Form Submit ===
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await addYatra(singleYatra);
      if (!resp.success) {
        toast.error(resp.error);
        return;
      }
      toast.success("Yatra added successfully");
      router.push("/admin/yatras");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add Yatra");
    }
  };

  return (
    <div className="flex pl-[250px] flex-col items-center justify-start min-h-screen bg-gray-200 overflow-auto p-8 gap-y-6 w-full">
      <form
        onSubmit={handleAddSubmit}
        className="w-full flex flex-col justify-around gap-y-10"
      >
        {/* BASIC INFO */}
        <div className="bg-white rounded shadow p-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <hr className="flex-1 border-gray-300" />
            <h2 className="text-2xl font-bold text-black text-center">
              General Info
            </h2>
            <hr className="flex-1 border-gray-300" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium text-black">Title</label>
              <input
                className="w-full border rounded px-3 py-2 text-black"
                value={singleYatra.title}
                onChange={(e) =>
                  setSingleYatra({ ...singleYatra, title: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-black">Slug</label>
              <input
                className="w-full border rounded px-3 py-2 text-black"
                value={singleYatra.slug}
                onChange={(e) =>
                  setSingleYatra({
                    ...singleYatra,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                  })
                }
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-2 font-medium text-black">Summary</label>
              <textarea
                className="w-full border rounded px-3 py-2 text-black"
                rows="3"
                value={singleYatra.summary}
                onChange={(e) =>
                  setSingleYatra({ ...singleYatra, summary: e.target.value })
                }
              />
            </div>

            {/* Highlights */}
            <div className="col-span-2">
              <label className="block mb-2 font-medium text-black">
                Highlights
              </label>
              <TagsInput
                value={singleYatra.highlights}
                onChange={(e) => setSingleYatra({ ...singleYatra, highlights: e })}
              />
            </div>

            {/* Dates */}
            <div>
              <label className="block mb-2 font-medium text-black">
                Start Date
              </label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2 text-black"
                value={singleYatra.startDate}
                onChange={(e) =>
                  setSingleYatra({ ...singleYatra, startDate: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-black">End Date</label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2 text-black"
                value={singleYatra.endDate}
                onChange={(e) =>
                  setSingleYatra({ ...singleYatra, endDate: e.target.value })
                }
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block mb-2 font-medium text-black">
                Location Title
              </label>
              <input
                className="w-full border rounded px-3 py-2 text-black"
                value={singleYatra.locationTitle}
                onChange={(e) =>
                  setSingleYatra({
                    ...singleYatra,
                    locationTitle: e.target.value,
                  })
                }
              />
            </div>

            {/* Price */}
            <div>
              <label className="block mb-2 font-medium text-black">Price</label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2 text-black"
                value={singleYatra.price}
                onChange={(e) =>
                  setSingleYatra({
                    ...singleYatra,
                    price: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* Seats */}
            <div>
              <label className="block mb-2 font-medium text-black">
                Total Seats
              </label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2 text-black"
                value={singleYatra.seatsTotal}
                onChange={(e) =>
                  setSingleYatra({
                    ...singleYatra,
                    seatsTotal: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-black">
                Available Seats
              </label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2 text-black"
                value={singleYatra.seatsAvailable}
                onChange={(e) =>
                  setSingleYatra({
                    ...singleYatra,
                    seatsAvailable: e.target.value,
                  })
                }
              />
            </div>

            {/* Gallery Upload */}
            <div className="col-span-2">
              <label className="block mb-2 font-medium text-black">Gallery</label>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  const newImages = res.map((f) => f.url);
                  setSingleYatra((prev) => ({
                    ...prev,
                    images: [...prev.images, ...newImages],
                  }));
                }}
              />
              <div className="flex gap-2 mt-3 flex-wrap">
                {singleYatra.images.map((img, i) => (
                  <div key={i} className="relative">
                    <img
                      src={img}
                      alt="gallery"
                      className="w-20 h-20 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setSingleYatra({
                          ...singleYatra,
                          images: singleYatra.images.filter(
                            (_, index) => index !== i
                          ),
                        })
                      }
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block mb-2 font-medium text-black">
                Description
              </label>
              <CkEditor
                value={singleYatra.description}
                onChange={(value) =>
                  setSingleYatra({ ...singleYatra, description: value })
                }
              />
            </div>
          </div>
        </div>

        {/* SEO SECTION */}
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-2xl font-bold text-black text-center mb-6">
            SEO & Metadata
          </h2>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium text-black">
                Meta Title
              </label>
              <input
                className="w-full border rounded px-3 py-2 text-black"
                value={singleYatra.meta_title}
                onChange={(e) =>
                  setSingleYatra({ ...singleYatra, meta_title: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-black">
                Meta Description
              </label>
              <input
                className="w-full border rounded px-3 py-2 text-black"
                value={singleYatra.meta_description}
                onChange={(e) =>
                  setSingleYatra({
                    ...singleYatra,
                    meta_description: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-2 font-medium text-black">
                Meta Keywords
              </label>
              <TagsInput
                value={singleYatra.meta_keywords}
                onChange={(e) =>
                  setSingleYatra({ ...singleYatra, meta_keywords: e })
                }
              />
            </div>
          </div>
        </div>

        {/* SUBMIT */}
        <div className="flex items-end justify-end mb-4 gap-x-4">
          <button
            type="submit"
            className="border bg-black text-white font-semibold px-6 py-3 rounded hover:bg-gray-800 transition"
          >
            Create Yatra
          </button>
        </div>
      </form>
    </div>
  );
}
