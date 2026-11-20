"use client";

import { useState } from "react";
import type { Content } from "@/lib/types";
import { Card, Field, Grid2, ImageInput, RepeatItem, TextArea, TextInput } from "./fields";
import { SaveBar } from "./SaveBar";
import { useContent } from "./useContent";

const TABS = [
  { id: "settings", label: "Settings" },
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "vision", label: "Vision 2035" },
  { id: "sectors", label: "Sectors" },
  { id: "roadmap", label: "Roadmap" },
  { id: "offices", label: "Offices" },
] as const;
type Tab = (typeof TABS)[number]["id"];

function move<T>(list: T[], i: number, d: number): T[] {
  const j = i + d;
  if (j < 0 || j >= list.length) return list;
  const out = [...list];
  [out[i], out[j]] = [out[j], out[i]];
  return out;
}

export function ContentEditor() {
  const { content: c, update, save, saving, dirty, status } = useContent();
  const [tab, setTab] = useState<Tab>("settings");

  if (!c) return <p className="text-sm text-ink/55">{status?.text ?? "Loading content..."}</p>;

  const set = <K extends keyof Content>(key: K, value: Content[K]) => update((x) => ({ ...x, [key]: value }));

  return (
    <div>
      <SaveBar dirty={dirty} saving={saving} status={status} onSave={save} />

      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={
              "rounded-full px-4 py-2 text-sm transition " +
              (tab === t.id ? "bg-ink text-white" : "border border-mist bg-white text-ink/70 hover:border-gold-deep")
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "settings" && (
        <Card title="Site settings" description="Shown in the header, footer and contact page.">
          <Grid2>
            <Field label="Company name">
              <TextInput value={c.settings.siteName} onChange={(v) => set("settings", { ...c.settings, siteName: v })} />
            </Field>
            <Field label="Tagline" hint="Short line in the footer.">
              <TextInput value={c.settings.tagline} onChange={(v) => set("settings", { ...c.settings, tagline: v })} />
            </Field>
          </Grid2>
          <Field label="Announcement bar" hint="The thin black line at the very top of every page.">
            <TextInput value={c.settings.announcement} onChange={(v) => set("settings", { ...c.settings, announcement: v })} />
          </Field>
          <Grid2>
            <Field label="Public email">
              <TextInput type="email" value={c.settings.email} onChange={(v) => set("settings", { ...c.settings, email: v })} />
            </Field>
          </Grid2>
        </Card>
      )}

      {tab === "home" && (
        <div className="space-y-6">
          <Card title="Hero" description="The large photo and headline at the top of the home page.">
            <Grid2>
              <Field label="Small heading">
                <TextInput value={c.home.heroEyebrow} onChange={(v) => set("home", { ...c.home, heroEyebrow: v })} />
              </Field>
              <Field label="Gold italic ending" hint="Shown in gold after the headline.">
                <TextInput value={c.home.heroAccent} onChange={(v) => set("home", { ...c.home, heroAccent: v })} />
              </Field>
            </Grid2>
            <Field label="Headline">
              <TextInput value={c.home.heroTitle} onChange={(v) => set("home", { ...c.home, heroTitle: v })} />
            </Field>
            <Field label="Text under the headline">
              <TextArea rows={3} value={c.home.heroBody} onChange={(v) => set("home", { ...c.home, heroBody: v })} />
            </Field>
            <ImageInput label="Hero photo (wide, at least 2000 px)" value={c.home.heroImage} onChange={(v) => set("home", { ...c.home, heroImage: v })} />
          </Card>
          <Card title="Introduction">
            <Grid2>
              <Field label="Small heading">
                <TextInput value={c.home.introEyebrow} onChange={(v) => set("home", { ...c.home, introEyebrow: v })} />
              </Field>
              <Field label="Title">
                <TextInput value={c.home.introTitle} onChange={(v) => set("home", { ...c.home, introTitle: v })} />
              </Field>
            </Grid2>
            <Field label="Text">
              <TextArea rows={4} value={c.home.introBody} onChange={(v) => set("home", { ...c.home, introBody: v })} />
            </Field>
          </Card>
          <Card title="Closing call to action">
            <Field label="Title">
              <TextInput value={c.home.ctaTitle} onChange={(v) => set("home", { ...c.home, ctaTitle: v })} />
            </Field>
            <Field label="Text">
              <TextArea rows={2} value={c.home.ctaBody} onChange={(v) => set("home", { ...c.home, ctaBody: v })} />
            </Field>
          </Card>
        </div>
      )}

      {tab === "about" && (
        <Card title="About page">
          <Field label="Title">
            <TextInput value={c.about.title} onChange={(v) => set("about", { ...c.about, title: v })} />
          </Field>
          <Field label="Introduction">
            <TextArea rows={2} value={c.about.intro} onChange={(v) => set("about", { ...c.about, intro: v })} />
          </Field>
          <Field label="Quote">
            <TextInput value={c.about.quote} onChange={(v) => set("about", { ...c.about, quote: v })} />
          </Field>
          <Field label="Main text" hint="Leave an empty line between paragraphs.">
            <TextArea rows={8} value={c.about.body} onChange={(v) => set("about", { ...c.about, body: v })} />
          </Field>
          <ImageInput label="Page photo" value={c.about.image} onChange={(v) => set("about", { ...c.about, image: v })} />
        </Card>
      )}

      {tab === "vision" && (
        <Card title="Vision 2035 page">
          <Field label="Title">
            <TextInput value={c.vision.title} onChange={(v) => set("vision", { ...c.vision, title: v })} />
          </Field>
          <Field label="Introduction" hint="Also shown on the home page above the sector photos.">
            <TextArea rows={2} value={c.vision.intro} onChange={(v) => set("vision", { ...c.vision, intro: v })} />
          </Field>
          <Field label="Main text" hint="Leave an empty line between paragraphs.">
            <TextArea rows={7} value={c.vision.body} onChange={(v) => set("vision", { ...c.vision, body: v })} />
          </Field>
          <ImageInput label="Page photo" value={c.vision.image} onChange={(v) => set("vision", { ...c.vision, image: v })} />
        </Card>
      )}

      {tab === "sectors" && (
        <Card title="Sectors" description="Each sector has its own page. The order here is the order on the website.">
          {c.sectors.map((s, i) => {
            const patch = (p: Partial<typeof s>) => set("sectors", c.sectors.map((x, j) => (j === i ? { ...x, ...p } : x)));
            return (
              <RepeatItem
                key={i}
                title={`${i + 1}. ${s.title || "New sector"}`}
                onUp={i > 0 ? () => set("sectors", move(c.sectors, i, -1)) : undefined}
                onDown={i < c.sectors.length - 1 ? () => set("sectors", move(c.sectors, i, 1)) : undefined}
              >
                <Grid2>
                  <Field label="Full title">
                    <TextInput value={s.title} onChange={(v) => patch({ title: v })} />
                  </Field>
                  <Field label="Short label" hint="Used on photo tiles and menus.">
                    <TextInput value={s.label} onChange={(v) => patch({ label: v })} />
                  </Field>
                </Grid2>
                <Field label="One-line summary">
                  <TextArea rows={2} value={s.summary} onChange={(v) => patch({ summary: v })} />
                </Field>
                <Field label="Page text" hint="Leave an empty line between paragraphs.">
                  <TextArea rows={6} value={s.body} onChange={(v) => patch({ body: v })} />
                </Field>
                <Field label="Focus areas" hint="One per line.">
                  <TextArea rows={3} value={s.focus} onChange={(v) => patch({ focus: v })} />
                </Field>
                <ImageInput label="Photo" value={s.image} onChange={(v) => patch({ image: v })} />
                <p className="text-xs text-ink/45">Page address: /sectors/{s.slug}</p>
              </RepeatItem>
            );
          })}
        </Card>
      )}

      {tab === "roadmap" && (
        <Card title="Roadmap">
          <Field label="Title">
            <TextInput value={c.roadmap.title} onChange={(v) => set("roadmap", { ...c.roadmap, title: v })} />
          </Field>
          <Field label="Introduction">
            <TextArea rows={2} value={c.roadmap.intro} onChange={(v) => set("roadmap", { ...c.roadmap, intro: v })} />
          </Field>
          <Field label="Note under the timeline" hint="Clear it once the dates are confirmed.">
            <TextInput value={c.roadmap.note} onChange={(v) => set("roadmap", { ...c.roadmap, note: v })} />
          </Field>
          <ImageInput label="Photo" value={c.roadmap.image} onChange={(v) => set("roadmap", { ...c.roadmap, image: v })} />
          {c.roadmap.milestones.map((m, i) => {
            const ms = c.roadmap.milestones;
            const setMs = (list: typeof ms) => set("roadmap", { ...c.roadmap, milestones: list });
            return (
              <RepeatItem
                key={i}
                title={`${m.years || "Year"}: ${m.title || "Milestone"}`}
                onUp={i > 0 ? () => setMs(move(ms, i, -1)) : undefined}
                onDown={i < ms.length - 1 ? () => setMs(move(ms, i, 1)) : undefined}
                onRemove={() => setMs(ms.filter((_, j) => j !== i))}
              >
                <Grid2>
                  <Field label="Years">
                    <TextInput value={m.years} onChange={(v) => setMs(ms.map((x, j) => (j === i ? { ...x, years: v } : x)))} />
                  </Field>
                  <Field label="Title">
                    <TextInput value={m.title} onChange={(v) => setMs(ms.map((x, j) => (j === i ? { ...x, title: v } : x)))} />
                  </Field>
                </Grid2>
                <Field label="Text">
                  <TextArea rows={2} value={m.body} onChange={(v) => setMs(ms.map((x, j) => (j === i ? { ...x, body: v } : x)))} />
                </Field>
              </RepeatItem>
            );
          })}
          <button
            type="button"
            onClick={() => set("roadmap", { ...c.roadmap, milestones: [...c.roadmap.milestones, { years: "", title: "", body: "" }] })}
            className="rounded-md border border-dashed border-gold-deep px-4 py-2 text-sm text-gold-deep hover:bg-paper"
          >
            Add milestone
          </button>
        </Card>
      )}

      {tab === "offices" && (
        <Card title="Offices" description="Empty city or address fields show as 'to be announced' on the website.">
          {c.offices.map((o, i) => {
            const patch = (p: Partial<typeof o>) => set("offices", c.offices.map((x, j) => (j === i ? { ...x, ...p } : x)));
            return (
              <RepeatItem key={i} title={o.region || "Office"}>
                <Grid2>
                  <Field label="Region">
                    <TextInput value={o.region} onChange={(v) => patch({ region: v })} />
                  </Field>
                  <Field label="Role" hint="e.g. Headquarters">
                    <TextInput value={o.role} onChange={(v) => patch({ role: v })} />
                  </Field>
                  <Field label="City">
                    <TextInput value={o.city} onChange={(v) => patch({ city: v })} />
                  </Field>
                  <Field label="Email">
                    <TextInput value={o.email} onChange={(v) => patch({ email: v })} />
                  </Field>
                </Grid2>
                <Field label="Address">
                  <TextArea rows={3} value={o.address} onChange={(v) => patch({ address: v })} />
                </Field>
                <ImageInput label="Photo" value={o.image} onChange={(v) => patch({ image: v })} />
              </RepeatItem>
            );
          })}
        </Card>
      )}
    </div>
  );
}
