import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchRecipes } from "../api/spoonacular";
import SearchBar from "../components/SearchBar/SearchBar";
import RecipeResults from "../components/RecipeResults/RecipeResults";
import Pagination from "../components/Pagination/Pagination";
import "./HomePage.css";

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") ?? "";
  const cuisine = searchParams.get("cuisine") ?? "";
  const page = Number(searchParams.get("page") ?? "1");

  const [input, setInput] = useState(q);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({ results: [], totalResults: 0 });

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil((data.totalResults || 0) / 5));
  }, [data.totalResults]);

  function runSearch(next = {}) {
    const nextParams = {
      q: next.q ?? input.trim(),
      cuisine: next.cuisine ?? cuisine,
      page: String(next.page ?? 1),
    };

    setSearchParams(nextParams);

    if (!nextParams.q) {
      setData({ results: [], totalResults: 0 });
      setError("");
      setLoading(false);
    }
  }

  useEffect(() => {
    setInput(q);

    if (!q) {
      setData({ results: [], totalResults: 0 });
      setError("");
      setLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      setLoading(true);
      setError("");

      try {
        const res = await searchRecipes({
          query: q,
          cuisine: cuisine || undefined,
          page,
        });

        if (!cancelled) {
          setData({
            results: res.results ?? [],
            totalResults: res.totalResults ?? 0,
          });
        }
      } catch (e) {
        if (!cancelled) setError(e.message || "Something went wrong.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [q, cuisine, page]);

  function onSubmit(e) {
    e.preventDefault();
    runSearch({ q: input.trim(), page: 1 });
  }

  function changeCuisine(nextCuisine) {
    runSearch({ cuisine: nextCuisine, page: 1 });
  }

  function goToPage(nextPage) {
    runSearch({ page: nextPage });
  }

  return (
    <div className="home">
      <h1 className="home__title">Recipe Search</h1>

      <SearchBar
        input={input}
        onInputChange={setInput}
        cuisine={cuisine}
        onCuisineChange={changeCuisine}
        onSubmit={onSubmit}
      />

      {loading && <p className="home__status">Loading…</p>}
      {error && <p className="home__error">{error}</p>}

      <RecipeResults results={data.results} />

      {!!q && data.totalResults > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPrev={() => goToPage(Math.max(1, page - 1))}
          onNext={() => goToPage(Math.min(totalPages, page + 1))}
        />
      )}

      {!!q && !loading && data.results.length === 0 && (
        <p className="home__empty">No results found.</p>
      )}
    </div>
  );
}
