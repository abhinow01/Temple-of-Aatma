import { getAllBlogs } from "@/server/actions/blogs";
import { notFound } from "next/navigation";
import BlogsPagination from "./blogsWithPagination";
const Page = async ({params , searchParams }) =>{
 searchParams = await searchParams;
const page = Number(searchParams?.page) || 1;
const limit = 10;
const skip = (page - 1) * limit;
const blogs = await getAllBlogs(
    {isDraft : "false"},
    skip,
    limit,
    "name title slug image image_alt_text body"
)
console.log("blogs in page", blogs);
if(!blogs?.data){
    notFound();
}
const totalPages = Math.ceil((blogs?.count || 0) / limit);
return (
    <>
    <BlogsPagination 
    blogs={blogs.data} 
    totalPages={totalPages} 
    currentPage={page}
    />
    </>
    
)
} 
export default Page;