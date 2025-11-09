export const dynamic = 'force-dynamic';
import { getSingleBlog, getAllBlogs } from "@/server/actions/blogs";
import { getSingleYatra, getAllYatras } from "@/server/actions/yatras";
import Image from "next/image";
import Link from "next/link";

const Page = async ({ params }) => {
  const { slug } = params;

  // 1️⃣ Try fetching blog
  const blogResponse = await getSingleBlog({ slug, isDraft: "false" });
  const blogData = blogResponse?.data;

  if (blogData) {
    // Fetch related blogs
    const relatedBlogsRes = await getAllBlogs(
      { isDraft: false },
      null,
      blogData.blog_count,
      "name title slug image_alt_text"
    );
    const relatedBlogs = relatedBlogsRes?.datas || [];

    return (
      <>
        {/* --- BLOG PAGE JSX --- */}
        <div className="text-gray-800 min-h-screen bg-[#EDE4D3]">
          <div className="h-[280px] flex justify-center items-center bg-gradient-to-br from-[#5C4A3A] to-[#3E2F24]">
            <h1 className="text-4xl font-bold text-[#F5EBE0] uppercase tracking-wide">
              {blogData.title}
            </h1>
          </div>

          <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Blog */}
            <div className="lg:col-span-2">
              {blogData.image && (
                <Image
                  src={blogData.image}
                  alt={blogData.image_alt_text || blogData.title}
                  width={800}
                  height={500}
                  className="rounded-md border-4 border-[#F5EBE0]"
                />
              )}

              <div
                dangerouslySetInnerHTML={{ __html: blogData.body || "" }}
                className="prose max-w-none mt-8 text-[#2C2419]"
              />
            </div>

            {/* Right: Related Blogs */}
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-center">
                Related Blogs
              </h3>
              <div className="space-y-6">
                {relatedBlogs.map((b, i) => (
                  <Link
                    key={i}
                    href={`/${b.slug}`}
                    className="block border border-[#C4B5A0] rounded-md overflow-hidden shadow-md hover:shadow-lg transition"
                  >
                    <Image
                      src={b.image}
                      alt={b.title}
                      width={400}
                      height={200}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4 text-center font-medium">{b.title}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // 2️⃣ If no blog found, try Yatra
  const yatraResponse = await getSingleYatra({slug});
  const yatraData = yatraResponse?.data;
  console.log("yatra data ",yatraResponse)
  if (yatraData) {
    const relatedYatrasRes = await getAllYatras({ isDraft: false });
    const relatedYatras = relatedYatrasRes?.datas || [];

    return (
      <>
        {/* --- YATRA PAGE JSX --- */}
<div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-800">
  {/* Header Section */}
  <div className="relative bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-500 text-white py-20 shadow-xl">
    <div className="absolute inset-0 bg-black/20"></div>
    <div className="relative text-center z-10 max-w-4xl mx-auto px-4">
      <h1 className="text-5xl font-bold tracking-tight drop-shadow-md">
        {yatraData.title}
      </h1>
      <p className="mt-4 text-lg text-amber-100">
        {yatraData.locationTitle} • {new Date(yatraData.startDate).toLocaleDateString()} -{" "}
        {new Date(yatraData.endDate).toLocaleDateString()}
      </p>
    </div>
  </div>

  {/* Content Section */}
  <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
    {/* Left: Yatra Details */}
    <div className="lg:col-span-2 space-y-10">
      {/* Hero Image */}
      {yatraData.images?.[0] && (
        <div className="overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-[1.02] duration-500">
          <Image
            src={yatraData.images[0]}
            alt={yatraData.title}
            width={800}
            height={500}
            className="w-full h-[450px] object-cover"
          />
        </div>
      )}

      {/* Summary */}
      <p className="text-lg leading-relaxed text-gray-700 border-l-4 border-amber-500 pl-4 italic">
        {yatraData.summary}
      </p>



      {/* Description */}
      <div
        dangerouslySetInnerHTML={{
          __html: yatraData.description || "",
        }}
        className="prose prose-lg max-w-none text-gray-700 prose-headings:text-amber-700 prose-a:text-amber-600 hover:prose-a:text-amber-700"
      />
    </div>

{/* Right: Related Yatras */}
<div className="bg-white rounded-2xl shadow-lg p-6">
  {/* Yatra Info */}
  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-6 mb-6">
    <div className="space-y-4">
      {/* Location */}
      <div className="flex items-start gap-3 pb-4 border-b border-amber-200">
        <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Location</p>
          <p className="font-semibold text-gray-900">{yatraData.locationTitle}</p>
        </div>
      </div>

      {/* Dates */}
      <div className="flex items-start gap-3 pb-4 border-b border-amber-200">
        <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Duration</p>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-gray-900 text-sm">
              {new Date(yatraData.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
            <span className="text-gray-400">→</span>
            <p className="font-semibold text-gray-900 text-sm">
              {new Date(yatraData.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Price per person</p>
          <p className="text-3xl font-bold text-green-600">₹{yatraData.price.toLocaleString('en-IN')}</p>
        </div>
      </div>
    </div>
  </div>

  {/* Book Now Button */}
<Link
  href={`sacred-retreats/yatras/${yatraData._id}/book`}
  className="w-full block text-center bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] mb-8"
>
  Book Now
</Link>
  {/* Related Yatras */}
  <h3 className="text-2xl font-semibold mb-6 text-center text-amber-700 border-b pb-2">
    Related Yatras
  </h3>
  <div className="space-y-6">
    {relatedYatras.map((y, i) => (
      <Link
        key={i}
        href={`/sacred-retreats/yatras/${y.slug}`}
        className="block overflow-hidden rounded-xl border border-gray-200 shadow hover:shadow-lg hover:border-amber-400 transition-all duration-300"
      >
        <Image
          src={y.images?.[0]}
          alt={y.title}
          width={400}
          height={200}
          className="w-full h-40 object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="p-4 text-center font-medium text-gray-800">
          {y.title}
        </div>
      </Link>
    ))}
  </div>

</div>


</div>

  </div>
      </>
    );
  }

  // 3️⃣ If neither found
  return (
    <div className="h-[80vh] flex items-center justify-center text-gray-700">
      <p>No matching Blog or Yatra found for &quot;{slug}&quot;.</p>
    </div>
  );
};

export default Page;
