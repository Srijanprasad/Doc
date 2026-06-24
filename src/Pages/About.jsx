import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { motion as Motion } from "framer-motion";

function About() {
  const [activetab, setActivetab] = useState("intro");
  return (
    <>
      <Motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="px-4 md:py-10 overflow-hidden"
      >
        <div className=" px-4 md:py-10">
          <section className="py-4">
            <h2 className="text-2xl text-white">About</h2>
          </section>

          <div className="w-full border-t  border-white"></div>

          <section className="py-4">
            <h2 className="">
              An insightful glimpse into who I am because every detail adds
              depth to the canvas of life.
            </h2>
          </section>

          <div className="w-full border-t border-dashed border-white"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 justify-evenly py-4">
            <button
              onClick={() => setActivetab("intro")}
              className="flex-1 text-center rounded-xl text-white mx-1 px-5 py-2  bg-[#A3A3A3] cursor-pointer"
            >
              Intro
            </button>
            <button
              onClick={() => setActivetab("resume")}
              className="flex-1 text-center rounded-xl text-white mx-1 px-5 py-2 bg-[#A3A3A3] cursor-pointer"
            >
              Resume
            </button>
            <button
              onClick={() => {
                setActivetab("careers");
              }}
              className="flex-1 text-center rounded-xl text-white mx-1 px-5 py-2 bg-[#A3A3A3] cursor-pointer"
            >
              Careers
            </button>
            <button
              onClick={() => setActivetab("education")}
              className="flex-1 text-center rounded-xl text-white mx-1 px-5 py-2 bg-[#A3A3A3] cursor-pointer"
            >
              Education
            </button>
          </div>

          <div className="w-full border-t border-dashed border-white"></div>

          <div className="py-4">
            <div className="py-4">
              {activetab === "intro" && (
                <div>
                  I'm a Salesforce Developer and DevOps enthusiast passionate
                  about building intelligent business solutions, automating
                  workflows, and creating scalable cloud-native applications.
                  <br />
                  <br />
                  My expertise spans the Salesforce ecosystem, including Apex,
                  Lightning Web Components (LWC), Salesforce Flow, Agentforce,
                  SOQL, and CRM customization. I enjoy designing solutions that
                  streamline business processes, enhance customer experiences,
                  and drive digital transformation.
                  <br />
                  <br />
                  Alongside Salesforce development, I actively explore DevOps
                  and Cloud Computing technologies such as AWS, Docker,
                  Kubernetes, CI/CD pipelines, Infrastructure as Code (IaC), and
                  automation tools. I am passionate about improving software
                  delivery, optimizing cloud infrastructure, and building
                  reliable, secure, and scalable systems.
                  <br />
                  <br />
                  I believe great technology goes beyond writing code—it should
                  automate operations, solve real business challenges, and
                  create measurable value. My goal is to bridge the gap between
                  software development, cloud infrastructure, and business
                  automation by delivering innovative and impactful solutions.
                  <br />
                  <br />
                  I thrive in collaborative environments, continuously learn
                  emerging technologies, and enjoy turning complex ideas into
                  practical solutions that help organizations scale, innovate,
                  and succeed.
                  <br />
                  <br />
                  Best Regards,
                  <br />
                  <br />
                  Srijan Prasad
                  <br />
                  <br />
                </div>
              )}
            </div>

            {activetab === "resume" && (
              <div>
                I will add my resume at the end of this month.
                <br />
                <br />
              </div>
            )}

            {activetab === "careers" && (
              <div>
                Open to Salesforce Developer, DevOps, Cloud, and Software
                Engineering opportunities where I can build scalable solutions,
                automate business processes, collaborate with high-performing
                teams, and continuously grow as a technology professional.
                <br />
                <br />
              </div>
            )}

            {activetab === "education" && (
              <div>
                <div className="py-2">
                  <div className="flex items-center bg-[#1a1a1a] rounded-2xl p-4 shadow-md">
                    <img
                      src="icons/tit-logo.png"
                      alt="Technocrats Institute of Technology"
                      className="w-20 h-20 object-contain rounded-lg"
                    />

                    <div className="ml-4 text-white">
                      <h2 className="text-lg">Technocrats Institute of Technology</h2>
                      <div className="text-sm text-gray-300">
                        Bachelor's degree • Computer Science 
                        Engineering
                      </div>
                      <p className="text-sm text-gray-400 flex items-center gap-1">
                        2023 - 2027 <span className="mx-1">•</span>
                        Madhya Pradesh, India
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  <div className="flex items-center bg-[#1a1a1a] rounded-2xl p-4 shadow-md">
                    <img
                      src="icons/dav-logo.png"
                      alt="Agrasen DAV Public School, Ramgarh"
                      className="w-20 h-20 object-contain rounded-lg"
                    />

                    <div className="ml-4 text-white">
                      <h2 className="text-lg ">
                        Agrasen DAV Public School, Ramgarh
                      </h2>
                      <div className="text-sm text-gray-300">High School</div>
                      <div className="text-sm text-gray-400 flex items-center gap-1">
                        2021 - 2023 <span className="mx-1">•</span>
                        Jharkhand, India
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-full border-t py-4 border-white"></div>

          <div></div>
        </div>
      </Motion.div>
    </>
  );
}

export default About;
