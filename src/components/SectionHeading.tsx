import ScrollReveal from "./ScrollReveal";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  light?: boolean;
}

export default function SectionHeading({ label, title, description, light }: SectionHeadingProps) {
  return (
    <ScrollReveal className="max-w-3xl">
      <p className={`text-xs font-semibold uppercase tracking-[0.2em] mb-4 ${light ? "text-gray-400" : "text-gray-500"}`}>
        {label}
      </p>
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-serif leading-tight ${light ? "text-white" : "text-gray-900"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-6 text-lg leading-relaxed ${light ? "text-gray-400" : "text-gray-600"}`}>
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}
