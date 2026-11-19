"use client";

import { useState } from "react";
import type { NewsItem } from "@/lib/types";
import { Card, Field, Grid2, ImageInput, TextArea, TextInput, Toggle } from "./fields";
import { SaveBar } from "./SaveBar";
import { useContent } from "./useContent";

function slugify(s: string) {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 70) || "news"
  );
}

export function NewsEditor() {
  const { content: c, update, save, saving, dirty, status } = useContent();
  const [editing, setEditing] = useState<number | null>(null);

  if (!c) return <p className="text-sm text-ink/55">{status?.text ?? "Loading news..."}</p>;

  const setNews = (news: NewsItem[]) => update((x) => ({ ...x, news }));
  const patch = (i: number, p: Partial<NewsItem>) => setNews(c.news.map((n, j) => (j === i ? { ...n, ...p } : n)));

  function add() {
    const item: NewsItem = {
      slug: `news-${Date.now().toString(36)}`,
      title: "",
      date: new Date().toISOString().slice(0, 10),
      excerpt: "",
      body: "",
      image: "",
      published: false,
    };
    setNews([item, ...c!.news]);
    setEditing(0);
  }

  return (
    <div>
      <SaveBar dirty={dirty} saving={saving} status={status} onSave={save} />
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-ink/55">{c.news.length} articles. Only published articles appear on the website.</p>
        <button type="button" onClick={add} className="rounded-md bg-gold-deep px-4 py-2 text-sm font-medium text-white hover:bg-ink">
          Add news
        </button>
      </div>

      <div className="space-y-3">
        {c.news.map((n, i) =>
          editing === i ? (
            <Card
              key={i}
              title={n.title || "New article"}
              actions={
                <button type="button" onClick={() => setEditing(null)} className="text-sm text-gold-deep hover:text-ink">
                  Done
                </button>
              }
            >
              <Field label="Title">
                <TextInput
                  value={n.title}
                  onChange={(v) => patch(i, { title: v, slug: n.slug.startsWith("news-") || !n.slug ? slugify(v) : n.slug })}
                />
              </Field>
              <Grid2>
                <Field label="Date">
                  <TextInput type="date" value={n.date} onChange={(v) => patch(i, { date: v })} />
                </Field>
                <Field label="Page address" hint="Letters, numbers and hyphens only.">
                  <TextInput value={n.slug} onChange={(v) => patch(i, { slug: slugify(v) })} />
                </Field>
              </Grid2>
              <Field label="Summary" hint="Shown on the news list and in search results.">
                <TextArea rows={2} value={n.excerpt} onChange={(v) => patch(i, { excerpt: v })} />
              </Field>
              <Field label="Article text" hint="Leave an empty line between paragraphs.">
                <TextArea rows={10} value={n.body} onChange={(v) => patch(i, { body: v })} />
              </Field>
              <ImageInput label="Photo" value={n.image} onChange={(v) => patch(i, { image: v })} />
              <div className="flex items-center justify-between border-t border-mist pt-4">
                <Toggle checked={n.published} onChange={(v) => patch(i, { published: v })} label={n.published ? "Published" : "Draft (hidden)"} />
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Delete "${n.title || "this article"}"? This cannot be undone after you save.`)) {
                      setNews(c.news.filter((_, j) => j !== i));
                      setEditing(null);
                    }
                  }}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete article
                </button>
              </div>
            </Card>
          ) : (
            <button
              key={i}
              type="button"
              onClick={() => setEditing(i)}
              className="flex w-full items-center justify-between gap-4 rounded-lg border border-mist bg-white px-5 py-4 text-left shadow-sm transition hover:border-gold-deep"
            >
              <span className="min-w-0">
                <span className="block truncate font-display text-lg">{n.title || "Untitled"}</span>
                <span className="text-xs text-ink/50">{n.date}</span>
              </span>
              <span className={"shrink-0 rounded-full px-3 py-1 text-xs " + (n.published ? "bg-emerald-50 text-emerald-700" : "bg-mist text-ink/60")}>
                {n.published ? "Published" : "Draft"}
              </span>
            </button>
          ),
        )}
      </div>
    </div>
  );
}
