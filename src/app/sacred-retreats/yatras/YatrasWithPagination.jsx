"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, MapPin, Calendar, Star } from "lucide-react";

const YatrasPagination = ({ yatras = [], currentPage, totalPages, onPageChange }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
      {/* Floating subtle sparkles */}
      <div className="fixed inset-0 flex items-center justify-center z-0 pointer-events-none animate-ripple">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-2 h-2 bg-amber-400 rounded-full" />
          <div className="absolute top-20 right-20 w-1 h-1 bg-slate-400 rounded-full" />
          <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-amber-300 rounded-full" />
          <div className="absolute bottom-10 right-1/3 w-2 h-2 bg-slate-300 rounded-full" />
        </div>
      </div>

      {/* Header */}
      <div className="relative px-6 py-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full">
          <BookOpen className="w-8 h-8 text-amber-700" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4 tracking-tight">
          Sacred <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">Yatras</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Step into devotion — journeys that awaken inner clarity and surrender.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-center lg:px-[100px] gap-10">
          {yatras.map((yatra, index) => (
            <article
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="w-full relative overflow-hidden">
                  <div className="aspect-[16/9] md:aspect-auto md:h-full relative">
                    <img
                      src={yatra.images?.[0] || "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=600"}
                      alt={yatra.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full p-8 flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-amber-700 transition-colors duration-300">
                    {yatra.title}
                  </h2>

                  <p className="text-sm text-slate-600 mb-3 italic">{yatra.summary}</p>

                  {/* Date & Location */}
                  <div className="flex items-center flex-wrap gap-3 text-sm text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-amber-600" />
                    <span>
                    {new Date(yatra.startDate).toISOString().split('T')[0]} —{" "}
                    {new Date(yatra.endDate).toISOString().split('T')[0]}
                    </span>
                    </div>
                    {yatra.locationTitle && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-amber-600" />
                        <span>{yatra.locationTitle}</span>
                      </div>
                    )}
                  </div>

                  {/* Highlights */}
                  {yatra.highlights?.length > 0 && (
                    <ul className="list-disc list-inside text-slate-600 text-sm mb-4 space-y-1">
                      {yatra.highlights.slice(0, 3).map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}

                  {/* Price and Seats */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-amber-700">
                      {yatra.currency} {yatra.price}
                    </span>
                    <span className="text-sm text-slate-500">
                      {yatra.seatsAvailable}/{yatra.seatsTotal} seats left
                    </span>
                  </div>

                  {/* CTA */}
                  <Link href={`/${yatra.slug}`} prefetch>
                    <button className="inline-flex items-center text-amber-600 hover:text-amber-700 font-semibold transition-colors duration-300 group/btn">
                      <span className="mr-2">View Details</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {/* {totalPages > 1 && (
          <div className="flex justify-center mt-10 space-x-4">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              Prev
            </Button>
            <span className="px-3 py-2 text-slate-600 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default YatrasPagination;
