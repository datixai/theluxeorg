import { MessagesPanel } from "@/components/admin/MessagesPanel";

export default function MessagesPage() {
  return (
    <div>
      <p className="eyebrow">Messages</p>
      <h1 className="mt-3 mb-6 font-display text-4xl">Enquiries</h1>
      <MessagesPanel />
    </div>
  );
}
