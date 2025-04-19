import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

type Hackathon = {
  id: string;
  title: string;
  organizer: string;
  startDate: string;
  endDate: string;
  location: string;
  mode: 'online' | 'in-person' | 'hybrid';
  imageUrl: string;
  tags: string[];
  participants: number;
  registrationDeadline: string;
  description: string;
  prizes: {
    place: string;
    amount: string;
    description: string;
  }[];
  timeline: {
    date: string;
    event: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  eligibility: string[];
  teamSize: { min: number; max: number };
  sponsors: {
    name: string;
    logo: string;
    tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  }[];
};

const mockHackathons: Hackathon[] = [
  {
    id: '1',
    title: 'TechCrunch Disrupt Hackathon',
    organizer: 'TechCrunch',
    startDate: '2023-10-15',
    endDate: '2023-10-17',
    location: 'San Francisco, CA',
    mode: 'in-person',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000',
    tags: ['AI', 'Web3', 'Startup'],
    participants: 1200,
    registrationDeadline: '2023-10-01',
    description: `Join us for the renowned TechCrunch Disrupt Hackathon, where innovation meets opportunity. This three-day event brings together coders, developers, designers, and entrepreneurs to build groundbreaking products.

    Create a working prototype of a new app, service, or platform and compete for exciting prizes and the chance to showcase your creation to top tech leaders and investors. This is your opportunity to transform your brilliant idea into reality in just 48 hours, all while networking with tech enthusiasts from across the globe.
    
    Whether you're a seasoned developer or a tech novice with a big idea, the TechCrunch Disrupt Hackathon welcomes participants of all skill levels. Form a team or join one on-site, and get ready for a weekend of coding, creativity, and collaboration.`,
    prizes: [
      {
        place: '1st Place',
        amount: '$20,000',
        description: 'Cash prize and opportunity to present at TechCrunch Disrupt main stage'
      },
      {
        place: '2nd Place',
        amount: '$10,000',
        description: 'Cash prize and meet-and-greet with top venture capitalists'
      },
      {
        place: '3rd Place',
        amount: '$5,000',
        description: 'Cash prize and exclusive TechCrunch coverage of your project'
      },
      {
        place: 'Best AI Implementation',
        amount: '$3,000',
        description: 'Sponsored by Google Cloud'
      },
      {
        place: 'Best Social Impact Solution',
        amount: '$3,000',
        description: 'Sponsored by Microsoft'
      }
    ],
    timeline: [
      {
        date: '2023-10-15 9:00 AM',
        event: 'Opening Ceremony',
        description: 'Introduction, rules explanation, and team formation assistance'
      },
      {
        date: '2023-10-15 10:30 AM',
        event: 'Hacking Begins',
        description: 'Start building your projects'
      },
      {
        date: '2023-10-15 2:00 PM',
        event: 'Workshop: "AI Integration in Modern Apps"',
        description: 'Hosted by Google AI researchers'
      },
      {
        date: '2023-10-16 10:00 AM',
        event: 'Mentor Sessions',
        description: 'One-on-one sessions with industry experts'
      },
      {
        date: '2023-10-16 8:00 PM',
        event: 'Networking Dinner',
        description: 'Connect with fellow participants over food and drinks'
      },
      {
        date: '2023-10-17 10:00 AM',
        event: 'Submission Deadline',
        description: 'All projects must be submitted by this time'
      },
      {
        date: '2023-10-17 1:00 PM',
        event: 'Project Presentations',
        description: 'Teams present their solutions to judges'
      },
      {
        date: '2023-10-17 5:00 PM',
        event: 'Award Ceremony',
        description: 'Winners announced and prizes distributed'
      }
    ],
    faqs: [
      {
        question: 'Do I need to have a team to participate?',
        answer: 'No, you can join as an individual and form or join a team during the event. We\'ll have team formation sessions to help connect participants.'
      },
      {
        question: 'What should I bring to the hackathon?',
        answer: 'Bring your laptop, charger, and any devices you might need for development. For in-person participants, consider bringing toiletries and a change of clothes if you plan to stay overnight.'
      },
      {
        question: 'Is there an age restriction?',
        answer: 'Participants must be at least 18 years old or have guardian consent and accompaniment if under 18.'
      },
      {
        question: 'Will food be provided?',
        answer: 'Yes, meals, snacks, and beverages will be provided throughout the event for in-person participants.'
      },
      {
        question: 'Can I work on a pre-existing project?',
        answer: 'No, all code must be written during the hackathon. However, you can come with ideas and plans prepared.'
      }
    ],
    eligibility: [
      'Open to all skill levels',
      'Students and professionals welcome',
      'Participants must be at least 18 years old',
      'Must follow code of conduct',
      'Must use approved technologies and frameworks'
    ],
    teamSize: { min: 2, max: 5 },
    sponsors: [
      {
        name: 'Google Cloud',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/2560px-Google_Cloud_logo.svg.png',
        tier: 'platinum'
      },
      {
        name: 'Microsoft',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png',
        tier: 'platinum'
      },
      {
        name: 'Amazon Web Services',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1024px-Amazon_Web_Services_Logo.svg.png',
        tier: 'gold'
      },
      {
        name: 'IBM',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png',
        tier: 'silver'
      },
      {
        name: 'Nvidia',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/2560px-Nvidia_logo.svg.png',
        tier: 'silver'
      },
      {
        name: 'Intel',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282006-2020%29.svg/2560px-Intel_logo_%282006-2020%29.svg.png',
        tier: 'bronze'
      }
    ]
  },
  // Additional hackathons would be here in a real application
];

const HackathonDetails = () => {
  const { id } = useParams();
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    // Simulate API fetch
    const fetchHackathon = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const found = mockHackathons.find(h => h.id === id);
        setHackathon(found || null);
      } catch (error) {
        console.error('Error fetching hackathon details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHackathon();
  }, [id]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: dateString.includes(':') ? 'numeric' : undefined,
      minute: dateString.includes(':') ? 'numeric' : undefined,
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const isUpcoming = (deadline: string) => {
    return new Date(deadline) >= new Date();
  };

  const handleRegister = async () => {
    setIsRegistering(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Registration successful! Check your email for confirmation.');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again later.');
    } finally {
      setIsRegistering(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-dark-200">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!hackathon) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-dark-200 px-4">
        <svg 
          className="h-24 w-24 text-gray-400 mb-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Hackathon Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">The hackathon you're looking for doesn't exist or has been removed.</p>
        <Link to="/hackathons" className="btn btn-primary">
          Back to Hackathons
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-200">
      {/* Hero Section */}
      <div 
        className="relative h-80 bg-cover bg-center"
        style={{ backgroundImage: `url(${hackathon.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="mb-4 flex space-x-2">
              {hackathon.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-primary-500 bg-opacity-80 text-white px-3 py-1 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                hackathon.mode === 'online' 
                  ? 'bg-green-500 bg-opacity-80 text-white' 
                  : hackathon.mode === 'in-person'
                  ? 'bg-blue-500 bg-opacity-80 text-white'
                  : 'bg-purple-500 bg-opacity-80 text-white'
              }`}>
                {hackathon.mode.charAt(0).toUpperCase() + hackathon.mode.slice(1)}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {hackathon.title}
            </h1>
            <p className="text-xl text-gray-200 mb-4">
              Organized by {hackathon.organizer}
            </p>
            <div className="flex flex-wrap items-center text-gray-200 gap-y-2">
              <div className="flex items-center mr-6">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}
              </div>
              <div className="flex items-center mr-6">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {hackathon.location}
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                {hackathon.participants} participants
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white dark:bg-dark-100 shadow">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto">
            <button
              className={`px-4 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'overview'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 hover:border-gray-300 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-4 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'timeline'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 hover:border-gray-300 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('timeline')}
            >
              Timeline
            </button>
            <button
              className={`px-4 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'prizes'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 hover:border-gray-300 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('prizes')}
            >
              Prizes
            </button>
            <button
              className={`px-4 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'sponsors'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 hover:border-gray-300 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('sponsors')}
            >
              Sponsors
            </button>
            <button
              className={`px-4 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'faqs'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 hover:border-gray-300 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('faqs')}
            >
              FAQs
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">About the Hackathon</h2>
                  <div className="prose dark:prose-invert max-w-none mb-8">
                    {hackathon.description.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Eligibility Criteria</h3>
                  <ul className="list-disc pl-5 mb-8 space-y-2 text-gray-700 dark:text-gray-300">
                    {hackathon.eligibility.map((criterion, index) => (
                      <li key={index}>{criterion}</li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Team Size</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-8">
                    Teams should have between {hackathon.teamSize.min} and {hackathon.teamSize.max} members.
                  </p>
                </div>
              )}

              {/* Timeline Tab */}
              {activeTab === 'timeline' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Event Timeline</h2>
                  <div className="space-y-8">
                    {hackathon.timeline.map((item, index) => (
                      <div key={index} className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
                        <div className="absolute -left-2 mt-1">
                          <div className="h-4 w-4 rounded-full bg-primary-500"></div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.event}</h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-1">{formatDate(item.date)}</p>
                          <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Prizes Tab */}
              {activeTab === 'prizes' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Prizes & Rewards</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {hackathon.prizes.map((prize, index) => (
                      <div key={index} className="bg-white dark:bg-dark-300 rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{prize.place}</h3>
                        <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-2">{prize.amount}</p>
                        <p className="text-gray-700 dark:text-gray-300">{prize.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sponsors Tab */}
              {activeTab === 'sponsors' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Sponsors</h2>
                  
                  {['platinum', 'gold', 'silver', 'bronze'].map((tier) => {
                    const tierSponsors = hackathon.sponsors.filter(sponsor => sponsor.tier === tier);
                    if (tierSponsors.length === 0) return null;
                    
                    return (
                      <div key={tier} className="mb-10">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white capitalize mb-4">
                          {tier} Sponsors
                        </h3>
                        <div className={`grid grid-cols-2 md:grid-cols-${
                          tier === 'platinum' ? '2' : 
                          tier === 'gold' ? '3' : 
                          '4'
                        } gap-6`}>
                          {tierSponsors.map((sponsor, index) => (
                            <div 
                              key={index}
                              className="bg-white dark:bg-dark-300 p-4 rounded-lg shadow flex items-center justify-center"
                            >
                              <img 
                                src={sponsor.logo} 
                                alt={sponsor.name} 
                                className="max-h-16 max-w-full object-contain filter dark:invert dark:brightness-200"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* FAQs Tab */}
              {activeTab === 'faqs' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-6">
                    {hackathon.faqs.map((faq, index) => (
                      <div key={index} className="bg-white dark:bg-dark-300 rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                        <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-dark-100 rounded-lg shadow p-6 sticky top-8">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Registration</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Deadline: <span className="font-medium">{formatDate(hackathon.registrationDeadline)}</span>
                </p>
                <div className="mb-4">
                  {isUpcoming(hackathon.registrationDeadline) ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Registration Open
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      Registration Closed
                    </span>
                  )}
                </div>
                <button
                  onClick={handleRegister}
                  disabled={!isUpcoming(hackathon.registrationDeadline) || isRegistering}
                  className={`w-full btn ${
                    isUpcoming(hackathon.registrationDeadline) ? 'btn-primary' : 'btn-disabled'
                  }`}
                >
                  {isRegistering ? (
                    <>
                      <span className="animate-spin inline-block h-4 w-4 border-t-2 border-b-2 border-white rounded-full mr-2"></span>
                      Processing...
                    </>
                  ) : isUpcoming(hackathon.registrationDeadline) ? (
                    'Register Now'
                  ) : (
                    'Registration Closed'
                  )}
                </button>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Information</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Start Date</h4>
                    <p className="text-gray-900 dark:text-white">{formatDate(hackathon.startDate)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">End Date</h4>
                    <p className="text-gray-900 dark:text-white">{formatDate(hackathon.endDate)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Location</h4>
                    <p className="text-gray-900 dark:text-white">{hackathon.location}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Mode</h4>
                    <p className="text-gray-900 dark:text-white capitalize">{hackathon.mode}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Team Size</h4>
                    <p className="text-gray-900 dark:text-white">{hackathon.teamSize.min} - {hackathon.teamSize.max} members</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Looking for teammates?</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Find the perfect team members to collaborate with on this hackathon.
                </p>
                <Link to="/teams" className="w-full btn btn-outline-primary">
                  Find Teammates
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonDetails; 