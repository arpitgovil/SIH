import { Users, School, UserCheck, Trophy } from "lucide-react";
import { Card } from "./ui/card";

export function Eligibility() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-blue-900 mb-4">Who Can Participate?</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-4"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 border-2 hover:border-orange-500 transition-colors">
              <Users className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-blue-900 text-2xl mb-4">Team Size</h3>
              <p className="text-gray-700 text-lg">
                Teams must consist of <span className="text-orange-600">6 members</span>, including at least one female participant. A team can have a maximum of <span className="text-orange-600">2 mentors</span>.
              </p>
            </Card>

            <Card className="p-8 border-2 hover:border-orange-500 transition-colors">
              <School className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-blue-900 text-2xl mb-4">Educational Institutions</h3>
              <p className="text-gray-700 text-lg">
                Students from all <span className="text-orange-600">AICTE approved</span> engineering colleges, universities, and degree colleges across India are eligible to participate.
              </p>
            </Card>

            <Card className="p-8 border-2 hover:border-orange-500 transition-colors">
              <UserCheck className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-blue-900 text-2xl mb-4">Student Criteria</h3>
              <p className="text-gray-700 text-lg">
                Open to all students pursuing diploma, undergraduate, or postgraduate courses in any stream. Students must be enrolled during the hackathon period.
              </p>
            </Card>

            <Card className="p-8 border-2 hover:border-orange-500 transition-colors">
              <Trophy className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-blue-900 text-2xl mb-4">Prize Money</h3>
              <p className="text-gray-700 text-lg">
                Winning teams receive a cash prize of <span className="text-orange-600">₹1,00,000</span>, along with certificates and recognition from government organizations.
              </p>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-8 text-center">
            <h3 className="text-2xl mb-4">Important Note</h3>
            <p className="text-lg max-w-3xl mx-auto">
              All team members must be Indian citizens. Each student can be part of only one team. Teams will be required to present valid ID proofs and bonafide certificates at the time of Grand Finale.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
