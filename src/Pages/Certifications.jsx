import React from "react";
import { motion as Motion } from "framer-motion";

const certifications = [
  {
    image:
      "https://images.credly.com/images/0e284c3f-5164-4b21-8660-0d84737941bc/linkedin_thumb_image.png",
    title: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services Training and Certification",
    description:
      "Design secure, scalable, and fault-tolerant distributed systems on AWS. Validates expertise in architectural best practices, cost optimization, and operational excellence.",
    tags: ["AWS", "Cloud Architecture", "Solutions Design"],
    link: "https://www.credly.com/badges/afc3beed-0ee5-4e65-9552-07ee1e92cff6/public_url",
  },
  {
    image:
      "https://images.credly.com/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/linkedin_thumb_image.png",
    title: "AWS Cloud Practitioner (CLF-C02)",
    issuer: "Amazon Web Services Training and Certification",
    description:
      "Foundational understanding of AWS cloud services, pricing, architecture best practices, security, and compliance. Validates overall cloud fluency.",
    tags: ["AWS", "Cloud Computing", "Cloud Fundamentals"],
    link: "https://www.datacamp.com/completed/statement-of-accomplishment/track/3b24e96f91727dba3a291bb20dd1b2060f20aae0",
  },
  {
    image:
      "https://learn.microsoft.com/en-us/training/achievements/azure-fundamentals.svg",
    title: "Microsoft Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
    description:
      "Foundational understanding of cloud services, Azure architecture, security, compliance, privacy, and pricing. Validates core cloud concepts and Azure service knowledge.",
    tags: ["Azure", "Cloud Computing", "Cloud Fundamentals"],
    link: "https://drive.google.com/file/d/1tkkfo9reR4E2F_CBcb4LyuBoEtv5rpHN/view",
  },
];

function Certifications() {
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
            <h2 className="text-3xl font-bold text-white">Certifications</h2>
          </section>

          <div className="w-full border-t border-gray-700"></div>

          <section className="pt-10">
            <div className="max-w-2xl mx-auto space-y-6">
              {certifications.map((cert, idx) => (
                <a
                  key={idx}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ y: -2 }}
                    className="group relative bg-[#111] border border-gray-800 hover:border-gray-700 rounded-xl p-6 transition-all duration-300"
                  >
                    <div className="flex items-start gap-5">
                      <div className="shrink-0">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-900 border border-gray-800 flex items-center justify-center p-2">
                          <img
                            src={cert.image}
                            alt={cert.title}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-white group-hover:text-gray-300 transition-colors">
                              {cert.title}
                            </h3>
                            <p className="text-sm text-gray-400 mt-0.5">
                              {cert.issuer}
                            </p>
                          </div>


                        </div>

                        <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                          {cert.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-5 mt-4">
                          <div className="flex flex-wrap gap-1.5">
                            {cert.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 text-[11px] font-medium text-gray-400 bg-gray-800/80 rounded-md"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <span className="text-xs text-gray-600 group-hover:text-gray-400 transition-colors flex items-center gap-1">
                            View Credential
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>


                  </Motion.div>
                </a>
              ))}
            </div>
          </section>
        </div>

        <div className="w-full border-t border-gray-700 mt-10"></div>
      </Motion.div>
    </>
  );
}

export default Certifications;
