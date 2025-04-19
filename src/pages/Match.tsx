import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock data for user profiles
const mockUsers = [
  {
    id: 1,
    name: 'Alex Johnson',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'Full Stack Developer',
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
    bio: 'Passionate developer with 3 years of experience. Love building web applications and learning new technologies.',
    hackathonsCompleted: 5,
    rating: 4.8,
    college: 'MIT',
    github: 'https://github.com/alexj',
    availability: ['Weekends', 'Evenings'],
    verified: true
  },
  {
    id: 2,
    name: 'Emma Wilson',
    avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    role: 'UX/UI Designer',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'User Research'],
    bio: 'Creative designer focused on creating intuitive and beautiful interfaces. Experienced in user research and prototyping.',
    hackathonsCompleted: 3,
    rating: 4.5,
    college: 'Stanford University',
    github: 'https://github.com/emmaw',
    availability: ['Weekends', 'Evenings', 'Weekdays'],
    verified: true
  },
  {
    id: 3,
    name: 'Michael Chen',
    avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
    role: 'Machine Learning Engineer',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Data Analysis'],
    bio: 'ML engineer specializing in NLP and computer vision. Looking to apply AI to solve real-world problems.',
    hackathonsCompleted: 7,
    rating: 4.9,
    college: 'UC Berkeley',
    github: 'https://github.com/michaelc',
    availability: ['Weekends'],
    verified: true
  },
  {
    id: 4,
    name: 'Sophia Rodriguez',
    avatarUrl: 'https://randomuser.me/api/portraits/women/28.jpg',
    role: 'Mobile Developer',
    skills: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    bio: 'Mobile app developer with expertise in cross-platform development. Love creating smooth, intuitive mobile experiences.',
    hackathonsCompleted: 4,
    rating: 4.6,
    college: 'Carnegie Mellon University',
    github: 'https://github.com/sophiar',
    availability: ['Evenings', 'Weekdays'],
    verified: true
  },
  {
    id: 5,
    name: 'James Williams',
    avatarUrl: 'https://randomuser.me/api/portraits/men/42.jpg',
    role: 'DevOps Engineer',
    skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
    bio: 'DevOps specialist with a focus on building scalable infrastructure. Experienced with cloud platforms and automation.',
    hackathonsCompleted: 2,
    rating: 4.3,
    college: 'Georgia Tech',
    github: 'https://github.com/jamesw',
    availability: ['Weekends', 'Evenings'],
    verified: false
  },
  {
    id: 6,
    name: 'Olivia Brown',
    avatarUrl: 'https://randomuser.me/api/portraits/women/15.jpg',
    role: 'Product Manager',
    skills: ['Market Research', 'User Stories', 'Roadmapping', 'Agile'],
    bio: 'Product manager with a technical background. Passionate about creating products that solve real user needs.',
    hackathonsCompleted: 6,
    rating: 4.7,
    college: 'Harvard University',
    github: 'https://github.com/oliviab',
    availability: ['Weekends', 'Weekdays'],
    verified: true
  }
];

// Skills list for filter
const allSkills = Array.from(
  new Set(mockUsers.flatMap(user => user.skills))
).sort();

// Roles list for filter
const allRoles = Array.from(
  new Set(mockUsers.map(user => user.role))
).sort();

const Match = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Toggle skill selection
  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Toggle role selection
  const toggleRole = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(r => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  // Toggle availability selection
  const toggleAvailability = (availability: string) => {
    if (selectedAvailability.includes(availability)) {
      setSelectedAvailability(selectedAvailability.filter(a => a !== availability));
    } else {
      setSelectedAvailability([...selectedAvailability, availability]);
    }
  };

  // Filter users based on selections
  const filteredUsers = mockUsers.filter(user => {
    // Filter by search term
    const matchesSearch = searchTerm === '' || 
                         user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.college.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by skills
    const matchesSkills = selectedSkills.length === 0 ||
                         selectedSkills.some(skill => user.skills.includes(skill));
    
    // Filter by roles
    const matchesRoles = selectedRoles.length === 0 ||
                        selectedRoles.includes(user.role);
    
    // Filter by availability
    const matchesAvailability = selectedAvailability.length === 0 ||
                               selectedAvailability.some(a => user.availability.includes(a));
    
    // Filter by verification
    const matchesVerification = !onlyVerified || user.verified;
    
    return matchesSearch && matchesSkills && matchesRoles && matchesAvailability && matchesVerification;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-sora font-bold text-gray-900 dark:text-white mb-4">
          Find Your Dream Team
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Connect with skilled teammates who match your goals and vibe. Use the filters below to find the perfect fit.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-dark-100 rounded-xl shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Filters</h2>
            
            <div className="space-y-6">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Search
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Name, bio, college..."
                  className="input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Roles */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Roles</h3>
                <div className="space-y-2">
                  {allRoles.map(role => (
                    <div key={role} className="flex items-center">
                      <input
                        id={`role-${role}`}
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                        checked={selectedRoles.includes(role)}
                        onChange={() => toggleRole(role)}
                      />
                      <label htmlFor={`role-${role}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        {role}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Skills */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {allSkills.map(skill => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedSkills.includes(skill)
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 dark:bg-dark-200 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-300'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Availability */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Availability</h3>
                <div className="space-y-2">
                  {['Weekends', 'Weekdays', 'Evenings'].map(time => (
                    <div key={time} className="flex items-center">
                      <input
                        id={`time-${time}`}
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                        checked={selectedAvailability.includes(time)}
                        onChange={() => toggleAvailability(time)}
                      />
                      <label htmlFor={`time-${time}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        {time}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Verified Only */}
              <div className="flex items-center">
                <input
                  id="verified"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                  checked={onlyVerified}
                  onChange={(e) => setOnlyVerified(e.target.checked)}
                />
                <label htmlFor="verified" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Verified users only
                </label>
              </div>
              
              {/* Reset Filters */}
              <button
                onClick={() => {
                  setSelectedSkills([]);
                  setSelectedRoles([]);
                  setSelectedAvailability([]);
                  setOnlyVerified(false);
                  setSearchTerm('');
                }}
                className="w-full py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="lg:col-span-3">
          {filteredUsers.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white dark:bg-dark-100 rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          className="h-16 w-16 rounded-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                            {user.name}
                            {user.verified && (
                              <svg className="ml-1 h-5 w-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                              </svg>
                            )}
                          </h3>
                          <div className="flex items-center">
                            <svg className="text-yellow-400 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">{user.rating}</span>
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{user.role}</p>
                        <div className="mt-2">
                          <span className="text-xs text-gray-500 dark:text-gray-500">{user.college}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {user.bio}
                      </p>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                        Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {user.skills.map(skill => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-gray-100 dark:bg-dark-200 text-xs rounded-full text-gray-700 dark:text-gray-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {user.hackathonsCompleted} hackathons completed
                      </div>
                      <Link
                        to={`/profile/${user.id}`}
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                  
                  <div className="px-6 py-3 bg-gray-50 dark:bg-dark-200 flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      {user.availability.map(time => (
                        <span
                          key={time}
                          className="px-2 py-1 bg-gray-100 dark:bg-dark-300 text-xs rounded-full text-gray-700 dark:text-gray-300"
                        >
                          {time}
                        </span>
                      ))}
                    </div>
                    <button className="btn btn-primary btn-sm">
                      Connect
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-dark-100 rounded-xl">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No matches found</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Try adjusting your filters to find more potential teammates.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => {
                    setSelectedSkills([]);
                    setSelectedRoles([]);
                    setSelectedAvailability([]);
                    setOnlyVerified(false);
                    setSearchTerm('');
                  }}
                  className="btn btn-primary"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Match; 