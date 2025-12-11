import { Download, BookOpen, Video, FileQuestion } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const resources = [
  {
    icon: BookOpen,
    title: "Problem Statements",
    description: "Browse through 1000+ problem statements from various organizations",
    buttonText: "View Problems",
    color: "bg-blue-600"
  },
  {
    icon: Download,
    title: "Rulebook & Guidelines",
    description: "Download the official rulebook and participation guidelines",
    buttonText: "Download PDF",
    color: "bg-orange-600"
  },
  {
    icon: Video,
    title: "Tutorial Videos",
    description: "Watch tutorial videos and webinars from previous editions",
    buttonText: "Watch Videos",
    color: "bg-green-600"
  },
  {
    icon: FileQuestion,
    title: "FAQs",
    description: "Find answers to frequently asked questions",
    buttonText: "Read FAQs",
    color: "bg-purple-600"
  }
];

export function Resources() {
  return (
    <section id="resources" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-blue-900 mb-4">Resources & Downloads</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">
              Everything you need to participate and succeed in SIH 2024
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {resources.map((resource, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-all border-2 hover:border-orange-500 group">
                <div className={`${resource.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <resource.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-blue-900 text-2xl mb-3">{resource.title}</h3>
                <p className="text-gray-600 mb-6">{resource.description}</p>
                <Button className="bg-orange-500 hover:bg-orange-600 w-full">
                  {resource.buttonText}
                </Button>
              </Card>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
              <div className="text-3xl text-blue-900 mb-2">📚</div>
              <h4 className="text-blue-900 mb-2">Documentation</h4>
              <p className="text-gray-600 text-sm">Complete technical documentation and API references</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 text-center">
              <div className="text-3xl text-orange-900 mb-2">💬</div>
              <h4 className="text-orange-900 mb-2">Community Forum</h4>
              <p className="text-gray-600 text-sm">Connect with mentors and fellow participants</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center">
              <div className="text-3xl text-green-900 mb-2">🎯</div>
              <h4 className="text-green-900 mb-2">Sample Projects</h4>
              <p className="text-gray-600 text-sm">Explore winning solutions from previous years</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
