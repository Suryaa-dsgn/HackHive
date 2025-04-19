import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-36 overflow-hidden bg-indigo-600">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-indigo-800 opacity-90"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-20"></div>
        </div>
        
        <div className="container mx-auto px-6 sm:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl lg:pl-4"
            >
              <div className="flex items-center mb-6">
                <div className="h-1.5 w-12 bg-white rounded-full mr-4"></div>
                <span className="text-white text-opacity-90 font-medium">The Ultimate Hackathon Platform</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
                Build Your Dream Team for Hackathons
              </h1>
              <p className="text-lg md:text-xl text-white text-opacity-90 mb-10">
                Connect with talented developers, designers, and innovators. 
                Find the perfect teammates for your next hackathon and build 
                something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-medium rounded-lg text-indigo-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-indigo-600 transition-colors shadow-lg">
                  Join Waitlist
                </Link>
                <Link to="/hackathons" className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-medium rounded-lg text-white border-2 border-white border-opacity-80 hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white focus:ring-offset-indigo-600 transition-colors">
                  Explore Hackathons
                </Link>
              </div>
              
              <div className="mt-12 flex items-center text-white text-opacity-90">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i}
                      src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${20 + i}.jpg`}
                      alt="User" 
                      className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                    />
                  ))}
                </div>
                <p className="ml-5 text-sm font-medium">
                  Join <span className="font-bold text-white">2,000+</span> hackers already on our platform
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-md lg:mr-4"
            >
              <div className="relative">
                <div className="absolute -inset-1.5 bg-white rounded-2xl blur-lg opacity-30 animate-pulse"></div>
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-20"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-indigo-500 rounded-full opacity-20 blur-xl"></div>
                  <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-purple-500 rounded-full opacity-20 blur-xl"></div>
                  
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" 
                    alt="Team collaboration" 
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-7">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-full">
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <p className="ml-2 text-sm font-medium text-gray-500">3 hackathons active now</p>
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-gray-900">Recent Success Stories</h3>
                    <p className="mt-2 text-gray-600">Teams formed on HackHive have won major prizes at hackathons worldwide.</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">200+ Teams</span>
                      <Link to="/success-stories" className="text-indigo-600 hover:text-indigo-800 hover:underline text-sm font-semibold group flex items-center">
                        View Stories 
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-300">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Everything You Need for Hackathon Success
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-600 dark:text-gray-400 text-lg"
            >
              Our platform provides all the tools you need to find the perfect team, 
              manage your projects, and showcase your skills.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 hover:translate-y-[-5px] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 dark:bg-opacity-20 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-dark-200">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              What Our Hackers Say
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-600 dark:text-gray-400 text-lg"
            >
              Don't just take our word for it. See what our community has to say about their experience.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-center mb-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.quote}"</p>
                <div className="mt-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Ready to Build Something Amazing?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/80 text-lg max-w-2xl mx-auto mb-8"
          >
            Join thousands of developers, designers, and innovators on HackHive today. Your next award-winning project starts here.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/register" className="btn bg-white text-primary-700 hover:bg-gray-100 focus:ring-white">
              Sign Up Now
            </Link>
            <Link to="/hackathons" className="btn border-2 border-white border-opacity-80 text-white hover:bg-white hover:bg-opacity-10 focus:ring-white">
              Browse Hackathons
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Features data
const features = [
  {
    title: "Team Matching",
    description: "Find the perfect teammates based on skills, experience, and availability that complement your own.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    title: "Hackathon Discovery",
    description: "Explore upcoming hackathons filtered by location, date, prizes, and technology stack.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )
  },
  {
    title: "Team Collaboration",
    description: "Built-in tools for project management, communication, and resource sharing with your team.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: "Skill Showcase",
    description: "Build your profile showcasing your skills, past projects, and hackathon achievements.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: "Real-time Notifications",
    description: "Stay updated with team invites, hackathon deadlines, and important project updates.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    )
  },
  {
    title: "Post-Hackathon Showcase",
    description: "Share and celebrate your team's projects and achievements with the community.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  }
];

// Testimonials data
const testimonials = [
  {
    name: "Sarah Chen",
    role: "UX Designer",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    quote: "HackHive helped me find the perfect team with complementary skills. We ended up winning first place at our hackathon!"
  },
  {
    name: "Michael Rodriguez",
    role: "Backend Developer",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    quote: "As an introvert, networking at hackathons was always challenging. This platform made it so much easier to connect with like-minded developers."
  },
  {
    name: "Aisha Patel",
    role: "Product Manager",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    quote: "The team collaboration features are exceptional. We were able to organize our project efficiently even before the hackathon started."
  }
];

export default Home; 