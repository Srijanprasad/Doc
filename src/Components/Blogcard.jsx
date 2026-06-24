import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ image, title, hashtags, description, date, link }) => {
  return (
    <div
      className={`relative rounded-2xl shadow-md w-full sm:w-80 md:w-80 h-110  overflow-hidden group cursor-pointer`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

      <div className="absolute top-0 left-0 p-2 sm:p-4 flex gap-1 sm:gap-2 flex-wrap">
        {hashtags.map((tag, i) => (
          <span
            key={i}
            className="bg-black/50 backdrop-blur-sm text-gray-200 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="absolute bottom-0 p-2 sm:p-4 text-white w-full">
        <h2 className="text-base sm:text-lg font-semibold">{title}</h2>
        <p className="text-gray-300 text-[10px] sm:text-xs">{date}</p>
        <p className="text-gray-200 text-xs sm:text-sm mt-1 line-clamp-2 sm:line-clamp-3">
          {description}
        </p>
      </div>

      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
        <Link
          to={link}
          target="_blank"
          className="text-sm sm:text-lg font-semibold hover:underline"
        >
          READ MORE →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
