
import { useState } from 'react';

const navItems = ['Experience', 'Skills', 'Projects', 'Get In Touch!'];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="border-b border-alabaster-gray-700 bg-alabaster-gray-900 text-alabaster-gray-50">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                <a href="#home" className="text-lg font-semibold tracking-wide">
                    Home
                </a>

                <div className="hidden items-center gap-8 md:flex">
                    {navItems.map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                            className="transition-colors hover:text-pacific-blue-300"
                        >
                            {item}
                        </a>
                    ))}
                </div>

                <button
                    type="button"
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-navigation"
                    aria-label="Toggle navigation menu"
                    className="rounded-md p-2 hover:bg-alabaster-gray-800 focus:outline-none focus:ring-2 focus:ring-pacific-blue-300 md:hidden"
                    onClick={() => setIsMenuOpen((open) => !open)}
                >
                    <span className="sr-only">Toggle menu</span>
                    <span className="block h-0.5 w-6 bg-alabaster-gray-50" />
                    <span className="mt-1.5 block h-0.5 w-6 bg-alabaster-gray-50" />
                    <span className="mt-1.5 block h-0.5 w-6 bg-alabaster-gray-50" />
                </button>
            </div>

            {isMenuOpen && (
                <div id="mobile-navigation" className="border-t border-alabaster-gray-700 px-6 py-3 md:hidden">
                    <div className="mx-auto flex max-w-6xl flex-col gap-1">
                        {navItems.map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="rounded-md px-3 py-2 transition-colors hover:bg-alabaster-gray-800 hover:text-pacific-blue-300"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar