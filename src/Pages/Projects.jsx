import { motion as Motion } from "framer-motion";

const projects = [
  {
    name: "Hand Gesture Recognition",
    description:
      "Real-time hand gesture detection and classification system using computer vision and deep learning models.",
    tech: ["Python", "OpenCV", "TensorFlow", "MediaPipe"],
    link: "https://github.com/Srijanprasad/Hand-gesture.git",
  },
  {
    name: "Expense Tracker MCP",
    description:
      "Model Context Protocol server for natural language expense tracking and financial data management.",
    tech: ["Python", "MCP", "LLM", "SQLite"],
    link: "https://github.com/Srijanprasad/Expense-tracker-mcp.git",
  },
  {
    name: "UK Visa Eligibility Checker",
    description:
      "AI-powered visa eligibility assessment tool using LangChain and sentence transformers for intelligent document matching and analysis.",
    tech: ["Python", "Jupyter", "Docker", "Streamlit"],
    link: "https://github.com/Srijanprasad/Visa.git",
  },
  {
    name: "M.M.T.T — Multi Mode Tactical Tracker",
    description:
      "IoT-enabled tactical tracking system with real-time monitoring, multi-protocol communication, and cross-platform support.",
    tech: ["Kotlin", "C++", "Java", "IoT"],
    link: "https://github.com/Srijanprasad/M.M.T.T.git",
  },
  {
    name: "Salesforce Calendar Application",
    description:
      "Comprehensive calendar management app on Salesforce for event scheduling, task organization, and activity tracking with automated reminders.",
    tech: ["Salesforce", "Apex", "LWC", "SOQL", "Salesforce Flow"],
  },
  {
    name: "Salesforce Reimbursement Management System",
    description:
      "Automated reimbursement request and approval system on Salesforce with multi-level workflows, expense tracking, and analytics dashboards.",
    tech: ["Salesforce", "Apex", "LWC", "SOQL", "Salesforce Flow"],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function Projects() {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="px-4 md:py-10 overflow-hidden"
    >
      <div className="px-4 md:py-10">
        <section className="py-4">
          <h2 className="text-3xl font-bold text-white">Projects</h2>
          <p className="text-gray-500 text-sm mt-1.5 max-w-xl">
            Salesforce apps, computer vision, AI agents, IoT systems,
            and full-stack applications.
          </p>
        </section>

        <div className="w-full border-t border-gray-800"></div>

        <section className="pt-8">
          <Motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {projects.map((p, i) => {
              const Wrapper = p.link ? Motion.a : Motion.div;
              const wrapperProps = p.link
                ? { href: p.link, target: "_blank", rel: "noopener noreferrer" }
                : {};
              return (
                <Wrapper
                  key={i}
                  variants={item}
                  {...wrapperProps}
                  className="group block bg-[#111] border border-gray-800 hover:border-gray-600 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-gray-800/80 flex items-center justify-center shrink-0">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-[15px] font-semibold text-white leading-tight">
                      {p.name}
                    </h3>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-600 shrink-0 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed">
                  {p.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.tech.map((t, j) => (
                    <span
                      key={j}
                      className="px-2.5 py-1 text-[11px] font-medium text-gray-500 bg-gray-800/50 border border-gray-700/50 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {p.link && (
                  <div className="mt-4 pt-3 border-t border-gray-800/60 flex items-center gap-2 text-xs text-gray-700">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    View Repository
                  </div>
                )}
              </Wrapper>
            );
            })}
          </Motion.div>
        </section>
      </div>

      <div className="w-full border-t border-gray-800 mt-10"></div>
    </Motion.div>
  );
}

export default Projects;
