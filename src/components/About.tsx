import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Lightbulb, Users, Award, Target } from "lucide-react";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4">
              <span className="bg-[#FF6B35]/10 text-[#FF6B35] px-4 py-2 rounded-full text-sm">
                About the Initiative
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
              What is Regional Hackathon?
            </h2>
            <div className="w-20 h-1 bg-[#FF6B35] mx-auto"></div>
          </motion.div>

          <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#FF6B35]/10 to-[#138808]/10 rounded-2xl blur-2xl"></div>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1585913161203-695a3ac93b33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aW9uJTIwaGFja2F0aG9uJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzYzNDQyNTMzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Students working on hackathon"
                  className="relative w-full h-auto rounded-2xl shadow-xl"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 order-1 lg:order-2"
            >
              <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
                Regional Hackathon is a nationwide initiative to provide students with a platform to solve some of the pressing problems we face in our daily lives, and thus inculcate a culture of product innovation and a mindset of problem solving.
              </p>
              
              <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
                The hackathon has proven to be extremely successful in promoting innovation and out-of-the-box thinking in young minds, especially engineering students from across India.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-gradient-to-br from-[#FF6B35]/5 to-[#FF6B35]/10 p-6 rounded-xl border border-[#FF6B35]/20">
                  <div className="text-3xl text-[#FF6B35] mb-2">50K+</div>
                  <div className="text-sm text-gray-600">Participants</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 p-6 rounded-xl border border-blue-500/20">
                  <div className="text-3xl text-blue-600 mb-2">1000+</div>
                  <div className="text-sm text-gray-600">Problem Statements</div>
                </div>
                <div className="bg-gradient-to-br from-[#138808]/5 to-[#138808]/10 p-6 rounded-xl border border-[#138808]/20">
                  <div className="text-3xl text-[#138808] mb-2">500+</div>
                  <div className="text-sm text-gray-600">Colleges</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/5 to-purple-500/10 p-6 rounded-xl border border-purple-500/20">
                  <div className="text-3xl text-purple-600 mb-2">₹1L</div>
                  <div className="text-sm text-gray-600">Prize per Winner</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
          >
            <motion.div 
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:shadow-xl hover:border-[#FF6B35]/30 transition-all"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#FF6B35] to-[#FF5722] rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <Lightbulb className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-gray-900 mb-2 text-lg">Innovation</h3>
              <p className="text-gray-600 text-sm">
                Promote innovative thinking and creative problem-solving approaches
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:shadow-xl hover:border-blue-500/30 transition-all"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-gray-900 mb-2 text-lg">Collaboration</h3>
              <p className="text-gray-600 text-sm">
                Build strong teams and collaborate with students nationwide
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:shadow-xl hover:border-[#138808]/30 transition-all"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#138808] to-[#0d6606] rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-gray-900 mb-2 text-lg">Real Problems</h3>
              <p className="text-gray-600 text-sm">
                Work on actual challenges faced by industries and society
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:shadow-xl hover:border-purple-500/30 transition-all"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-gray-900 mb-2 text-lg">Recognition</h3>
              <p className="text-gray-600 text-sm">
                Get recognized for your innovative solutions and win prizes
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
