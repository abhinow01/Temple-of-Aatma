"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Pencil, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import { getAllYatras } from "@/server/actions/yatras";
import Pagination from "./_components/Pagination";
export default function Yatra(){
    const router = useRouter()
    const [yatra , setYatra ] = useState([]);
      const [loading, setLoading] = useState(true);
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
      const [deletingYatraId, setDeletingYatraId] = useState(null);
      const [searchValue, setSearchValue] = useState("");
    
      // Pagination state
      const [currentPage, setCurrentPage] = useState(1);
      const [totalPages, setTotalPages] = useState(0);
      const limit = 6;
        const fetchData = async (page = 1) => {
          try {
            setLoading(true);
            const skip = (page - 1) * limit;
            const resp = await getAllYatras(
              {},
              skip,
              limit,
              "slug _id title images isDraft"
            );
            console.log("resp in fetch data", resp);
      
            if (!resp.success) {
              toast.error(resp.error);
              return;
            }
            setYatra(resp.data);
            setTotalPages(Math.ceil(resp.count / limit));
            setLoading(false);
          } catch (error) {
            console.error(error);
            toast.error("Failed to fetch Yatras");
            setLoading(false);
          }
        };
         useEffect(() => {
           fetchData(currentPage);
           console.log("current Page data ", );
         }, [currentPage]);
         const handleDeleteConfirm = async () => {
           try {
             const resp = await deleteData(deletingYatraId);
             if (!resp.success) {
               toast.error(resp.error);
               return;
             }
             setYatras((prev) => prev.filter((yatra) => yatra._id !== deletingYatraId));
             toast.success("Yatra deleted successfully");
             setIsDeleteDialogOpen(false);
           } catch (error) {
             toast.error("Failed to delete Yatra");
           }
         };
       
         const handleSearchClick = async () => {
           if (!searchValue) return fetchData();
           try {
             const resp = await getAllDataBySearch(searchValue);
             if (!resp.success) {
               toast.error(resp.error);
               return;
             }
             setYatras(resp.data);
             const count = resp.count ?? 0;
             setTotalPages(Math.ceil(count / limit));
           } catch (error) {
             console.error(error);
             toast.error("Error while searching");
           }
         };
       
      return (
      <>
        <div className="bg-gray-100 pl-[250px] overflow-auto p-8   h-screen text-black">
              {/* Header */}
      <div className="flex justify-between items-center bg-white shadow rounded p-4">
        <h1 className="text-2xl font-bold">Yatras</h1>
        <button
          onClick={() => router.push("/admin/yatras/add")}
          className="bg-black text-white px-4 py-2 rounded transition-all duration-300 hover:bg-gray-800"
        >
          Add Yatra
        </button>
      </div>
      <div className="mt-6 bg-white p-4 border rounded shadow">
      <div className="flex gap-4 mb-4">
        <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search Yatras..."
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
          />
        <button
            onClick={handleSearchClick}
            className="border px-4 py-2 rounded font-semibold transition-all duration-300 hover:bg-black hover:text-white"
          >
            Search
          </button>

      </div>
      <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
      <thead className="bg-gray-200">
                <tr>
                <th className="border p-2 text-left">S.No.</th>
                <th className="border p-2 text-left">Image</th>
                <th className="border p-2 text-left">Title</th>
                <th className="border p-2 text-left">Description</th>
                <th className="border p-2 text-left">Status</th>
                <th className="border p-2 text-right">Actions</th>
              </tr>
      </thead>
      <tbody>
              {yatra.map((yatra, index) => (
                <tr
                  key={yatra._id}
                  className="transition-colors duration-300 hover:bg-gray-100"
                >
                  <td className="border p-2">
                    {(currentPage - 1) * limit + index + 1}
                  </td>
                  <td className="border p-2">
                    {yatra.images && (<Image
                      src={yatra.images[0]}
                      alt={yatra.title}
                      width={100}
                      height={100}
                      className="object-cover rounded"
                    />)}
                  </td>
                  <td className="border p-2">{yatra.title}</td>
                  <td className="border p-2">{yatra.meta_description}</td>
                  <td className="border p-2">
                    <span
                      className={`px-3 py-1 rounded text-white text-sm ${
                        yatra.isDraft === "true" ? "bg-gray-500" : "bg-black"
                      }`}
                    >
                      {yatra.isDraft === "true" ? "Draft" : "Published"}
                    </span>
                  </td>
                  <td className="border p-2 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/${yatra.slug}`} target="_blank">
                        <button className="p-2 border rounded transition-all duration-300 hover:bg-black hover:text-white">
                          <Eye className="h-4 w-4" />
                        </button>
                      </Link>
                      <Link href={`/admin/yatras/edit/${yatra._id}`}>
                        <button className="p-2 border rounded transition-all duration-300 hover:bg-black hover:text-white">
                          <Pencil className="h-4 w-4" />
                        </button>
                      </Link>
                      <button
                        className="p-2 border rounded text-black transition-all duration-300 hover:bg-black hover:text-white"
                        onClick={() => {
                          setDeletingYatraId(yatra._id);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))} 
              {yatra.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No Yatras found.
                  </td>
                </tr>
              )}     
              </tbody>
      </table>
      </div>
      <div className="flex justify-center gap-2 mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
      </div>
            {
                isDeleteDialogOpen && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg shadow p-6 w-[400px]">
            <h2 className="text-lg font-semibold mb-2">Delete Yatra</h2>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this Yatra? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="px-4 py-2 rounded border transition-all duration-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded bg-black text-white transition-all duration-300 hover:bg-gray-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
                )
            }
        </div>
      </>
      )
    
}