import { useState } from 'react';
import { Link } from 'react-router-dom';
import { prefetchProductById } from '@/shared/services/productApi.js';

function HeartIcon({ filled }) {
    return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden>
            <path
                fill={filled ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
        </svg>
    );
}

function excerpt(text, max = 96) {
    if (!text || typeof text !== 'string') {
        return '';
    }
    const t = text.replace(/\s+/g, ' ').trim();
    if (t.length <= max) {
        return t;
    }
    return `${t.slice(0, max).trim()}…`;
}

export function ProductCard({ product }) {
    const [wish, setWish] = useState(false);

    const price =
        product.price !== undefined && product.price !== null
            ? Number(product.price).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
              })
            : '—';

    const blurb = excerpt(product.description ?? '');

    const warmDetail = () => prefetchProductById(product.id);

    return (
        <article
            className="group flex flex-col overflow-hidden rounded-lg border border-slate-100 bg-white shadow-card transition hover:border-indigo-100 hover:shadow-card-hover"
            onMouseEnter={warmDetail}
            onFocusCapture={warmDetail}
        >
            <div className="relative aspect-[4/3] bg-slate-50">
                <Link to={`/products/${product.id}`} className="block h-full overflow-hidden">
                    {product.image_url ? (
                        <img
                            src={product.image_url}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-slate-400">
                            <span className="text-sm">Sem imagem</span>
                        </div>
                    )}
                </Link>
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        setWish((w) => !w);
                    }}
                    className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:border-indigo-200 hover:text-red-500 ${
                        wish ? 'text-red-500' : 'text-slate-600'
                    }`}
                    aria-label={wish ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                >
                    <HeartIcon filled={wish} />
                </button>
            </div>

            <div className="flex flex-1 flex-col p-4">
                <div className="flex items-start justify-between gap-3">
                    <h2 className="min-w-0 flex-1 text-base font-bold text-slate-900">
                        <Link to={`/products/${product.id}`} className="hover:text-indigo-600">
                            {product.name}
                        </Link>
                    </h2>
                    <p className="shrink-0 text-base font-bold text-indigo-600">{price}</p>
                </div>
                {blurb ? (
                    <p className="ds-body-sm mt-2 line-clamp-2 flex-1">{blurb}</p>
                ) : (
                    <p className="ds-body-sm mt-2 flex-1 text-slate-400">Sem descrição curta.</p>
                )}
                <Link
                    to={`/products/${product.id}`}
                    className="ds-btn-secondary ds-btn mt-4 w-full text-center text-sm no-underline"
                >
                    Ver detalhes
                </Link>
            </div>
        </article>
    );
}
