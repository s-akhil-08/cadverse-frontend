export interface Project {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  featuredImage: string;
  category: string;
  date: string;
  technologies: string[];
  liveDemo?: string;
  sourceCode?: string;
  gallery: string[];
  testimonial: {
    text: string;
    author: string;
    position: string;
    company: string;
    avatar: string;
  };
  stats?: {
    duration: string;
    teamSize: string;
    deliverables: string;
  };
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'design-simulation-naca-airfoil-0012',
    title: 'Design and Simulation of NACA Airfoil 0012',
    shortDescription: 'Computational design and aerodynamic simulation of the NACA 0012 airfoil profile.',
    fullDescription: `This project focuses on the design and simulation of the NACA 0012 airfoil using CAD and CFD tools. The airfoil geometry is modeled and analyzed to study aerodynamic characteristics such as lift, drag, and pressure distribution at various angles of attack. The simulation results provide valuable insights into performance optimization for aerospace and automotive applications.`,
    thumbnail: '/images/projects/new%20project/Thumbnail.jpg',
    featuredImage: '/images/projects/new%20project/Featured.jpg',
    category: 'Aerospace Engineering',
    date: '2025',
    technologies: ['CATIA V5', 'ANSYS', 'ANSYS-CFX'],
    liveDemo: 'https://example.com/automotive-demo',
    sourceCode: 'https://github.com/example/automotive-project',
    gallery: [
      '/images/projects/new%20project/gallery_2.jpg',
      '/images/projects/new%20project/gallery_3.jpg',
      '/images/projects/new%20project/gallery.jpg'
      
    ],
    testimonial: {
      text: "CADverse transformed our rough sketches into production-ready models with incredible precision. Their attention to detail and understanding of automotive requirements exceeded our expectations. The project was delivered on time and within budget.",
      author: "Sarah Johnson",
      position: "Lead Engineer",
      company: "AutoTech Industries",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    stats: {
      duration: "3 months",
      teamSize: "5 engineers",
      deliverables: "15 components"
    }
  },

  {
    id: 2,
    slug: 'air-craft-landing-gear',
    title: 'Air craft Landing gear',
    shortDescription: 'Modeled and assembled an Aircraft Landing Gear from 2D sketches, demonstrating CAD proficiency and mechanical design skills.',
    fullDescription: `This project presents an experimental study in the total CAD modeling of an aircraft landing gear installation. It comprises designing individual components, culminating in designing the entire mechanism assembly. The components were modeled with considerable care to maintain mechanical integrity and proper functionality so that everything could come together in one 3D fully integrated assembly that reflects both reality and readiness for prototyping.

The project involved complete modeling of all major landing gear components: struts, actuators, linkages, and wheels. The fully assembled system demonstrates real-world alignment, motion, and mechanical interaction. Each segment had to be detailed and designed in such a way to meet practical aerospace engineering standards. Special attention was to ensure the design was fit for prototyping and structural analysis.`,
    thumbnail: '/images/projects/aircraft%20landing%20gear/aircraft%20landing%20gear%20iso%20400x300.png',
    featuredImage: '/images/projects/aircraft%20landing%20gear/aircraft%20landing%20gear%20iso%201200x600.png',
    category: 'Aerospace Engineering',
    date: '2024',
    technologies: ['CATIA V5', 'AutoCAD', '2D Drafting', 'CATIA V5 Assembly Design'],
    liveDemo: 'https://example.com/automotive-demo',
    sourceCode: 'https://github.com/example/automotive-project',
    gallery: [
      '/images/projects/aircraft%20landing%20gear/without%20tyre%20800x600.png',
      '/images/projects/aircraft%20landing%20gear/landing%20gear%20multiview%20800x600.png',
      '/images/projects/aircraft%20landing%20gear/multiview%20800x600.png'
      
    ],
    testimonial: {
      text: "CADverse transformed our rough sketches into production-ready models with incredible precision. Their attention to detail and understanding of automotive requirements exceeded our expectations. The project was delivered on time and within budget.",
      author: "Sarah Johnson",
      position: "Lead Engineer",
      company: "AutoTech Industries",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    stats: {
      duration: "3 months",
      teamSize: "5 engineers",
      deliverables: "15 components"
    }
  },





  {
    id: 3,
    slug: 'archimedes-wind-turbine-modeling-analysis',
    title: 'Archimedes Wind Turbine Modeling and Analysis',
    shortDescription: 'Modeled and analyzed an Archimedes Wind Turbine in 3D, showcasing CAD skills and understanding of renewable energy systems.',
    fullDescription: `This project focused on the 3D CAD modeling of the Archimedes Wind Turbine, which is famous for its spiral-blade configuration designed for low wind speed conditions. The modeling ensured that the geometry of the turbine was as close to reality as possible and suitable for simulation and analysis. The design captured all relevant structural and aerodynamic parameter-worthy considerations for the evaluation of turbine behavior.

The project also considered in-depth CFD analysis using ANSYS to study airflow patterns and overall turbine performance. Under various RPMs and wind velocities, the turbine was observed for pressure variations, velocity fields, and aerodynamic efficiency. The project served to bring the whole CAD modeling and fluid dynamics analysis application to life concerning renewable energy systems.`,
    thumbnail: '/images/projects/archimedes/iso%20400x300.png',
    featuredImage: '/images/projects/archimedes/iso%201200x600.png',
    category: 'Renewable Energy Engineering',
    date: '2024',
    technologies: ['SolidWorks', 'ANSYS', 'CFD Analysis', 'FEA (Finite Element Analysis)', 'Mechanical and Aerodynamic Calculations'],
    liveDemo: 'https://example.com/electronics-demo',
    gallery: [
      '/images/projects/archimedes/vector%20800x600.png',
      '/images/projects/archimedes/mesh%20800x600.png',
      '/images/projects/archimedes/velocity%20800x600.png',
      '/images/projects/archimedes/pressure%20800x600.png'
    ],
    testimonial: {
      text: "The prototype quality was outstanding. CADverse helped us validate our concept quickly and efficiently, saving months in our development timeline. Their expertise in electronics housing design was invaluable.",
      author: "Michael Chen",
      position: "Product Manager",
      company: "TechFlow Solutions",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    stats: {
      duration: "6 weeks",
      teamSize: "4 designers",
      deliverables: "8 prototypes"
    }
  },
  {
    id: 4,
    slug: 'truck-fairing-modeling-aerodynamic-analysis',
    title: 'Modeling and Analysis of Truck Fairing',
    shortDescription: 'Modeled and analyzed truck fairing to improve aerodynamic efficiency and reduce drag for enhanced fuel performance.',
    fullDescription: `This project consisted of the 3D modeling and assembly of an entire truck system, looking at both the individual components and the whole within the context of a functional system. Its major focus was actually on studying the aerodynamics of truck fairings--special body panels used to reduce air resistance while in operation.

Being the most important aspect of the project, the fairing was designed and studied for the reduction of drag force along with fuel efficiency improvements. The CAD model of the fairing itself was then used along with the full truck assembly to simulate real aerodynamic operating conditions. Apart from visualizing the flow behavior, the analysis quantified the actual reduction in drag force, thereby showing the extent to which fairing design contributed toward enhancing overall vehicle performance.`,
    thumbnail: '/images/projects/truck/truck%20iso4%20400x300.png',
    featuredImage: '/images/projects/truck/truck%20iso4%201200x600.png',
    category: 'Automotive Engineering',
    date: '2024',
    technologies: ['CATIA V5', 'ANSYS', 'CFD Analysis', 'FEA (Finite Element Analysis)', 'Mechanical Calculations'],
    liveDemo: 'https://example.com/architecture-walkthrough',
    sourceCode: 'https://github.com/example/architecture-project',
    gallery: [
      '/images/projects/truck/fairing%20800x600.png',
      '/images/projects/truck/truck%20multi%20view%20800x600.png',
      '/images/projects/truck/fairing%20multiview%20800x600.png'
    ],
    testimonial: {
      text: "The architectural models were incredibly detailed and helped us secure project approval from stakeholders. The quality of visualization was exceptional and the VR walkthrough was a game-changer for client presentations.",
      author: "Emma Rodriguez",
      position: "Senior Architect",
      company: "Design Studio Pro",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    stats: {
      duration: "4 months",
      teamSize: "6 specialists",
      deliverables: "25 renderings"
    }
  },
  {
    id: 5,
    slug: 'gas-turbine-blade-modeling-aero-engine',
    title: 'Modeling of Gas Turbine Engine Blades for Aero Engine',
    shortDescription: 'Modeled high-performance gas turbine blades for aero engines, focusing on aerodynamic efficiency and structural precision.',
    fullDescription: `This project is concerned with the 3D CAD modeling of various high-performance components used in gas turbine engines that apply in the aerospace area. The modeling process gave importance to aerodynamic accuracy, structural integrity, and compatibility with real engine layouts. Several rotor and turbine blades were designed at different stages on the compressor and turbine sections of an aero engine.

The components modeled in this project are the 5th stage compressor rotor blade, 3rd stage compressor rotor blade, 2nd stage turbine blade, and 4th stage turbine blade, all designed to conform to the real-life geometry and flow features of working jet engines. The 4th stage turbine blade included internal cooling chambers to balance severe thermal loads, arguably one of the most important features for performance and life against high-temperature environments. Also modeled was the impeller of an aircraft turbo starter unit, with details cast for its intricately shaped and aerodynamic features to assist in fast engine start-up. The project in its entirety highlights the complexity and precision required in the design of aerospace blades as a reflection of a real understanding of turbine engines.`,
    thumbnail: '/images/projects/ak%20400x300.png',
    featuredImage: '/images/projects/ak%201200x600.png',
    category: 'Aerospace Engineering',
    date: '2024',
    technologies: ['CATIA V5', '2D Drafting'],
    gallery: [
      '/images/projects/Fourth%20Stage%20turbine%20blade/pr%204%20prt%20scr%20800x600.png',
      '/images/projects/Fourth%20Stage%20turbine%20blade/fourth%20stage%20turbine%20blade%20of%20an%20aero%20engine%20split%20view%20800x600.png',
      '/images/projects/fifth%20stage%20compressor%20blade%20of%20an%20aero%20engine/Fifth%20stage%20compressor%20rotor%20blade%20ofan%20aero%20engine%20800x600.png',
      '/images/projects/third%20stage%20compressor%20rotor%20blade/third%20stage%20%20isometric%20800x600.png',
      '/images/projects/2nd%20stage%20turbine%20blade/2nd%20stage%20turbine%20blade%20isometric%20800x600.png',
      '/images/projects/impellor/impeller%20iso%20400x300.png'
    ],
    testimonial: {
      text: "CADverse's expertise in medical device prototyping was invaluable. Their attention to regulatory requirements and precision manufacturing helped us accelerate our development process while maintaining the highest safety standards.",
      author: "Dr. James Wilson",
      position: "Chief Technology Officer",
      company: "MedTech Innovations",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face"
    },
    stats: {
      duration: "8 months",
      teamSize: "7 experts",
      deliverables: "3 prototypes"
    }
  },
  {
    id: 6,
    slug: 'knuckle-joint-modeling-machine-design',
    title: 'Modeling of Knuckle Joint Using Machine Design Calculations',
    shortDescription: 'Designed and modeled a knuckle joint using machine design principles, applying load calculations and mechanical standards.',
    fullDescription: `The main focus of this project is 3D modeling of a knuckle joint, which is a device that transmits axial force between two rods. Design and analysis were guided by the standard machine design calculations to ensure that the joint will sustain the necessary loads safely during operations.

Dimensional parameters such as the diameter of the pin, thickness of the eye, and dimensions of the fork were calculated with considerations of the applied load, strength of materials, and factor of safety. These values were then used to create a CAD model that precisely represents the dimensions for practical purposes. This project illustrates the application of machine design principles in developing components that are mechanically sufficiently designed and ready for assembly.`,
    thumbnail: '/images/projects/knuckle%20joint/knuckle%20joint%20400x300.png',
    featuredImage: '/images/projects/knuckle%20joint/knuckle%20joint%201200x600.png',
    category: 'Mechanical Engineering',
    date: '2024',
    technologies: ['CATIA V5', 'Machine Design Calculations', '2D Drafting', 'CATIA V5 Assembly Design'],
    liveDemo: 'https://example.com/industrial-demo',
    sourceCode: 'https://github.com/example/industrial-project',
    gallery: [
      '/images/projects/knuckle%20joint/multi%20view%20New.png',
      '/images/projects/knuckle%20joint/knuckle%20joint%20800x600.png'
 ],
    testimonial: {
      text: "The industrial equipment design exceeded our expectations. CADverse's engineering expertise and attention to safety standards made this project a complete success. The equipment has been running flawlessly for months.",
      author: "Robert Martinez",
      position: "Operations Director",
      company: "Heavy Industries Corp",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    stats: {
      duration: "5 months",
      teamSize: "8 engineers",
      deliverables: "12 assemblies"
    }
  },
  {
    id: 7,
    slug: 'crane-hook-modeling-and-assembly',
    title: 'Modeling and Assembly of a Crane Hook',
    shortDescription: 'Modeled and assembled a crane hook using design standards, focusing on structural strength and mechanical reliability.',
    fullDescription: `In this project, an elaborate 3D model of a crane hook assembly was created focusing on individual components and their integration into a mechanically complete system. Models for all components were prepared with strict adherence to the given dimensions to ensure proper fit and alignment within the assembly.

This project looks into various mechanical components cooperating for load handling including the hook body, shank, nut, and collar. The end assembly is taken through realistic operating scenarios that permit visual verification of the load paths, clearances, and feasibility with the overall design. The project lays great emphasis on precision and mechanical compatibility in the design of lifting and hoisting equipment.`,
    thumbnail: '/images/projects/crane%20%20hook/crane%20hook%20isometric%20view%20400x300.png',
    featuredImage: '/images/projects/crane%20%20hook/crane%20hook%20isometric%20view%201200x600.png',
    category: 'Machine Component Design',
    date: '2024',
    technologies: ['CATIA V5', '2D Drafting', 'CATIA V5 Assembly Design'],
    liveDemo: 'https://example.com/aerospace-demo',
    gallery: [
      '/images/projects/crane%20%20hook/crane%20hook%20multi%20view%20800x600.png',
      '/images/projects/crane%20%20hook/crane%20hook%20isometric%20view%20800x600.png'
    ],
    testimonial: {
      text: "CADverse delivered aerospace-grade precision and quality. Their understanding of aerospace requirements and attention to detail was exceptional. The components passed all certification tests on the first attempt.",
      author: "Captain Lisa Thompson",
      position: "Chief Engineer",
      company: "AeroSpace Dynamics",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
    },
    stats: {
      duration: "10 months",
      teamSize: "12 specialists",
      deliverables: "6 components"
    }
  },

  {
    id: 8,
    slug: 'modeling-assembly-pneumatic-motor',
    title: 'Modeling and Assembly of a Pneumatic Motor',
    shortDescription: '3D CAD modeling and complete assembly of a pneumatic motor system.',
    fullDescription: `This project involves the detailed 3D modeling and assembly of a pneumatic motor using CAD tools. The design highlights the working principle of compressed air as a power source, focusing on key components such as the rotor, cylinder, and valve system. The assembly ensures proper alignment and functionality, making it useful for industrial automation, robotics, and mechanical power applications.`,
    thumbnail: '/images/projects/pneumatic%20motor/iso%20400x300.png',
    featuredImage: '/images/projects/pneumatic%20motor/iso%201200x600.png',
    category: 'Mechanical Design',
    date: '2024',
    technologies: ['CATIA V5', '2D Drafting', 'CATIA V5 Assembly Design'],
    liveDemo: 'https://example.com/aerospace-demo',
    gallery: [
      '/images/projects/pneumatic%20motor/multi%20view%20800x600.jpg',
      '/images/projects/pneumatic%20motor/iso%20800x600.png'
    ],
    testimonial: {
      text: "CADverse delivered aerospace-grade precision and quality. Their understanding of aerospace requirements and attention to detail was exceptional. The components passed all certification tests on the first attempt.",
      author: "Captain Lisa Thompson",
      position: "Chief Engineer",
      company: "AeroSpace Dynamics",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
    },
    stats: {
      duration: "10 months",
      teamSize: "12 specialists",
      deliverables: "6 components"
    }
  }
];
