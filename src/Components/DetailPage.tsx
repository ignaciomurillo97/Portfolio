import { marked } from "marked";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "./Navbar";

const DetailPage = () => {
  const { type, slug } = useParams<{ type: string; slug: string }>();
  const [markdown, setMarkdown] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const breadcrumbTitle = (slug ?? "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const breadcrumbType = type
    ? type.charAt(0).toUpperCase() + type.slice(1)
    : "Details";

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        const response = await fetch(`/content/${type}/${slug}.md`);

        if (!response.ok) {
          throw new Error("Content not found");
        }

        setMarkdown(await response.text());
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadMarkdown();
  }, [slug, type]);

  return (
    <div className="page-transition page-transition-detail min-h-screen bg-alabaster-gray-950 text-alabaster-gray-50">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 pt-6">
        {isLoading && <DetailSkeleton />}

        {!isLoading && error && (
          <div className="py-16 text-center">
            <p className="text-lg text-alabaster-gray-300">
              This page could not be found.
            </p>
            <Link
              to="/"
              className="mt-6 inline-block text-pacific-blue-300 hover:text-pacific-blue-200"
            >
              Return to portfolio
            </Link>
          </div>
        )}

        {!isLoading && !error && (
          <div className="bg-alabaster-gray-900 px-6 py-8 shadow-xl sm:px-10 sm:py-12 lg:px-16 lg:py-16">
            <nav
              aria-label="Breadcrumb"
              className="mb-10 text-sm text-alabaster-gray-400"
            >
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link
                    to="/"
                    className="transition-colors hover:text-pacific-blue-300"
                  >
                    Portfolio
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    to={`/#${type}`}
                    className="transition-colors hover:text-pacific-blue-300"
                  >
                    {breadcrumbType}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-alabaster-gray-200">
                  {breadcrumbTitle}
                </li>
              </ol>
            </nav>
            <article
              className="markdown-content"
              dangerouslySetInnerHTML={{
                __html: marked.parse(markdown) as string,
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
};

const DetailSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-4 w-28 rounded bg-alabaster-gray-700" />
    <div className="mt-5 h-12 w-3/4 rounded bg-alabaster-gray-700" />
    <div className="mt-8 h-5 max-w-2xl rounded bg-alabaster-gray-700" />
    <div className="mt-3 h-5 max-w-xl rounded bg-alabaster-gray-700" />
    <div className="mt-10 h-5 max-w-2xl rounded bg-alabaster-gray-700" />
    <div className="mt-3 h-5 max-w-2xl rounded bg-alabaster-gray-700" />
  </div>
);

export default DetailPage;
