"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const WhatsAppWidget = () => {
  const phoneNumber = "+17253331920";
  const [bounce, setBounce] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setBounce(false); // Stop bouncing after 4 seconds
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (pathname.includes("/admin")) {
    return null;
  }

  return (
    <a
      href={`https://wa.me/${phoneNumber.replace(/\D/g, "")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 left-4 sm:bottom-5 sm:left-4 z-50"
    >
      <div className="relative group">
        <div className="absolute -top-10 left-0 w-max p-2 rounded-md bg-green-600 text-white text-sm shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300">
          Chat with us!
        </div>
          <Image
loading="eager"
            src="/whatsapp-flt.png"
            alt="WhatsApp"
            width={60}
            height={60}
            className="w-12 bg-transparent h-12 sm:w-14 sm:h-14"
          />
        </div>
    </a>
  );
};

export default WhatsAppWidget;
