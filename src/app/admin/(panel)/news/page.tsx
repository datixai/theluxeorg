import { NewsEditor } from "@/components/admin/NewsEditor";

export default function NewsAdminPage() {
  return (
    <div>
      <p className="eyebrow">News</p>
      <h1 className="mt-3 mb-6 font-display text-4xl">News and announcements</h1>
      <NewsEditor />
    </div>
  );
}
