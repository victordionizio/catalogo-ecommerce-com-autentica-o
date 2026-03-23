function SkeletonCard() {
    return (
        <div className="overflow-hidden rounded-lg border border-slate-100 bg-white shadow-card">
            <div className="aspect-[4/3] animate-pulse bg-slate-200" />
            <div className="space-y-3 p-4">
                <div className="flex justify-between gap-2">
                    <div className="h-4 flex-1 animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
                </div>
                <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-11/12 animate-pulse rounded bg-slate-200" />
                <div className="h-10 w-full animate-pulse rounded-lg bg-slate-200" />
            </div>
        </div>
    );
}

export function ProductGridSkeleton({ count = 12 }) {
    return (
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3" aria-busy="true" aria-label="A carregar produtos">
            {Array.from({ length: count }, (_, i) => (
                <li key={i}>
                    <SkeletonCard />
                </li>
            ))}
        </ul>
    );
}
