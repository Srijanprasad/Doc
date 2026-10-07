import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

const markdownComponents = {
  h1: ({ children }) => (
    <h1 className="mb-4 mt-8 text-3xl font-bold text-white">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-3 mt-8 text-2xl font-semibold text-white">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 mt-6 text-xl font-semibold text-white">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-5 leading-7 text-gray-300">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-5 list-disc space-y-2 pl-6 text-gray-300">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-5 list-decimal space-y-2 pl-6 text-gray-300">
      {children}
    </ol>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mb-5 border-l-2 border-cyan-400 pl-4 italic text-gray-400">
      {children}
    </blockquote>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-cyan-300 underline underline-offset-4 hover:text-cyan-200"
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="rounded bg-gray-800 px-1.5 py-0.5 text-sm text-cyan-100">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="mb-5 overflow-x-auto rounded-xl border border-gray-800 bg-[#0b0b0b] p-4 text-sm text-gray-200">
      {children}
    </pre>
  ),
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt || ""}
      loading="lazy"
      className="my-6 h-auto max-w-full rounded-xl"
    />
  ),
  table: ({ children }) => (
    <div className="mb-5 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm text-gray-300">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-gray-700 bg-gray-900 px-3 py-2 font-semibold text-white">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-gray-800 px-3 py-2">{children}</td>
  ),
};

export default function MarkdownBody({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSanitize]}
      components={markdownComponents}
    >
      {content}
    </ReactMarkdown>
  );
}
