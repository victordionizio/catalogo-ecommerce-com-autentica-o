export function ProductDetailSkeleton() {
    return (
        <div aria-busy="true" aria-label="A carregar produto">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                <div>
                    <div className="overflow-hidden rounded-lg border border-slate-100 bg-white shadow-card">
                        <div className="aspect-square animate-pulse bg-slate-200" />
                    </div>
                    <div className="mt-4 grid grid-cols-4 gap-3">
                        {Array.from({ length: 4 }, (_, i) => (
                            <div key={i} className="aspect-square animate-pulse rounded-lg bg-slate-200" />
                        ))}
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="h-6 w-40 animate-pulse rounded bg-slate-200" />
                    <div className="h-12 w-full max-w-lg animate-pulse rounded bg-slate-200" />
                    <div className="h-10 w-32 animate-pulse rounded bg-slate-200" />
                    <div className="space-y-2 pt-6">
                        <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
                        <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
                        <div className="h-3 w-2/3 animate-pulse rounded bg-slate-200" />
                    </div>
                    <div className="flex gap-3 pt-6">
                        <div className="h-12 flex-1 animate-pulse rounded-lg bg-slate-200" />
                        <div className="h-12 flex-1 animate-pulse rounded-lg bg-slate-200" />
                    </div>
                </div>
            </div>
        </div>
    );
}
