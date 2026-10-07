import { Link } from "react-router-dom";

const BlogCard = ({
  image,
  title,
  date,
  excerpt,
  link,
  category,
  tags = [],
  readingTime,
}) => {
  const external = link.startsWith("https://");
  const CardLink = external ? "a" : Link;
  const linkProps = external
    ? { href: link, target: "_blank", rel: "noopener noreferrer" }
    : { to: link };

  return (
    <CardLink
      {...linkProps}
      aria-label={`Read ${title}`}
      className="group flex flex-col bg-[#111] border border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-gray-600 hover:shadow-xl hover:shadow-black/50 hover:-translate-y-1.5"
    >
      <div className="relative aspect-[16/9] shrink-0 overflow-hidden bg-gray-800">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "/icons/blog-fallback.svg";
          }}
        />
      </div>

      <div className="flex flex-col flex-1 p-5">
        <p className="text-xs text-gray-500 font-medium">{date}</p>
        {category && (
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-cyan-300">
            {category}
          </p>
        )}
        {readingTime && (
          <p className="mt-1 text-xs text-gray-500">{readingTime}</p>
        )}
        <h3 className="mt-1.5 text-base font-semibold text-white leading-snug line-clamp-2 transition-colors duration-300 group-hover:text-gray-300">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-3">
          {excerpt}
        </p>
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-gray-800 bg-gray-900 px-2 py-1 text-[10px] text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-gray-400 transition-colors duration-300 group-hover:text-white">
          Read article
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </span>
      </div>
    </CardLink>
  );
};

export default BlogCard;