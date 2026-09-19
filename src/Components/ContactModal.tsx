import { useEffect, useState } from 'react';

type ContactLink = {
    label: string;
    href: string;
    icon: string;
    detail?: string;
};

type ContactModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const iconPaths: Record<string, string> = {
    github: 'M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.9-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.52 1.06 1.52 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.02-2.75-.1-.26-.44-1.3.1-2.71 0 0 .83-.27 2.75 1.05A9.18 9.18 0 0 1 12 6.99c.85 0 1.71.12 2.51.36 1.92-1.32 2.75-1.05 2.75-1.05.54 1.41.2 2.45.1 2.71.63.72 1.02 1.63 1.02 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.49A10.28 10.28 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z',
    linkedin: 'M5.2 3.5a1.7 1.7 0 1 1-3.4 0 1.7 1.7 0 0 1 3.4 0ZM2 8h3v10H2V8Zm5 0h2.9v1.37h.04c.4-.76 1.38-1.57 2.84-1.57 3.04 0 3.6 2.01 3.6 4.63V18h-3v-4.94c0-1.18-.02-2.7-1.65-2.7-1.65 0-1.9 1.29-1.9 2.61V18H7V8Z',
    email: 'M2 4h20v16H2V4Zm2 2v.5l8 5 8-5V6l-8 5-8-5Zm16 10.5V8.87l-8 5-8-5v7.63h16Z',
    resume: 'M6 2h8l4 4v16H6V2Zm7 1.5V7h3.5L13 3.5ZM8 10h8V8H8v2Zm0 4h8v-2H8v2Zm0 4h5v-2H8v2Z',
};

const ContactIcon = ({ name }: { name: string }) => (
    <svg aria-hidden="true" className="h-5 w-5 fill-current" viewBox="0 0 24 24">
        <path d={iconPaths[name]} />
    </svg>
);

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
    const [links, setLinks] = useState<ContactLink[]>([]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        fetch('/contact.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Unable to load contact links');
                }
                return response.json();
            })
            .then(setLinks)
            .catch(() => setLinks([]));
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.body.classList.add('overflow-hidden');
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.classList.remove('overflow-hidden');
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-carbon-black-950/80 px-6 py-8"
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="contact-modal-title"
                className="w-full max-w-md border border-alabaster-gray-700 bg-alabaster-gray-900 p-7 shadow-2xl"
            >
                <div className="flex items-start justify-between gap-6">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pacific-blue-300">Contact</p>
                        <h2 id="contact-modal-title" className="mt-2 text-3xl font-bold text-alabaster-gray-50">
                            Let&apos;s build something great.
                        </h2>
                    </div>
                    <button
                        type="button"
                        aria-label="Close contact dialog"
                        className="text-2xl leading-none text-alabaster-gray-300 hover:text-alabaster-gray-50"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>

                <p className="mt-4 leading-7 text-alabaster-gray-300">
                    Have an interesting problem or opportunity? Reach out through any of these channels.
                </p>

                <div className="mt-7 grid gap-3">
                    {links.length === 0 ? (
                        <div className="h-12 animate-pulse bg-alabaster-gray-800" aria-label="Loading contact links" />
                    ) : (
                        links.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target={['GitHub', 'LinkedIn', 'Resume'].includes(link.label) ? '_blank' : undefined}
                                rel={['GitHub', 'LinkedIn', 'Resume'].includes(link.label) ? 'noreferrer' : undefined}
                                className="inline-flex items-center gap-3 border border-alabaster-gray-700 px-4 py-3 text-alabaster-gray-100 transition-colors hover:border-pacific-blue-400 hover:text-pacific-blue-300"
                            >
                                <ContactIcon name={link.icon} />
                                <span>{link.label}</span>
                                {link.detail && <span className="ml-auto text-right text-sm text-alabaster-gray-400">{link.detail}</span>}
                            </a>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
};

export default ContactModal;
