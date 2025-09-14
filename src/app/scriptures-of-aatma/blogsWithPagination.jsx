import Image from "next/image";
import Link from "next/link";
import React from "react";
import BlogDesc from "./blog-description";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Star } from 'lucide-react';
const BlogsPagination = ({ blogs, currentPage, totalPages, onPageChange }) => {
    const recommendedBlogs = [
    {
      "slug": "mindfulness-daily-life",
      "title": "5 Ways to Practice Mindfulness in Daily Life",
      "image": "https://picsum.photos/200/120?random=1",
      "body": "Mindfulness helps reduce stress, increase focus, and improve overall well-being. In this article, we explore simple practices..."
    },
    {
      "slug": "ai-transforming-healthcare",
      "title": "How AI is Transforming Healthcare",
      "image": "https://picsum.photos/200/120?random=2",
      "body": "From early diagnosis to personalized treatment plans, AI is reshaping the future of healthcare in remarkable ways..."
    },
    {
      "slug": "remote-work-productivity",
      "title": "Boosting Productivity While Working Remotely",
      "image": "https://picsum.photos/200/120?random=3",
      "body": "Remote work comes with unique challenges. Discover effective strategies to stay productive and maintain work-life balance..."
    },
    {
      "slug": "plant-based-diets",
      "title": "The Rise of Plant-Based Diets",
      "image": "https://picsum.photos/200/120?random=4",
      "body": "Plant-based diets are gaining popularity worldwide. Learn the health benefits and how to transition smoothly..."
    },
    {
      "slug": "tech-startup-success",
      "title": "10 Lessons from Successful Tech Startups",
      "image": "https://picsum.photos/200/120?random=5",
      "body": "Behind every thriving startup is a set of strategies, mistakes, and lessons learned. Here’s what you can apply to your journey..."
    }
  ]


return (
<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
<div className="fixed inset-0 flex items-center justify-center z-0 pointer-events-none animate-ripple">
  <svg className="w-[1200px] h-[1200px] opacity-10 text-amber-600" 
       viewBox="0 0 1000 1000" 
       preserveAspectRatio="xMidYMid meet">
    
    {/* Concentric circles */}
    <circle cx="500" cy="500" r="480" fill="none" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="500" cy="500" r="400" fill="none" stroke="currentColor" strokeWidth="0.7" />
    <circle cx="500" cy="500" r="320" fill="none" stroke="currentColor" strokeWidth="0.7" />
    <circle cx="500" cy="500" r="240" fill="none" stroke="currentColor" strokeWidth="0.7" />
    <circle cx="500" cy="500" r="160" fill="none" stroke="currentColor" strokeWidth="1" />
    <circle cx="500" cy="500" r="80" fill="none" stroke="currentColor" strokeWidth="1" />

    {/* Radiating spokes */}
    {Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * Math.PI * 2) / 24;
      const x = 500 + 480 * Math.cos(angle);
      const y = 500 + 480 * Math.sin(angle);
      return <line key={i} x1="500" y1="500" x2={x} y2={y} stroke="currentColor" strokeWidth="0.5" />;
    })}

    {/* Decorative dots */}
    {Array.from({ length: 48 }).map((_, i) => {
      const angle = (i * Math.PI * 2) / 48;
      const x = 500 + 320 * Math.cos(angle);
      const y = 500 + 320 * Math.sin(angle);
      return <circle key={i} cx={x} cy={y} r="6" fill="currentColor" />;
    })}
  </svg>
</div>


      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-2 h-2 bg-amber-400 rounded-full"></div>
          <div className="absolute top-20 right-20 w-1 h-1 bg-slate-400 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-amber-300 rounded-full"></div>
          <div className="absolute bottom-10 right-1/3 w-2 h-2 bg-slate-300 rounded-full"></div>
        </div>
        
        <div className="relative px-6 py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full">
            <BookOpen className="w-8 h-8 text-amber-700" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4 tracking-tight">
            Scriptures of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">Aatma</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Ancient wisdom for the modern soul
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left side: Main blogs */}
          <div className="lg:col-span-2 space-y-10">
            {blogs?.map((blog, index) => (
              <article
                key={index}
                className="group bg-white  rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/5 relative overflow-hidden">
                    <div className="aspect-[4/3] md:aspect-auto md:h-full relative">
                      <img
                        src={blog.image || "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=600"}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                  
                  <div className="md:w-3/5 p-8 flex flex-col justify-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4 line-clamp-2 group-hover:text-amber-700 transition-colors duration-300">
                      {blog.title}
                    </h2>
                    
                    <div className="text-slate-600 text-base leading-relaxed mb-6 line-clamp-3">
                      <BlogDesc body={blog.body} maxLength={180} />
                    </div>
                    
                    <button className="inline-flex items-center text-amber-600 hover:text-amber-700 font-semibold transition-colors duration-300 group/btn">
                      <span className="mr-2">Read More</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Right side: Recommended blogs */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white  rounded-2xl p-8 border border-slate-100">
                <div className="flex items-center mb-8">
                  <Star className="w-5 h-5 text-amber-500 mr-3" />
                  <h3 className="text-xl font-bold text-slate-800">
                    Recommended Readings
                  </h3>
                </div>
                
                <div className="space-y-6">
                  {recommendedBlogs?.map((blog, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-16 h-16 relative overflow-hidden rounded-xl">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-slate-800 line-clamp-2 group-hover:text-amber-700 transition-colors duration-300 mb-2">
                            {blog.title}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {/* <BlogDesc body={blog.body} maxLength={80} /> */}
                            <BlogDesc body={blog.body} />
                          </p>
                        </div>
                      </div>
                      
                      {index < recommendedBlogs.length - 1 && (
                        <div className="mt-6 border-b border-slate-100"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default BlogsPagination;
