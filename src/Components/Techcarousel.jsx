import {
  FaHtml5,
  FaCss3Alt,
  FaJs,

  FaGithub,
  FaLinux,
  FaPython,
  FaDocker,
  FaAws,
  FaRocket,
  FaCode,
  FaNetworkWired,
  FaGlobe,
  FaLock,
  FaBalanceScale,
  FaServer,
  FaCloud,
  FaDatabase,
  FaClipboardList,
  FaUserShield,
  FaRobot,
  FaBook,
  FaStore,
  FaTerminal,
  FaCogs,
  FaChartBar,
  FaShieldAlt,
} from "react-icons/fa";
import {
  SiGithubactions,
  SiJenkins,
  SiKubernetes,
  SiHelm,
  SiTerraform,
  SiGnubash,
  SiNginx,
  SiPrometheus,
  SiGrafana,
  SiElasticstack,
  SiAmazonec2,
  SiAmazons3,
  SiAmazoniam,
  SiAmazonroute53,
  SiAmazoncloudwatch,
  SiAmazonrds,
  SiSalesforce,
  SiLightning,
  SiN8N,
} from "react-icons/si";

const techs = [
  { label: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
  { label: "n8n", icon: <SiN8N className="text-red-400" /> },
  { label: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
  { label: "JavaScript", icon: <FaJs className="text-yellow-400" /> },


  { label: "Python", icon: <FaPython className="text-yellow-400" /> },
  { label: "Linux", icon: <FaLinux className="text-orange-400" /> },
  { label: "Git & GitHub", icon: <FaGithub className="text-gray-200" /> },
  { label: "GitHub Actions", icon: <SiGithubactions className="text-gray-200" /> },
  { label: "Jenkins", icon: <SiJenkins className="text-red-400" /> },
  { label: "Docker", icon: <FaDocker className="text-blue-400" /> },
  { label: "Kubernetes", icon: <SiKubernetes className="text-blue-400" /> },
  { label: "Helm", icon: <SiHelm className="text-blue-300" /> },
  { label: "Terraform", icon: <SiTerraform className="text-purple-400" /> },
  { label: "Bash Scripting", icon: <SiGnubash className="text-green-400" /> },
  { label: "Nginx", icon: <SiNginx className="text-green-500" /> },
  { label: "CI/CD Pipelines", icon: <FaRocket className="text-green-400" /> },
  { label: "Infrastructure as Code (IaC)", icon: <FaCode className="text-blue-400" /> },
  { label: "AWS EC2", icon: <SiAmazonec2 className="text-orange-400" /> },
  { label: "AWS S3", icon: <SiAmazons3 className="text-green-400" /> },
  { label: "AWS IAM", icon: <SiAmazoniam className="text-red-400" /> },
  { label: "AWS VPC", icon: <FaNetworkWired className="text-blue-400" /> },
  { label: "Route 53", icon: <SiAmazonroute53 className="text-orange-400" /> },
  { label: "CloudWatch", icon: <SiAmazoncloudwatch className="text-yellow-400" /> },
  { label: "AWS RDS", icon: <SiAmazonrds className="text-blue-400" /> },
  { label: "AWS Lambda", icon: <FaCloud className="text-orange-400" /> },
  { label: "Prometheus", icon: <SiPrometheus className="text-red-400" /> },
  { label: "Grafana", icon: <SiGrafana className="text-orange-400" /> },
  { label: "ELK Stack", icon: <SiElasticstack className="text-green-400" /> },
  { label: "DevSecOps", icon: <FaUserShield className="text-green-500" /> },
  { label: "TCP/IP", icon: <FaGlobe className="text-blue-400" /> },
  { label: "DNS", icon: <FaGlobe className="text-green-400" /> },
  { label: "HTTP/HTTPS", icon: <FaLock className="text-green-500" /> },
  { label: "Load Balancing", icon: <FaBalanceScale className="text-blue-400" /> },
  { label: "Reverse Proxy", icon: <FaServer className="text-gray-400" /> },
  { label: "Security Groups", icon: <FaShieldAlt className="text-red-400" /> },
  { label: "Route Tables", icon: <FaServer className="text-blue-400" /> },
  { label: "Salesforce CRM", icon: <SiSalesforce className="text-blue-400" /> },
  { label: "Apex", icon: <FaCode className="text-blue-400" /> },
  { label: "SOQL", icon: <FaDatabase className="text-blue-400" /> },
  { label: "SOSL", icon: <FaDatabase className="text-blue-400" /> },
  { label: "Lightning Web Components", icon: <SiLightning className="text-blue-400" /> },
  { label: "Salesforce Flow", icon: <FaCogs className="text-blue-400" /> },
  { label: "Process Automation", icon: <FaCogs className="text-blue-400" /> },
  { label: "Validation Rules", icon: <FaClipboardList className="text-blue-400" /> },
  { label: "Reports & Dashboards", icon: <FaChartBar className="text-blue-400" /> },
  { label: "Data Modeling", icon: <FaDatabase className="text-blue-400" /> },
  { label: "Security & Sharing Rules", icon: <FaUserShield className="text-blue-400" /> },
  { label: "Salesforce Administration", icon: <FaCogs className="text-blue-400" /> },
  { label: "Agentforce", icon: <FaRobot className="text-blue-400" /> },
  { label: "Einstein AI", icon: <FaRobot className="text-blue-400" /> },
  { label: "Trailhead", icon: <FaBook className="text-blue-400" /> },
  { label: "AppExchange", icon: <FaStore className="text-blue-400" /> },
  { label: "Salesforce CLI", icon: <FaTerminal className="text-blue-400" /> },
];

function MarqueeRow({ reverse = false, speed = 50 }) {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#0f0f0f] to-transparent z-20" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#0f0f0f] to-transparent z-20" />

      <div
        className={`animate-marquee ${
          reverse ? "reverse" : ""
        } flex gap-4 w-max py-1`}
        style={{ animationDuration: `${speed}s` }}
      >
        {[...techs, ...techs].map((tech, i) => (
          <div
            key={`${tech.label}-${i}`}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-700 bg-[#1a1a1a] text-white text-sm whitespace-nowrap hover:bg-[#2c2c2c] transition-colors duration-300"
          >
            <span className="text-lg">{tech.icon}</span>
            <span className="font-medium">{tech.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechCarousel() {
  return (
    <div className="space-y-2">
      <MarqueeRow speed={100} />
      <MarqueeRow reverse speed={100} />
      <MarqueeRow speed={100} />
    </div>
  );
}
