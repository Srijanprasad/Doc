import PortfolioShell from "../../PortfolioShell";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const portfolioRoutes = new Set([
  "about",
  "admin",
  "certifications",
  "contacts",
  "experience",
  "play",
  "projects",
]);

export default async function PortfolioRoute({ params }) {
  const { slug } = await params;

  if (slug.length !== 1 || !portfolioRoutes.has(slug[0])) {
    notFound();
  }

  return <PortfolioShell />;
}
