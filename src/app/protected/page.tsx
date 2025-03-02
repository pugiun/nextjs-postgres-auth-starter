import ProtectedContent from "./content";

export default async function ProtectedPage() {
  return (
    <div className="flex h-screen bg-black">
      <ProtectedContent />
    </div>
  );
}
