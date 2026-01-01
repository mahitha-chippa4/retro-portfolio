import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import exp from "../assets/me/exp.gif";
import { RefreshCw } from "lucide-react";

export default function Experience() {
  const [focus, setFocus] = useState("none");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const panelWidth = screenWidth < 640 ? "310px" : "500px";

  const zoomConfig = {
    none: { scale: 1, x: 0, y: 0 },
    topLeft: { scale: 1.5, x: "25%", y: "25%" },
    center: { scale: 2, x: "40%", y: "-50%" },
    bottomRight: { scale: 1.5, x: "-10%", y: "10%" },
  };

  const headingMap = {
    topLeft: "Building the Base (2023–24)",
    center: "Scaling Through Competition (2024–25)",
    bottomRight: "From Projects to Industry (2025–Present)",
  };

  const contentMap = {
    topLeft: [
      "Top 5 winner at Krithoathon 1.0 for an AI-based traffic monitoring system",
      "Completed Google Gen AI Study Jams with 16 skill badges",
      "Built Nomos, an AI legal chatbot at HACK4SDG (IIT Hyderabad)",
    ],
    center: [
      "Runner-up at Hactivate (GeeksforGeeks) for a blockchain-based prescription verification system",
      "Qualified internal rounds of Smart India Hackathon",
      "Finalist at Solution Sprint with a healthcare 3D bioprinting solution",
    ],
    bottomRight: [
      "Secured second prize at VibeathonX for an AI-driven deepfake detection system",
      "Virtual Intern at Infosys Springboard working on real-world project simulations",
      "Attended Google DevFest Hyderabad with hands-on Kubernetes and GCP sessions",
    ],
  };

  return (
    <div className="sm:h-[500px] sm:w-[900px] w-full h-[500px] relative overflow-hidden text-sm sm:text-lg font-bold">

      <div className="sm:h-[530px] sm:w-[900px] h-full w-full relative overflow-hidden">

        {/* Background Image */}
        <motion.img
          src={exp}
          className="h-full w-full object-cover absolute top-0 left-0"
          animate={zoomConfig[focus]}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        {/* Info Panel */}
        {focus !== "none" && (
          <motion.div
            key={focus}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: panelWidth, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.6 }}
            className="absolute top-32 sm:left-48 h-44 z-30
              border-t-2 border-l-2 border-gray-200
              border-b-2 border-r-2 border-b-gray-500 border-r-gray-500
              bg-gray-300 text-black shadow-md overflow-hidden"
          >
            {/* Fixed Header */}
            <div className="bg-blue-500 text-white px-3 py-1">
              {headingMap[focus]}
            </div>

            {/* Scrollable Content (FIXED HEIGHT) */}
            <div className="h-[calc(100%-32px)] overflow-y-auto px-3 py-2 space-y-2 text-sm sm:text-base">
              {contentMap[focus].map((item, i) => (
                <p key={i}>- {item}</p>
              ))}
            </div>
          </motion.div>
        )}

        {/* Timeline Buttons */}
        <div className="absolute bottom-5 sm:bottom-14 w-full flex justify-between sm:px-10 px-5">
          <button
            onClick={() => setFocus("topLeft")}
            className="hover:bg-blue-400 w-20 sm:w-32 text-sm sm:text-2xl
              border-t-2 border-l-2 border-gray-200
              border-b-2 border-r-2 border-b-gray-500 border-r-gray-500
              bg-blue-600 text-white shadow-md"
          >
            2023–24
          </button>

          <button
            onClick={() => setFocus("center")}
            className="hover:bg-blue-400 w-20 sm:w-32 text-sm sm:text-2xl
              border-t-2 border-l-2 border-gray-200
              border-b-2 border-r-2 border-b-gray-500 border-r-gray-500
              bg-blue-600 text-white shadow-md"
          >
            2024–25
          </button>

          <button
            onClick={() => setFocus("bottomRight")}
            className="hover:bg-blue-400 w-20 sm:w-32 text-sm sm:text-2xl
              border-t-2 border-l-2 border-gray-200
              border-b-2 border-r-2 border-b-gray-500 border-r-gray-500
              bg-blue-600 text-white shadow-md"
          >
            2025–Now
          </button>
        </div>

        {/* Reset Button */}
        <button
          onClick={() => setFocus("none")}
          className="absolute top-5 right-5 p-1 hover:bg-blue-400
            border-t-2 border-l-2 border-gray-200
            border-b-2 border-r-2 border-b-gray-500 border-r-gray-500
            bg-blue-600 text-white shadow-md"
        >
          <RefreshCw size={18} />
        </button>

      </div>
    </div>
  );
}
