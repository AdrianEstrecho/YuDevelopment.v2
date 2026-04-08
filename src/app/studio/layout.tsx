// The Studio brings its own root HTML/styles, so we use a minimal pass-through layout
// that bypasses the site Navigation and Footer.
export const metadata = {
  title: "Sanity Studio",
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
