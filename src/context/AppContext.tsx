import { createContext, useContext, useState, ReactNode } from "react";

export interface ProblemStatement {
  id: number;
  title: string;
  description: string;
  organization: string;
  category: "Software" | "Hardware";
  theme: string;
  status: "Active" | "Inactive";
  submissions: number;
  deadline: string;
  createdAt: string;
}

export interface SPOCCredential {
  id: number;
  collegeName: string;
  spocName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  teams: number;
  lastLogin: string;
  status: "Active" | "Inactive";
}

export interface TeamSubmission {
  id: number;
  teamName: string;
  collegeId: number;
  collegeName: string;
  problemId: number;
  problemTitle: string;
  leaderName: string;
  leaderEmail: string;
  memberCount: number;
  members: string[];
  presentationFile: string;
  status: "Submitted" | "Under Review" | "Approved" | "Rejected";
  submittedAt: string;
}

export interface CollegeRegistrationRequest {
  id: number;
  collegeName: string;
  spocName: string;
  email: string;
  phone: string;
  address: string;
  status: "Pending" | "Approved" | "Rejected";
  requestedAt: string;
  rejectionReason?: string;
}

interface AppContextType {
  problemStatements: ProblemStatement[];
  spocCredentials: SPOCCredential[];
  teamSubmissions: TeamSubmission[];
  collegeRegistrations: CollegeRegistrationRequest[];
  addProblemStatement: (problem: Omit<ProblemStatement, "id" | "submissions" | "createdAt">) => void;
  updateProblemStatement: (id: number, problem: Partial<ProblemStatement>) => void;
  deleteProblemStatement: (id: number) => void;
  addSPOCCredential: (spoc: Omit<SPOCCredential, "id" | "teams" | "lastLogin">) => void;
  updateSPOCCredential: (id: number, spoc: Partial<SPOCCredential>) => void;
  deleteSPOCCredential: (id: number) => void;
  addTeamSubmission: (submission: Omit<TeamSubmission, "id" | "submittedAt">) => void;
  updateTeamSubmission: (id: number, submission: Partial<TeamSubmission>) => void;
  validateSPOCLogin: (email: string, password: string) => SPOCCredential | null;
  getSPOCByEmail: (email: string) => SPOCCredential | null;
  addCollegeRegistration: (registration: Omit<CollegeRegistrationRequest, "id" | "status" | "requestedAt">) => void;
  approveCollegeRegistration: (id: number) => void;
  rejectCollegeRegistration: (id: number, reason: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial mock data
const initialProblems: ProblemStatement[] = [
  {
    id: 1,
    title: "Smart Agriculture - IoT based crop monitoring system",
    description: "Develop an IoT-based solution for real-time crop monitoring including soil moisture, temperature, and pest detection.",
    organization: "Ministry of Agriculture & Farmers Welfare",
    category: "Hardware",
    theme: "Agriculture & Rural Development",
    status: "Active",
    submissions: 45,
    deadline: "2024-12-31",
    createdAt: "2024-10-01"
  },
  {
    id: 2,
    title: "AI-powered disease diagnosis system",
    description: "Create an AI system that can assist doctors in diagnosing diseases using medical imaging and patient data.",
    organization: "Ministry of Health & Family Welfare",
    category: "Software",
    theme: "Healthcare & Biomedical Devices",
    status: "Active",
    submissions: 38,
    deadline: "2024-12-31",
    createdAt: "2024-10-02"
  },
  {
    id: 3,
    title: "Personalized learning platform",
    description: "Build a platform that adapts to individual student learning patterns and provides customized educational content.",
    organization: "Ministry of Education",
    category: "Software",
    theme: "Education & Learning",
    status: "Active",
    submissions: 52,
    deadline: "2024-12-31",
    createdAt: "2024-10-03"
  },
  {
    id: 4,
    title: "Intelligent traffic management system",
    description: "Design an intelligent traffic management system to reduce congestion and optimize traffic flow in urban areas.",
    organization: "Ministry of Housing & Urban Affairs",
    category: "Software",
    theme: "Smart Cities",
    status: "Active",
    submissions: 41,
    deadline: "2024-12-31",
    createdAt: "2024-10-04"
  },
  {
    id: 5,
    title: "Solar energy optimization device",
    description: "Develop a hardware device to optimize solar panel efficiency and energy storage for residential and commercial use.",
    organization: "Ministry of New & Renewable Energy",
    category: "Hardware",
    theme: "Clean & Green Technology",
    status: "Active",
    submissions: 29,
    deadline: "2024-12-31",
    createdAt: "2024-10-05"
  },
  {
    id: 6,
    title: "Real-time fraud detection system",
    description: "Build an AI-powered system to detect and prevent fraudulent transactions in real-time.",
    organization: "Reserve Bank of India",
    category: "Software",
    theme: "FinTech & Banking",
    status: "Active",
    submissions: 34,
    deadline: "2024-12-31",
    createdAt: "2024-10-06"
  },
  {
    id: 7,
    title: "Automated waste sorting device",
    description: "Create a smart waste management hardware system with automated sorting and recycling capabilities.",
    organization: "Ministry of Environment, Forest & Climate Change",
    category: "Hardware",
    theme: "Environment & Sustainability",
    status: "Active",
    submissions: 27,
    deadline: "2024-12-31",
    createdAt: "2024-10-07"
  },
  {
    id: 8,
    title: "EV charging network management software",
    description: "Design an optimal network software for EV charging stations with smart scheduling and payment systems.",
    organization: "Ministry of Heavy Industries",
    category: "Software",
    theme: "Transportation & Mobility",
    status: "Active",
    submissions: 31,
    deadline: "2024-12-31",
    createdAt: "2024-10-08"
  },
  {
    id: 9,
    title: "Water quality monitoring IoT device",
    description: "Develop IoT-based hardware for continuous monitoring of water quality parameters in real-time.",
    organization: "Ministry of Jal Shakti",
    category: "Hardware",
    theme: "Water & Sanitation",
    status: "Active",
    submissions: 23,
    deadline: "2024-12-31",
    createdAt: "2024-10-09"
  },
  {
    id: 10,
    title: "Disaster prediction and alert system",
    description: "Build a software platform for predicting natural disasters and sending timely alerts to affected populations.",
    organization: "National Disaster Management Authority",
    category: "Software",
    theme: "Disaster Management",
    status: "Active",
    submissions: 19,
    deadline: "2024-12-31",
    createdAt: "2024-10-10"
  },
  {
    id: 11,
    title: "Smart tourism guide application",
    description: "Create a comprehensive tourism app with AR features, multilingual support, and local insights.",
    organization: "Ministry of Tourism",
    category: "Software",
    theme: "Travel & Tourism",
    status: "Active",
    submissions: 28,
    deadline: "2024-12-31",
    createdAt: "2024-10-11"
  },
  {
    id: 12,
    title: "Wearable health monitoring device",
    description: "Design a wearable hardware device for continuous health monitoring and emergency alerts.",
    organization: "AIIMS Delhi",
    category: "Hardware",
    theme: "MedTech & BioTech",
    status: "Active",
    submissions: 35,
    deadline: "2024-12-31",
    createdAt: "2024-10-12"
  }
];

const initialSPOCs: SPOCCredential[] = [
  {
    id: 1,
    collegeName: "IIT Delhi",
    spocName: "Dr. Rajesh Kumar",
    email: "spoc@iit.ac.in",
    password: "sih2024",
    phone: "+91 9876543210",
    address: "Hauz Khas, New Delhi - 110016",
    teams: 12,
    lastLogin: "2024-11-15",
    status: "Active"
  },
  {
    id: 2,
    collegeName: "NIT Trichy",
    spocName: "Prof. Anita Sharma",
    email: "spoc@nit.ac.in",
    password: "nit2024",
    phone: "+91 9876543211",
    address: "Tiruchirappalli, Tamil Nadu - 620015",
    teams: 8,
    lastLogin: "2024-11-16",
    status: "Active"
  },
  {
    id: 3,
    collegeName: "BITS Pilani",
    spocName: "Dr. Vikram Singh",
    email: "admin@college.edu",
    password: "password123",
    phone: "+91 9876543212",
    address: "Pilani, Rajasthan - 333031",
    teams: 10,
    lastLogin: "2024-11-14",
    status: "Active"
  },
  {
    id: 4,
    collegeName: "VIT Vellore",
    spocName: "Dr. Priya Menon",
    email: "spoc@vit.ac.in",
    password: "vit2024",
    phone: "+91 9876543213",
    address: "Vellore, Tamil Nadu - 632014",
    teams: 15,
    lastLogin: "2024-11-17",
    status: "Active"
  },
  {
    id: 5,
    collegeName: "Anna University",
    spocName: "Prof. Suresh Babu",
    email: "spoc@annauniv.edu",
    password: "anna2024",
    phone: "+91 9876543214",
    address: "Chennai, Tamil Nadu - 600025",
    teams: 9,
    lastLogin: "2024-11-16",
    status: "Active"
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [problemStatements, setProblemStatements] = useState<ProblemStatement[]>(initialProblems);
  const [spocCredentials, setSPOCCredentials] = useState<SPOCCredential[]>(initialSPOCs);
  const [teamSubmissions, setTeamSubmissions] = useState<TeamSubmission[]>([]);
  const [collegeRegistrations, setCollegeRegistrations] = useState<CollegeRegistrationRequest[]>([]);

  const addProblemStatement = (problem: Omit<ProblemStatement, "id" | "submissions" | "createdAt">) => {
    const newProblem: ProblemStatement = {
      ...problem,
      id: Math.max(...problemStatements.map(p => p.id), 0) + 1,
      submissions: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProblemStatements([...problemStatements, newProblem]);
  };

  const updateProblemStatement = (id: number, problem: Partial<ProblemStatement>) => {
    setProblemStatements(problemStatements.map(p => 
      p.id === id ? { ...p, ...problem } : p
    ));
  };

  const deleteProblemStatement = (id: number) => {
    setProblemStatements(problemStatements.filter(p => p.id !== id));
  };

  const addSPOCCredential = (spoc: Omit<SPOCCredential, "id" | "teams" | "lastLogin">) => {
    const newSPOC: SPOCCredential = {
      ...spoc,
      id: Math.max(...spocCredentials.map(s => s.id), 0) + 1,
      teams: 0,
      lastLogin: "Never"
    };
    setSPOCCredentials([...spocCredentials, newSPOC]);
  };

  const updateSPOCCredential = (id: number, spoc: Partial<SPOCCredential>) => {
    setSPOCCredentials(spocCredentials.map(s => 
      s.id === id ? { ...s, ...spoc } : s
    ));
  };

  const deleteSPOCCredential = (id: number) => {
    setSPOCCredentials(spocCredentials.filter(s => s.id !== id));
  };

  const addTeamSubmission = (submission: Omit<TeamSubmission, "id" | "submittedAt">) => {
    const newSubmission: TeamSubmission = {
      ...submission,
      id: Math.max(...teamSubmissions.map(s => s.id), 0) + 1,
      submittedAt: new Date().toISOString()
    };
    setTeamSubmissions([...teamSubmissions, newSubmission]);
    
    // Update problem submission count
    updateProblemStatement(submission.problemId, {
      submissions: (problemStatements.find(p => p.id === submission.problemId)?.submissions || 0) + 1
    });
    
    // Update SPOC teams count
    const spoc = spocCredentials.find(s => s.id === submission.collegeId);
    if (spoc) {
      updateSPOCCredential(submission.collegeId, {
        teams: spoc.teams + 1
      });
    }
  };

  const updateTeamSubmission = (id: number, submission: Partial<TeamSubmission>) => {
    setTeamSubmissions(teamSubmissions.map(s => 
      s.id === id ? { ...s, ...submission } : s
    ));
  };

  const validateSPOCLogin = (email: string, password: string): SPOCCredential | null => {
    const spoc = spocCredentials.find(s => s.email === email && s.password === password && s.status === "Active");
    if (spoc) {
      // Update last login
      updateSPOCCredential(spoc.id, {
        lastLogin: new Date().toISOString().split('T')[0]
      });
      return spoc;
    }
    return null;
  };

  const getSPOCByEmail = (email: string): SPOCCredential | null => {
    return spocCredentials.find(s => s.email === email) || null;
  };

  const addCollegeRegistration = (registration: Omit<CollegeRegistrationRequest, "id" | "status" | "requestedAt">) => {
    const newRegistration: CollegeRegistrationRequest = {
      ...registration,
      id: Math.max(...collegeRegistrations.map(r => r.id), 0) + 1,
      status: "Pending",
      requestedAt: new Date().toISOString()
    };
    setCollegeRegistrations([...collegeRegistrations, newRegistration]);
  };

  const approveCollegeRegistration = (id: number) => {
    const registration = collegeRegistrations.find(r => r.id === id);
    if (registration) {
      // Generate random password
      const password = Math.random().toString(36).slice(-8);
      
      // Add to SPOC credentials
      addSPOCCredential({
        collegeName: registration.collegeName,
        spocName: registration.spocName,
        email: registration.email,
        password: password,
        phone: registration.phone,
        address: registration.address,
        status: "Active"
      });
      
      // Update registration status
      setCollegeRegistrations(collegeRegistrations.map(r =>
        r.id === id ? { ...r, status: "Approved" as const } : r
      ));
    }
  };

  const rejectCollegeRegistration = (id: number, reason: string) => {
    setCollegeRegistrations(collegeRegistrations.map(r =>
      r.id === id ? { ...r, status: "Rejected" as const, rejectionReason: reason } : r
    ));
  };

  return (
    <AppContext.Provider
      value={{
        problemStatements,
        spocCredentials,
        teamSubmissions,
        collegeRegistrations,
        addProblemStatement,
        updateProblemStatement,
        deleteProblemStatement,
        addSPOCCredential,
        updateSPOCCredential,
        deleteSPOCCredential,
        addTeamSubmission,
        updateTeamSubmission,
        validateSPOCLogin,
        getSPOCByEmail,
        addCollegeRegistration,
        approveCollegeRegistration,
        rejectCollegeRegistration
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
