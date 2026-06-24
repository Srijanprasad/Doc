import { Link } from "react-router-dom";
import avatar from "../assets/F.jpeg";

function Slider() {
  return (
    <>
      <div>
        <div className="py-10">
          <div className="pb-5">
            <div className="w-20 h-20 md:w-24 md:h-24 ">
              <img
                src={avatar}
                alt="srijanimage"
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            <div className=" flex text-2xl text-white pt-2">
              <div className="px-2"> Srijan Prasad</div>

              <img
                src="/icons/bluetick.png"
                alt="blue tick"
                className="h-8 w-8"
              />
            </div>
            <div className="px-2"></div>
          </div>

          <div className="py-2">
            <Link to="/">
              <div className="flex bg-[#1E1E1E] px-5 py-4 rounded-2xl hover:bg-[#525252] transition duration-300">
                <img
                  src="/icons/latesthome.svg"
                  alt="homeicon"
                  className="h-5.5 w-5"
                />
                <div className="px-2">Home</div>
              </div>
            </Link>
          </div>

          <div className="py-2">
            <Link to="/projects">
              <div className="flex bg-[#1E1E1E] px-5 py-4 rounded-2xl hover:bg-[#525252] transition duration-300">
                <img
                  src="/icons/newcart.svg"
                  alt="projects"
                  className="h-5.5 w-5"
                />
                <div className="px-2">Projects</div>
              </div>
            </Link>
          </div>

          <div className="py-2">
            <Link to="/certifications">
              <div className="flex bg-[#1E1E1E] px-5 py-4 rounded-2xl hover:bg-[#525252] transition duration-300">
                <img
                  src="/icons/newblog.svg"
                  alt="certifications"
                  className="h-5.5 w-5"
                />
                <div className="px-2">Certifications</div>
              </div>
            </Link>
          </div>

          <div className="py-2">
            <Link to="/experience">
              <div className="flex bg-[#1E1E1E] px-5 py-4 rounded-2xl hover:bg-[#525252] transition duration-300">
                <img
                  src="/icons/newdash.svg"
                  alt="experience"
                  className="h-5.5 w-5"
                />
                <div className="px-2">Experience</div>
              </div>
            </Link>
          </div>

          <div className="py-2">
            <Link to="/about">
              <div className="flex bg-[#1E1E1E] px-5 py-4 rounded-2xl hover:bg-[#525252] transition duration-300">
                <img
                  src="/icons/newabout.svg"
                  alt="about"
                  className="h-5.5 w-5"
                />
                <div className="px-2">About</div>
              </div>
            </Link>
          </div>

          <div className="py-2">
            <Link to="/contacts">
              <div className="flex bg-[#1E1E1E] px-5 py-4 rounded-2xl hover:bg-[#525252] transition duration-300">
                <img
                  src="/icons/newcontacts.svg"
                  alt="contacts"
                  className="h-5.5 w-5"
                />
                <div className="px-2">Contacts</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Slider;
