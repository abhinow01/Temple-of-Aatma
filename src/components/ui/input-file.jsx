import React, { useRef } from "react";
import { Label } from "./label";
import { Input } from "./input";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { AudioWaveformIcon, DoorClosedIcon, NotepadTextDashed, PanelLeftDashed, PawPrintIcon, VideoIcon, ZapOffIcon } from "lucide-react";

const RenderFile = ({file,index,onChange,value})=>{

  const fileType = file.type.split("/")[0];
  if(fileType === "image"){
    return <div className="relative bg-white " key={index}>
      <Image
loading="eager"
        src={URL.createObjectURL(file)}
        alt="file"
        width={60}
        height={60}
        className="w-16 h-16 sm:w-24 sm:h-24 rounded"
      />
      <Button
        variant="destructive"
        size="icon"
        type="button"
        className="absolute z-50 -top-2 -right-2 sm:-top-3 sm:-right-3 w-5 h-5 sm:w-6 sm:h-6"
        onClick={() => {
          const newFiles = value.filter((_, i) => i !== index);
          onChange(newFiles);
        }}
      >
        <span className="sr-only">Remove file</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-3 h-3 sm:w-4 sm:h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </Button>
    </div>
  }

  const getFileTypeIcon = () => {
    if (fileType === "video") {
      return <VideoIcon/>
    } else if (fileType === "audio") {
      return <AudioWaveformIcon/>
    } else if (fileType === "pdf") {
      return  <DoorClosedIcon/>
    } else if (fileType === "word") {
      return <NotepadTextDashed/>
    } else if (fileType === "excel") {
      return 
    } else if (fileType === "powerpoint") {
      return <PawPrintIcon/>
    } else if (fileType === "zip") {
      return <ZapOffIcon/>
    }
    else if (fileType === "text") {
      return  <NotepadTextDashed/>
    }
  };

  return (
    <div className="relative" key={index}>
      <div className="flex items-center justify-center">
        {getFileTypeIcon()}
      </div>
      <Button
        variant="destructive"
        size="icon"
        type="button"
        className="absolute z-50 -top-2 -right-2 sm:-top-3 sm:-right-3 w-5 h-5 sm:w-6 sm:h-6"
        onClick={() => {
          const newFiles = value.filter((_, i) => i !== index);
          onChange(newFiles);
        }}
      >
        <span className="sr-only">Remove file</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-3 h-3 sm:w-4 sm:h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </Button>
    </div>
  )
}

const InputFile = ({ className, value, onChange }) => {
  const inpRef = useRef(null);
  return (
    <div className="col-span-1 sm:col-span-2">
      <Label htmlFor="file-upload">
        <div
          className={cn(
            "flex flex-row h-10 w-full items-center gap-4 sm:gap-6 rounded-md border border-input bg-transparent px-3 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
        >
        <div className="" >
          <button type="button" onClick={() => inpRef.current.click()} className="border sm:my-0 px-3 border-black">Choose File</button></div>
          <span className="ml-0 sm:ml-2 text-gray-500 text-center w-1/2 text-ellipsis whitespace-nowrap overflow-hidden sm:text-left">Upload files for booth designs</span>
        </div>
      </Label>
      {value && value.length > 0 && (
        <div className="flex flex-wrap mt-6 gap-4 sm:gap-8">
          {value.map((file, index) => (
              <RenderFile value={value} key={index} file={file} index={index} onChange={onChange}/>
          ))}
        </div>
      )}
      <Input
        onChange={(e) => onChange([...value, ...e.target.files])}
        type="file"
        id="file-upload"
        ref={inpRef}
        multiple
        className="bg-white hidden border border-gray-300 text-gray-800 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
      />
    </div>
  );
};

export default InputFile;
