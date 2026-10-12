import Link from "next/link";

export default function Breadcrumbs({ items }: { items: Array<{ name: string; href?: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[13px] text-[#6e6e73]">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={item.name} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden="true" className="text-black/30">/</span>
            )}
            {item.href ? (
              <Link href={item.href} className="transition hover:text-black hover:underline">
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-[#1d1d1f]">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
