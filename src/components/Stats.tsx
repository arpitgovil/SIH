import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Users, FileText, Building2, Award, MapPin, TrendingUp } from "lucide-react";

const stats = [
  { number: "50,000+", label: "Student Participants", icon: Users, color: "from-blue-500 to-blue-600" },
  { number: "1,000+", label: "Problem Statements", icon: FileText, color: "from-[#FF6B35] to-[#FF5722]" },
  { number: "500+", label: "Institutions", icon: Building2, color: "from-green-600 to-green-700" },
  { number: "₹10 Cr+", label: "Total Prize Money", icon: Award, color: "from-purple-600 to-purple-700" },
  { number: "100+", label: "Nodal Centers", icon: MapPin, color: "from-indigo-600 to-indigo-700" },
  { number: "7+", label: "Years of Innovation", icon: TrendingUp, color: "from-pink-600 to-pink-700" }
];

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#2563eb] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4">
              <span className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm border border-white/20">
                Impact & Reach
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl mb-4">
              RH by Numbers
            </h2>
            <div className="w-20 h-1 bg-[#FF6B35] mx-auto mb-6"></div>
            <p className="text-blue-100 text-base lg:text-lg max-w-3xl mx-auto">
              A glimpse into India's largest innovation platform driving change across the nation
            </p>
          </motion.div>

          <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -8 }}
                className="text-center"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all h-full">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl lg:text-4xl text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-blue-100">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
