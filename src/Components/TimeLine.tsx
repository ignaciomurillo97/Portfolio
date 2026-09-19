
import { useEffect, useState } from 'react';

type ExperienceItem = {
    date: string;
    company: string;
    role: string;
    description: string;
    icon: string;
    technologies: string[];
};

const TimeLine = () => {
    const [experienceItems, setExperienceItems] = useState<ExperienceItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadExperience = async () => {
            try {
                const response = await fetch('/experience.json');

                if (!response.ok) {
                    throw new Error('Unable to load experience');
                }

                const items: ExperienceItem[] = await response.json();
                setExperienceItems(items);
            } catch {
                setError('Experience could not be loaded right now.');
            } finally {
                setIsLoading(false);
            }
        };

        loadExperience();
    }, []);

    return (
        <section id="experience" className="bg-alabaster-gray-900 px-6 py-20 text-alabaster-gray-50 sm:py-28">
            <div className="mx-auto max-w-6xl">
                <div className="mb-16 max-w-2xl">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-pacific-blue-300">
                        Experience
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Where I have made an impact</h2>
                </div>

                <div className="relative">
                    <div className="absolute bottom-0 left-4 top-0 w-px bg-alabaster-gray-600 lg:left-1/3" />

                    <div className="space-y-12 md:space-y-16">
                        {isLoading && <TimelineSkeleton />}

                        {!isLoading && error && (
                            <p className="pl-12 text-alabaster-gray-300 lg:col-span-2 lg:col-start-2 lg:pl-16">{error}</p>
                        )}

                        {!isLoading && !error && experienceItems.map((item) => (
                            <article key={`${item.company}-${item.date}`} className="relative grid lg:grid-cols-3">
                                <div className="pb-4 pl-12 lg:py-2 lg:pl-0 lg:pr-12 lg:text-right">
                                    <p className="text-sm font-medium text-pacific-blue-300">{item.date}</p>
                                </div>

                                <div className="absolute left-4 top-0 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-4 border-alabaster-gray-900 bg-pacific-blue-500 text-[10px] font-bold text-alabaster-gray-950 lg:left-1/3">
                                    {item.icon}
                                </div>

                                <div className="pl-12 lg:col-span-2 lg:pl-16">
                                    <p className="text-sm font-medium text-alabaster-gray-300">{item.company}</p>
                                    <h3 className="mt-1 text-2xl font-semibold text-alabaster-gray-50">{item.role}</h3>
                                    <p className="mt-4 max-w-xl leading-7 text-alabaster-gray-300">{item.description}</p>
                                    <div className="mt-5 flex flex-wrap gap-2">
                                        {item.technologies.map((technology) => (
                                            <span
                                                key={technology}
                                                className="rounded-full border border-pacific-blue-500/40 bg-pacific-blue-500/10 px-3 py-1 text-xs font-medium text-pacific-blue-200"
                                            >
                                                {technology}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const TimelineSkeleton = () => (
    <>
        {[0, 1].map((item) => (
            <article key={item} className="relative grid animate-pulse lg:grid-cols-3">
                <div className="pb-4 pl-12 lg:py-2 lg:pl-0 lg:pr-12 lg:text-right">
                    <div className="ml-0 h-4 w-28 rounded bg-alabaster-gray-700 lg:ml-auto" />
                </div>
                <div className="absolute left-4 top-0 h-8 w-8 -translate-x-1/2 rounded-full border-4 border-alabaster-gray-900 bg-alabaster-gray-700 lg:left-1/3" />
                <div className="pl-12 lg:col-span-2 lg:pl-16">
                    <div className="h-4 w-32 rounded bg-alabaster-gray-700" />
                    <div className="mt-2 h-8 w-64 max-w-full rounded bg-alabaster-gray-700" />
                    <div className="mt-4 h-7 max-w-xl rounded bg-alabaster-gray-700" />
                    <div className="mt-2 h-7 w-4/5 max-w-lg rounded bg-alabaster-gray-700" />
                    <div className="mt-5 flex gap-2">
                        <div className="h-6 w-20 rounded-full bg-alabaster-gray-700" />
                        <div className="h-6 w-24 rounded-full bg-alabaster-gray-700" />
                        <div className="h-6 w-16 rounded-full bg-alabaster-gray-700" />
                    </div>
                </div>
            </article>
        ))}
    </>
);

export default TimeLine;