import { motion as Motion } from "framer-motion";

function Experience() {
  return (
    <>
      <Motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="px-4 md:py-10 overflow-hidden"
      >
        <div className="px-4 md:py-10">
          <section className="py-4">
            <h2 className="text-2xl text-white">Experience</h2>
          </section>

          <div className="w-full border-t border-white"></div>

          <section className="pt-5">
            <div className="py-6">
              <div className="max-w rounded-2xl overflow-hidden shadow-lg bg-[#1E1E1E] text-white">
                <div className="p-5">
                  <h2 className="text-xl mb-2">Infosys Springboard Intern</h2>

                  <div className="text-sm text-gray-300">
                    Infosys Springboard • Virtual Internship
                  </div>

                  <ul className="pt-3 text-base leading-relaxed text-gray-200 list-disc list-inside space-y-2">
                    <li>
                      Completed industry-aligned training in software
                      development, cloud computing, and emerging technologies.
                    </li>
                    <li>
                      Applied programming and problem-solving skills through
                      assignments, assessments, and project-based learning.
                    </li>
                    <li>
                      Gained practical exposure to development workflows,
                      debugging techniques, and industry best practices.
                    </li>
                    <li>
                      Strengthened analytical thinking, technical
                      decision-making, and professional communication.
                    </li>
                  </ul>

                  <a
                    href="https://drive.google.com/file/d/1hnAfh-uXpwkmrbWu5PyytOkLfjrrW5z0/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-sm text-gray-300 hover:text-white hover:underline"
                  >
                    View internship link →
                  </a>
                </div>
              </div>
            </div>

            <div className="py-6">
              <div className="max-w rounded-2xl overflow-hidden shadow-lg bg-[#1E1E1E] text-white">
                <div className="h-80 w-full overflow-hidden">
                  <img
                    src="icons/sih-2025.jpg"
                    alt="Smart India Hackathon 2025"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5">
                  <h2 className="text-xl mb-2">
                    Smart India Hackathon 2025
                  </h2>

                  <div className="text-sm text-gray-300">
                    Grand Finalist • Top 1.98% Nationwide
                  </div>

                  <ul className="pt-3 text-base leading-relaxed text-gray-200 list-disc list-inside space-y-2">
                    <li>
                      Developed a technology-driven solution for real-world
                      challenges as part of a multidisciplinary team.
                    </li>
                    <li>
                      Reached the Grand Finale stage among 1,360 selected teams
                      out of 68,766 participating teams.
                    </li>
                    <li>
                      Collaborated on system design, solution architecture,
                      prototype development, and technical presentation.
                    </li>
                    <li>
                      Demonstrated problem-solving, teamwork, and innovation
                      under competitive project deadlines.
                    </li>
                  </ul>

                  <a
                    href="https://www.linkedin.com/posts/srijan-prasad-_smartindiahackathon-sih2025-grandfinale-ugcPost-7408932261502320640-DwE0/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEcy-SoBCj1P-PIScCfskgYGSAiurHUdMSQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-sm text-gray-300 hover:text-white hover:underline"
                  >
                    View LinkedIn post →
                  </a>
                </div>
              </div>
            </div>

            <div className="py-6">
              <div className="max-w rounded-2xl overflow-hidden shadow-lg bg-[#1E1E1E] text-white">
                <div className="h-80 w-full overflow-hidden">
                  <img
                    src="https://drive.google.com/thumbnail?id=1-7_nshsf0iD2U-oKy0Nf57AvDbWhNUP5&sz=w1000"
                    alt="WordCamp 2025"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5">
                  <h2 className="text-xl mb-2">WordCamp 2025</h2>

                  <div className="text-sm text-gray-300">
                    Event Host • Community & Tech Event
                  </div>

                  <ul className="pt-3 text-base leading-relaxed text-gray-200 list-disc list-inside space-y-2">
                    <li>
                      Hosted WordCamp 2025, contributing to a community-driven
                      technology event focused on learning and collaboration.
                    </li>
                    <li>
                      Coordinated event flow, engaged with participants, and
                      supported smooth communication across sessions.
                    </li>
                    <li>
                      Strengthened public speaking, event management, and
                      professional communication skills.
                    </li>
                  </ul>

                  <a
                    href="https://www.linkedin.com/feed/update/urn:li:activity:7412022525695606784/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEcy-SoBCj1P-PIScCfskgYGSAiurHUdMSQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-sm text-gray-300 hover:text-white hover:underline"
                  >
                    View LinkedIn post →
                  </a>
                </div>
              </div>
            </div>

            <div className="py-6">
              <div className="max-w rounded-2xl overflow-hidden shadow-lg bg-[#1E1E1E] text-white">
                <div className="h-80 w-full overflow-hidden">
                  <img
                    src="icons/iitd-2025.jpg"
                    alt="R&D to Venture, E-Summit IIIT Delhi"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5">
                  <h2 className="text-xl mb-2">
                    R&D to Venture, E-Summit IIIT Delhi
                  </h2>

                  <div className="text-sm text-gray-300">
                    Finalist • Foodoscope
                  </div>

                  <ul className="pt-3 text-base leading-relaxed text-gray-200 list-disc list-inside space-y-2">
                    <li>
                      Presented Foodoscope, an AI-powered food analysis platform
                      for flavor prediction and recipe generation.
                    </li>
                    <li>
                      Conducted research, product ideation, and solution
                      validation for practical food-tech challenges.
                    </li>
                    <li>
                      Showcased entrepreneurial thinking, technical
                      implementation, and business feasibility to evaluators.
                    </li>
                  </ul>

                  <a
                    href="https://www.linkedin.com/posts/srijan-prasad-_foodoscope-esummitiiitd-innovation-activity-7312372216568930306-EXbE?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEcy-SoBCj1P-PIScCfskgYGSAiurHUdMSQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-sm text-gray-300 hover:text-white hover:underline"
                  >
                    View LinkedIn post →
                  </a>
                </div>
              </div>
            </div>

            <div className="py-6">
              <div className="max-w rounded-2xl overflow-hidden shadow-lg bg-[#1E1E1E] text-white">
                <div className="h-80 w-full overflow-hidden">
                  <img
                    src="icons/pravah-3.jpg"
                    alt="Pravah 3.0 Hackathon"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5">
                  <h2 className="text-xl mb-2">Pravah 3.0 Hackathon</h2>

                  <div className="text-sm text-gray-300">
                    5th Place • 24-Hour Hackathon
                  </div>

                  <ul className="pt-3 text-base leading-relaxed text-gray-200 list-disc list-inside space-y-2">
                    <li>
                      Secured 5th place in Pravah 3.0, a 24-hour hackathon and
                      my first hackathon experience.
                    </li>
                    <li>
                      Collaborated with teammates to ideate, build, and present
                      a working solution under a tight deadline.
                    </li>
                    <li>
                      Strengthened teamwork, rapid prototyping, presentation,
                      and competitive problem-solving skills.
                    </li>
                  </ul>

                  <a
                    href="https://www.linkedin.com/posts/srijan-prasad-_our-team-proudly-secured-5th-place-in-pravah-activity-7277745469831696384-MVti?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEcy-SoBCj1P-PIScCfskgYGSAiurHUdMSQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-sm text-gray-300 hover:text-white hover:underline"
                  >
                    View LinkedIn post →
                  </a>
                </div>
              </div>
            </div>
          </section>

          <div className="w-full border-t border-white"></div>
        </div>
      </Motion.div>
    </>
  );
}

export default Experience;
