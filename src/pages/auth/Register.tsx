import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

type RegistrationStep = 'personal' | 'verification' | 'skills';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  college: string;
  graduationYear: string;
  phoneNumber: string;
  verificationCode: string;
  skills: string[];
  bio: string;
}

const Register = () => {
  const [step, setStep] = useState<RegistrationStep>('personal');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    college: '',
    graduationYear: '',
    phoneNumber: '',
    verificationCode: '',
    skills: [],
    bio: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear the error for this field
    if (errors[name as keyof FormData]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  // Handle skill selection
  const handleSkillToggle = (skill: string) => {
    setFormData(prev => {
      const updatedSkills = prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
      
      return { ...prev, skills: updatedSkills };
    });
  };

  // Validate personal information step
  const validatePersonalStep = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.college.trim()) {
      newErrors.college = 'College name is required';
    }
    
    if (!formData.graduationYear.trim()) {
      newErrors.graduationYear = 'Graduation year is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate verification step
  const validateVerificationStep = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }
    
    if (!formData.verificationCode.trim()) {
      newErrors.verificationCode = 'Verification code is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Go to next step
  const goToNextStep = () => {
    if (step === 'personal' && validatePersonalStep()) {
      setStep('verification');
    } else if (step === 'verification' && validateVerificationStep()) {
      setStep('skills');
    }
  };

  // Go to previous step
  const goToPreviousStep = () => {
    if (step === 'verification') {
      setStep('personal');
    } else if (step === 'skills') {
      setStep('verification');
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 'personal' && !validatePersonalStep()) {
      return;
    }
    
    if (step === 'verification' && !validateVerificationStep()) {
      return;
    }
    
    if (step === 'skills') {
      setIsLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // In a real app, you would send registration data to your API
        console.log('Registration successful', formData);
        window.location.href = '/auth/login';
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      goToNextStep();
    }
  };

  // Send verification code
  const sendVerificationCode = () => {
    // Simulate sending a verification code
    console.log('Sending verification code to', formData.phoneNumber);
    // In a real app, you would call an API to send a code to the user's phone
  };

  // Available skills to choose from
  const availableSkills = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 
    'Java', 'C#', 'C++', 'Go', 'Rust', 'UI/UX Design', 
    'Product Management', 'Data Science', 'Machine Learning'
  ];

  const renderPersonalInformationStep = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Personal Information
      </h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 dark:bg-dark-200 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 dark:bg-dark-200 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 dark:bg-dark-200 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </div>
        
        <div>
          <label htmlFor="college" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">College/University</label>
          <input
            id="college"
            name="college"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 dark:bg-dark-200 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            value={formData.college}
            onChange={handleChange}
          />
          {errors.college && <p className="mt-1 text-sm text-red-600">{errors.college}</p>}
        </div>
        
        <div>
          <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Graduation Year</label>
          <select
            id="graduationYear"
            name="graduationYear"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 dark:bg-dark-200 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            value={formData.graduationYear}
            onChange={handleChange}
          >
            <option value="">Select year</option>
            {[...Array(6)].map((_, i) => {
              const year = new Date().getFullYear() + i;
              return <option key={year} value={year}>{year}</option>;
            })}
          </select>
          {errors.graduationYear && <p className="mt-1 text-sm text-red-600">{errors.graduationYear}</p>}
        </div>
      </div>
    </motion.div>
  );

  const renderVerificationStep = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Verification
      </h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
          <div className="flex">
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 dark:bg-dark-200 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <button
              type="button"
              className="ml-2 px-4 py-2 bg-gray-200 dark:bg-dark-200 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-dark-300 transition-colors"
              onClick={sendVerificationCode}
            >
              Send Code
            </button>
          </div>
          {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
        </div>
        
        <div>
          <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Verification Code</label>
          <input
            id="verificationCode"
            name="verificationCode"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 dark:bg-dark-200 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            value={formData.verificationCode}
            onChange={handleChange}
          />
          {errors.verificationCode && <p className="mt-1 text-sm text-red-600">{errors.verificationCode}</p>}
        </div>
      </div>
    </motion.div>
  );

  const renderSkillsStep = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Skills & Bio
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Your Skills</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
            {availableSkills.map(skill => (
              <button
                key={skill}
                type="button"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  formData.skills.includes(skill)
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 border border-primary-300 dark:border-primary-700'
                    : 'bg-gray-100 dark:bg-dark-200 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-300 border border-transparent'
                }`}
                onClick={() => handleSkillToggle(skill)}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 dark:bg-dark-200 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="Tell us about yourself, your interests, and what you're looking for in hackathons..."
            value={formData.bio}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-200 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white dark:bg-dark-100 rounded-xl shadow-md p-8"
      >
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
            HH
          </div>
        </div>
        
        <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Create an account
        </h2>
        
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
          Join HackHive to discover hackathons and find team members
        </p>
        
        <div className="mb-6">
          <div className="flex items-center">
            <div className={`flex-1 border-t-2 ${step === 'personal' ? 'border-primary-500' : 'border-gray-200 dark:border-dark-300'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              step === 'personal' ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-dark-300 text-gray-700 dark:text-gray-300'
            } mx-2`}>1</div>
            <div className={`flex-1 border-t-2 ${step === 'verification' ? 'border-primary-500' : 'border-gray-200 dark:border-dark-300'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              step === 'verification' ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-dark-300 text-gray-700 dark:text-gray-300'
            } mx-2`}>2</div>
            <div className={`flex-1 border-t-2 ${step === 'skills' ? 'border-primary-500' : 'border-gray-200 dark:border-dark-300'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              step === 'skills' ? 'bg-primary-500 text-white' : 'bg-gray-200 dark:bg-dark-300 text-gray-700 dark:text-gray-300'
            } mx-2`}>3</div>
            <div className={`flex-1 border-t-2 border-gray-200 dark:border-dark-300`}></div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {step === 'personal' && renderPersonalInformationStep()}
            {step === 'verification' && renderVerificationStep()}
            {step === 'skills' && renderSkillsStep()}
          </AnimatePresence>
          
          <div className="mt-6 flex justify-between">
            {step !== 'personal' && (
              <button
                type="button"
                onClick={goToPreviousStep}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-300 hover:bg-gray-50 dark:hover:bg-dark-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Back
              </button>
            )}
            
            {step === 'personal' && (
              <Link to="/auth/login" className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-300 hover:bg-gray-50 dark:hover:bg-dark-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                Cancel
              </Link>
            )}
            
            <button
              type="submit"
              className="ml-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Creating account...</span>
                </>
              ) : (
                step === 'skills' ? 'Create Account' : 'Continue'
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/auth/login" className="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register; 