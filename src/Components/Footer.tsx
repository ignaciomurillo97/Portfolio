import { useEffect, useState } from 'react';

type ContactLink = {
    label: string;
    href: string;
    icon: string;
    detail?: string;
};

const FooterIcon = ({ name }: { name: string }) => {
    const paths = {
        github: 'M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.9-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.52 1.06 1.52 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.02-2.75-.1-.26-.44-1.3.1-2.71 0 0 .83-.27 2.75 1.05A9.18 9.18 0 0 1 12 6.99c.85 0 1.71.12 2.51.36 1.92-1.32 2.75-1.05 2.75-1.05.54 1.41.2 2.45.1 2.71.63.72 1.02 1.63 1.02 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .27.18.59.69.49A10.28 10.28 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z',
        linkedin: 'M5.2 3.5a1.7 1.7 0 1 1-3.4 0 1.7 1.7 0 0 1 3.4 0ZM2 8h3v10H2V8Zm5 0h2.9v1.37h.04c.4-.76 1.38-1.57 2.84-1.57 3.04 0 3.6 2.01 3.6 4.63V18h-3v-4.94c0-1.18-.02-2.7-1.65-2.7-1.65 0-1.9 1.29-1.9 2.61V18H7V8Z',
        email: 'M2 4h20v16H2V4Zm2 2v.5l8 5 8-5V6l-8 5-8-5Zm16 10.5V8.87l-8 5-8-5v7.63h16Z',
        resume: 'M6 2h8l4 4v16H6V2Zm7 1.5V7h3.5L13 3.5ZM8 10h8V8H8v2Zm0 4h8v-2H8v2Zm0 4h5v-2H8v2Z',
        arrowUp: 'm12 19 1.4-1.4-4.6-4.6H19v-2H8.8l4.6-4.6L12 5l-7 7 7 7Z',
    };

    return (
        <svg aria-hidden="true" className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d={paths[name as keyof typeof paths]} />
        </svg>
    );
};

const Footer = () => {
    const [footerLinks, setFooterLinks] = useState<ContactLink[]>([]);

    useEffect(() => {
        fetch('/contact.json')
            .then((response) => response.json())
            .then(setFooterLinks)
            .catch(() => setFooterLinks([]));
    }, []);

    return (
        <footer className="border-t border-alabaster-gray-700 bg-alabaster-gray-950 px-6 py-10 text-alabaster-gray-300">
            <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-lg font-semibold text-alabaster-gray-50">Ignacio Murillo</p>
                    <p className="mt-2 max-w-sm text-sm leading-6">
                        Software Engineer building reliable, thoughtful software.
                    </p>
                </div>

                <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                    {footerLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="inline-flex items-center gap-2 transition-colors hover:text-pacific-blue-300"
                            target={['GitHub', 'LinkedIn', 'Resume'].includes(link.label) ? '_blank' : undefined}
                            rel={['GitHub', 'LinkedIn', 'Resume'].includes(link.label) ? 'noreferrer' : undefined}
                        >
                            <FooterIcon name={link.icon} />
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>

            <div className="mx-auto mt-8 flex max-w-6xl flex-col gap-2 border-t border-alabaster-gray-800 pt-5 text-xs text-alabaster-gray-500 sm:flex-row sm:items-center sm:justify-between">
                <p>&copy; {new Date().getFullYear()} Ignacio Murillo. All rights reserved.</p>
                <a href="#home" className="inline-flex items-center gap-2 transition-colors hover:text-pacific-blue-300">
                    <FooterIcon name="arrowUp" />
                    Back to top
                </a>
            </div>
        </footer>
    );
};

export default Footer;
