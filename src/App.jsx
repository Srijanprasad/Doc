import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Pages/Home";
import Contacts from "./Pages/Contacts";
import Certifications from "./Pages/Certifications";
import Experience from "./Pages/Experience";
import Projects from "./Pages/Projects";
import About from "./Pages/About";
import { motion as Motion } from "framer-motion";
import Slider from "./Components/Slider";
import Headerslider from "./Components/Headerslider";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="hidden md:block w-[30%]">
            <div className="sticky top-5 h-[calc(100vh-40px)] overflow-hidden">
              <Motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <Slider />
              </Motion.div>
            </div>
          </div>

          <div className="block md:hidden w-full mb-4">
            <Motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Headerslider />
            </Motion.div>
          </div>

          <Motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full md:w-[70%] px-2"
          >
            <div>
              <ScrollToTop />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/certifications" element={<Certifications />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<About />} />
                <Route path="/contacts" element={<Contacts />} />
              </Routes>
            </div>
          </Motion.div>
        </div>
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
