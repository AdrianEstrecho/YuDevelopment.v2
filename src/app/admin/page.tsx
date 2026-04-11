"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import type { Json } from "@/lib/content";

type AuthState = "checking" | "unauthenticated" | "authenticated";

interface Tab {
  key: string;
  label: string;
  icon: string;
  description: string;
  path: (string | number)[];
  target: string;
}

const TABS: Tab[] = [
  { key: "navigation", label: "Navigation", icon: "🔗", description: "Site navigation links shown in the header.", path: ["navigation", "links"], target: "/" },
  { key: "brand", label: "Brand", icon: "🏢", description: "Company name, contact info, and copyright.", path: ["brand"], target: "/" },
  { key: "hero", label: "Hero", icon: "🔥", description: "Home page hero — main title, description, and CTAs.", path: ["home", "hero"], target: "/#hero" },
  { key: "armA", label: "Services", icon: "💼", description: "Cash flow services arm content (A).", path: ["home", "armA"], target: "/#services-arm" },
  { key: "armB", label: "Equity", icon: "🏗️", description: "Equity development arm content (B).", path: ["home", "armB"], target: "/#equity-arm" },
  { key: "capabilities", label: "Capabilities", icon: "⚡", description: "End-to-end platform capabilities grid.", path: ["home", "capabilities"], target: "/#capabilities" },
  { key: "featured", label: "Featured", icon: "⭐", description: "Featured projects shown on the home page.", path: ["home", "featuredProjects"], target: "/#featured" },
  { key: "homeCta", label: "Home CTA", icon: "📢", description: "Home page call-to-action section.", path: ["home", "cta"], target: "/#home-cta" },
  { key: "about", label: "About", icon: "📖", description: "About page — model, values, and milestones.", path: ["about"], target: "/about" },
  { key: "portfolio", label: "Portfolio", icon: "🗂️", description: "Portfolio projects and pipeline copy.", path: ["portfolio"], target: "/portfolio" },
  { key: "people", label: "People", icon: "👥", description: "Team members and company culture.", path: ["people"], target: "/people" },
  { key: "invest", label: "Invest", icon: "💰", description: "Investment thesis, strategies, and machine.", path: ["invest"], target: "/invest" },
  { key: "contact", label: "Contact", icon: "✉️", description: "Contact page hero and inquiry copy.", path: ["contact"], target: "/contact" },
];

const IMAGE_KEYS = new Set(["image", "photo", "avatar", "logo", "backgroundImage", "background", "gallery"]);

function isImageKey(key: string) {
  if (IMAGE_KEYS.has(key)) return true;
  const lower = key.toLowerCase();
  return lower.endsWith("image") || lower.endsWith("photo") || lower.endsWith("background");
}

function isLongTextKey(key: string) {
  const k = key.toLowerCase();
  return (
    k.includes("description") ||
    k.includes("bio") ||
    k.includes("tagline") ||
    k === "event" ||
    k === "desc" ||
    k.includes("text") ||
    k.includes("paragraph")
  );
}

function humanize(key: string) {
  if (!key) return "";
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (c) => c.toUpperCase())
    .replace(/_/g, " ")
    .trim();
}

function singularize(word: string): string {
  if (!word) return word;
  const lower = word.toLowerCase();
  if (lower.endsWith("ies")) return word.slice(0, -3) + "y";
  if (lower.endsWith("ses")) return word.slice(0, -2);
  if (lower.endsWith("s") && !lower.endsWith("ss")) return word.slice(0, -1);
  return word;
}

function getAtPath(obj: Json | null | undefined, path: (string | number)[]): Json | undefined {
  let current: Json | undefined = obj ?? undefined;
  for (const key of path) {
    if (current == null || typeof current !== "object") return undefined;
    if (Array.isArray(current)) {
      if (typeof key === "number") current = current[key];
      else return undefined;
    } else {
      current = (current as Record<string, Json>)[key as string];
    }
  }
  return current;
}

function setAtPath(obj: Json, path: (string | number)[], value: Json): Json {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  if (Array.isArray(obj)) {
    const next = [...obj];
    next[head as number] = setAtPath(next[head as number] ?? null, rest, value);
    return next;
  }
  if (obj && typeof obj === "object") {
    return {
      ...obj,
      [head as string]: setAtPath((obj as Record<string, Json>)[head as string] ?? null, rest, value),
    };
  }
  return value;
}

function cloneTemplate(value: Json): Json {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return "";
  if (typeof value === "number") return 0;
  if (typeof value === "boolean") return false;
  if (Array.isArray(value)) return [];
  const out: Record<string, Json> = {};
  for (const [k, v] of Object.entries(value)) {
    out[k] = cloneTemplate(v);
  }
  return out;
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-navy-300 mb-2">
      {children}
    </label>
  );
}

function ImageInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.ok) onChange(data.url);
      else alert("Upload failed: " + data.error);
    } catch (err) {
      alert("Upload failed: " + (err instanceof Error ? err.message : "Unknown"));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/uploads/image.png or https://..."
        className="w-full px-3 py-2.5 bg-[#06101f] border border-navy-800 rounded text-white text-sm focus:outline-none focus:border-blue-500/60 transition-colors"
      />
      <div className="flex items-center gap-2">
        <label className="cursor-pointer px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-navy-800 hover:bg-navy-700 text-white rounded">
          {uploading ? "Uploading..." : "Upload Image"}
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={uploading} />
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-navy-900 hover:bg-navy-800 border border-navy-800 text-navy-300 rounded"
          >
            Clear
          </button>
        )}
      </div>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="preview" className="mt-2 max-h-28 rounded border border-navy-800" />
      )}
    </div>
  );
}

function getItemDisplayName(item: Json, fallback: string): string {
  if (typeof item === "string") return item || fallback;
  if (typeof item === "number" || typeof item === "boolean") return String(item);
  if (item && typeof item === "object" && !Array.isArray(item)) {
    const obj = item as Record<string, Json>;
    for (const key of ["name", "title", "label", "heading"]) {
      if (typeof obj[key] === "string" && obj[key]) return obj[key] as string;
    }
  }
  return fallback;
}

function SortableArray({
  path,
  value,
  parentKey,
  onChange,
}: {
  path: (string | number)[];
  value: Json[];
  parentKey: string;
  onChange: (path: (string | number)[], value: Json) => void;
}) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const template = value.length > 0 ? cloneTemplate(value[0]) : "";
  const itemLabel = singularize(parentKey).toUpperCase().replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
  const sectionLabel = humanize(parentKey).toUpperCase();

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIndex !== index) setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (dragIndex !== null && dragIndex !== dropIndex) {
      const reordered = [...value];
      const [moved] = reordered.splice(dragIndex, 1);
      reordered.splice(dropIndex, 0, moved);
      onChange(path, reordered);
      // Update expanded index to follow the item
      if (expandedIndex === dragIndex) setExpandedIndex(dropIndex);
      else if (expandedIndex !== null) {
        // Adjust if the expanded item shifted
        if (dragIndex < expandedIndex && dropIndex >= expandedIndex) setExpandedIndex(expandedIndex - 1);
        else if (dragIndex > expandedIndex && dropIndex <= expandedIndex) setExpandedIndex(expandedIndex + 1);
      }
    }
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const isObjectArray = value.length > 0 && value[0] !== null && typeof value[0] === "object" && !Array.isArray(value[0]);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-navy-300">{sectionLabel}</p>
        <button
          type="button"
          onClick={() => {
            onChange(path, [...value, template]);
            setExpandedIndex(value.length);
          }}
          className="text-[10px] font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300"
        >
          + Add
        </button>
      </div>
      {value.length === 0 && (
        <p className="text-xs text-navy-500 italic mb-2">No items yet — click Add to create one.</p>
      )}
      <div className="space-y-2">
        {value.map((item, i) => {
          const isExpanded = expandedIndex === i;
          const displayName = getItemDisplayName(item, `${itemLabel} ${i + 1}`);

          return (
            <div
              key={i}
              draggable
              onDragStart={(e) => handleDragStart(e, i)}
              onDragOver={(e) => handleDragOver(e, i)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, i)}
              onDragEnd={handleDragEnd}
              className={`bg-[#0a1426] border rounded-lg transition-all ${
                dragIndex === i
                  ? "opacity-40 border-navy-800"
                  : dragOverIndex === i
                    ? "border-blue-500 ring-1 ring-blue-500/30"
                    : "border-navy-800"
              }`}
            >
              {/* Collapsed header — always visible */}
              <div
                className={`flex items-center justify-between px-4 py-3 cursor-pointer select-none ${
                  isExpanded ? "border-b border-navy-800/70" : ""
                }`}
                onClick={() => setExpandedIndex(isExpanded ? null : i)}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="cursor-grab active:cursor-grabbing text-navy-500 hover:text-navy-300 flex-shrink-0"
                    title="Drag to reorder"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                      <circle cx="5" cy="3" r="1.5" />
                      <circle cx="11" cy="3" r="1.5" />
                      <circle cx="5" cy="8" r="1.5" />
                      <circle cx="11" cy="8" r="1.5" />
                      <circle cx="5" cy="13" r="1.5" />
                      <circle cx="11" cy="13" r="1.5" />
                    </svg>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-navy-500 flex-shrink-0">
                    {i + 1}
                  </span>
                  {isObjectArray ? (
                    <span className="text-sm font-medium text-white truncate">{displayName}</span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-navy-300">
                      {itemLabel} {i + 1}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (expandedIndex === i) setExpandedIndex(null);
                      else if (expandedIndex !== null && expandedIndex > i) setExpandedIndex(expandedIndex - 1);
                      onChange(path, value.filter((_, idx) => idx !== i));
                    }}
                    className="text-[10px] font-medium text-red-400/90 hover:text-red-300 flex items-center gap-1"
                  >
                    <span>✕</span> Remove
                  </button>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className={`text-navy-500 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  >
                    <path d="M3 4.5L6 7.5L9 4.5" />
                  </svg>
                </div>
              </div>

              {/* Expanded editor */}
              {isExpanded && (
                <div className="px-4 py-4">
                  {typeof item === "string" || typeof item === "number" || typeof item === "boolean" ? (
                    <Field
                      path={[...path, i]}
                      value={item}
                      parentKey={singularize(parentKey)}
                      onChange={onChange}
                    />
                  ) : (
                    <ObjectFields path={[...path, i]} value={item} onChange={onChange} />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface FieldProps {
  path: (string | number)[];
  value: Json;
  parentKey: string;
  onChange: (path: (string | number)[], value: Json) => void;
}

function Field({ path, value, parentKey, onChange }: FieldProps) {
  const label = humanize(parentKey);

  if (typeof value === "string" && isImageKey(parentKey)) {
    return (
      <div className="mb-5">
        <Label>{label}</Label>
        <ImageInput value={value} onChange={(v) => onChange(path, v)} />
      </div>
    );
  }

  if (typeof value === "string" && (isLongTextKey(parentKey) || value.length > 80)) {
    return (
      <div className="mb-5">
        <Label>{label}</Label>
        <textarea
          value={value}
          onChange={(e) => onChange(path, e.target.value)}
          rows={Math.max(2, Math.min(8, Math.ceil(value.length / 60)))}
          className="w-full px-3 py-2.5 bg-[#06101f] border border-navy-800 rounded text-white text-sm focus:outline-none focus:border-blue-500/60 resize-y leading-relaxed transition-colors"
        />
      </div>
    );
  }

  if (typeof value === "string" && parentKey === "status") {
    const statusOptions = ["Coming Soon", "Under Construction", "Completed"];
    return (
      <div className="mb-5">
        <Label>{label}</Label>
        <select
          value={value}
          onChange={(e) => onChange(path, e.target.value)}
          className="w-full px-3 py-2.5 bg-[#06101f] border border-navy-800 rounded text-white text-sm focus:outline-none focus:border-blue-500/60 transition-colors"
        >
          {!statusOptions.includes(value) && <option value={value}>{value || "— Select —"}</option>}
          {statusOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    );
  }

  if (typeof value === "string") {
    return (
      <div className="mb-5">
        <Label>{label}</Label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(path, e.target.value)}
          className="w-full px-3 py-2.5 bg-[#06101f] border border-navy-800 rounded text-white text-sm focus:outline-none focus:border-blue-500/60 transition-colors"
        />
      </div>
    );
  }

  if (typeof value === "number") {
    return (
      <div className="mb-5">
        <Label>{label}</Label>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(path, Number(e.target.value))}
          className="w-full px-3 py-2.5 bg-[#06101f] border border-navy-800 rounded text-white text-sm focus:outline-none focus:border-blue-500/60 transition-colors"
        />
      </div>
    );
  }

  if (parentKey === "coordinates") {
    const arr = Array.isArray(value) ? value : [];
    const lng = typeof arr[0] === "number" ? arr[0] : "";
    const lat = typeof arr[1] === "number" ? arr[1] : "";
    const update = (nextLng: number | "", nextLat: number | "") => {
      onChange(path, [
        nextLng === "" ? 0 : nextLng,
        nextLat === "" ? 0 : nextLat,
      ]);
    };
    return (
      <div className="mb-5">
        <Label>Coordinates</Label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-navy-400 mb-1">Longitude</p>
            <input
              type="number"
              step="any"
              value={lng}
              placeholder="-84.388"
              onChange={(e) => {
                const v = e.target.value === "" ? "" : Number(e.target.value);
                update(v, lat);
              }}
              className="w-full px-3 py-2.5 bg-[#06101f] border border-navy-800 rounded text-white text-sm focus:outline-none focus:border-blue-500/60 transition-colors"
            />
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-navy-400 mb-1">Latitude</p>
            <input
              type="number"
              step="any"
              value={lat}
              placeholder="33.749"
              onChange={(e) => {
                const v = e.target.value === "" ? "" : Number(e.target.value);
                update(lng, v);
              }}
              className="w-full px-3 py-2.5 bg-[#06101f] border border-navy-800 rounded text-white text-sm focus:outline-none focus:border-blue-500/60 transition-colors"
            />
          </div>
        </div>
        <p className="text-[10px] text-navy-500 mt-2 leading-relaxed">
          Find on <a href="https://www.google.com/maps" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Google Maps</a> — right-click a location to copy lat/long, then paste latitude into the right field and longitude into the left.
        </p>
      </div>
    );
  }

  if (Array.isArray(value)) {
    return (
      <SortableArray path={path} value={value} parentKey={parentKey} onChange={onChange} />
    );
  }

  if (value && typeof value === "object") {
    return (
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-navy-300 mb-3">{label.toUpperCase()}</p>
        <div className="bg-[#0a1426] border border-navy-800 rounded-lg p-4">
          <ObjectFields path={path} value={value} onChange={onChange} />
        </div>
      </div>
    );
  }

  return null;
}

function ObjectFields({
  path,
  value,
  onChange,
}: {
  path: (string | number)[];
  value: Json;
  onChange: (path: (string | number)[], value: Json) => void;
}) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return (
    <>
      {Object.entries(value as Record<string, Json>).map(([key, val]) => (
        <Field key={key} path={[...path, key]} value={val} parentKey={key} onChange={onChange} />
      ))}
    </>
  );
}

function LoginScreen({ onSuccess, onExit }: { onSuccess: () => void; onExit: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.ok) {
        onSuccess();
      } else {
        setError(data.error || "Invalid password");
      }
    } catch {
      setError("Login failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#060d1b] flex items-center justify-center px-6">
      <button
        onClick={onExit}
        className="absolute top-5 right-6 text-[10px] font-bold uppercase tracking-wider text-navy-400 hover:text-white"
      >
        ← Back to Site
      </button>

      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <h1 className="text-3xl font-bold tracking-wider text-white">YGCCC</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 border border-blue-400/40 px-2 py-0.5 rounded">
              ADMIN
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mb-1">Sign In</h2>
          <p className="text-sm text-navy-400">Enter the admin password to continue.</p>
        </div>

        <div className="mb-4">
          <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-navy-300 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            disabled={submitting}
            placeholder="••••••••"
            className="w-full px-3 py-2.5 bg-[#06101f] border border-navy-800 rounded text-white text-sm focus:outline-none focus:border-blue-500/60 transition-colors"
          />
        </div>

        {error && <p className="text-xs text-red-400 mb-4 text-center">{error}</p>}

        <button
          type="submit"
          disabled={submitting || !password}
          className="w-full px-4 py-2.5 text-xs font-bold uppercase tracking-wider bg-white text-navy-900 rounded hover:bg-gray-100 disabled:opacity-50 transition-colors"
        >
          {submitting ? "Signing In..." : "Sign In"}
        </button>

        <p className="mt-6 text-[10px] text-center text-navy-500 uppercase tracking-wider">
          Press Esc to go back
        </p>
      </form>
    </div>
  );
}

const PANEL_WIDTH_KEY = "admin_panel_width";
const MIN_PANEL_WIDTH = 360;
const MAX_PANEL_WIDTH_RATIO = 0.85; // max 85% of viewport
const DEFAULT_PANEL_WIDTH = 640;

export default function AdminPage() {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>("checking");
  const [content, setContent] = useState<Record<string, Json> | null>(null);
  const [activeKey, setActiveKey] = useState<string>(TABS[0].key);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [loadError, setLoadError] = useState<string | null>(null);
  const [panelWidth, setPanelWidth] = useState<number>(DEFAULT_PANEL_WIDTH);
  const [isResizing, setIsResizing] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    if (!profileOpen) return;
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [profileOpen]);

  // Check auth on mount
  useEffect(() => {
    fetch("/api/auth/check")
      .then((r) => r.json())
      .then((data) => {
        setAuthState(data.authenticated ? "authenticated" : "unauthenticated");
      })
      .catch(() => setAuthState("unauthenticated"));
  }, []);

  // Load saved panel width
  useEffect(() => {
    try {
      const saved = localStorage.getItem(PANEL_WIDTH_KEY);
      if (saved) {
        const w = parseInt(saved, 10);
        if (!Number.isNaN(w) && w >= MIN_PANEL_WIDTH) {
          setPanelWidth(Math.min(w, window.innerWidth * MAX_PANEL_WIDTH_RATIO));
        }
      }
    } catch {}
  }, []);

  // Resize handlers
  useEffect(() => {
    if (!isResizing) return;

    const handleMove = (e: MouseEvent) => {
      const newWidth = window.innerWidth - e.clientX;
      const max = window.innerWidth * MAX_PANEL_WIDTH_RATIO;
      const clamped = Math.max(MIN_PANEL_WIDTH, Math.min(newWidth, max));
      setPanelWidth(clamped);
    };

    const handleUp = () => {
      setIsResizing(false);
    };

    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [isResizing]);

  // Persist width when resize ends
  useEffect(() => {
    if (isResizing) return;
    try {
      localStorage.setItem(PANEL_WIDTH_KEY, String(Math.round(panelWidth)));
    } catch {}
  }, [isResizing, panelWidth]);

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleTabClick = (tab: Tab) => {
    setActiveKey(tab.key);
    if (!iframeRef.current) return;

    try {
      const cw = iframeRef.current.contentWindow;
      const currentHref = cw?.location.href;
      if (currentHref && cw) {
        const current = new URL(currentHref);
        const next = new URL(tab.target, current.origin);
        if (current.pathname === next.pathname) {
          // Same page — just update the hash so it scrolls to the anchor
          cw.location.hash = next.hash || "";
          // If clearing the hash, also scroll to top
          if (!next.hash) cw.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
      }
    } catch {}

    // Different page or cross-origin error — full navigation
    iframeRef.current.src = tab.target;
  };

  // Load content when authenticated
  useEffect(() => {
    if (authState !== "authenticated" || content) return;
    fetch("/api/content")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setLoadError(data.error);
        else setContent(data);
      })
      .catch((err) => setLoadError(err.message));
  }, [authState, content]);

  // Esc key to exit back to site
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.push("/");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  const handleChange = useCallback((path: (string | number)[], value: Json) => {
    setContent((prev) => {
      if (!prev) return prev;
      return setAtPath(prev as Json, path, value) as Record<string, Json>;
    });
  }, []);

  const reloadPreview = () => {
    if (!iframeRef.current) return;
    try {
      // Prefer contentWindow.location.reload() — forces a fresh request even on hash URLs
      iframeRef.current.contentWindow?.location.reload();
    } catch {
      // Fallback: cache-bust by appending a timestamp
      try {
        const cw = iframeRef.current.contentWindow;
        const currentHref = cw?.location.href;
        if (currentHref) {
          const url = new URL(currentHref);
          url.searchParams.set("_t", String(Date.now()));
          iframeRef.current.src = url.pathname + url.search + url.hash;
          return;
        }
      } catch {}
      // Last resort
      const src = iframeRef.current.src;
      iframeRef.current.src = "about:blank";
      setTimeout(() => {
        if (iframeRef.current) iframeRef.current.src = src;
      }, 50);
    }
  };

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    setSaveStatus("idle");
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (data.ok) {
        setSaveStatus("success");
        setTimeout(() => setSaveStatus("idle"), 2500);
        // Wait a tick so revalidatePath fully propagates, then reload preview
        setTimeout(reloadPreview, 100);
      } else {
        setSaveStatus("error");
      }
    } catch {
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    setAuthState("unauthenticated");
    setContent(null);
    setLoadError(null);
  };

  // Loading auth check
  if (authState === "checking") {
    return (
      <div className="fixed inset-0 z-[100] bg-[#060d1b] flex items-center justify-center">
        <p className="text-navy-400 text-sm">Loading...</p>
      </div>
    );
  }

  // Login screen
  if (authState === "unauthenticated") {
    return (
      <LoginScreen
        onSuccess={() => setAuthState("authenticated")}
        onExit={() => router.push("/")}
      />
    );
  }

  // Authenticated → split view
  const activeTab = TABS.find((t) => t.key === activeKey) ?? TABS[0];
  const activeContent = content ? getAtPath(content, activeTab.path) : undefined;
  const lastPathSegment = String(activeTab.path[activeTab.path.length - 1] ?? "");

  return (
    <div className="fixed inset-0 z-[100] bg-[#060d1b] flex">
      {/* Live site preview (left) */}
      <div className="hidden lg:block flex-1 bg-white relative min-w-0">
        <iframe
          ref={iframeRef}
          src="/"
          className="w-full h-full border-0"
          title="Site preview"
        />
        {isResizing && <div className="absolute inset-0 bg-transparent" />}
      </div>

      {/* Editor panel (right) */}
      <aside
        style={{ width: `min(100vw, ${panelWidth}px)` }}
        className="relative bg-[#060d1b] text-white flex flex-col border-l border-navy-800 shadow-2xl flex-shrink-0"
      >
        {/* Resize handle */}
        <div
          onMouseDown={startResize}
          title="Drag to resize"
          className={`hidden lg:block absolute left-0 top-0 bottom-0 w-1.5 -ml-[3px] cursor-ew-resize z-20 group ${
            isResizing ? "bg-blue-500/60" : "hover:bg-blue-500/40"
          } transition-colors`}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-10 bg-navy-700 group-hover:bg-blue-400 rounded-full" />
        </div>
        {/* Top bar */}
        <header className="px-5 py-3 border-b border-navy-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold tracking-wider text-white">YGCCC</h1>
            <span className="text-[9px] font-bold uppercase tracking-wider text-blue-300 border border-blue-400/40 px-2 py-0.5 rounded">
              ADMIN
            </span>
          </div>
          <div className="flex items-center gap-3">
            {saveStatus === "success" && <span className="text-[11px] text-green-400">Saved ✓</span>}
            {saveStatus === "error" && <span className="text-[11px] text-red-400">Failed</span>}
            <button
              onClick={handleSave}
              disabled={saving || !content}
              className="px-4 py-1.5 text-xs font-bold tracking-wide bg-white text-navy-900 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen((o) => !o)}
                title="Profile"
                className={`w-7 h-7 rounded-full bg-navy-800 border flex items-center justify-center text-xs font-bold text-navy-200 transition-colors ${
                  profileOpen
                    ? "border-blue-500/60 bg-navy-700"
                    : "border-navy-700 hover:bg-navy-700"
                }`}
              >
                A
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-[#0a1426] border border-navy-700 rounded-lg shadow-2xl overflow-hidden z-30">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      router.push("/");
                    }}
                    className="w-full px-4 py-2.5 text-left text-xs font-medium text-navy-200 hover:bg-navy-800 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span>🌐</span>
                    <span>View Website</span>
                  </button>
                  <div className="border-t border-navy-800" />
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      handleLogout();
                    }}
                    className="w-full px-4 py-2.5 text-left text-xs font-medium text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors flex items-center gap-2"
                  >
                    <span>↪</span>
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="px-3 pt-2 border-b border-navy-800 flex flex-wrap gap-x-1 flex-shrink-0">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab)}
              className={`px-3 py-2 text-[11px] font-medium flex items-center gap-1.5 transition-colors border-b-2 -mb-px ${
                activeKey === tab.key
                  ? "text-white border-blue-500"
                  : "text-navy-400 hover:text-white border-transparent"
              }`}
            >
              <span className="text-sm leading-none">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 admin-scroll">
          {loadError && <p className="text-red-400 text-sm">Error loading content: {loadError}</p>}
          {!content && !loadError && <p className="text-navy-400 text-sm">Loading content...</p>}
          {content && (
            <>
              <h2 className="text-2xl font-bold text-white mb-1">{activeTab.label}</h2>
              <p className="text-sm text-navy-400 mb-6">{activeTab.description}</p>
              {activeContent !== undefined && activeContent !== null ? (
                Array.isArray(activeContent) ? (
                  <Field
                    path={activeTab.path}
                    value={activeContent}
                    parentKey={lastPathSegment}
                    onChange={handleChange}
                  />
                ) : typeof activeContent === "object" ? (
                  <ObjectFields path={activeTab.path} value={activeContent} onChange={handleChange} />
                ) : (
                  <Field
                    path={activeTab.path}
                    value={activeContent}
                    parentKey={lastPathSegment}
                    onChange={handleChange}
                  />
                )
              ) : (
                <p className="text-navy-500 text-sm italic">No content for this section.</p>
              )}
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
