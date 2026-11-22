import Image from "next/image";
import Link from "next/link";

type Props = {
  href?: string;
  className?: string;
  variant?: "header" | "footer" | "admin";
};

export function BrandLogo({
  href = "/",
  className = "",
  variant = "header",
}: Props) {
  const height = variant === "header" ? 48 : variant === "admin" ? 38 : 56;
  const onDark = variant === "footer" || variant === "admin";
  // Source art is ~1.75:1 (1836×1050)
  const width = Math.round(height * 1.75);

  const img = (
    <Image
      src="/brand/logo-popular-realtors.png"
      alt="Popular Realtors CBE · Real Estate"
      width={width}
      height={height}
      className={`w-auto object-contain object-left ${
        onDark ? "brightness-0 invert" : ""
      }`}
      style={{
        height,
        width: "auto",
        maxWidth: variant === "header" ? 220 : 260,
      }}
      priority={variant === "header"}
      unoptimized
    />
  );

  if (!href) return <div className={className}>{img}</div>;

  return (
    <Link href={href} className={`inline-flex items-center ${className}`}>
      {img}
    </Link>
  );
}
