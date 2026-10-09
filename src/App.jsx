import { lazy, Suspense } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowUpRight } from "lucide-react";

import Home from "./portfolio-pages/Home";
import Contacts from "./portfolio-pages/Contacts";
import Certifications from "./portfolio-pages/Certifications";
import Experience from "./portfolio-pages/Experience";
import Projects from "./portfolio-pages/Projects";
import About from "./portfolio-pages/About";
import Game from "./portfolio-pages/Game";
import ScrollToTop from "./Components/ScrollToTop";

const Blog = lazy(() => import("./portfolio-pages/Blog"));
const BlogPost = lazy(() => import("./portfolio-pages/BlogPost"));
const AdminBlog = lazy(() => import("./portfolio-pages/AdminBlog"));
const AdminRoute = lazy(() => import("./Components/AdminRoute"));

function App({ featuredPosts = [] }) {
  return (
    <>
      <div className="portfolio-shell min-h-screen">
        <main className="portfolio-main">
          <ScrollToTop />

          <Suspense
            fallback={
              <p role="status" className="px-4 py-12 text-center text-gray-400">
                Loading page…
              </p>
            }
          >
            <Routes>
              <Route path="/" element={<Home featuredPosts={featuredPosts} />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/play" element={<Game />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminBlog />
                  </AdminRoute>
                }
              />
              <Route path="/contacts" element={<Contacts />} />
            </Routes>
          </Suspense>
        </main>

        <footer className="sleek-footer">
          <div className="sleek-footer-main">
            <div>
              <p className="sleek-eyebrow">Navigate</p>
              <nav className="sleek-footer-links" aria-label="Footer navigation">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/experience">Work</NavLink>
                <NavLink to="/projects">Projects</NavLink>
                <a href="/blog">Blog</a>
                <NavLink to="/play">Play</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/certifications">Certifications</NavLink>
                <NavLink to="/contacts">Contact</NavLink>
              </nav>
            </div>
            <div>
              <p className="sleek-eyebrow">Connect</p>
              <nav className="sleek-footer-links" aria-label="Social profiles">
                <a href="https://x.com/Ushan_0" target="_blank" rel="noreferrer">X</a>
                <a href="https://www.instagram.com/srijanprasad_/" target="_blank" rel="noreferrer">Instagram</a>
                <a href="https://github.com/Srijanprasad" target="_blank" rel="noreferrer">GitHub</a>
                <a href="mailto:srijanprasad2006@gmail.com">Email</a>
              </nav>
            </div>
          </div>
          <div className="sleek-footer-bottom">
            <span>© {new Date().getFullYear()} Srijan Prasad. All rights reserved.</span>
            <a href="https://github.com/Srijanprasad" target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight aria-hidden="true" size={13} />
            </a>
          </div>
        </footer>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
}

export default App;
