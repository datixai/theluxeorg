import { ContentEditor } from "@/components/admin/ContentEditor";

export default function ContentPage() {
  return (
    <div>
      <p className="eyebrow">Website content</p>
      <h1 className="mt-3 mb-6 font-display text-4xl">Edit pages</h1>
      <ContentEditor />
    </div>
  );
}
