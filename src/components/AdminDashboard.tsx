import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import {
  LogOut,
  Shield,
  FileText,
  Users,
  Building2,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Search,
  X
} from "lucide-react";
import { toast } from "sonner";

interface AdminDashboardProps {
  username: string;
  onLogout: () => void;
}

export function AdminDashboard({ username, onLogout }: AdminDashboardProps) {
  const {
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
    approveCollegeRegistration,
    rejectCollegeRegistration
  } = useAppContext();

  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Registration dialog states
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [selectedRegistrationId, setSelectedRegistrationId] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  
  // Problem dialog states
  const [isProblemDialogOpen, setIsProblemDialogOpen] = useState(false);
  const [newProblemTitle, setNewProblemTitle] = useState("");
  const [newProblemDescription, setNewProblemDescription] = useState("");
  const [newProblemOrganization, setNewProblemOrganization] = useState("");
  const [newProblemCategory, setNewProblemCategory] = useState<"Software" | "Hardware">("Software");
  const [newProblemTheme, setNewProblemTheme] = useState("");
  const [newProblemDeadline, setNewProblemDeadline] = useState("");
  
  // SPOC dialog states
  const [isSPOCDialogOpen, setIsSPOCDialogOpen] = useState(false);
  const [isSPOCViewDialogOpen, setIsSPOCViewDialogOpen] = useState(false);
  const [selectedSPOC, setSelectedSPOC] = useState<any>(null);
  const [newSPOC, setNewSPOC] = useState({
    collegeName: "",
    spocName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    status: "Active" as "Active" | "Inactive"
  });

  const handleAddProblem = () => {
    if (newProblemTitle && newProblemCategory && newProblemDescription && newProblemOrganization && newProblemTheme && newProblemDeadline) {
      addProblemStatement({
        title: newProblemTitle,
        description: newProblemDescription,
        organization: newProblemOrganization,
        category: newProblemCategory,
        theme: newProblemTheme,
        deadline: newProblemDeadline,
        status: "Active"
      });
      toast.success("Problem statement added successfully!");
      setNewProblemTitle("");
      setNewProblemDescription("");
      setNewProblemOrganization("");
      setNewProblemCategory("Software");
      setNewProblemTheme("");
      setNewProblemDeadline("");
      setIsProblemDialogOpen(false);
    } else {
      toast.error("Please fill all fields");
    }
  };

  const handleDeleteProblem = (id: number) => {
    deleteProblemStatement(id);
    toast.success("Problem statement deleted successfully!");
  };

  const handleAddSPOC = () => {
    if (newSPOC.collegeName && newSPOC.spocName && newSPOC.email && newSPOC.password) {
      addSPOCCredential(newSPOC);
      toast.success("SPOC credentials created successfully!");
      setNewSPOC({
        collegeName: "",
        spocName: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        status: "Active"
      });
      setIsSPOCDialogOpen(false);
    } else {
      toast.error("Please fill all required fields");
    }
  };

  const handleViewSPOC = (spoc: any) => {
    setSelectedSPOC(spoc);
    setIsSPOCViewDialogOpen(true);
  };

  const handleDeleteSPOC = (id: number) => {
    deleteSPOCCredential(id);
    toast.success("SPOC deleted successfully!");
  };

  const handleToggleSPOCStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    updateSPOCCredential(id, { status: newStatus });
    toast.success(`SPOC ${newStatus === "Active" ? "activated" : "deactivated"} successfully!`);
  };

  const handleApproveRegistration = (id: number) => {
    approveCollegeRegistration(id);
    toast.success("Registration approved! SPOC credentials have been generated and sent to the registered email.");
  };

  const handleRejectRegistration = () => {
    if (selectedRegistrationId && rejectionReason) {
      rejectCollegeRegistration(selectedRegistrationId, rejectionReason);
      toast.success("Registration rejected and college has been notified.");
      setIsRejectDialogOpen(false);
      setRejectionReason("");
      setSelectedRegistrationId(null);
    } else {
      toast.error("Please provide a rejection reason");
    }
  };

  const openRejectDialog = (id: number) => {
    setSelectedRegistrationId(id);
    setIsRejectDialogOpen(true);
  };

  const pendingRegistrationsCount = collegeRegistrations.filter(r => r.status === "Pending").length;

  const stats = [
    { 
      label: "Total Submissions", 
      value: teamSubmissions.length.toString(), 
      icon: FileText, 
      color: "text-blue-600", 
      bg: "bg-blue-50" 
    },
    { 
      label: "Registered Colleges", 
      value: spocCredentials.length.toString(), 
      icon: Building2, 
      color: "text-green-600", 
      bg: "bg-green-50" 
    },
    { 
      label: "Active Teams", 
      value: spocCredentials.reduce((sum, s) => sum + s.teams, 0).toString(), 
      icon: Users, 
      color: "text-orange-600", 
      bg: "bg-orange-50" 
    },
    { 
      label: "Problem Statements", 
      value: problemStatements.filter(p => p.status === "Active").length.toString(), 
      icon: BarChart3, 
      color: "text-purple-600", 
      bg: "bg-purple-50" 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-blue-900 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-orange-500 p-2 rounded-lg">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-xl">Admin Control Panel</h1>
                <p className="text-sm text-gray-300">Regional Hackathon 2024</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-gray-300">Logged in as</p>
                <p className="text-sm">{username}</p>
              </div>
              <Button onClick={onLogout} variant="outline" className="gap-2 border-white/20 text-white hover:bg-white/10">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto">
            <TabsTrigger value="overview" className="gap-2 py-3">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="registrations" className="gap-2 py-3 relative">
              <Building2 className="w-4 h-4" />
              Registrations
              {pendingRegistrationsCount > 0 && (
                <Badge className="ml-2 bg-red-500 text-white px-1.5 py-0 text-xs">
                  {pendingRegistrationsCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="problems" className="gap-2 py-3">
              <FileText className="w-4 h-4" />
              Problems
            </TabsTrigger>
            <TabsTrigger value="colleges" className="gap-2 py-3">
              <Building2 className="w-4 h-4" />
              SPOCs
            </TabsTrigger>
            <TabsTrigger value="submissions" className="gap-2 py-3">
              <Users className="w-4 h-4" />
              Submissions
            </TabsTrigger>
          </TabsList>

          {/* College Registrations Tab */}
          <TabsContent value="registrations" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg text-gray-900">College Registration Requests</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Review and approve/reject college registration requests
                  </p>
                </div>
                {pendingRegistrationsCount > 0 && (
                  <Badge className="bg-orange-100 text-orange-800">
                    {pendingRegistrationsCount} Pending
                  </Badge>
                )}
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>College Name</TableHead>
                      <TableHead>SPOC Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Requested On</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {collegeRegistrations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                          No registration requests yet
                        </TableCell>
                      </TableRow>
                    ) : (
                      collegeRegistrations
                        .sort((a, b) => {
                          // Sort by status (Pending first) then by date
                          if (a.status === "Pending" && b.status !== "Pending") return -1;
                          if (a.status !== "Pending" && b.status === "Pending") return 1;
                          return new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime();
                        })
                        .map((registration) => (
                          <TableRow key={registration.id}>
                            <TableCell>
                              <div>
                                <p className="text-gray-900">{registration.collegeName}</p>
                                <p className="text-xs text-gray-500">{registration.address}</p>
                              </div>
                            </TableCell>
                            <TableCell>{registration.spocName}</TableCell>
                            <TableCell className="text-sm">{registration.email}</TableCell>
                            <TableCell className="text-sm">{registration.phone}</TableCell>
                            <TableCell className="text-sm text-gray-500">
                              {new Date(registration.requestedAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Badge 
                                className={
                                  registration.status === "Approved"
                                    ? "bg-green-100 text-green-800"
                                    : registration.status === "Rejected"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {registration.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {registration.status === "Pending" ? (
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700 h-8"
                                    onClick={() => handleApproveRegistration(registration.id)}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    className="h-8"
                                    onClick={() => openRejectDialog(registration.id)}
                                  >
                                    Reject
                                  </Button>
                                </div>
                              ) : (
                                <span className="text-sm text-gray-500">-</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className={`p-6 ${stat.bg} border-2`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className={`text-3xl ${stat.color}`}>{stat.value}</p>
                    </div>
                    <stat.icon className={`w-12 h-12 ${stat.color}`} />
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg text-gray-900 mb-4">Recent Problem Statements</h3>
                <div className="space-y-3">
                  {problemStatements.slice(0, 5).map((problem) => (
                    <div key={problem.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 line-clamp-1">{problem.title}</p>
                        <p className="text-xs text-gray-500">{problem.category}</p>
                      </div>
                      <Badge variant="secondary">{problem.submissions}</Badge>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg text-gray-900 mb-4">Top Performing Colleges</h3>
                <div className="space-y-3">
                  {[...spocCredentials]
                    .sort((a, b) => b.teams - a.teams)
                    .slice(0, 5)
                    .map((college) => (
                      <div key={college.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm text-gray-900">{college.collegeName}</p>
                          <p className="text-xs text-gray-500">{college.teams} teams</p>
                        </div>
                        <Badge variant="secondary">{college.status}</Badge>
                      </div>
                    ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Problem Statements Tab */}
          <TabsContent value="problems" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg text-gray-900">Manage Problem Statements</h3>
                <Dialog open={isProblemDialogOpen} onOpenChange={setIsProblemDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-orange-500 hover:bg-orange-600 gap-2">
                      <Plus className="w-4 h-4" />
                      Add Problem
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Problem Statement</DialogTitle>
                      <DialogDescription>
                        Create a new problem statement for the hackathon
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4 max-h-[60vh] overflow-y-auto">
                      <div className="space-y-2">
                        <Label>Problem Title *</Label>
                        <Input
                          placeholder="Enter problem statement title"
                          value={newProblemTitle}
                          onChange={(e) => setNewProblemTitle(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Organization *</Label>
                        <Input
                          placeholder="e.g., Ministry of Education"
                          value={newProblemOrganization}
                          onChange={(e) => setNewProblemOrganization(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Category *</Label>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            value={newProblemCategory}
                            onChange={(e) => setNewProblemCategory(e.target.value as "Software" | "Hardware")}
                          >
                            <option value="Software">Software</option>
                            <option value="Hardware">Hardware</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Deadline *</Label>
                          <Input
                            type="date"
                            value={newProblemDeadline}
                            onChange={(e) => setNewProblemDeadline(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Theme *</Label>
                        <Input
                          placeholder="e.g., Agriculture & Rural Development"
                          value={newProblemTheme}
                          onChange={(e) => setNewProblemTheme(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description *</Label>
                        <Textarea
                          placeholder="Enter detailed description"
                          rows={4}
                          value={newProblemDescription}
                          onChange={(e) => setNewProblemDescription(e.target.value)}
                        />
                      </div>
                      <Button onClick={handleAddProblem} className="w-full bg-green-600 hover:bg-green-700">
                        Add Problem Statement
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search problem statements..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>PS ID</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Theme</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submissions</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {problemStatements
                      .filter(p => 
                        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.theme.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((problem) => (
                        <TableRow key={problem.id}>
                          <TableCell className="font-mono text-sm">
                            RH{problem.id.toString().padStart(4, '0')}
                          </TableCell>
                          <TableCell className="text-sm">{problem.organization}</TableCell>
                          <TableCell className="max-w-md">{problem.title}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline"
                              className={
                                problem.category === "Software" 
                                  ? "bg-blue-50 text-blue-700 border-blue-200" 
                                  : "bg-purple-50 text-purple-700 border-purple-200"
                              }
                            >
                              {problem.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">{problem.theme}</TableCell>
                          <TableCell>
                            <Badge className={problem.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                              {problem.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{problem.submissions}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 text-red-600"
                                onClick={() => handleDeleteProblem(problem.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* Colleges & SPOCs Tab */}
          <TabsContent value="colleges" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg text-gray-900">Registered Colleges & SPOCs</h3>
                <Dialog open={isSPOCDialogOpen} onOpenChange={setIsSPOCDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700 gap-2">
                      <Plus className="w-4 h-4" />
                      Add SPOC
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New SPOC Credentials</DialogTitle>
                      <DialogDescription>
                        Create login credentials for a college SPOC
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4 max-h-[60vh] overflow-y-auto">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>College Name *</Label>
                          <Input
                            placeholder="e.g., IIT Delhi"
                            value={newSPOC.collegeName}
                            onChange={(e) => setNewSPOC({...newSPOC, collegeName: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>SPOC Name *</Label>
                          <Input
                            placeholder="e.g., Dr. John Doe"
                            value={newSPOC.spocName}
                            onChange={(e) => setNewSPOC({...newSPOC, spocName: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Email *</Label>
                          <Input
                            type="email"
                            placeholder="spoc@college.edu"
                            value={newSPOC.email}
                            onChange={(e) => setNewSPOC({...newSPOC, email: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Password *</Label>
                          <Input
                            type="text"
                            placeholder="Enter password"
                            value={newSPOC.password}
                            onChange={(e) => setNewSPOC({...newSPOC, password: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input
                          placeholder="+91 9876543210"
                          value={newSPOC.phone}
                          onChange={(e) => setNewSPOC({...newSPOC, phone: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Address</Label>
                        <Textarea
                          placeholder="College address"
                          rows={2}
                          value={newSPOC.address}
                          onChange={(e) => setNewSPOC({...newSPOC, address: e.target.value})}
                        />
                      </div>
                      <Button onClick={handleAddSPOC} className="w-full bg-green-600 hover:bg-green-700">
                        Create SPOC Credentials
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>College Name</TableHead>
                      <TableHead>SPOC Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Teams</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {spocCredentials.map((spoc) => (
                      <TableRow key={spoc.id}>
                        <TableCell>{spoc.collegeName}</TableCell>
                        <TableCell>{spoc.spocName}</TableCell>
                        <TableCell>{spoc.email}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{spoc.teams}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={spoc.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                            {spoc.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">{spoc.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-8 gap-1"
                              onClick={() => handleViewSPOC(spoc)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 gap-1"
                              onClick={() => handleToggleSPOCStatus(spoc.id, spoc.status)}
                            >
                              {spoc.status === "Active" ? "Disable" : "Enable"}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-red-600"
                              onClick={() => handleDeleteSPOC(spoc.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg text-gray-900">Team Submissions</h3>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export All
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Team Name</TableHead>
                      <TableHead>College</TableHead>
                      <TableHead>Problem</TableHead>
                      <TableHead>Leader</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teamSubmissions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          No submissions yet
                        </TableCell>
                      </TableRow>
                    ) : (
                      teamSubmissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell>{submission.teamName}</TableCell>
                          <TableCell>{submission.collegeName}</TableCell>
                          <TableCell className="text-sm">{submission.problemTitle}</TableCell>
                          <TableCell>{submission.leaderName}</TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                submission.status === "Approved" 
                                  ? "bg-green-100 text-green-800" 
                                  : submission.status === "Under Review"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                              }
                            >
                              {submission.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-500">
                            {new Date(submission.submittedAt).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Reject Registration Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Registration Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this registration request
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Rejection Reason</Label>
              <Textarea
                placeholder="Enter reason for rejection..."
                rows={4}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setIsRejectDialogOpen(false);
                  setRejectionReason("");
                  setSelectedRegistrationId(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleRejectRegistration}
              >
                Reject Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* SPOC View Dialog */}
      <Dialog open={isSPOCViewDialogOpen} onOpenChange={setIsSPOCViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>SPOC Details</DialogTitle>
            <DialogDescription>
              Complete information about the SPOC
            </DialogDescription>
          </DialogHeader>
          {selectedSPOC && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-600">College Name</Label>
                  <p className="text-gray-900 mt-1">{selectedSPOC.collegeName}</p>
                </div>
                <div>
                  <Label className="text-gray-600">SPOC Name</Label>
                  <p className="text-gray-900 mt-1">{selectedSPOC.spocName}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-600">Email</Label>
                  <p className="text-gray-900 mt-1">{selectedSPOC.email}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Password</Label>
                  <p className="text-gray-900 mt-1 font-mono bg-gray-100 px-3 py-1 rounded">{selectedSPOC.password}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-600">Phone</Label>
                  <p className="text-gray-900 mt-1">{selectedSPOC.phone || "N/A"}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Teams Registered</Label>
                  <p className="text-gray-900 mt-1">{selectedSPOC.teams}</p>
                </div>
              </div>
              <div>
                <Label className="text-gray-600">Address</Label>
                <p className="text-gray-900 mt-1">{selectedSPOC.address || "N/A"}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-600">Status</Label>
                  <div className="mt-1">
                    <Badge className={selectedSPOC.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {selectedSPOC.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-600">Last Login</Label>
                  <p className="text-gray-900 mt-1">{selectedSPOC.lastLogin}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
