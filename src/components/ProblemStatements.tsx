import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface ProblemStatementsProps {
  onBack: () => void;
}

export function ProblemStatements({ onBack }: ProblemStatementsProps) {
  const { problemStatements } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTheme, setSelectedTheme] = useState<string>("All");
  const [selectedOrganization, setSelectedOrganization] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get unique values for filters
  const themes = ["All", ...Array.from(new Set(problemStatements.map(p => p.theme)))];
  const organizations = ["All", ...Array.from(new Set(problemStatements.map(p => p.organization)))];

  // Filter problems
  const filteredProblems = problemStatements.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.id.toString().includes(searchTerm);
    const matchesCategory = selectedCategory === "All" || problem.category === selectedCategory;
    const matchesTheme = selectedTheme === "All" || problem.theme === selectedTheme;
    const matchesOrganization = selectedOrganization === "All" || problem.organization === selectedOrganization;
    const isActive = problem.status === "Active";
    return matchesSearch && matchesCategory && matchesTheme && matchesOrganization && isActive;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProblems = filteredProblems.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        {/* Tricolor Bar */}
        <div className="flex h-1.5">
          <div className="flex-1 bg-[#FF9933]"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-[#138808]"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl text-gray-900 mb-1">Problem Statements</h1>
              <p className="text-sm text-gray-600">Regional Hackathon 2024</p>
            </div>
            <Button 
              onClick={onBack} 
              variant="outline"
              className="border-gray-300"
            >
              ← Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h3 className="text-base text-gray-900 mb-4">Filter Problem Statements</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by PS ID, title, organization..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">Category</label>
              <Select value={selectedCategory} onValueChange={(value) => {
                setSelectedCategory(value);
                setCurrentPage(1);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Software">Software</SelectItem>
                  <SelectItem value="Hardware">Hardware</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Theme Filter */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">Theme</label>
              <Select value={selectedTheme} onValueChange={(value) => {
                setSelectedTheme(value);
                setCurrentPage(1);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  {themes.map(theme => (
                    <SelectItem key={theme} value={theme}>
                      {theme}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Organization Filter */}
            <div className="lg:col-span-2">
              <label className="block text-sm text-gray-700 mb-2">Organization</label>
              <Select value={selectedOrganization} onValueChange={(value) => {
                setSelectedOrganization(value);
                setCurrentPage(1);
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select organization" />
                </SelectTrigger>
                <SelectContent>
                  {organizations.map(org => (
                    <SelectItem key={org} value={org}>
                      {org}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {filteredProblems.length > 0 ? startIndex + 1 : 0} to {Math.min(endIndex, filteredProblems.length)} of {filteredProblems.length} problem statements
            </p>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-20">S.No.</TableHead>
                  <TableHead className="min-w-64">Organization</TableHead>
                  <TableHead className="min-w-80">Problem Statement Title</TableHead>
                  <TableHead className="w-32">Category</TableHead>
                  <TableHead className="w-32">PS Number</TableHead>
                  <TableHead className="w-40">Submitted Idea(s) Count</TableHead>
                  <TableHead className="min-w-52">Theme</TableHead>
                  <TableHead className="w-40">Deadline for Idea Submission</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentProblems.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-gray-500">
                      No problem statements found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  currentProblems.map((problem, index) => (
                    <TableRow key={problem.id} className="hover:bg-gray-50">
                      <TableCell className="text-center text-sm">
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-900">{problem.organization}</p>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm text-gray-900 mb-1">{problem.title}</p>
                          <p className="text-xs text-gray-500 line-clamp-2">{problem.description}</p>
                        </div>
                      </TableCell>
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
                      <TableCell className="text-center">
                        <span className="font-mono text-sm text-gray-900">
                          RH{problem.id.toString().padStart(4, '0')}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary" className="text-xs">
                          {problem.submissions}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-700">{problem.theme}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-700">
                          {new Date(problem.deadline).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {filteredProblems.length > itemsPerPage && (
            <div className="border-t border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  
                  {/* Page Numbers */}
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className={currentPage === pageNum ? "bg-[#FF6B35] hover:bg-[#FF5722]" : ""}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 mt-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-400">
              © 2024 Regional Hackathon. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-[#FF6B35] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF6B35] transition-colors">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
        {/* India Flag */}
        <div className="flex h-1.5 mt-6">
          <div className="flex-1 bg-[#FF9933]"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-[#138808]"></div>
        </div>
      </footer>
    </div>
  );
}
