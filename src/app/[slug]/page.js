import { getSingleBlog, getAllBlogs } from "@/server/actions/blogs";
import Image from "next/image";
import Link from "next/link";

const Page = async ({ params }) => {
  const { slug } = params;

  // Fetch single blog
  const { data } = await getSingleBlog({ slug, isDraft: "false" });

  let blogsToBeMapped = [];

  if (data) {
    const blogFromDb = await getAllBlogs(
      { isDraft: false },
      null,
      data.blog_count,
      "name title slug image_alt_text"
    );
    blogsToBeMapped = blogFromDb?.datas || [];
  }

  return (
    <>
      {/* Hero Section - Leather Book Cover Style */}
      <div 
        className="text-gray-800 h-[280px] md:h-[360px] flex justify-center items-center px-4"
        style={{
          background: 'linear-gradient(135deg, #5C4A3A 0%, #3E2F24 100%)',
        }}
      >
        <h1 
          className="text-center uppercase font-bold max-w-4xl px-4"
          style={{
            fontSize: 'clamp(24px, 5vw, 38px)',
            color: '#F5EBE0',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            letterSpacing: '2px',
            fontFamily: 'Georgia, serif',
          }}
        >
          {data?.title}
        </h1>
      </div>

      {/* Main Background with Recycled Paper Texture */}
      <div 
        className="min-h-screen"
        style={{
          background: '#EDE4D3',
          position: 'relative',
        }}
      >
        {/* Paper Texture Overlay */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139, 115, 85, 0.04) 2px, rgba(139, 115, 85, 0.04) 4px),
              repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139, 115, 85, 0.04) 2px, rgba(139, 115, 85, 0.04) 4px),
              radial-gradient(circle at 20% 30%, rgba(139, 115, 85, 0.02) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(139, 115, 85, 0.02) 0%, transparent 50%)
            `,
            pointerEvents: 'none',
            opacity: 0.8,
          }}
        />

        {/* Main Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 py-8 lg:py-16 relative z-10">
          {/* Left Section - Main Blog Content */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Hero Image with Vintage Frame */}
            {data?.image && (
              <div 
                style={{
                  padding: '10px',
                  background: '#8B7355',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25), inset 0 2px 4px rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                }}
              >
                <Image
                  loading="eager"
                  src={data.image}
                  alt={data.image_alt_text || data.title || "Blog image"}
                  width={800}
                  height={600}
                  className="w-full rounded-sm"
                  style={{
                    maxHeight: '500px',
                    objectFit: 'cover',
                    border: '3px solid #F5EBE0',
                    display: 'block',
                  }}
                />
              </div>
            )}

            {/* Blog Content - Recycled Paper Diary Style */}
            <div
              className="relative"
              style={{
                background: '#FAF6F0',
                boxShadow: '0 6px 20px rgba(62, 47, 36, 0.2), inset 0 1px 3px rgba(255,255,255,0.5)',
                padding: 'clamp(20px, 5vw, 48px)',
                borderRadius: '6px',
                border: '2px solid #C4B5A0',
              }}
            >
              {/* Diary Margin Line */}
              <div
                style={{
                  position: 'absolute',
                  left: 'clamp(32px, 8vw, 64px)',
                  top: '16px',
                  bottom: '16px',
                  width: '2px',
                  background: '#D4A574',
                  opacity: 0.4,
                }}
              />
              
              {/* Content */}
              <div
                id="blog_content"
                dangerouslySetInnerHTML={{ __html: data?.body || "" }}
                className="prose prose-lg max-w-none bg-recycled-paper"
                style={{
                  fontSize: 'clamp(15px, 2vw, 17px)',
                  lineHeight: '1.9',
                  color: '#2C2419',
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  paddingLeft: 'clamp(24px, 6vw, 48px)',
                }}

              />

              {/* Paper Tear Effect at Bottom */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `repeating-linear-gradient(90deg, transparent, transparent 8px, #C4B5A0 8px, #C4B5A0 16px)`,
                  opacity: 0.5,
                }}
              />
            </div>
          </div>

          {/* Right Section - Related Blogs */}
          <div className="w-full">
            <div className="flex flex-col items-center py-6 lg:py-12">
              <h3 
                className="font-semibold text-center mb-6 lg:mb-8 pb-3 w-full"
                style={{
                  fontSize: 'clamp(24px, 4vw, 32px)',
                  color: '#3E2F24',
                  fontFamily: 'Georgia, serif',
                  borderBottom: '3px solid #8B7355',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                Related Blogs
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 w-full">
                {blogsToBeMapped.map((blog, index) => (
                  <div
                    key={index}
                    className="relative h-full w-full flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: '#FAF6F0',
                      border: '2px solid #C4B5A0',
                      borderRadius: '6px',
                      boxShadow: '0 6px 16px rgba(62, 47, 36, 0.15)',
                    }}
                  >
                    {/* Image Section with Vintage Frame */}
                    <div 
                      className="w-full"
                      style={{
                        borderBottom: '2px solid #8B7355',
                        padding: '8px',
                        background: '#D4C4A8',
                      }}
                    >
                      <Image
                        loading="eager"
                        src={blog.image}
                        alt={blog.image_alt_text || blog.title}
                        width={400}
                        height={200}
                        className="w-full object-cover"
                        style={{
                          borderRadius: '3px',
                          height: '180px',
                          border: '2px solid #F5EBE0',
                        }}
                      />
                    </div>

                    {/* Title & Link */}
                    <div 
                      className="p-4 lg:p-6 flex flex-col flex-grow justify-between"
                      style={{
                        background: '#FAF6F0',
                      }}
                    >
                      <h4 
                        className="font-medium text-center mb-4"
                        style={{
                          fontSize: 'clamp(18px, 3vw, 22px)',
                          color: '#2C2419',
                          fontFamily: 'Georgia, serif',
                          lineHeight: '1.5',
                        }}
                      >
                        {blog.title}
                      </h4>
                      
                      <Link
                        className="self-center inline-block font-bold rounded transition-all duration-300 hover:scale-105"
                        href={`/${blog.slug}`}
                        style={{
                          background: '#5C4A3A',
                          border: '2px solid #3E2F24',
                          color: '#F5EBE0',
                          fontFamily: 'Georgia, serif',
                          padding: '10px 24px',
                          fontSize: 'clamp(14px, 2vw, 16px)',
                          textDecoration: 'none',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                          letterSpacing: '0.5px',
                        }}
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
