import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const timelineEvents = [
  {
    phase: "Phase 1",
    title: "Idea Submission",
    date: "August 2024",
    description: "Teams submit their innovative ideas and solutions",
    completed: true
  },
  {
    phase: "Phase 2",
    title: "Internal Hackathon",
    date: "September 2024",
    description: "College-level hackathons to shortlist best teams",
    completed: true
  },
  {
    phase: "Phase 3",
    title: "Evaluation Round",
    date: "October 2024",
    description: "Expert evaluation of submitted solutions",
    completed: false
  },
  {
    phase: "Phase 4",
    title: "Grand Finale",
    date: "November 2024",
    description: "36-hour hackathon at nodal centers across India",
    completed: false
  },
  {
    phase: "Phase 5",
    title: "Winner Announcement",
    date: "December 2024",
    description: "Final results and prize distribution",
    completed: false
  }
];

export function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="timeline" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl text-blue-900 mb-4">RH 2024 Timeline</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">
              Key milestones and important dates for Regional Hackathon 2024
            </p>
          </motion.div>

          <div ref={ref} className="relative">
            {/* Timeline Line */}
            <motion.div 
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-200"
            ></motion.div>

            {/* Timeline Events */}
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                  }`}>
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white p-6 rounded-lg shadow-lg border-2 border-blue-100 hover:border-orange-500 hover:shadow-2xl transition-all"
                    >
                      <div className="flex items-center gap-2 mb-2 justify-start md:justify-end">
                        <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm shadow-md">
                          {event.phase}
                        </span>
                        {event.completed && (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <h3 className="text-blue-900 text-xl mb-2">{event.title}</h3>
                      <p className="text-orange-600 mb-2">{event.date}</p>
                      <p className="text-gray-600">{event.description}</p>
                    </motion.div>
                  </div>

                  {/* Center Circle */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-600 border-4 border-white rounded-full items-center justify-center shadow-lg z-10">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
