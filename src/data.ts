import { Project, Education, SkillCategory } from './types';

export const PERSONAL_INFO = {
  name: "OJASWA MAURYA",
  role: "IoT Developer & Software Engineer",
  email: "ojaswamaurya0509@gmail.com",
  phone: "+91-9096927428",
  location: "Ambernath, Thane, MH-421502",
  github: "https://github.com/OjaswaMaurya",
  academicTerm: "B.Tech IT Student (Semester 2)"
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "landslide-alert-system",
    index: "001",
    title: "Landslide Alert System",
    tagline: "ESP-32 & IoT BASED DETECTION",
    iconName: "Radio", // Lucide alternative
    tags: ["IoT", "C++", "MPU6050", "ESP-32"],
    specs: [
      "Built an IoT based detection system using ESP-32 and modular sensors.",
      "Integrated real-time measurements from soil moisture, rain, humidity, temperature, and tilt angle (MPU6050) modules.",
      "Programmed instant localized warnings with feedback loops utilizing an active piezo buzzer.",
      "Deployed automatic alert dispatch notifications using standard Telegram API gateways."
    ],
    features: [
      "Real-time sensor calibration on boot phase",
      "High reliability landslide risk threshold calculation",
      "Autonomous alert trigger protocols via telegram",
      "Ultra-low standby deep sleep cycle optimization"
    ],
    status: "DEPLOYED",
    githubUrl: "https://github.com/OjaswaMaurya",
    extraLogs: [
      "SYSBOOT: Initializing sensor calibration array...",
      "SENSOR: MPU6050 pitch/roll calibrated at (0.02, -0.01)",
      "WIFI: Synchronizing with Telegram alert broker...",
      "STATUS: Operational state active. Waiting for sensor telemetry."
    ]
  },
  {
    id: "canteen-management-system",
    index: "002",
    title: "Canteen Management System",
    tagline: "SYSTEM OPTIMIZATION (C)",
    iconName: "Utensils",
    tags: ["Data Structures", "C", "Queues", "Memory Cache"],
    specs: [
      "Engineered an optimized, high-performance console application utilizing low-level C and standard libraries.",
      "Designed specialized queue processing pipelines to balance standard student orders vs high-priority staff tickets.",
      "Implemented custom circular queue boundaries to completely minimize target runtime memory footprints.",
      "Developed quick search algorithms to track past transactional order history data records."
    ],
    features: [
      "Circular queue boundaries protecting memory heaps",
      "Priority order queuing logic for staff triage",
      "Safe memory parsing and bounds validation",
      "Self-contained local transaction history storage"
    ],
    status: "STABLE",
    githubUrl: "https://github.com/OjaswaMaurya",
    extraLogs: [
      "ALLOC: Allocated heap buffer for transaction queues.",
      "PRIORITY: Order router initialized for staff indices.",
      "LOG: Order #289 validated successfully.",
      "CACHE: Flushed 12 active orders to history."
    ]
  },
  {
    id: "embedded-protocol-handler",
    index: "003",
    title: "Embedded Protocol Handler",
    tagline: "HARDWARE ABSTRACTION LAYER",
    iconName: "Cpu",
    tags: ["ESP32", "Embedded", "UART/I2C", "Mesh Setup"],
    specs: [
      "Authored optimized hardware drivers & abstraction layers directly on top of ESP32 register standards.",
      "Configured robust multi-sensor mesh coordination schema to prevent localized packet collision and conflicts.",
      "Wrote checksum protocol routines running over SPI to verify serial data structures."
    ],
    features: [
      "Robust hardware-level stream control processing",
      "ESP-IDF compatible registry mapping",
      "High frequency sensor polling synchronization (sub-ms)",
      "CRC16 custom telemetry integrity checks"
    ],
    status: "OPERATIONAL",
    githubUrl: "https://github.com/OjaswaMaurya",
    extraLogs: [
      "UART: UART_NUM_1 active on pins 16/17.",
      "MESH: Local mesh network synced with node 0x0F.",
      "CRC16: Checksum validated. Packet integrity index: 1.0",
      "HAL: Interrupt vectors registered safely with CPU."
    ]
  }
];

export const EDUCATION_DATA: Education[] = [
  {
    id: "btech",
    period: "2025 - PRESENT",
    degree: "B.Tech - Information Technology",
    institution: "DIT University, Dehradun",
    statusText: "Currently in First Year (2nd Semester) - CGPA Peak Focus",
    iconName: "GraduationCap"
  },
  {
    id: "class12",
    period: "COMPLETED 2024",
    degree: "Senior Secondary (Class XII - CBSE)",
    institution: "Kendriya Vidyalaya, Ambernath",
    statusText: "Specialized in Computer Science & Physics Streams",
    iconName: "BookOpen"
  },
  {
    id: "class10",
    period: "COMPLETED 2022",
    degree: "Secondary (Class X - CBSE)",
    institution: "Kendriya Vidyalaya, Ambernath",
    statusText: "Completed with high academic credentials",
    iconName: "Award"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "prog",
    name: "PROGRAMMING",
    color: "green",
    type: "progress",
    skills: [
      { name: "C++ / C", level: 90 },
      { name: "Python", level: 75 },
      { name: "C# (Game Dev)", level: 50 },
      { name: "JavaScript", level: 65 }
    ]
  },
  {
    id: "backend",
    name: "CORE & BACKEND",
    color: "yellow",
    type: "list",
    skills: [
      "Flask (Basic Web server)",
      "REST API Architectures",
      "Data Structures (Queues, Stacks, Lists)",
      "Algorithm Optimization"
    ]
  },
  {
    id: "web",
    name: "WEB FOUNDATIONS",
    color: "green",
    type: "grid",
    skills: [
      "HTML5 Semantics",
      "CSS3 Layouts",
      "Tailwind CSS Layouts",
      "React Frameworks"
    ]
  },
  {
    id: "tools",
    name: "TOOLS & HARDWARE",
    color: "yellow",
    type: "list",
    skills: [
      "Git & GitHub workflows",
      "Arduino IDE Development",
      "ESP32 & IoT sensor systems",
      "STM32 & registers structure"
    ]
  }
];
