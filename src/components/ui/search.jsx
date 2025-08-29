import { cn } from "@/lib/utils";

export default function Search({ value, onChange, className }) {
  return (
    <div
      className={cn(
        "flex items-center h-[35px] gap-3 w-full max-w-sm rounded-lg border border-gray-300 bg-gray-50 dark:bg-gray-900 px-4",
        className
      )}
    >
      <SearchIcon className="h-4 w-4" />
      <input
        value={value}
        onChange={onChange}
        placeholder="Search"
        className="w-full h-full font-semibold bg-transparent border-none outline-none focus:outline-none"
      />
    </div>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
