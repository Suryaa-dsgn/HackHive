import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Hackathon {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
  description: string;
  registrationDeadline: string;
  tags: string[];
}

const Hackathons = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Mock data for hackathons
  const hackathons: Hackathon[] = [
    {
      id: 1,
      title: 'TechCrunch Disrupt Hackathon',
      date: 'May 15-17, 2023',
      location: 'San Francisco, CA',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Join the world\'s leading hackathon at TechCrunch Disrupt. Build innovative solutions and showcase your talents to tech giants.',
      registrationDeadline: 'April 30, 2023',
      tags: ['AI', 'Fintech', 'Web3']
    },
    {
      id: 2,
      title: 'HackMIT',
      date: 'September 18-20, 2023',
      location: 'Cambridge, MA',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'MIT\'s annual hackathon bringing together the best student developers for 48 hours of building and innovation.',
      registrationDeadline: 'August 15, 2023',
      tags: ['Student', 'Education', 'Open Source']
    },
    {
      id: 3,
      title: 'PennApps',
      date: 'October 8-10, 2023',
      location: 'Philadelphia, PA',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'The original college hackathon. Join thousands of students in building incredible projects in just 36 hours.',
      registrationDeadline: 'September 1, 2023',
      tags: ['Student', 'Beginner Friendly', 'Hardware']
    },
    {
      id: 4,
      title: 'ETHGlobal London',
      date: 'March 11-13, 2023',
      location: 'London, UK',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'The premier Ethereum hackathon bringing together developers to build the future of Web3.',
      registrationDeadline: 'February 25, 2023',
      tags: ['Blockchain', 'Web3', 'Ethereum']
    },
    {
      id: 5,
      title: 'TreeHacks',
      date: 'February 16-18, 2023',
      location: 'Stanford, CA',
      image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Stanford\'s premier hackathon focused on solving real-world problems with technology.',
      registrationDeadline: 'January 15, 2023',
      tags: ['AI', 'Healthcare', 'Student']
    },
    {
      id: 6,
      title: 'Microsoft Imagine Cup',
      date: 'June 5-7, 2023',
      location: 'Seattle, WA',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      description: 'Microsoft\'s global competition for students to create innovative solutions that tackle social and environmental issues.',
      registrationDeadline: 'May 1, 2023',
      tags: ['Student', 'Social Impact', 'Azure']
    }
  ];

  // All unique tags from hackathons
  const allTags = Array.from(new Set(hackathons.flatMap(hackathon => hackathon.tags)));

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Filter hackathons based on search term and selected tags
  const filteredHackathons = hackathons.filter(hackathon => {
    // Filter by search term
    const matchesSearch = hackathon.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          hackathon.location.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          hackathon.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by selected tags
    const matchesTags = selectedTags.length === 0 || 
                        selectedTags.some(tag => hackathon.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-sora font-bold text-gray-900 dark:text-white mb-4">
          Discover Hackathons
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Find the perfect hackathon to showcase your skills and build your dream team.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 bg-white dark:bg-dark-100 p-6 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Search Hackathons
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by name, location, or description..."
              className="input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Filter by Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-dark-200 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-300'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hackathons List */}
      {filteredHackathons.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHackathons.map((hackathon, index) => (
            <motion.div
              key={hackathon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="card overflow-hidden"
            >
              <img 
                src={hackathon.image} 
                alt={hackathon.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {hackathon.title}
                </h3>
                <div className="mt-2 flex flex-col text-sm text-gray-600 dark:text-gray-300">
                  <span>{hackathon.date}</span>
                  <span>{hackathon.location}</span>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {hackathon.description}
                  </p>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-1">
                  {hackathon.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 bg-gray-100 dark:bg-dark-200 text-xs rounded-full text-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <Link 
                    to={`/hackathons/${hackathon.id}`} 
                    className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                  >
                    View Details
                  </Link>
                  <Link 
                    to={`/hackathons/${hackathon.id}/teams`} 
                    className="btn btn-primary btn-sm"
                  >
                    Join Team
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            No hackathons found matching your criteria. Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default Hackathons; 