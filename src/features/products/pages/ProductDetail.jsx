import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductDetail } from '@/features/products/hooks/useProductDetail.js';
import { AlertBanner } from '@/shared/components/AlertBanner.jsx';
import { Button } from '@/shared/components/Button.jsx';
import { ProductDetailSkeleton } from '@/shared/components/ProductDetailSkeleton.jsx';

function TruckIcon() {
    return (
        <svg className="h-5 w-5 shrink-0 text-indigo-600" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
                d="M14 18V6a2 2 0 00-2-2H4a2 2 0 00-2 2v11a2 2 0 002 2h2m10-13h4l3 4v5h-4m-7 4h8M9 18h6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}

function ShieldIcon() {
    return (
        <svg className="h-5 w-5 shrink-0 text-indigo-600" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
                d="M12 3l7 4v5c0 5-3.5 9-7 7-3.5 2-7-2-7-7V7l7-4z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function BagIcon() {
    return (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
                d="M6 7h15l-1.5 9h-12L6 7zm0 0L5 3H2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    );
}

const SWATCH_COLORS = [
    { id: 'navy', className: 'bg-slate-800 ring-slate-300' },
    { id: 'silver', className: 'bg-slate-200 ring-slate-300' },
    { id: 'indigo', className: 'bg-indigo-600 ring-indigo-300' },
];

export function ProductDetail() {
    const { product, loading, error, clearError } = useProductDetail();
    const [activeImg, setActiveImg] = useState(0);
    const [colorId, setColorId] = useState(SWATCH_COLORS[2].id);

    const galleryImages = useMemo(() => {
        if (!product) {
            return [];
        }
        const id = product.id;
        const main = product.image_url;
        const extras = [
            `https://picsum.photos/seed/pdp-${id}-1/900/900`,
            `https://picsum.photos/seed/pdp-${id}-2/900/900`,
            `https://picsum.photos/seed/pdp-${id}-3/900/900`,
        ];
        return main ? [main, ...extras] : extras;
    }, [product]);

    useEffect(() => {
        setActiveImg(0);
    }, [product?.id]);

    const price =
        product && product.price !== undefined && product.price !== null
            ? Number(product.price).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
              })
            : null;

    return (
        <div className="mx-auto max-w-container px-4 pb-16 pt-8 sm:px-8">
            <Link
                to="/"
                className="mb-8 inline-flex text-sm font-medium text-indigo-600 no-underline hover:text-indigo-700"
            >
                ← Voltar ao catálogo
            </Link>

            {loading && <ProductDetailSkeleton />}

            {!loading && error && (
                <AlertBanner title="Não foi possível mostrar o produto" onDismiss={clearError}>
                    {error}
                </AlertBanner>
            )}

            {!loading && !error && product && (
                <>
                    <article className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                        <div>
                            <div className="overflow-hidden rounded-lg border border-slate-100 bg-white shadow-card">
                                {galleryImages[activeImg] ? (
                                    <img
                                        src={galleryImages[activeImg]}
                                        alt=""
                                        className="aspect-square w-full object-cover"
                                        decoding="async"
                                        fetchPriority="high"
                                    />
                                ) : (
                                    <div className="flex aspect-square items-center justify-center bg-slate-100 text-slate-400">
                                        Sem imagem
                                    </div>
                                )}
                            </div>
                            <div className="mt-4 grid grid-cols-4 gap-3">
                                {galleryImages.map((src, i) => (
                                    <button
                                        key={src}
                                        type="button"
                                        onClick={() => setActiveImg(i)}
                                        className={`overflow-hidden rounded-lg border-2 bg-slate-50 transition ${
                                            activeImg === i
                                                ? 'border-indigo-600 ring-2 ring-indigo-600/20'
                                                : 'border-transparent hover:border-slate-200'
                                        }`}
                                    >
                                        <img
                                            src={src}
                                            alt=""
                                            className="aspect-square w-full object-cover"
                                            loading={i === activeImg ? 'eager' : 'lazy'}
                                            decoding="async"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="flex flex-wrap items-center gap-3">
                                {product.category?.name && (
                                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-indigo-700">
                                        {product.category.name}
                                    </span>
                                )}
                                <span className="text-sm text-amber-700" title="Valores de demonstração">
                                    ★ 4,9 <span className="text-slate-500">(124 avaliações)</span>
                                </span>
                            </div>

                            <h1 className="ds-h1 mt-4 text-4xl sm:text-5xl">{product.name}</h1>
                            {price && (
                                <p className="mt-4 text-3xl font-bold tracking-tight text-indigo-600">{price}</p>
                            )}

                            <div className="mt-8">
                                <h2 className="ds-label">Descrição</h2>
                                {product.description ? (
                                    <p className="ds-body mt-2 whitespace-pre-wrap leading-relaxed">
                                        {product.description}
                                    </p>
                                ) : (
                                    <p className="ds-body-sm mt-2 text-slate-400">Sem descrição.</p>
                                )}
                            </div>

                            <div className="mt-8">
                                <h2 className="ds-label">Cor</h2>
                                <div className="mt-3 flex gap-3">
                                    {SWATCH_COLORS.map((c) => (
                                        <button
                                            key={c.id}
                                            type="button"
                                            onClick={() => setColorId(c.id)}
                                            className={`h-10 w-10 rounded-full ring-2 ring-offset-2 transition ${c.className} ${
                                                colorId === c.id ? 'ring-indigo-600' : 'ring-transparent hover:ring-slate-300'
                                            }`}
                                            aria-label={`Cor ${c.id}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                                <Button type="button" variant="primary" className="flex-1 gap-2 sm:min-h-[48px]">
                                    <BagIcon />
                                    Adicionar ao carrinho
                                </Button>
                                <Button type="button" variant="secondary" className="flex-1 sm:min-h-[48px]">
                                    Comprar agora
                                </Button>
                            </div>

                            <div className="mt-10 grid gap-4 sm:grid-cols-2">
                                <div className="flex gap-3 rounded-lg border border-slate-100 bg-white p-4 shadow-sm">
                                    <TruckIcon />
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">Envio grátis</p>
                                        <p className="ds-body-sm mt-0.5">Em encomendas acima de R$ 750 (exemplo).</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 rounded-lg border border-slate-100 bg-white p-4 shadow-sm">
                                    <ShieldIcon />
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">Garantia 2 anos</p>
                                        <p className="ds-body-sm mt-0.5">Proteção alargada em peças selecionadas.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    <section className="mt-20 grid gap-10 border-t border-slate-200 pt-16 lg:grid-cols-2 lg:items-center lg:gap-16">
                        <div className="order-2 lg:order-1">
                            <h2 className="ds-h3 text-2xl">Feito para o quotidiano.</h2>
                            <p className="ds-body mt-4">
                                Materiais escolhidos para durar: cristal com tratamento anti-reflexo, caixa em aço
                                inoxidável e acabamentos pensados para uso diário sem perder elegância.
                            </p>
                            <ul className="mt-6 space-y-3">
                                {[
                                    'Aço inoxidável 316L escovado',
                                    'Resistência à água 5 ATM',
                                    'Movimento de quartzo japonês',
                                ].map((line) => (
                                    <li key={line} className="flex gap-3 text-sm text-slate-700">
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600" />
                                        {line}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="order-1 overflow-hidden rounded-lg border border-slate-100 shadow-card lg:order-2">
                            <img
                                src={`https://picsum.photos/seed/pdp-feature-${product.id}/900/700`}
                                alt=""
                                className="aspect-[9/7] w-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}
