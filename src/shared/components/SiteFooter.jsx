const footerLinks = [
    { label: 'Política de privacidade', href: '#' },
    { label: 'Termos de serviço', href: '#' },
    { label: 'Envio', href: '#' },
    { label: 'Contacto', href: '#' },
];

export function SiteFooter() {
    return (
        <footer className="mt-auto border-t border-slate-200 bg-white">
            <div className="mx-auto flex max-w-container flex-wrap justify-center gap-x-6 gap-y-3 px-8 py-8 md:justify-end">
                <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-end">
                    {footerLinks.map(({ label, href }) => (
                        <a
                            key={label}
                            href={href}
                            className="text-xs font-medium uppercase tracking-wider text-slate-500 transition hover:text-indigo-600"
                        >
                            {label}
                        </a>
                    ))}
                </nav>
            </div>
        </footer>
    );
}
