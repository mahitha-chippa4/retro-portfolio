// src/pages/Skills.jsx
/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, PresentationControls } from "@react-three/drei";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

function ComputerModel() {
  const gltf = useGLTF("/models/retro-computer.glb");


  return (
    <group
      position={[-1, -1.2, -0.5]}
      rotation={[0, Math.PI / 5, 0]}
    >
      <primitive object={gltf.scene} />
    </group>
  );
}

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState("");

  const handleButtonClick = (skillType) => {
    setActiveSkill(skillType);
  };

  const handleCloseModal = () => {
    setActiveSkill("");
  };

  const skillsMap = {
    frontend: ["React", "Next.js", "Tailwind", "Bootstrap", "Framer Motion"],
    backend: ["Node.js", "Express.js", "Flask", "MongoDB", "MySQL", "Firebase", "Supabase", "Ethereum", "Web3.js"],
    programming: ["C", "C++", "Python", "R", "JavaScript", "SQL"],
    tools: ["GitHub", "VS Code", "Jupyter", "Google Colab", "Docker", "Tableau", "Power BI"],
  };

  // Button style class - consistent with existing blue buttons
  const buttonClass = "hover:scale-110 absolute px-4 bg-blue-500 border-t border-l border-white border-b-2 border-r-2 border-b-gray-700 border-r-gray-700 shadow-md text-white font-bold text-sm sm:text-base";

  return (
    <>

      <div className="sm:w-[800px] w-full h-[400px] w-[300px] sm:h-[600px] flex justify-center items-center relative">

        <Canvas className=" " shadows camera={{ position: [5, 1, 0], fov: 35 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <Environment preset="city" />

          {/* Replace OrbitControls with this */}
          <PresentationControls
            global
            config={{ mass: 1, tension: 10 }}
            snap={true}
            rotation={[0, 0.3, 0]}
            polar={[-0.2, 0.2]}
            azimuth={[-0.4, 0.4]}
          >
            <ComputerModel />
          </PresentationControls>
        </Canvas>

        {/* Frontend */}
        <button
          onClick={() => handleButtonClick("frontend")}
          className={`${buttonClass} top-[120px] left-[260px]`}
        >
          Frontend
        </button>

        {/* Programming */}
        <button
          onClick={() => handleButtonClick("programming")}
          className={`${buttonClass} top-[120px] right-[260px]`}
        >
          Programming
        </button>

        {/* Backend */}
        <button
          onClick={() => handleButtonClick("backend")}
          className={`${buttonClass} top-[300px] right-[210px]`}
        >
          Backend
        </button>

        {/* Tools */}
        <button
          onClick={() => handleButtonClick("tools")}
          className={`${buttonClass} bottom-[150px] left-1/2 transform -translate-x-1/2`}
        >
          Tools
        </button>

        {/* Modal with Framer Motion animation */}
        <AnimatePresence>
          {activeSkill && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-4 left-4 p-1 border-t-2 border-l-2 border-white border-b-4 border-r-4 border-b-gray-500 border-r-gray-500 bg-gray-200 shadow-md text-sm sm:text-lg w-[280px] sm:w-[400px] z-50"
            >
              {/* Modal Header */}
              <div className="uppercase bg-gradient-to-r from-blue-800 to-blue-400 text-white text-lg px-2 py-1 flex justify-between items-center">
                <span>{activeSkill} Skills</span>
                <button
                  onClick={handleCloseModal}
                  className="hover:bg-red-600 p-1 transition-colors"
                >
                  <X size={12} />
                </button>
              </div>

              {/* Skills List */}
              <ul className="list-disc p-4 pl-6 space-y-1">
                {skillsMap[activeSkill].map((skill, i) => (
                  <li key={i} className="text-black">{skill}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
