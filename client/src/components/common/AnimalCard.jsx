import React, { useState } from "react";
import { PiPawPrint, PiPawPrintFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import AnimalCardSkeleton from "./AnimalCardSkeleton";
import { useFavorites } from "../../context/FavoritesContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const AnimalCard = ({ pet, isLoading = false }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  if (isLoading) {
    return <AnimalCardSkeleton />;
  }

  // Determine if this pet is in favorites
  const favoriteStatus = isFavorite(pet.id);

  const handleFavoriteToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isTogglingFavorite) return; // Prevent multiple clicks

    if (!isAuthenticated) {
      // Ask user to log in
      if (window.confirm("Please log in to save favorites. Go to login page?")) {
        navigate("/login");
      }
      return;
    }

    try {
      setIsTogglingFavorite(true);
      console.log(`Toggling favorite status for pet ${pet.id}, current status: ${favoriteStatus}`);

      const result = await toggleFavorite(pet.id);

      if (!result.success) {
        console.error("Failed to toggle favorite:", result.message);
        if (result.message) {
          alert(result.message);
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  const getStatusColor = (status) => {
    if (!status) return { bg: "bg-gray-100", text: "text-gray-800" };

    switch (status.toLowerCase()) {
      case "available":
        return { bg: "bg-green-100", text: "text-green-800" };
      case "foster":
        return { bg: "bg-blue-100", text: "text-blue-800" };
      case "pending":
        return { bg: "bg-yellow-100", text: "text-yellow-800" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-800" };
    }
  };

  const status = pet.status || "Available";
  const statusColor = getStatusColor(status);

  return (
    <Link
      to={`/animals/${pet.id}`}
      className="group relative rounded-lg shadow-sm overflow-hidden w-full h-82"
    >
      {/* Full-width image */}
      <img
        src={pet.imageUrl || "https://placehold.co/300x300?text=No+Image"}
        alt={`Photo of ${pet.name}`}
        className={`w-full h-full object-cover sm:group-hover:scale-105 transition-transform duration-300 ease-in-out ${imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
        onLoad={() => setImageLoading(false)}
      />

      {/* Overlay controls at the top */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
        <span
          className={`px-2.5 py-0.5 rounded-full text-sm font-medium ${statusColor.bg} ${statusColor.text}`}
        >
          {status}
        </span>
        <div className="flex absolute cursor-pointer right-3 items-center gap-2">
          <button
            onClick={handleFavoriteToggle}
            disabled={isTogglingFavorite}
            className={`p-2 rounded-full bg-white/80 hover:bg-white focus:outline-none ${isTogglingFavorite ? 'opacity-50' : ''
              }`}
            aria-label={favoriteStatus ? "Remove from favorites" : "Add to favorites"}
          >
            {favoriteStatus ? (
              <PiPawPrintFill className="size-5 text-red-400" />
            ) : (
              <PiPawPrint className="size-5 text-gray-800" />
            )}
          </button>
        </div>
      </div>

      {/* Information box overlay at the bottom */}
      <div className="absolute inset-x-4 bottom-3 h-15 flex-1 overflow-hidden rounded-2xl bg-white/80 py-1 pl-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {pet.name} {pet.gender ? `(${pet.gender.charAt(0)})` : ''}
        </h3>
        <div className="flex items-center justify-between gap-4"></div>

        <div className="flex items-center gap-2 text-m text-gray-600 ">
          <div className="flex items-center gap-2 text-l">
            <span className="text-gray-600">
              {pet.age !== undefined && pet.age !== null
                ? `${pet.age} ${pet.age === 1 ? 'year' : 'years'}`
                : 'Age unknown'}
            </span>

            {pet.distance && (
              <>
                <div className="h-4 w-0.5 bg-gray-400"></div>
                <span className="truncate text-gray-600">
                  {typeof pet.distance === 'number'
                    ? `${pet.distance.toFixed(1)} km`
                    : pet.distance}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AnimalCard;