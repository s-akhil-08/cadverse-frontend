export interface Feedback {
  id: number;
  userName: string;
  userAvatar: string;
  message: string;
  rating: number;
  emojis: string[];
  date: string;
  project: {
    id: string;
    name: string;
    description: string;
    images: string[];
    category: string;
    completedDate: string;
    technologies: string[];
  };
}

export const feedbackData: Feedback[] = [
  {
    id: 1,
    userName: "Sarah Johnson",
    userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    message: "CADverse transformed our rough sketches into production-ready models with incredible precision. Their attention to detail exceeded our expectations!",
    rating: 5,
    emojis: ["🚀", "⭐", "💯"],
    date: "2024-01-15",
    project: {
      id: "proj-001",
      name: "Automotive Engine Component",
      description: "Complete 3D modeling of automotive engine components from 2D technical drawings with precision engineering requirements.",
      images: [
        "/images/projects/aircraft%20landing%20gear/aircraft%20landing%20gear%20iso%201200x600.png",
        "/images/projects/aircraft%20landing%20gear/without%20tyre%20800x600.png",
        "/images/projects/aircraft%20landing%20gear/landing%20gear%20multiview%20800x600.png"
      ],
      category: "Automotive Engineering",
      completedDate: "2024-01-10",
      technologies: ["CATIA V5", "AutoCAD", "SolidWorks"]
    }
  },
  {
    id: 2,
    userName: "Michael Chen",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    message: "Outstanding prototype quality! CADverse helped us validate our concept quickly and efficiently, saving months in development.",
    rating: 5,
    emojis: ["🎯", "⚡", "🔥"],
    date: "2024-01-12",
    project: {
      id: "proj-002",
      name: "Wind Turbine Prototype",
      description: "Advanced wind turbine modeling with aerodynamic analysis and CFD simulation for optimal performance.",
      images: [
        "/images/projects/archimedes/iso%201200x600.png",
        "/images/projects/archimedes/vector%20800x600.png",
        "/images/projects/archimedes/mesh%20800x600.png"
      ],
      category: "Renewable Energy",
      completedDate: "2024-01-08",
      technologies: ["SolidWorks", "ANSYS", "CFD Analysis"]
    }
  },
  {
    id: 3,
    userName: "Emma Rodriguez",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    message: "The architectural models were incredibly detailed. The quality of visualization was exceptional and helped secure project approval!",
    rating: 5,
    emojis: ["🏗️", "✨", "👏"],
    date: "2024-01-10",
    project: {
      id: "proj-003",
      name: "Truck Fairing Analysis",
      description: "Comprehensive truck fairing modeling and aerodynamic analysis for improved fuel efficiency and performance.",
      images: [
        "/images/projects/truck/truck%20iso4%201200x600.png",
        "/images/projects/truck/fairing%20800x600.png",
        "/images/projects/truck/truck%20multi%20view%20800x600.png"
      ],
      category: "Automotive Engineering",
      completedDate: "2024-01-05",
      technologies: ["CATIA V5", "ANSYS", "CFD Analysis"]
    }
  },
  {
    id: 4,
    userName: "Dr. James Wilson",
    userAvatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
    message: "CADverse's expertise in precision engineering was invaluable. Their attention to detail helped us accelerate our development process significantly.",
    rating: 5,
    emojis: ["🔬", "⚙️", "🎖️"],
    date: "2024-01-08",
    project: {
      id: "proj-004",
      name: "Gas Turbine Blade Design",
      description: "High-performance gas turbine blade modeling for aerospace applications with thermal and structural analysis.",
      images: [
        "/images/projects/ak%201200x600.png",
        "/images/projects/Fourth%20Stage%20turbine%20blade/pr%204%20prt%20scr%20800x600.png",
        "/images/projects/fifth%20stage%20compressor%20blade%20of%20an%20aero%20engine/Fifth%20stage%20compressor%20rotor%20blade%20ofan%20aero%20engine%20800x600.png"
      ],
      category: "Aerospace Engineering",
      completedDate: "2024-01-03",
      technologies: ["CATIA V5", "ANSYS", "Thermal Analysis"]
    }
  },
  {
    id: 5,
    userName: "Robert Martinez",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    message: "The industrial equipment design exceeded our expectations. CADverse's engineering expertise made this project a complete success!",
    rating: 4,
    emojis: ["🏭", "💪", "🎉"],
    date: "2024-01-06",
    project: {
      id: "proj-005",
      name: "Knuckle Joint Assembly",
      description: "Precision knuckle joint modeling using machine design calculations with load analysis and safety factors.",
      images: [
        "/images/projects/knuckle%20joint/knuckle%20joint%201200x600.png",
        "/images/projects/knuckle%20joint/multi%20view%20New.png",
        "/images/projects/knuckle%20joint/knuckle%20joint%20800x600.png"
      ],
      category: "Mechanical Engineering",
      completedDate: "2024-01-01",
      technologies: ["CATIA V5", "Machine Design", "FEA"]
    }
  },
  {
    id: 6,
    userName: "Lisa Thompson",
    userAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
    message: "CADverse delivered aerospace-grade precision and quality. Their understanding of requirements was exceptional!",
    rating: 5,
    emojis: ["✈️", "🎯", "🌟"],
    date: "2024-01-04",
    project: {
      id: "proj-006",
      name: "Crane Hook Assembly",
      description: "Heavy-duty crane hook modeling and assembly with structural analysis for industrial lifting applications.",
      images: [
        "/images/projects/crane%20%20hook/crane%20hook%20isometric%20view%201200x600.png",
        "/images/projects/crane%20%20hook/crane%20hook%20multi%20view%20800x600.png",
        "/images/projects/crane%20%20hook/crane%20hook%20isometric%20view%20800x600.png"
      ],
      category: "Industrial Engineering",
      completedDate: "2023-12-28",
      technologies: ["CATIA V5", "Structural Analysis", "Safety Engineering"]
    }
  },
  {
    id: 7,
    userName: "Alex Kumar",
    userAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=face",
    message: "Amazing work on our prototype! The team understood our vision perfectly and delivered beyond expectations.",
    rating: 5,
    emojis: ["🚀", "💡", "🎨"],
    date: "2024-01-02",
    project: {
      id: "proj-007",
      name: "Robotic Arm Joint",
      description: "Precision robotic arm joint design with servo motor integration and motion analysis.",
      images: [
        "/images/projects/knuckle%20joint/knuckle%20joint%201200x600.png",
        "/images/projects/knuckle%20joint/multi%20view%20New.png"
      ],
      category: "Robotics Engineering",
      completedDate: "2023-12-30",
      technologies: ["SolidWorks", "Motion Analysis", "Servo Integration"]
    }
  },
  {
    id: 8,
    userName: "Maria Garcia",
    userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    message: "Professional service with excellent communication throughout the project. Highly recommend CADverse!",
    rating: 4,
    emojis: ["👍", "📞", "⭐"],
    date: "2023-12-29",
    project: {
      id: "proj-008",
      name: "Medical Device Housing",
      description: "Biocompatible medical device housing design with ergonomic considerations and regulatory compliance.",
      images: [
        "/images/projects/truck/truck%20iso4%201200x600.png",
        "/images/projects/truck/fairing%20800x600.png"
      ],
      category: "Medical Engineering",
      completedDate: "2023-12-25",
      technologies: ["SolidWorks", "Ergonomic Design", "Medical Standards"]
    }
  }
];