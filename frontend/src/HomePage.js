import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedSearchQuery, setDisplayedSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [filters, setFilters] = useState({
    minYear: "",
    maxYear: "",
    minPrice: "",
    maxPrice: "",
    minSeats: "",
    maxSeats: "",
    make: "",
    condition: "",
    sortPrice: "none", // Added sortPrice filter
  });
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Component mounted, fetching posts...");
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      console.log("Fetching posts from API...");
      const response = await fetch("http://127.0.0.1:8000/posts/");
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();

      console.log("Fetched posts data:", data);

      setPosts(data.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError(err.message);
    } finally {
      console.log("Finished fetching posts");
      setLoading(false);
    }
  };

  const handleSearch = () => {
    console.log("Search query submitted:", searchQuery);
    setDisplayedSearchQuery(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("Enter key pressed, initiating search...");
      handleSearch();
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      !displayedSearchQuery ||
      post.title?.toLowerCase().includes(displayedSearchQuery.toLowerCase()) ||
      post.description
        ?.toLowerCase()
        .includes(displayedSearchQuery.toLowerCase()) ||
      post.location?.toLowerCase().includes(displayedSearchQuery.toLowerCase());

    const matchesFilters =
      (!filters.minYear || post.year >= parseInt(filters.minYear)) &&
      (!filters.maxYear || post.year <= parseInt(filters.maxYear)) &&
      (!filters.minPrice || post.price >= parseFloat(filters.minPrice)) &&
      (!filters.maxPrice || post.price <= parseFloat(filters.maxPrice)) &&
      (!filters.minSeats ||
        post.seatingCapacity >= parseInt(filters.minSeats)) &&
      (!filters.maxSeats ||
        post.seatingCapacity <= parseInt(filters.maxSeats)) &&
      (!filters.make ||
        post.make?.toLowerCase().includes(filters.make.toLowerCase())) &&
      (!filters.condition ||
        post.condition?.toLowerCase() === filters.condition.toLowerCase());

    console.log(
      "Post matches search:",
      matchesSearch,
      "Post matches filters:",
      matchesFilters
    );
    return matchesSearch && matchesFilters;
  });

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (filters.sortPrice === "ascending") {
      return a.price - b.price;
    } else if (filters.sortPrice === "descending") {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    console.log("Filter changed:", name, value);
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
      console.log("Carousel next button clicked, current index:", currentIndex);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
      console.log(
        "Carousel previous button clicked, current index:",
        currentIndex
      );
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
    };

    return (
      <div className="relative w-full h-48">
        <img
          src={images[currentIndex]}
          alt={`Carousel ${currentIndex}`}
          className="w-full h-full object-cover rounded-t-xl"
        />
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-r-lg"
        >
          ‹
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-l-lg"
        >
          ›
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex flex-col items-center pt-10 px-4">
        <h1 className="text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-red-500">
          Parkly
        </h1>

        <div className="w-full max-w-4xl mb-8">
          <div
            className={`
            relative flex items-center w-full bg-white rounded-2xl 
            shadow-lg transition-all duration-300 ease-in-out
            ${
              isFocused
                ? "shadow-xl scale-105"
                : "hover:shadow-xl hover:scale-105"
            }
          `}
          >
            <div className="pl-6">
              <Search
                size={24}
                className={`transition-colors duration-300 ${
                  isFocused ? "text-red-700" : "text-red-400"
                }`}
              />
            </div>
            <input
              type="text"
              placeholder="Search by make, model, or description..."
              value={searchQuery}
              onChange={(e) => {
                console.log("Search query changed:", e.target.value);
                setSearchQuery(e.target.value);
              }}
              onKeyPress={handleKeyPress}
              onFocus={() => {
                console.log("Search input focused");
                setIsFocused(true);
              }}
              onBlur={() => {
                console.log("Search input blurred");
                setIsFocused(false);
              }}
              className="w-full py-4 px-4 text-lg text-gray-700 placeholder-gray-400 bg-transparent border-none focus:outline-none focus:ring-0"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-4 text-white bg-red-700 hover:bg-red-400 transition-colors rounded-r-2xl"
            >
              Search
            </button>
            <div className="w-px h-8 bg-gray-200 mx-2"></div>
            <button
              onClick={() => {
                console.log(
                  "Filters button clicked, showFilters:",
                  !showFilters
                );
                setShowFilters(!showFilters);
              }}
              className="px-6 py-4 text-red-600 hover:text-red-800 font-medium"
            >
              Filters
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-6 bg-white rounded-xl shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Year Filter */}
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-700">Year</h3>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="minYear"
                      placeholder="Min"
                      value={filters.minYear}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded-lg"
                    />
                    <input
                      type="number"
                      name="maxYear"
                      placeholder="Max"
                      value={filters.maxYear}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                </div>
                {/* Price Filter */}
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-700">Price</h3>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="minPrice"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded-lg"
                    />
                    <input
                      type="number"
                      name="maxPrice"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                </div>
                {/* Seats Filter */}
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-700">Seats</h3>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="minSeats"
                      placeholder="Min"
                      value={filters.minSeats}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded-lg"
                    />
                    <input
                      type="number"
                      name="maxSeats"
                      placeholder="Max"
                      value={filters.maxSeats}
                      onChange={handleFilterChange}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                </div>
                {/* Make Filter */}
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-700">Make</h3>
                  <input
                    type="text"
                    name="make"
                    placeholder="Enter make"
                    value={filters.make}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                {/* Condition Filter */}
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-700">Condition</h3>
                  <select
                    name="condition"
                    value={filters.condition}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">All</option>
                    <option value="new">New</option>
                    <option value="used">Used</option>
                    <option value="certified">Certified Pre-Owned</option>
                  </select>
                </div>
                {/* Sort by Price Filter */}
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-700">Sort by Price</h3>
                  <select
                    name="sortPrice"
                    value={filters.sortPrice}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="none">None</option>
                    <option value="ascending">Low to High</option>
                    <option value="descending">High to Low</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {displayedSearchQuery && (
          <div className="w-full max-w-7xl px-4 mb-4">
            <p className="text-gray-600">
              Showing results for "{displayedSearchQuery}"
            </p>
          </div>
        )}

        {/* Posts Grid */}
        {loading ? (
          <div className="text-center py-8">Loading posts...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">{error}</div>
        ) : (
          <div className="w-full max-w-7xl px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {post.content && post.content.length > 0 && (
                    <Carousel images={post.content} />
                  )}
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      {post.description.length > 150 &&
                      !post.showFullDescription ? (
                        <>
                          {post.description.slice(0, 150)}...
                          <button
                            className="text-red-600 hover:underline"
                            onClick={() => {
                              const updatedPosts = posts.map((p) =>
                                p.id === post.id
                                  ? { ...p, showFullDescription: true }
                                  : p
                              );
                              setPosts(updatedPosts);
                            }}
                          >
                            Read more
                          </button>
                        </>
                      ) : (
                        post.description
                      )}
                    </p>

                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-red-600">
                          ${post.price.toLocaleString()}
                        </span>
                        <span className="text-sm px-2 py-1 bg-red-100 text-red-800 rounded-full">
                          {post.condition}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <div>{post.location}</div>
                        <div>{post.year}</div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {post.seatingCapacity} seats
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
