
const Banner = () => {
    return (
        <section id="home" className="relative isolate overflow-hidden bg-alabaster-gray-950 shadow-sm px-6 py-16 sm:py-24">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-center">
                <img
                    src="/Portrait.png"
                    alt="Portrait of Ignacio Murillo"
                    className="motion-safe:animate-[portrait-rise_1s_ease-out_both] mb-8 w-40 sm:w-52 md:w-64 lg:w-80"
                />
                <img
                    src="/IM-Banner.svg"
                    alt="IM banner"
                    className="motion-safe:animate-[banner-float_7s_ease-in-out_infinite] h-auto w-full max-w-5xl"
                />
            </div>

            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pacific-blue-500/10 blur-3xl motion-safe:animate-pulse"
            />
        </section>
    );
};

export default Banner;