import { MediaUploader } from "@/components/admin/MediaUploader";

export default function MediaPage() {
  return (
    <div>
      <p className="eyebrow">Photos and files</p>
      <h1 className="mt-3 mb-6 font-display text-4xl">Upload</h1>
      <MediaUploader />
    </div>
  );
}
