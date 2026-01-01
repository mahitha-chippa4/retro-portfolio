import NomosImg from "../projects/nomos2.jpg";
import DeepfakeImg from "../projects/deepfake.png";
import TrainImg from "../projects/train2.png";
import PaymentImg from "../projects/finall.png";
import PrescriptionImg from "../projects/prescription.png";

export const projects = [
  {
    id: 1,
    title: 'Nomos | AI for Indian Law',
    description:
      'Crafted an intelligent AI-powered legal assistance experience for Indian law. Users can interact through natural language queries, receiving accurate, structured, and context-aware legal insights across multiple domains in a seamless and user-friendly interface.',
    techStack: ["React.js", "Tailwind CSS", "Python", "Gemini API ", "Agent based AI"],
    img: NomosImg,
    colorClass: 'indigo-400',
    link: 'https://nomosbot.netlify.app/',
  },
  {
    id: 2,
    title: 'Railway Control System',
    description:
      'Built a live, tick-based railway corridor simulation with real-time visualization, enabling users to monitor train movements, inject disruptions, and adjust operational parameters through an interactive web interface.',
    techStack: ['FastAPI', 'React', 'OR-Tools'],
    img: TrainImg,
    colorClass: 'stone-400',
    link: 'https://github.com/mahitha-chippa4/SIH',
  },
  {
    id: 3,
    title: 'Deepfake Detection',
    description:
      'Built a recruitment-security pipeline detecting deepfakes, spoofing, impersonation, and external assistance with 92% accuracy',
    techStack: ['HAR, YOLO', 'XGBoost', 'OpenCV'],
    img: DeepfakeImg,
    colorClass: 'amber-400',
    link: 'https://github.com/mahitha-chippa4/DeepfakeDetection',
  },
  {
    id: 4,
    title: 'Payment Vision',
    description:
      'A responsive payment analytics dashboard with real-time insights and interactive visualizations for tracking transactions and financial trends.',
    techStack: ['React', 'Redux Toolkit', 'Tailwind CSS', 'D3.js', 'Recharts'],
    img: PaymentImg,
    colorClass: 'orange-400',
    link: 'https://github.com/mahitha-chippa4/paymentvision_dashboard',
  },
  {
    id: 5,
    title: 'Prescription Verification System',
    description:
      'A blockchain-based prescription verification system using smart contracts and encrypted QR codes to prevent fraud, enabling secure creation, verification, and one-time use of prescriptions in healthcare',
    techStack: ['React', 'Solidity', 'Ethereum', 'QR Code Verification'],
    img: PrescriptionImg,
    colorClass: 'orange-400',
    link: 'https://github.com/mahitha-chippa4/Prescription-verification-system',
  },
];