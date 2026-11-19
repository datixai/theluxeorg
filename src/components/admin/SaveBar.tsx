"use client";

export function SaveBar({
  dirty,
  saving,
  status,
  onSave,
}: {
  dirty: boolean;
  saving: boolean;
  status: { kind: "ok" | "error"; text: string } | null;
  onSave: () => void;
}) {
  return (
    <div className="sticky top-0 z-20 -mx-5 mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-mist bg-paper/95 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8">
      <p className={"text-sm " + (status?.kind === "error" ? "text-red-600" : status?.kind === "ok" ? "text-emerald-700" : "text-ink/55")}>
        {status ? status.text : dirty ? "You have unsaved changes." : "All changes saved."}
      </p>
      <button
        type="button"
        onClick={onSave}
        disabled={saving || !dirty}
        className="rounded-md bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gold-deep disabled:opacity-40"
      >
        {saving ? "Saving..." : "Save changes"}
      </button>
    </div>
  );
}
