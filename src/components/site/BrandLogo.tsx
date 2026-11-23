import Link from "next/link";

type Props = {
  href?: string;
  className?: string;
  variant?: "header" | "footer" | "admin" | "hero";
};

const SRC = {
  // Navy mark for light backgrounds
  light: "/brand/logo-pr-mark-navy.png",
  // White mark (transparent) for dark overlays / footer
  dark: "/brand/logo-pr-mark-white.png",
} as const;

export function BrandLogo({
  href = "/",
  className = "",
  variant = "header",
}: Props) {
  const onDark = variant === "footer" || variant === "admin" || variant === "hero";
  const height =
    variant === "hero" ? 120 : variant === "header" ? 52 : variant === "admin" ? 40 : 64;
  const maxWidth =
    variant === "hero" ? 280 : variant === "header" ? 168 : variant === "admin" ? 140 : 200;
  // Stacked mark ~1.4:1 after trim
  const width = Math.round(height * 1.4);
  const src = onDark ? SRC.dark : SRC.light;

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Popular Realtors CBE"
      width={width}
      height={height}
      className="w-auto object-contain object-left drop-shadow-sm"
      style={{
        height,
        width: "auto",
        maxWidth,
      }}
    />
  );

  if (!href) {
    return <div className={`inline-flex items-center ${className}`}>{img}</div>;
  }

  return (
    <Link href={href} className={`inline-flex items-center ${className}`}>
      {img}
    </Link>
  );
}
