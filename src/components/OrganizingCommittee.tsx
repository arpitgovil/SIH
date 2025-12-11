import { User } from "lucide-react";

interface CommitteeMember {
  name: string;
  designation: string;
  organization: string;
  role: string;
}

export function OrganizingCommittee() {
  const patron: CommitteeMember = {
    name: "Dr. Rajesh Kumar",
    designation: "Secretary",
    organization: "Ministry of Education",
    role: "Patron"
  };

  const convener: CommitteeMember = {
    name: "Prof. Anita Sharma",
    designation: "Director General",
    organization: "All India Council for Technical Education",
    role: "Convener"
  };

  const coConveners: CommitteeMember[] = [
    {
      name: "Dr. Suresh Patel",
      designation: "Additional Secretary",
      organization: "Ministry of Education",
      role: "Co-Convener"
    },
    {
      name: "Mr. Vikram Singh",
      designation: "Joint Secretary",
      organization: "Department of Higher Education",
      role: "Co-Convener"
    }
  ];

  const members: CommitteeMember[] = [
    {
      name: "Dr. Priya Verma",
      designation: "Professor",
      organization: "Indian Institute of Technology",
      role: "Member"
    },
    {
      name: "Mr. Arun Mehta",
      designation: "Director",
      organization: "National Innovation Foundation",
      role: "Member"
    },
    {
      name: "Dr. Meena Reddy",
      designation: "Senior Scientist",
      organization: "Council of Scientific & Industrial Research",
      role: "Member"
    },
    {
      name: "Prof. Karthik Iyer",
      designation: "Dean",
      organization: "National Institute of Technology",
      role: "Member"
    },
    {
      name: "Ms. Neha Gupta",
      designation: "Deputy Secretary",
      organization: "Ministry of Electronics & IT",
      role: "Member"
    },
    {
      name: "Dr. Rakesh Joshi",
      designation: "Chief Innovation Officer",
      organization: "Atal Innovation Mission",
      role: "Member"
    }
  ];

  const MemberCard = ({ member, isLarge = false }: { member: CommitteeMember; isLarge?: boolean }) => (
    <div className={`bg-white border border-gray-200 rounded-lg ${isLarge ? 'p-8' : 'p-6'} text-center shadow-sm hover:shadow-md transition-shadow`}>
      <div className={`${isLarge ? 'w-24 h-24' : 'w-20 h-20'} mx-auto mb-4 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center`}>
        <User className={`${isLarge ? 'w-12 h-12' : 'w-10 h-10'} text-white`} />
      </div>
      <div className={`${isLarge ? 'text-[18px]' : 'text-[16px]'} text-gray-900 mb-1`}>{member.name}</div>
      <div className="text-[14px] text-gray-600 mb-2">{member.designation}</div>
      <div className="text-[13px] text-gray-500 mb-3">{member.organization}</div>
      <div className={`inline-block px-4 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-[12px] rounded-full`}>
        {member.role}
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-[32px] text-gray-900 mb-4">
            Organizing Committee
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-6"></div>
          <p className="text-[16px] text-gray-600 max-w-3xl mx-auto">
            The Regional Hackathon is organized under the guidance and leadership of distinguished personalities from various government bodies and educational institutions.
          </p>
        </div>

        {/* Patron */}
        <div className="mb-12">
          <h3 className="text-[24px] text-center text-gray-900 mb-6">Patron</h3>
          <div className="max-w-md mx-auto">
            <MemberCard member={patron} isLarge={true} />
          </div>
        </div>

        {/* Convener */}
        <div className="mb-12">
          <h3 className="text-[24px] text-center text-gray-900 mb-6">Convener</h3>
          <div className="max-w-md mx-auto">
            <MemberCard member={convener} isLarge={true} />
          </div>
        </div>

        {/* Co-Conveners */}
        <div className="mb-12">
          <h3 className="text-[24px] text-center text-gray-900 mb-6">Co-Conveners</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {coConveners.map((member, index) => (
              <MemberCard key={index} member={member} />
            ))}
          </div>
        </div>

        {/* Members */}
        <div>
          <h3 className="text-[24px] text-center text-gray-900 mb-6">Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member, index) => (
              <MemberCard key={index} member={member} />
            ))}
          </div>
        </div>

        {/* Additional Info Box */}
        <div className="mt-12 bg-white border-l-4 border-orange-500 p-6 rounded-lg shadow-sm">
          <p className="text-[14px] text-gray-700">
            <span className="text-orange-600">Note:</span> The Organizing Committee oversees the planning, execution, and successful completion of the Regional Hackathon. They ensure the event maintains the highest standards of innovation, fairness, and excellence.
          </p>
        </div>
      </div>
    </section>
  );
}
