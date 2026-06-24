import TechCarousel from "../Components/Techcarousel";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";

function Home() {
  return (
    <>
      <Motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="px-4 md:py-10 overflow-hidden"
      >
        <div className="px-2 md:py-10">
          <div className="flex items-center text-2xl text-white">
            Hi, I'm Srijan <span className="px-2">👋</span>
          </div>

          <div className="flex py-2 text-sm text-gray-300">
            <span className="pr-4">• Based in Bhopal, India</span>
            <span>• Working Remotely</span>
          </div>

          <p className="py-3 text-base leading-relaxed text-gray-200">
            Building scalable software, cloud-native solutions, and intelligent
            business applications through modern development, DevOps automation,
            and Salesforce technologies. Passionate about solving complex
            problems and delivering reliable, high-performance digital
            experiences.
          </p>

          <div className="w-full border-t border-white"></div>

          <section className="py-8">
            <h2 className="pb-4 text-2xl  text-white">
              Tools That I Have Used
            </h2>
            <TechCarousel />
          </section>

          <div className="w-full border-t border-white"></div>

          <section className="py-8">
            <h2 className="text-2xl text-white">What I've Been Working On</h2>
            <p className="pt-3 text-base leading-relaxed text-gray-200">
              I assist brands, companies, institutions, and startups in creating
              exceptional digital experiences for their businesses through
              strategic development services.
            </p>
          </section>

          <div className="w-full border-t border-white"></div>

          <section className="py-8">
            <div className="bg-[#1E1E1E] rounded-2xl p-6 md:p-10">
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="icons/newcontacts.svg"
                  alt="Contact Icon"
                  className="w-6 h-6"
                />
                <h2 className="text-lg font-semibold text-white">
                  Lets work together!
                </h2>
              </div>

              <p className="text-gray-300 mb-4">
                I'm open for freelance projects, feel free to email me to see
                how can we collaborate.
              </p>

              <Link to="/contacts">
                <button className="px-4 py-2 bg-[#525252] text-white rounded-md hover:opacity-75 transition duration-300">
                  Contact me
                </button>
              </Link>
            </div>
          </section>

          <div className="w-full border-t border-white"></div>
        </div>
      </Motion.div>
    </>
  );
}

export default Home;
