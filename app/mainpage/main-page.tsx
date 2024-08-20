import { useCallback, useEffect, useMemo, useState } from "react";
import { getMovies, Movie } from "../api/serverActions";
import Image from "next/image";
import Link from "next/link";
import ReactPaginate from "react-paginate";

const MAX_ITEMS = 5;

export const MainPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + MAX_ITEMS;

  const currentItems = useMemo(
    () => movies.slice(itemOffset, endOffset),
    [endOffset, itemOffset, movies]
  );

  const pageCount = useMemo(
    () => Math.ceil(movies.length / MAX_ITEMS),
    [movies.length]
  );

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * MAX_ITEMS) % movies.length;
    setItemOffset(newOffset);
  };

  const getfilms = useCallback(async () => {
    const resp = await getMovies({ search: query });
    setMovies(resp.results);
  }, [query]);

  useEffect(() => {
    getfilms();
  }, [getfilms]);

  return (
    <div className="w-full">
      <div className="flex flex-col align-center items-center">
        <label
          htmlFor="search"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Search
        </label>
        <div className="relative mt-2 rounded-md shadow-sm w-80">
          <input
            id="search"
            name="search"
            type="text"
            placeholder="Type a film"
            onChange={(event) => setQuery(event.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div className="flex items-stretch flex-wrap justify-center content-center">
        {currentItems.length
          ? currentItems.map(({ id, poster, title }) => (
              <Link
                href={`/mainpage/${id}`}
                key={id}
                className="w-64 m-5 hover:scale-110"
              >
                <Image src={poster} alt={title} width={150} height={200} />
                {title}
              </Link>
            ))
          : "no movies"}
      </div>
      <div className="w-64">
        <ReactPaginate
          className="flex direction-row justify-between"
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          breakLabel="..."
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};
