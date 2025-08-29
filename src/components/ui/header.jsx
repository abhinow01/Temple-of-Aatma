"use client";

import { headerRoutes } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./button";
import { Menu, X } from "lucide-react"; // Import Lucide Icons
import useScrollPosition from "../useScroll";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import EnquiryForm from "../Form";
import ScheduleCallForm from "../ScheduleCallForm";
import BoothsizeDropdown from "../booth-size-dropdown";

const RouteComponent = ({ link, name, className }) => {
  if (link === "booth-sizes") {
    return <BoothsizeDropdown className={className} />;
  }

  return (
    <Link
      className={cn(
        "text-[16.5px] text-white font-medium hover:text-primary transition",
        className
      )}
      href={link}
    >
      {name}
    </Link>
  );
};

export const HeaderBtns = ({ isMobile = false }) => {
  const [open, setOpen] = useState(false);
  const [scheduleCallOpen, setScheduleCallOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex",
        isMobile ? "flex-col gap-2" : "gap-4 flex-row items-center"
      )}
    >
      <Dialog open={scheduleCallOpen} onOpenChange={setScheduleCallOpen}>
        <DialogTrigger asChild>
          <Button
            className={cn(
              "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 schedule-btn bg-primary shadow h-9 px-4 rounded-md hover:bg-primary py-[12px] border-2 border-primary text-secondary body-bold",
              isMobile ? "w-full" : ""
            )}
            type="button"
          >
            Schedule &nbsp; Call
          </Button>
        </DialogTrigger>
        <DialogContent>
          <ScheduleCallForm setOpen={setScheduleCallOpen} />
        </DialogContent>
      </Dialog>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className={cn(
              "rounded-md hover:bg-primary py-[12px] border-2 border-primary text-secondary body-bold",
              isMobile ? "w-full" : ""
            )}
          >
            Get Quote
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[700px] overflow-auto">
          <EnquiryForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollPosition = useScrollPosition();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-gradient-to-b sticky top-0 z-50 bg-secondary border-t-2 border-t-white/60 border-b-2 border-b-primary w-full flex justify-between items-center py-4 px-4 sm:px-8 md:px-12 lg:px-20">
      <Link href="/" className="relative flex items-center">
        <Image
          loading="eager"
          className="max-h-[60px] min-h-[40px] object-fill"
          alt="Chronicle Exhibits LLC logo"
          src="/chronicle-logo-2.svg"
          width={110}
          priority={true}
          height={80}
        />
      </Link>
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-8">
        {headerRoutes.map((route, index) => (
          <RouteComponent key={index} link={route.link} name={route.name} />
        ))}
      </div>

      {/* Buttons and Hamburger Menu */}
      <div className="flex items-center gap-4">
        <div className="hidden lg:block">
          <HeaderBtns />
        </div>
        <button onClick={toggleMenu} className="lg:hidden text-white">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={closeMenu}
      >
        <div
          className={cn(
            "fixed top-0 left-0 w-4/5 sm:w-3/5 md:w-2/5 h-full bg-secondary text-white p-6 transform transition-transform",
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center mb-6">
            <Image
loading="eager"
              alt="Chronicle Exhibits LLC logo"
              src="/chronicle-logo-2.svg"
              width={110}
              height={80}
            />
            <button onClick={closeMenu} className="text-white">
              <X size={24} />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <div className="flex flex-col gap-6">
            {headerRoutes.map((route, index) => (
              <RouteComponent
                key={index}
                link={route.link}
                name={route.name}
                className="text-lg"
              />
            ))}
          </div>

          {/* Mobile Header Buttons */}
          <div className="mt-auto pt-6">
            <HeaderBtns isMobile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
