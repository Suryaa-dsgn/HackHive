import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Define team types
interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  isLeader: boolean;
}

interface Message {
  id: number;
  sender: {
    id: number;
    name: string;
    avatarUrl: string;
  };
  content: string;
  timestamp: string;
}

interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  skills: string[];
  openPositions: string[];
  hackathon?: {
    id: string;
    name: string;
    date: string;
  };
  createdAt: string;
  isRecruiting: boolean;
}

// Mock data
const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Code Wizards',
    description: 'We are a team of passionate developers looking to create innovative solutions. Currently preparing for the upcoming Global Hackathon 2023.',
    members: [
      {
        id: '101',
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        role: 'Full Stack Developer',
        isLeader: true,
      },
      {
        id: '102',
        name: 'Sarah Kim',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        role: 'UI/UX Designer',
        isLeader: false,
      },
      {
        id: '103',
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        role: 'Backend Developer',
        isLeader: false,
      },
    ],
    skills: ['React', 'Node.js', 'UI/UX Design', 'MongoDB', 'AWS'],
    openPositions: ['Data Scientist', 'Mobile Developer'],
    hackathon: {
      id: '201',
      name: 'Global Hackathon 2023',
      date: '2023-08-15',
    },
    createdAt: '2023-06-10',
    isRecruiting: true,
  },
  {
    id: '2',
    name: 'AI Innovators',
    description: 'Focused on developing cutting-edge AI solutions. We\'re looking for members passionate about machine learning and AI applications.',
    members: [
      {
        id: '104',
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        role: 'ML Engineer',
        isLeader: true,
      },
      {
        id: '105',
        name: 'David Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        role: 'Data Scientist',
        isLeader: false,
      },
    ],
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Data Analysis', 'Computer Vision'],
    openPositions: ['Frontend Developer', 'DevOps Engineer', 'NLP Specialist'],
    hackathon: {
      id: '202',
      name: 'AI Summit Hackathon',
      date: '2023-09-22',
    },
    createdAt: '2023-07-05',
    isRecruiting: true,
  },
  {
    id: '3',
    name: 'Blockchain Builders',
    description: 'We\'re building decentralized applications to solve real-world problems. Join us if you\'re interested in blockchain technology!',
    members: [
      {
        id: '106',
        name: 'James Lee',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        role: 'Blockchain Developer',
        isLeader: true,
      },
      {
        id: '107',
        name: 'Sophia Martinez',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        role: 'Smart Contract Developer',
        isLeader: false,
      },
      {
        id: '108',
        name: 'Daniel Brown',
        avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        role: 'Frontend Developer',
        isLeader: false,
      },
      {
        id: '109',
        name: 'Olivia Taylor',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        role: 'UI/UX Designer',
        isLeader: false,
      },
    ],
    skills: ['Solidity', 'Ethereum', 'Web3.js', 'React', 'Node.js'],
    openPositions: ['Backend Developer'],
    createdAt: '2023-05-20',
    isRecruiting: true,
  },
  {
    id: '4',
    name: 'Health Tech Heroes',
    description: 'Building healthcare solutions to improve patient care and medical efficiency. Looking for developers with healthcare experience.',
    members: [
      {
        id: '110',
        name: 'Lisa Wang',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        role: 'Project Manager',
        isLeader: true,
      },
      {
        id: '111',
        name: 'Ryan Jackson',
        avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        role: 'Backend Developer',
        isLeader: false,
      },
    ],
    skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'Healthcare APIs'],
    openPositions: ['Frontend Developer', 'UI/UX Designer', 'Mobile Developer'],
    hackathon: {
      id: '203',
      name: 'HealthTech Hackathon',
      date: '2023-10-05',
    },
    createdAt: '2023-07-15',
    isRecruiting: true,
  },
  {
    id: '5',
    name: 'The Sustainables',
    description: 'Developing innovative solutions to address environmental challenges and promote sustainability.',
    members: [
      {
        id: '112',
        name: 'Nina Patel',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        role: 'Full Stack Developer',
        isLeader: true,
      },
      {
        id: '113',
        name: 'Thomas Clark',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        role: 'Data Scientist',
        isLeader: false,
      },
      {
        id: '114',
        name: 'Grace Miller',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
        role: 'UI/UX Designer',
        isLeader: false,
      },
    ],
    skills: ['React', 'Python', 'Data Visualization', 'GIS', 'IoT'],
    openPositions: ['Mobile Developer', 'Backend Developer'],
    hackathon: {
      id: '204',
      name: 'Climate Action Hackathon',
      date: '2023-11-10',
    },
    createdAt: '2023-06-25',
    isRecruiting: true,
  },
];

// Available skills for filter
const availableSkills = [
  'React', 'Node.js', 'Python', 'UI/UX Design', 'MongoDB', 'AWS', 
  'TensorFlow', 'PyTorch', 'Data Analysis', 'Computer Vision',
  'Solidity', 'Ethereum', 'Web3.js', 'Healthcare APIs', 'GIS', 'IoT'
];

const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState<string[]>([]);
  const [recruitingOnly, setRecruitingOnly] = useState(false);
  const [hackathonFilter, setHackathonFilter] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        // In a real app, fetch from API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTeams(mockTeams);
        setFilteredTeams(mockTeams);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTeams();
  }, []);

  useEffect(() => {
    // Apply filters
    let results = [...teams];
    
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(team => 
        team.name.toLowerCase().includes(query) || 
        team.description.toLowerCase().includes(query)
      );
    }
    
    // Skills filter
    if (skillFilter.length > 0) {
      results = results.filter(team => 
        skillFilter.some(skill => team.skills.includes(skill))
      );
    }
    
    // Recruiting only filter
    if (recruitingOnly) {
      results = results.filter(team => team.isRecruiting);
    }
    
    // Hackathon filter
    if (hackathonFilter) {
      results = results.filter(team => 
        team.hackathon && team.hackathon.name.includes(hackathonFilter)
      );
    }
    
    setFilteredTeams(results);
  }, [teams, searchQuery, skillFilter, recruitingOnly, hackathonFilter]);

  const toggleSkillFilter = (skill: string) => {
    if (skillFilter.includes(skill)) {
      setSkillFilter(skillFilter.filter(s => s !== skill));
    } else {
      setSkillFilter([...skillFilter, skill]);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSkillFilter([]);
    setRecruitingOnly(false);
    setHackathonFilter(null);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-dark-200">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Extract unique hackathons from teams
  const uniqueHackathons = Array.from(
    new Set(
      teams
        .filter(team => team.hackathon)
        .map(team => team.hackathon?.name)
    )
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-200">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Find Your Team</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Connect with other hackers and join forces for upcoming hackathons
          </p>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="relative flex-grow max-w-lg">
            <input
              type="text"
              placeholder="Search teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-4 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-300 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            />
            <svg
              className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          
          <Link to="/teams/create" className="btn btn-primary">
            Create New Team
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar */}
          <div className="w-full md:w-64 bg-white dark:bg-dark-100 p-6 rounded-lg shadow-sm h-fit">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
              {(skillFilter.length > 0 || recruitingOnly || hackathonFilter) && (
                <button 
                  onClick={clearFilters}
                  className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300"
                >
                  Clear all
                </button>
              )}
            </div>
            
            {/* Recruiting filter */}
            <div className="mb-6">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={recruitingOnly}
                  onChange={() => setRecruitingOnly(!recruitingOnly)}
                  className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-dark-300 dark:focus:ring-primary-400"
                />
                <span className="text-gray-700 dark:text-gray-300">Recruiting only</span>
              </label>
            </div>
            
            {/* Hackathon filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Hackathons</h3>
              <select
                value={hackathonFilter || ''}
                onChange={(e) => setHackathonFilter(e.target.value || null)}
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-300 text-gray-900 dark:text-white"
              >
                <option value="">All Hackathons</option>
                {uniqueHackathons.map((hackathon, index) => (
                  <option key={index} value={hackathon || ''}>
                    {hackathon}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Skills filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Skills</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {availableSkills.map(skill => (
                  <label key={skill} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={skillFilter.includes(skill)}
                      onChange={() => toggleSkillFilter(skill)}
                      className="h-5 w-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-dark-300 dark:focus:ring-primary-400"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          {/* Team listing */}
          <div className="flex-1">
            {filteredTeams.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {filteredTeams.map(team => (
                  <motion.div
                    key={team.id}
                    className="bg-white dark:bg-dark-100 rounded-lg shadow-sm overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {team.name}
                          </h3>
                          {team.hackathon && (
                            <div className="mt-1">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:bg-opacity-20 dark:text-primary-300">
                                {team.hackathon.name} • {formatDate(team.hackathon.date)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="mt-2 sm:mt-0">
                          {team.isRecruiting && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-20 dark:text-green-300">
                              Recruiting
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p className="mt-3 text-gray-600 dark:text-gray-400">
                        {team.description}
                      </p>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {team.skills.map((skill, index) => (
                            <span 
                              key={index} 
                              className="px-2 py-1 bg-gray-100 dark:bg-dark-300 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {team.openPositions.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Looking For</h4>
                          <div className="flex flex-wrap gap-2">
                            {team.openPositions.map((position, index) => (
                              <span 
                                key={index} 
                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 dark:bg-opacity-20 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                              >
                                {position}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Team Members</h4>
                        <div className="flex overflow-x-auto pb-2 space-x-2">
                          {team.members.map(member => (
                            <div key={member.id} className="flex-shrink-0">
                              <div className="flex flex-col items-center space-y-1">
                                <div className="relative">
                                  <img 
                                    src={member.avatar} 
                                    alt={member.name}
                                    className="w-10 h-10 rounded-full object-cover" 
                                  />
                                  {member.isLeader && (
                                    <span className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-0.5">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    </span>
                                  )}
                                </div>
                                <span className="text-xs text-gray-700 dark:text-gray-300 truncate max-w-[80px] text-center">{member.name}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <Link 
                          to={`/teams/${team.id}`} 
                          className="btn btn-sm btn-primary"
                        >
                          View Team
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="bg-white dark:bg-dark-100 rounded-lg shadow-sm p-10 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No teams found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <button 
                  onClick={clearFilters} 
                  className="btn btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams; 