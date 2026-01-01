import { useState, useEffect } from "react";
import BootLoader from "./components/BootLoader";
import DesktopIcon from "./components/DesktopIcon";
import Window from "./components/Window";
import Taskbar from "./components/Taskbar";
import AboutIcon from "./assets/desktopIcons/about.png";
import ExperienceIcon from "./assets/desktopIcons/experience.png";
import StudyIcon from "./assets/desktopIcons/study.png";
import ProjectsIcon from "./assets/desktopIcons/projects.png";
import ArtIcon from "./assets/desktopIcons/art.png";
import SkillIcon from "./assets/desktopIcons/skills.png";
import MailIcon from "./assets/desktopIcons/mail.png";
import GameIcon from "./assets/desktopIcons/games.png";
import back from "./assets/gif/desktop-bg.gif";
import StickyNote from "./components/StickyNote";
import useRetroSounds from "./utils/sounds";
import butterfly from "./assets/gif/butterfly.gif";
import night from "./assets/gif/night-bg.jpg";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Study from "./pages/Study";
import Experience from "./pages/Experience";
import Art from "./pages/Art";
import Skills from "./pages/Skills";
import { motion } from "framer-motion";
import RabbitGame from "./components/RabbitGame";
import Connect from "./pages/Connect";
import lightBackground from "/background.png";
import MarioMusic from "./assets/sounds/mario.mp3";

export default function App() {
  const [booted, setBooted] = useState(false);
  const [openApps, setOpenApps] = useState([]);
  const [theme, setTheme] = useState("morning");
  const { playClick } = useRetroSounds();

  // Set custom cursors
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      * {
        cursor: url('/cursor3.png') 0 0, auto !important;
      }
      a, button, .cursor-pointer, [role="button"], input[type="button"], input[type="submit"], .cursor-move {
        cursor: url('/select3.png') 0 0, pointer !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Audio Logic
  const [audio] = useState(new Audio(MarioMusic));
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); // Default volume 50%

  useEffect(() => {
    audio.loop = true;
    audio.volume = volume;
  }, [audio]);

  useEffect(() => {
    const playAudio = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.log("Autoplay prevented. Waiting for user interaction:", error);
          setIsPlaying(false);
          // Add one-time click listener to start audio
          const enableAudio = () => {
            audio.play().then(() => {
              setIsPlaying(true);
              document.removeEventListener('click', enableAudio);
            }).catch(e => console.log("Interaction play failed:", e));
          };
          document.addEventListener('click', enableAudio);
        });
      }
    };

    if (booted) {
      playAudio();
    }
  }, [booted, audio]);

  // Global Click Sound Listener
  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Check if the clicked element or its parents are interactive
      const target = e.target.closest('a, button, .cursor-pointer, [role="button"], input[type="button"], input[type="submit"]');
      if (target) {
        playClick();
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [playClick]);

  const openWindow = (id) => {
    setOpenApps((prev) => [...new Set([...prev, id])]);
  };

  const closeWindow = (id) => {
    setOpenApps((prev) => prev.filter((w) => w !== id));
  };
  const handleTheme = (theme) => {
    setTheme(theme);
    // console.log(theme);
  }

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const adjustVolume = (amount) => {
    let newVol = volume + amount;
    if (newVol > 1) newVol = 1;
    if (newVol < 0) newVol = 0;
    setVolume(newVol);
    audio.volume = newVol;
  };

  return (
    <>
      {!booted && <BootLoader onFinish={() => setBooted(true)} />}
      {booted && (
        <div
          className={`h-screen cursor w-screen overflow-hidden relative ${theme === "night" ? "theme-night" : "theme-light"
            }`}
        >
          {/* Backgrounds */}
          {theme === "night" ? (
            <>
              {/* Dark mode remains unchanged: original desktop background + night overlay */}
              <img
                src={back}
                className="h-full w-full object-cover fixed top-0"
              ></img>
              <img
                src={night}
                className="h-full w-full object-cover fixed top-0"
              ></img>
            </>
          ) : (
            <>
              {/* Light mode background uses the new background.png asset */}
              <img
                src={lightBackground}
                className="h-full w-full object-cover fixed top-0"
                alt="Light mode background"
              ></img>

              {/* Light-mode-only visual effects (sunrays, butterflies) */}
              <div className="light-effects fixed inset-0 pointer-events-none">
                <div className="light-sunrays"></div>
                <div className="light-butterfly light-butterfly-1">
                  <img src={butterfly} alt="Butterfly" />
                </div>
                <div className="light-butterfly light-butterfly-2">
                  <img src={butterfly} alt="Butterfly" />
                </div>
                <div className="light-butterfly light-butterfly-3">
                  <img src={butterfly} alt="Butterfly" />
                </div>
              </div>
            </>
          )}

          {/* Existing foreground butterfly icon (kept as-is) */}
          <img
            src={butterfly}
            className="h-24 w-24 object-cover fixed bottom-20 right-10 cursor-pointer"
          ></img>
          {/* Desktop Icons */}
          <div className="absolute top-4 left-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <DesktopIcon
              icon={AboutIcon}
              label="About.exe"
              onClick={() => openWindow("about")}
            />
            <DesktopIcon
              icon={ProjectsIcon}
              label="Projects.exe"
              onClick={() => openWindow("projects")}
            />
            <DesktopIcon
              icon={ExperienceIcon}
              label="Experience.exe"
              onClick={() => openWindow("exp")}
            />
            <DesktopIcon
              icon={StudyIcon}
              label="Education.exe"
              onClick={() => openWindow("study")}
            />
            <DesktopIcon
              icon={SkillIcon}
              label="Skills.exe"
              onClick={() => openWindow("skills")}
            />
            <DesktopIcon
              icon={ArtIcon}
              label="Achievements.exe"
              onClick={() => openWindow("art")}
            />


          </div>
          <motion.div
            className="absolute top-64 right-5 flex flex-col items-center cursor-pointer select-none w-20 sm:w-44 sm:h-32 text-xs text-white"
            drag
            dragConstraints={{ top: 0, left: 0 }}
            onClick={() => openWindow("game")}
          >
            <img src={GameIcon} alt={"Game.exe"} className="w-10 h-10 sm:w-20 sm:h-20 hover:border-2 hover:border-amber-300 hover:rounded-lg" />
            <span className="mt-1 text-black text-center text-sm sm:text-xl bg-amber-300 px-2 sm:px-5">Game.exe</span>
          </motion.div>
          <motion.div
            className="absolute bottom-44 right-5 flex flex-col items-center cursor-pointer select-none w-20 sm:w-44 sm:h-32 text-xs text-white"
            drag
            dragConstraints={{ top: 0, left: 0 }}
            onClick={() => openWindow("connect")}
          >
            <img src={MailIcon} alt={"LetsConnect.exe"} className="w-10 h-10 sm:w-20 sm:h-20 hover:border-2 hover:border-amber-300 hover:rounded-lg" />
            <span className="mt-1 text-black text-center text-sm sm:text-xl bg-amber-300 px-2 sm:px-5">LetsConnect.exe</span>
          </motion.div>

          {/* Windows */}
          {openApps.includes("about") && (
            <Window title="About.exe" onClose={() => closeWindow("about")}>
              <About />
            </Window>
          )}
          {openApps.includes("projects") && (
            <Window title="Projects.exe" onClose={() => closeWindow("projects")}>
              <Projects />
            </Window>
          )}
          {openApps.includes("study") && (
            <Window title="Education.exe" onClose={() => closeWindow("study")}>
              <Study />
            </Window>
          )}
          {openApps.includes("exp") && (
            <Window title="Experience.exe" onClose={() => closeWindow("exp")}>
              <Experience />
            </Window>
          )}
          {openApps.includes("skills") && (
            <Window title="Skills.exe" onClose={() => closeWindow("skills")}>
              <Skills />
              {/* <SkillsComputer /> */}
            </Window>
          )}
          {openApps.includes("art") && (
            <Window title="Achievements.exe" onClose={() => closeWindow("art")}>
              <Art />
            </Window>
          )}
          {openApps.includes("game") && (
            <Window title="Game.exe" onClose={() => closeWindow("game")}>
              <RabbitGame />
            </Window>
          )}
          {openApps.includes("connect") && (
            <Window title="LetsConnect.exe" onClose={() => closeWindow("connect")}>
              <Connect />
            </Window>
          )}
          <StickyNote defaultText="I'm Mahitha — a full-stack developer and AI/ML enthusiast building real-world systems."
            color="bg-yellow-300" />
          <Taskbar
            onAppClick={openWindow}
            onThemeChange={handleTheme}
            currentTheme={theme}
            audioState={{ isPlaying, toggleAudio, adjustVolume }}
          />


        </div>
      )}
    </>
  );
}
