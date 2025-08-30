import { Card } from "@/components/ui/card";
import React from "react";
import "../globals.css";
// import dbConnect from "@/config/db-connect";
// import Blog from "@/server/models/blogs";
// import events from "@/server/models/events";
// import FormSubmission from "@/server/models/form-submissions";
// import Booth from "@/server/models/booths";
import {
  Newspaper,
  CalendarDays,
  ClipboardList,
  Store,
  Globe,
} from "lucide-react"; // Importing Lucide icons
import Link from "next/link";

const Page = async () => {
//   await dbConnect();

//   const blogCount = await Blog.countDocuments();
//   const eventCount = await events.countDocuments();

//   const enquiries24H = await FormSubmission.find({
//     createdAt: {
//       $gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
//     },
//   });

//   const boothsCount = await Booth.countDocuments();

//   const formSubmissionsByPage = await FormSubmission.aggregate([
//     {
//       $group: {
//         _id: "$page_source",
//         count: { $sum: 1 },
//       },
//     },
//     {
//       $match: {
//         _id: { $in: ["home", "contact-us", "custom-trade-show-booth-ideas", "portfolio", "trade-show-booth-displays-designs"] },
//       },
//     },
//   ]);
    const formSubmissionsByPage = [
        { _id: "home", count: 15 },
        { _id: "contact-us", count: 8 },
        { _id: "custom-trade-show-booth-ideas", count: 5 },
        { _id: "portfolio", count: 12 },
        { _id: "trade-show-booth-displays-designs", count: 7 },
    ];

  const naklistats = [
    {
      id: 1,
      title: "Total Blogs",
      value: 11,
      icon: <Newspaper size={40} className="text-blue-500" />,
      bgColor: "bg-blue-100",
    },
    {
      id: 2,
      title: "Total Events",
      value: 23,
      icon: <CalendarDays size={40} className="text-green-500" />,
      bgColor: "bg-green-100",
    },
    {
      id: 3,
      title: "Enquiries (Last 24H)",
      value: 9,
      icon: <ClipboardList size={40} className="text-yellow-500" />,
      bgColor: "bg-yellow-100",
    },
    {
      id: 4,
      title: "Total Booths",
      value: 18,
      icon: <Store size={40} className="text-red-500" />,
      bgColor: "bg-red-100",
    },
  ];

  return (
    <main className="flex-1 h-screen bg-gray-100 p-10 pl-[250px]">
      <Card className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Hello Admin, Welcome to the Dashboard 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Below are some important statistics to get you started.
        </p>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {naklistats.map((stat) => (
          <div
            key={stat.id}
            className={`rounded-lg shadow-md p-6 flex items-center justify-between ${stat.bgColor}`}
          >
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {stat.title}
              </h2>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stat.value}
              </p>
            </div>
            <div>{stat.icon}</div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Card className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href={"/admin/blogs"} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all">
              Manage Blogs
            </Link>
            <Link href={"/admin/events"} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all">
              Manage Events
            </Link>
            <Link href={"/admin/enquiry"} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all">
              View Enquiries
            </Link>
          </div>
        </Card>
      </div>
      {/* <Card className="bg-white p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">Form Submissions by Page</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {formSubmissionsByPage.map((submission, index) => (
            <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-md flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:scale-105">
              <Globe className="text-primary w-12 h-12 mb-2" />
              <h3 className="text-xl capitalize font-semibold text-gray-700">{submission._id.replace("/", "").replace("-", " ")}</h3>
              <p className="text-3xl font-bold text-primary">{submission.count}</p>
            </div>
          ))}
        </div>
      </Card> */}
    </main>
  );
};

export default Page;