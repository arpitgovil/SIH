import { FileText, Code, Presentation, Award } from "lucide-react";
import { Card } from "./ui/card";

const guidelines = [
  {
    icon: FileText,
    title: "Registration & Submission",
    points: [
      "Register on the official SIH portal",
      "Form teams of 6 members with at least 1 female",
      "Submit innovative ideas for problem statements",
      "Upload required documents and proofs"
    ]
  },
  {
    icon: Code,
    title: "Development Phase",
    points: [
      "Participate in internal hackathon at your institute",
      "Develop working prototype/solution",
      "Follow coding standards and best practices",
      "Document your solution properly"
    ]
  },
  {
    icon: Presentation,
    title: "Presentation & Demo",
    points: [
      "Prepare 10-minute presentation",
      "Demonstrate working solution",
      "Explain innovation and feasibility",
      "Answer questions from jury panel"
    ]
  },
  {
    icon: Award,
    title: "Evaluation Criteria",
    points: [
      "Innovation and creativity of solution",
      "Technical complexity and scalability",
      "Social impact and feasibility",
      "Presentation and team coordination"
    ]
  }
];

export function Guidelines() {
  return (
    <section id="guidelines" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-blue-900 mb-4">Participation Guidelines</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">
              Essential guidelines for participating in Regional Hackathon 2024
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {guidelines.map((guideline, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-shadow border-2 hover:border-orange-500">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-500 w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0">
                    <guideline.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-blue-900 text-xl mb-4">{guideline.title}</h3>
                    <ul className="space-y-2">
                      {guideline.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <span className="text-orange-500 mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-blue-900 text-white rounded-lg p-8">
            <h3 className="text-2xl mb-4 text-center">Code of Conduct</h3>
            <div className="grid md:grid-cols-2 gap-6 text-blue-100">
              <div>
                <h4 className="text-white mb-2">Do's</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">✓</span>
                    <span>Respect all participants and judges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">✓</span>
                    <span>Maintain code originality and integrity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">✓</span>
                    <span>Follow time schedules and deadlines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">✓</span>
                    <span>Collaborate effectively with team members</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white mb-2">Don'ts</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    <span>Plagiarize code or ideas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    <span>Engage in unfair practices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    <span>Miss submission deadlines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">✗</span>
                    <span>Disrespect organizers or fellow participants</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
