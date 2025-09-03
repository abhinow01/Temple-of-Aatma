"use client"
import React, { useEffect, useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateData } from "@/server/actions/blogs";
import { deleteUTFiles } from "@/server/services/delete-ut";
import CkEditor from "@/components/CKeditor";
import { UploadButton } from "@/utils/uploadthing";
const EditBlog = ({ singleBlog }) => {
const [blog , setBlog] = useState(singleBlog);
const router = useRouter(); 

const handleEditSubmit = async (e) => {
e.preventDefault();
const resp = await updateData(blog._id , {
    title: blog.title,
      slug: blog.slug,
      image: blog.image,
      image_alt_text: blog.image_alt_text,
      body: blog.body,
      meta_title: blog.meta_title,
      meta_description: blog.meta_description,
      meta_keywords: blog.meta_keywords ?? [],
      blog_count: blog.blog_count,
      isDraft : blog.isDraft
})
if(!resp.success){
    toast.error(resp.err);
    return;
}
toast.success("Blog updated successfully");
router.push("/admin/blogs");
}
useEffect(()=>{
    setBlog({
        ...blog
    })
}, [])
  return (
    <form 
    onSubmit={handleEditSubmit}
    className="w-full flex flex-col justify-around gap-y-10"
    >
        
    </form>
  )
}
export default EditBlog;