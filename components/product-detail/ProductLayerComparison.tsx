import type { Product } from "@/lib/products";

function StatusMark({ value }: { value: string }) {
  if (value !== "yes" && value !== "no") {
    return <span className="text-[13px] font-bold">{value}</span>;
  }

  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mx-auto h-4 w-4"
      aria-label={value === "yes" ? "Included" : "Not included"}
      role="img"
    >
      {value === "yes" ? (
        <path d="M3 8.5l3 3L13 4" />
      ) : (
        <>
          <path d="M4 4l8 8" />
          <path d="M12 4l-8 8" />
        </>
      )}
    </svg>
  );
}

export default function ProductLayerComparison({
  product,
}: {
  product: Product;
}) {
  return (
    <section className="bg-white px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1180px]">
        <h2 className="mx-auto mb-14 max-w-[680px] text-center text-2xl font-black leading-[0.98] tracking-[-0.055em] sm:text-3xl">
          {product.layerTitle}
        </h2>

        <div className="overflow-x-auto pb-2">
          <div className="grid min-w-[680px] grid-cols-[1.2fr_0.95fr_0.95fr_0.95fr] gap-x-4 gap-y-0 text-[12px] font-bold">
            <div />
            <div
              className="rounded-t-3xl border-[0.5px] border-white px-4 py-7 text-center text-white"
              style={{ backgroundColor: product.accent }}
            >
              <span className="text-lg font-black tracking-[-0.05em]">
                pach+
              </span>
            </div>
            <div className="rounded-t-3xl border-[0.5px] border-white bg-[#F0F1ED] px-4 py-7 text-center">
              Pills
            </div>
            <div className="rounded-t-3xl border-[0.5px] border-white bg-[#F0F1ED] px-4 py-7 text-center">
              Creams
            </div>

            {product.comparisonRows.map((row, index) => (
              <div key={row.label} className="contents">
                <div className="flex min-h-14 items-center pr-4 text-[13px] leading-tight">
                  {row.label}
                </div>
                <div
                  className={`flex min-h-14 items-center justify-center border-[0.5px] border-white px-4 text-white ${
                    index === product.comparisonRows.length - 1
                      ? "rounded-b-3xl"
                      : ""
                  }`}
                  style={{ backgroundColor: product.accent }}
                >
                  <StatusMark value={row.pach} />
                </div>
                <div
                  className={`flex min-h-14 items-center justify-center border-[0.5px] border-white bg-[#F0F1ED] px-4 text-black/35 ${
                    index === product.comparisonRows.length - 1
                      ? "rounded-b-3xl"
                      : ""
                  }`}
                >
                  <StatusMark value={row.pills} />
                </div>
                <div
                  className={`flex min-h-14 items-center justify-center border-[0.5px] border-white bg-[#F0F1ED] px-4 text-black/35 ${
                    index === product.comparisonRows.length - 1
                      ? "rounded-b-3xl"
                      : ""
                  }`}
                >
                  <StatusMark value={row.alternatives} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
