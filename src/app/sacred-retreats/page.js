import Triquetra from "./_components/Triquetra";
export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#f8f7f5] text-gray-800">
      <Triquetra />
      <p className="text-sm text-gray-500 mt-6">
        Click a path to begin your journey
      </p>
    </main>
  );
}