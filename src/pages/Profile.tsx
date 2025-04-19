import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

type UserProfile = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  college: string;
  graduation: string;
  skills: string[];
  interests: string[];
  github: string;
  linkedin: string;
  portfolio: string;
  achievements: {
    title: string;
    description: string;
    date: string;
  }[];
  hackathonsParticipated: {
    id: string;
    name: string;
    date: string;
    role: string;
    project: string;
    result?: string;
  }[];
  teams: {
    id: string;
    name: string;
    members: number;
    hackathon?: string;
  }[];
};

const mockUser: UserProfile = {
  id: '1',
  name: 'Alex Johnson',
  username: 'alexj',
  email: 'alex.johnson@example.com',
  avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
  bio: 'Full-stack developer passionate about building innovative solutions to real-world problems. Always eager to learn new technologies and participate in hackathons to challenge myself.',
  location: 'San Francisco, CA',
  college: 'Stanford University',
  graduation: '2023',
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'TypeScript', 'MongoDB', 'GraphQL'],
  interests: ['Web Development', 'Machine Learning', 'Mobile Apps', 'Blockchain', 'UI/UX Design'],
  github: 'https://github.com/alexj',
  linkedin: 'https://linkedin.com/in/alexj',
  portfolio: 'https://alexjohnson.dev',
  achievements: [
    {
      title: 'Winner - Best Use of AI',
      description: 'Developed an AI-powered education platform that won the "Best Use of AI" category at TechCrunch Disrupt Hackathon',
      date: '2022-10-15'
    },
    {
      title: 'Open Source Contributor',
      description: 'Active contributor to React ecosystem with 15+ accepted pull requests',
      date: '2022-06-01'
    },
    {
      title: 'Published Developer Article',
      description: 'Published "Building Scalable React Applications" on Medium with over 10k reads',
      date: '2023-01-10'
    }
  ],
  hackathonsParticipated: [
    {
      id: '1',
      name: 'TechCrunch Disrupt Hackathon',
      date: '2022-10-15',
      role: 'Frontend Developer',
      project: 'EduMind - AI-powered education platform',
      result: '1st Place - Best Use of AI'
    },
    {
      id: '2',
      name: 'HackMIT',
      date: '2022-09-18',
      role: 'Full Stack Developer',
      project: 'GreenTransit - Sustainable public transport app',
      result: '2nd Place Overall'
    },
    {
      id: '3',
      name: 'Code For Good',
      date: '2023-02-25',
      role: 'Backend Developer',
      project: 'CommunityConnect - Platform connecting volunteers with local nonprofits'
    }
  ],
  teams: [
    {
      id: '101',
      name: 'The Innovators',
      members: 4,
      hackathon: 'Upcoming Global Hackathon 2023'
    },
    {
      id: '102',
      name: 'Code Wizards',
      members: 3
    }
  ]
};

const Profile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState<UserProfile | null>(null);
  
  useEffect(() => {
    // Simulate API call
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        // In a real app, fetch from API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUser(mockUser);
        setEditableUser(mockUser);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserProfile();
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setUser(editableUser);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editableUser) return;
    
    const { name, value } = e.target;
    setEditableUser({
      ...editableUser,
      [name]: value
    });
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editableUser) return;
    
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setEditableUser({
      ...editableUser,
      skills
    });
  };

  const handleInterestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editableUser) return;
    
    const interests = e.target.value.split(',').map(interest => interest.trim());
    setEditableUser({
      ...editableUser,
      interests
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-dark-200">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-dark-200 px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">User Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">The user profile you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-200">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-dark-100 shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-primary-600 to-primary-800">
            <div className="absolute bottom-0 left-0 w-full transform translate-y-1/2 px-6 sm:px-8 flex">
              <div className="mr-6">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-24 w-24 rounded-full border-4 border-white dark:border-dark-100"
                />
              </div>
              <div className="pt-6 sm:flex sm:justify-between sm:items-end w-full">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
                    {user.name}
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    @{user.username} • {user.location}
                  </p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <button
                    onClick={handleEditToggle}
                    className="btn btn-primary"
                  >
                    {isEditing ? 'Save Profile' : 'Edit Profile'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="pt-16 px-4 sm:px-6">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-4 px-1 font-medium text-sm border-b-2 ${
                    activeTab === 'overview' 
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('hackathons')}
                  className={`py-4 px-1 font-medium text-sm border-b-2 ${
                    activeTab === 'hackathons' 
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Hackathons
                </button>
                <button
                  onClick={() => setActiveTab('teams')}
                  className={`py-4 px-1 font-medium text-sm border-b-2 ${
                    activeTab === 'teams' 
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Teams
                </button>
                <button
                  onClick={() => setActiveTab('achievements')}
                  className={`py-4 px-1 font-medium text-sm border-b-2 ${
                    activeTab === 'achievements' 
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  Achievements
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Left Column */}
                  <div className="md:col-span-2 space-y-8">
                    {/* Bio Section */}
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About</h2>
                      {isEditing ? (
                        <textarea
                          name="bio"
                          value={editableUser?.bio || ''}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-300 text-gray-900 dark:text-white"
                        />
                      ) : (
                        <p className="text-gray-700 dark:text-gray-300">{user.bio}</p>
                      )}
                    </div>

                    {/* Skills Section */}
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Skills</h2>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editableUser?.skills.join(', ') || ''}
                          onChange={handleSkillsChange}
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-300 text-gray-900 dark:text-white"
                          placeholder="JavaScript, React, Node.js, etc."
                        />
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {user.skills.map((skill, index) => (
                            <span 
                              key={index} 
                              className="px-3 py-1 bg-primary-50 dark:bg-primary-900 dark:bg-opacity-20 text-primary-700 dark:text-primary-300 text-sm rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Interests Section */}
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Interests</h2>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editableUser?.interests.join(', ') || ''}
                          onChange={handleInterestsChange}
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-300 text-gray-900 dark:text-white"
                          placeholder="Web Development, Machine Learning, etc."
                        />
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {user.interests.map((interest, index) => (
                            <span 
                              key={index} 
                              className="px-3 py-1 bg-gray-100 dark:bg-dark-300 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-8">
                    {/* Info Card */}
                    <div className="bg-gray-50 dark:bg-dark-300 rounded-lg p-6">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Information</h2>
                      <ul className="space-y-4">
                        <li className="grid grid-cols-2">
                          <span className="text-gray-500 dark:text-gray-400">Email</span>
                          {isEditing ? (
                            <input
                              type="email"
                              name="email"
                              value={editableUser?.email || ''}
                              onChange={handleInputChange}
                              className="p-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-300 text-gray-900 dark:text-white"
                            />
                          ) : (
                            <span className="text-gray-900 dark:text-white">{user.email}</span>
                          )}
                        </li>
                        <li className="grid grid-cols-2">
                          <span className="text-gray-500 dark:text-gray-400">Location</span>
                          {isEditing ? (
                            <input
                              type="text"
                              name="location"
                              value={editableUser?.location || ''}
                              onChange={handleInputChange}
                              className="p-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-300 text-gray-900 dark:text-white"
                            />
                          ) : (
                            <span className="text-gray-900 dark:text-white">{user.location}</span>
                          )}
                        </li>
                        <li className="grid grid-cols-2">
                          <span className="text-gray-500 dark:text-gray-400">College</span>
                          {isEditing ? (
                            <input
                              type="text"
                              name="college"
                              value={editableUser?.college || ''}
                              onChange={handleInputChange}
                              className="p-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-300 text-gray-900 dark:text-white"
                            />
                          ) : (
                            <span className="text-gray-900 dark:text-white">{user.college}</span>
                          )}
                        </li>
                        <li className="grid grid-cols-2">
                          <span className="text-gray-500 dark:text-gray-400">Graduation</span>
                          {isEditing ? (
                            <input
                              type="text"
                              name="graduation"
                              value={editableUser?.graduation || ''}
                              onChange={handleInputChange}
                              className="p-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-300 text-gray-900 dark:text-white"
                            />
                          ) : (
                            <span className="text-gray-900 dark:text-white">{user.graduation}</span>
                          )}
                        </li>
                      </ul>
                    </div>

                    {/* Links Card */}
                    <div className="bg-gray-50 dark:bg-dark-300 rounded-lg p-6">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Links</h2>
                      <ul className="space-y-4">
                        <li className="flex items-center">
                          <svg className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          {isEditing ? (
                            <input
                              type="text"
                              name="github"
                              value={editableUser?.github || ''}
                              onChange={handleInputChange}
                              className="ml-1 p-1 flex-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-300 text-gray-900 dark:text-white"
                            />
                          ) : (
                            <a 
                              href={user.github} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
                            >
                              GitHub
                            </a>
                          )}
                        </li>
                        <li className="flex items-center">
                          <svg className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          {isEditing ? (
                            <input
                              type="text"
                              name="linkedin"
                              value={editableUser?.linkedin || ''}
                              onChange={handleInputChange}
                              className="ml-1 p-1 flex-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-300 text-gray-900 dark:text-white"
                            />
                          ) : (
                            <a 
                              href={user.linkedin} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
                            >
                              LinkedIn
                            </a>
                          )}
                        </li>
                        <li className="flex items-center">
                          <svg className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.469 11.12L12.531.184a.631.631 0 00-.895 0L.147 11.12a.5.5 0 00.351.854h2.314v9.271c0 .415.336.75.75.75h5.524a.749.749 0 00.75-.75v-6.25h4.132v6.25c0 .415.335.75.75.75h5.53a.749.749 0 00.75-.75v-9.271h2.314a.5.5 0 00.351-.854h.004z"/>
                          </svg>
                          {isEditing ? (
                            <input
                              type="text"
                              name="portfolio"
                              value={editableUser?.portfolio || ''}
                              onChange={handleInputChange}
                              className="ml-1 p-1 flex-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-300 text-gray-900 dark:text-white"
                            />
                          ) : (
                            <a 
                              href={user.portfolio} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
                            >
                              Portfolio
                            </a>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Hackathons Tab */}
              {activeTab === 'hackathons' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Hackathon History</h2>
                  
                  {user.hackathonsParticipated.length > 0 ? (
                    <div className="space-y-6">
                      {user.hackathonsParticipated.map((hackathon, index) => (
                        <div key={index} className="bg-white dark:bg-dark-300 shadow rounded-lg p-6">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {hackathon.name}
                              </h3>
                              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                {formatDate(hackathon.date)}
                              </p>
                              <div className="mt-3">
                                <p className="text-gray-700 dark:text-gray-300">
                                  <span className="font-medium">Role:</span> {hackathon.role}
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 mt-1">
                                  <span className="font-medium">Project:</span> {hackathon.project}
                                </p>
                                {hackathon.result && (
                                  <p className="text-primary-700 dark:text-primary-400 mt-1 font-medium">
                                    {hackathon.result}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="mt-4 md:mt-0">
                              <Link to={`/hackathons/${hackathon.id}`} className="btn btn-sm btn-outline-primary">
                                View Hackathon
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 dark:bg-dark-300 rounded-lg">
                      <p className="text-gray-600 dark:text-gray-400">
                        You haven't participated in any hackathons yet.
                      </p>
                      <Link to="/hackathons" className="btn btn-primary mt-4">
                        Explore Hackathons
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Teams Tab */}
              {activeTab === 'teams' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">My Teams</h2>
                    <Link to="/teams/create" className="btn btn-primary btn-sm">
                      Create New Team
                    </Link>
                  </div>
                  
                  {user.teams.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2">
                      {user.teams.map((team, index) => (
                        <div key={index} className="bg-white dark:bg-dark-300 shadow rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {team.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {team.members} {team.members === 1 ? 'member' : 'members'}
                          </p>
                          {team.hackathon && (
                            <p className="text-primary-600 dark:text-primary-400 text-sm mt-2">
                              For: {team.hackathon}
                            </p>
                          )}
                          <div className="mt-4">
                            <Link to={`/teams/${team.id}`} className="btn btn-sm btn-outline-primary">
                              View Team
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 dark:bg-dark-300 rounded-lg">
                      <p className="text-gray-600 dark:text-gray-400">
                        You haven't joined any teams yet.
                      </p>
                      <Link to="/teams" className="btn btn-primary mt-4">
                        Find Teams
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Achievements Tab */}
              {activeTab === 'achievements' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Achievements & Recognition</h2>
                  
                  {user.achievements.length > 0 ? (
                    <div className="space-y-6">
                      {user.achievements.map((achievement, index) => (
                        <div key={index} className="bg-white dark:bg-dark-300 shadow rounded-lg p-6">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {achievement.title}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                            {formatDate(achievement.date)}
                          </p>
                          <p className="text-gray-700 dark:text-gray-300 mt-3">
                            {achievement.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 dark:bg-dark-300 rounded-lg">
                      <p className="text-gray-600 dark:text-gray-400">
                        No achievements recorded yet.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 