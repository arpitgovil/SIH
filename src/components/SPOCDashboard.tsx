import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Logo } from "./Logo";
import {
  Upload,
  LogOut,
  FileText,
  Users,
  Building2,
  CheckCircle,
  User,
  Mail,
  Phone,
  FileCheck
} from "lucide-react";
import { toast } from "sonner";

interface SPOCDashboardProps {
  email: string;
  onLogout: () => void;
}

export function SPOCDashboard({ email, onLogout }: SPOCDashboardProps) {
  const { problemStatements, getSPOCByEmail, addTeamSubmission } = useAppContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [fileName, setFileName] = useState("");
  
  // Get SPOC data
  const spocData = getSPOCByEmail(email);
  
  // Form state
  const [teamName, setTeamName] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [leaderPhone, setLeaderPhone] = useState("");
  const [collegeName, setCollegeName] = useState(spocData?.collegeName || "");
  const [selectedProblemId, setSelectedProblemId] = useState("");
  const [teamMembers, setTeamMembers] = useState([
    { name: "", email: "", role: "" }
  ]);
  const [projectDescription, setProjectDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size should not exceed 10MB");
        return;
      }
      setFileName(file.name);
      toast.success("File uploaded successfully!");
    }
  };

  const addTeamMember = () => {
    if (teamMembers.length < 6) {
      setTeamMembers([...teamMembers, { name: "", email: "", role: "" }]);
    } else {
      toast.error("Maximum 6 team members allowed");
    }
  };

  const removeTeamMember = (index: number) => {
    const newMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(newMembers);
  };

  const updateTeamMember = (index: number, field: string, value: string) => {
    const newMembers = [...teamMembers];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setTeamMembers(newMembers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!fileName) {
      toast.error("Please upload a project presentation");
      return;
    }
    
    if (!problemStatement) {
      toast.error("Please select a problem statement");
      return;
    }

    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
      toast.success("Project submitted successfully!");
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo className="w-12 h-12" />
              <div>
                <h1 className="text-blue-900">SPOC Portal</h1>
                <p className="text-xs text-gray-600">Regional Hackathon 2024</p>
              </div>
            </div>
            <Button onClick={onLogout} variant="outline" className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </header>

        {/* Success Message */}
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <Card className="p-12 text-center border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl text-blue-900 mb-4">Submission Successful!</h2>
            <p className="text-gray-600 text-lg mb-8">
              Your project has been submitted successfully. Our team will review your submission and contact you soon.
            </p>
            
            <div className="bg-white rounded-lg p-6 mb-8 text-left">
              <h3 className="text-blue-900 mb-4">Submission Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Team Name:</span>
                  <span className="text-blue-900">{teamName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Team Leader:</span>
                  <span className="text-blue-900">{leaderName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">College:</span>
                  <span className="text-blue-900">{collegeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Presentation:</span>
                  <span className="text-blue-900">{fileName}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={() => setSubmitted(false)} className="bg-blue-600 hover:bg-blue-700">
                Submit Another Project
              </Button>
              <Button onClick={onLogout} variant="outline">
                Back to Home
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="w-12 h-12" />
            <div>
              <h1 className="text-blue-900">SPOC Portal</h1>
              <p className="text-xs text-gray-600">Regional Hackathon 2024</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm text-gray-600">Logged in as</p>
              <p className="text-sm text-blue-900">{email}</p>
            </div>
            <Button onClick={onLogout} variant="outline" className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b py-6">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between">
              <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  1
                </div>
                <span className="hidden sm:inline">Team Details</span>
              </div>
              <div className={`flex-1 h-1 mx-4 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  2
                </div>
                <span className="hidden sm:inline">Problem Statement</span>
              </div>
              <div className={`flex-1 h-1 mx-4 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center gap-2 ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                  3
                </div>
                <span className="hidden sm:inline">Upload & Submit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Team Details */}
            {currentStep === 1 && (
              <Card className="p-8 mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-8 h-8 text-orange-500" />
                  <h2 className="text-2xl text-blue-900">Team Details</h2>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="teamName">Team Name *</Label>
                      <Input
                        id="teamName"
                        placeholder="Enter team name"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="collegeName">College Name *</Label>
                      <Input
                        id="collegeName"
                        placeholder="Enter college name"
                        value={collegeName}
                        onChange={(e) => setCollegeName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-blue-900 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Team Leader Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="leaderName">Leader Name *</Label>
                        <Input
                          id="leaderName"
                          placeholder="Enter leader name"
                          value={leaderName}
                          onChange={(e) => setLeaderName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="leaderEmail">Leader Email *</Label>
                        <Input
                          id="leaderEmail"
                          type="email"
                          placeholder="leader@email.com"
                          value={leaderEmail}
                          onChange={(e) => setLeaderEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="leaderPhone">Leader Phone *</Label>
                        <Input
                          id="leaderPhone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={leaderPhone}
                          onChange={(e) => setLeaderPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-blue-900 flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Team Members (Max 6)
                      </h3>
                      <Button
                        type="button"
                        onClick={addTeamMember}
                        variant="outline"
                        size="sm"
                        disabled={teamMembers.length >= 6}
                      >
                        + Add Member
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {teamMembers.map((member, index) => (
                        <div key={index} className="p-4 border rounded-lg bg-gray-50">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-gray-600">Member {index + 1}</span>
                            {teamMembers.length > 1 && (
                              <Button
                                type="button"
                                onClick={() => removeTeamMember(index)}
                                variant="ghost"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                              >
                                Remove
                              </Button>
                            )}
                          </div>
                          <div className="grid md:grid-cols-3 gap-3">
                            <Input
                              placeholder="Name"
                              value={member.name}
                              onChange={(e) => updateTeamMember(index, "name", e.target.value)}
                            />
                            <Input
                              placeholder="Email"
                              type="email"
                              value={member.email}
                              onChange={(e) => updateTeamMember(index, "email", e.target.value)}
                            />
                            <Input
                              placeholder="Role (e.g., Developer)"
                              value={member.role}
                              onChange={(e) => updateTeamMember(index, "role", e.target.value)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="bg-orange-500 hover:bg-orange-600"
                    disabled={!teamName || !collegeName || !leaderName || !leaderEmail || !leaderPhone}
                  >
                    Next Step →
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 2: Problem Statement */}
            {currentStep === 2 && (
              <Card className="p-8 mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-8 h-8 text-orange-500" />
                  <h2 className="text-2xl text-blue-900">Problem Statement & Description</h2>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="problemStatement">Select Problem Statement *</Label>
                    <Select value={problemStatement} onValueChange={setProblemStatement}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a problem statement" />
                      </SelectTrigger>
                      <SelectContent>
                        {problemStatements.map((ps, index) => (
                          <SelectItem key={index} value={ps}>
                            {ps}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectDescription">Project Description *</Label>
                    <Textarea
                      id="projectDescription"
                      placeholder="Describe your solution, approach, and innovation..."
                      rows={8}
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      required
                    />
                    <p className="text-xs text-gray-500">
                      Provide a detailed description of your project idea and how it solves the problem
                    </p>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    variant="outline"
                  >
                    ← Previous
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="bg-orange-500 hover:bg-orange-600"
                    disabled={!problemStatement || !projectDescription}
                  >
                    Next Step →
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 3: Upload & Submit */}
            {currentStep === 3 && (
              <Card className="p-8 mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <Upload className="w-8 h-8 text-orange-500" />
                  <h2 className="text-2xl text-blue-900">Upload Presentation & Submit</h2>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="presentation">Project Presentation (PPT/PDF) *</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                      <input
                        id="presentation"
                        type="file"
                        accept=".ppt,.pptx,.pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <label htmlFor="presentation" className="cursor-pointer">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        {fileName ? (
                          <div className="flex items-center justify-center gap-2 text-green-600">
                            <FileCheck className="w-5 h-5" />
                            <span>{fileName}</span>
                          </div>
                        ) : (
                          <>
                            <p className="text-gray-700 mb-2">Click to upload or drag and drop</p>
                            <p className="text-sm text-gray-500">PPT, PPTX or PDF (Max 10MB)</p>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-blue-900 mb-3">Submission Checklist</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className={`w-4 h-4 ${teamName && collegeName ? 'text-green-600' : 'text-gray-400'}`} />
                        <span>Team details completed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className={`w-4 h-4 ${problemStatement ? 'text-green-600' : 'text-gray-400'}`} />
                        <span>Problem statement selected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className={`w-4 h-4 ${fileName ? 'text-green-600' : 'text-gray-400'}`} />
                        <span>Presentation uploaded</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    variant="outline"
                  >
                    ← Previous
                  </Button>
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 gap-2"
                    disabled={!fileName || !problemStatement}
                  >
                    <CheckCircle className="w-4 h-4" />
                    Submit Project
                  </Button>
                </div>
              </Card>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
