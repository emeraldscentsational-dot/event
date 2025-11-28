import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Heart,
  Loader2,
} from "lucide-react";
import { venues } from "data/events";
import Container from "components/Container";
import completeProfile from "assets/complete-profile.png";
import { Link } from "react-router-dom";
import { useGetEventsQuery } from "../../redux/api/eventApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

const CARDS_PER_VIEW = 4;

interface Venue {
  id: string;
  name: string;
  ResidentialAddress: string;
  category: string;
  amountPerDay: string;
  amountPerHour: string;
  ratingId: string;
  reviewId: string;
  imageDetails: {
    imageDataBase64: string;
  };
}

const formatBase64Image = (base64String: string) => {
  // Check if the string already has the data URL prefix
  if (base64String.startsWith("data:image")) {
    return base64String;
  }
  // Add the proper prefix for JPEG images
  return `data:image/jpeg;base64,${base64String}`;
};

const EventVenue = () => {
  const [liked, setLiked] = useState<{ [key: string]: boolean }>({});
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { data: event, isLoading, isError, refetch } = useGetEventsQuery({});
  const [imageIndex, setImageIndex] = useState<{ [key: string]: number }>({});
  const { id, isAuth, firstName, lastName, email } = useSelector(
    (state: RootState) => state.auth
  );
  console.log(id, isAuth, email, firstName, "isAuth");
  // Transform API data to match your expected format
  const apiVenues =
    event?.value?.map((venue: any) => ({
      id: venue.id,
      name: venue.name,
      ResidentialAddress: venue.ResidentialAddress,
      type: venue.category,
      capacity: "Not specified",
      rating: venue.ratingId,
      reviews: venue.reviewId,
      priceDay: venue.amountPerDay,
      priceHour: venue.amountPerHour,
      images: venue.imageDetails?.imageDataBase64
        ? [formatBase64Image(venue.imageDetails.imageDataBase64)]
        : [], // Fallback to empty array if no image
    })) || [];

  const venuesToDisplay = apiVenues.length > 0 ? apiVenues : venues;

  const toggleLike = (id: string) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - CARDS_PER_VIEW, 0));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + CARDS_PER_VIEW, venuesToDisplay.length - CARDS_PER_VIEW)
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => {
        const newIndex = { ...prev };
        venuesToDisplay.forEach((venue: any) => {
          if (venue.images.length > 0) {
            newIndex[venue.id] = (newIndex[venue.id] || 0) + 1;
            if (newIndex[venue.id] >= venue.images.length) {
              newIndex[venue.id] = 0;
            }
          }
        });
        return newIndex;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [venuesToDisplay]);

  if (isLoading)
    return (
      <div>
        <Loader2 size={78} color="green" />
      </div>
    );
  if (isError) return <div>Error loading venues</div>;

  return (
    <Container>
      {/* Profile Setup Section - unchanged */}
      <div className="flex flex-col md:flex-row items-center p-4 mt-24 space-y-4 md:space-y-0 md:space-x-4 bg-gray-100 rounded-lg shadow-md">
        <div className="relative w-44 h-44 flex items-center justify-center rounded-full border-gray-300">
          <svg
            className="absolute top-0 left-0 w-full h-full transform rotate-[-90deg]"
            viewBox="0 0 36 36"
          >
            <circle
              className="text-gray-300 stroke-current"
              strokeWidth="1"
              fill="transparent"
              r="16"
              cx="18"
              cy="18"
            ></circle>
            <circle
              className="text-teal-500 stroke-current"
              strokeWidth="1"
              fill="transparent"
              r="16"
              cx="18"
              cy="18"
              strokeDasharray="100"
              strokeDashoffset="70"
            ></circle>
          </svg>
          <span className="text-lg text-center font-semibold">
            30% <br /> Completed
          </span>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-lg my-2 font-semibold">
            {` Hello ${firstName}  ${lastName}, Complete your Profile Setup`}
          </h2>
          <p className="text-sm my-2 text-gray-600">
            A fully set up profile helps us tailor your experience to meet your
            specific needs.
          </p>
          <Link to={"/select-profile"} className="text-blue-600 font-medium">
            Setup Profile
          </Link>
        </div>
        <div className="w-full md:w-96 h-48 bg-gray-300 rounded-lg flex items-center justify-center">
          <img
            src={completeProfile}
            alt="Profile Setup Illustration"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Event Venues Section */}
      <div className="mt-16 mb-4 flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-xl font-semibold">Event Venues</h2>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <button className="flex items-center space-x-2 border px-4 py-2 rounded-md shadow-sm">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <a href="#" className="text-blue-600 font-medium">
            See All
          </a>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="relative mb-16 w-full mx-auto overflow-hidden">
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10 hidden md:block"
          disabled={currentIndex === 0}
        >
          <ChevronLeft />
        </button>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform ease-in-out duration-500"
            style={{
              transform: `translateX(-${
                (currentIndex / venuesToDisplay.length) * 100
              }%)`,
              width: `${(venuesToDisplay.length / CARDS_PER_VIEW) * 100}%`,
            }}
          >
            {venuesToDisplay.map((venue: any) => (
              <div
                key={venue.id}
                className="w-full md:w-[25%] p-2 mx-2 bg-white shadow-md rounded-lg"
              >
                <div className="relative">
                  {venue.images.length > 0 ? (
                    <img
                      src={venue.images[imageIndex[venue.id] || 0]}
                      alt={venue.name}
                      className="rounded-lg w-full h-48 object-cover"
                      onError={(e) => {
                        // Fallback if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://via.placeholder.com/300x200?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className="rounded-lg w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                  {/* Carousel dots - only show if multiple images */}
                  {venue.images.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {venue.images.map((_: any, idx: any) => (
                        <span
                          key={idx}
                          className={`w-2 h-2 rounded-full ${
                            idx === (imageIndex[venue.id] || 0)
                              ? "bg-cyan-500"
                              : "bg-gray-300"
                          }`}
                        ></span>
                      ))}
                    </div>
                  )}
                  <button
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow"
                    onClick={() => toggleLike(venue.id)}
                  >
                    <Heart
                      fill={liked[venue.id] ? "red" : "none"}
                      className="text-red-500"
                    />
                  </button>
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg md:text-base font-bold">
                      {venue.name}
                    </h3>
                    <span className="text-green-500">✔</span>
                  </div>
                  <p className="text-sm md:text-xs text-gray-500 flex items-center">
                    <span className="mr-1">📍</span> {venue.address}
                  </p>
                  <p className="text-sm md:text-xs font-semibold flex items-center">
                    <span className="mr-1">🏛️</span> {venue.type}
                  </p>
                  <p className="text-sm md:text-xs flex items-center">
                    <span className="mr-1">👥</span> {venue.capacity}
                  </p>
                  <div className="flex items-center text-sm md:text-xs">
                    <span className="text-yellow-500 mr-1">⭐</span>
                    <span className="font-semibold">{venue.rating}</span>
                    <span className="text-gray-500 ml-1">
                      ({venue.reviews} Reviews)
                    </span>
                  </div>
                  <p className="text-sm md:text-xs font-semibold mt-1">
                    {venue.priceDay}/Day • {venue.priceHour}/Hr
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full z-10 hidden md:block"
          disabled={currentIndex >= venuesToDisplay.length - CARDS_PER_VIEW}
        >
          <ChevronRight />
        </button>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-4">
          {Array.from({
            length: Math.ceil(venuesToDisplay.length / CARDS_PER_VIEW),
          }).map((_, index) => (
            <span
              key={index}
              className={`h-2 mx-1 rounded-full ${
                currentIndex / CARDS_PER_VIEW === index
                  ? "bg-teal-500 w-4"
                  : "bg-gray-300 w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default EventVenue;
