import React, { useState } from 'react';
import { Section, SectionHeader } from "../components/Section";
import { useRouter } from "nextra/hooks";
import { i18nConfig } from "@docs-config";

type ExampleCategory = 
  | 'basics' 
  | 'defi' 
  | 'nft' 
  | 'social' 
  | 'infrastructure' 
  | 'auth';

type ExampleDifficulty = 
  | 'beginner' 
  | 'intermediate' 
  | 'advanced';

type Example = {
  id: string;
  title: string;
  description: string;
  url: string;
  categories: ExampleCategory[];
  difficulty: ExampleDifficulty;
  isNew?: boolean;
  estimatedTime?: string; // e.g., "1-2 hours"
  tags?: string[];
};

const examples: Example[] = [
  { 
    id: "todo", 
    title: "To-Do List", 
    description: "Build a To-Do List on Web3",
    url: "https://learn.aptoslabs.com/en/code-examples/todo-list",
    categories: ['basics'],
    difficulty: 'beginner',
    estimatedTime: "1-2 hours",
    tags: ['web3', 'beginner-friendly']
  },
  { 
    id: "nft", 
    title: "NFT Marketplace", 
    description: "Create a Marketplace for NFTs",
    url: "https://learn.aptoslabs.com/en/code-examples/nft-marketplace",
    categories: ['nft', 'defi'],
    difficulty: 'intermediate',
    estimatedTime: "3-4 hours",
    tags: ['nft', 'marketplace']
  },
  { 
    id: "billboard", 
    title: "Billboard", 
    description: "Build a Billboard on Web3",
    url: "https://learn.aptoslabs.com/en/code-examples/billboard",
    categories: ['basics'],
    difficulty: 'beginner',
    estimatedTime: "1-2 hours",
    tags: ['web3', 'beginner-friendly']
  },
  { 
    id: "launchpad", 
    title: "Launchpad", 
    description: "Develop a Fungible Asset Launchpad",
    url: "https://learn.aptoslabs.com/en/code-examples/launchpad",
    categories: ['defi'],
    difficulty: 'intermediate',
    estimatedTime: "3-4 hours",
    tags: ['fungible-assets', 'tokens']
  },
  { 
    id: "aptosfriend", 
    title: "Aptos Friend", 
    description: "Build an Aptos Friend Social App",
    url: "https://learn.aptoslabs.com/en/code-examples/aptos-friend",
    categories: ['social'],
    difficulty: 'intermediate',
    estimatedTime: "2-3 hours",
    tags: ['social', 'web3'],
    isNew: true
  },
  { 
    id: "vesting", 
    title: "Vesting Token", 
    description: "Staked Locked APT Example",
    url: "https://learn.aptoslabs.com/en/code-examples/vesting-token",
    categories: ['defi'],
    difficulty: 'intermediate',
    estimatedTime: "2-3 hours",
    tags: ['staking', 'tokens'],
    isNew: true
  },
  { 
    id: "epoch", 
    title: "Epoch-based Rewards Pool", 
    description: "Manage Rewards for Multiple Tokens",
    url: "https://learn.aptoslabs.com/en/code-examples/epoch-based-rewards-pool",
    categories: ['defi'],
    difficulty: 'advanced',
    estimatedTime: "4-5 hours",
    tags: ['rewards', 'tokens']
  },
  { 
    id: "upgrades", 
    title: "Managing Contract Upgrades", 
    description: "Package Management System Example",
    url: "https://learn.aptoslabs.com/en/code-examples/managing-contract-upgrades",
    categories: ['infrastructure'],
    difficulty: 'advanced',
    estimatedTime: "3-4 hours",
    tags: ['upgrades', 'smart-contracts']
  },
  { 
    id: "dex", 
    title: "Swap: Solidity Style ve(3,3) DEX", 
    description: "Modules for DEX Implementation",
    url: "https://learn.aptoslabs.com/en/code-examples/swap-ve33-dex",
    categories: ['defi'],
    difficulty: 'advanced',
    estimatedTime: "5+ hours",
    tags: ['dex', 'swap', 'solidity']
  },
  { 
    id: "dutch", 
    title: "Dutch Auction", 
    description: "Build a Dutch Auction",
    url: "https://learn.aptoslabs.com/en/code-examples/dutch-auction",
    categories: ['defi', 'nft'],
    difficulty: 'intermediate',
    estimatedTime: "3-4 hours",
    tags: ['auction', 'marketplace'],
    isNew: true
  },
  { 
    id: "stablecoin", 
    title: "Stablecoin", 
    description: "Create a Stablecoin on Aptos",
    url: "https://learn.aptoslabs.com/en/code-examples/stablecoin",
    categories: ['defi'],
    difficulty: 'advanced',
    estimatedTime: "4-5 hours",
    tags: ['stablecoin', 'tokens']
  },
  { 
    id: "dispatch", 
    title: "Dispatchable Fungible Assets", 
    description: "Inject Custom Logic During Asset Transfers",
    url: "https://learn.aptoslabs.com/en/code-examples/dispatchable-fungible-assets",
    categories: ['defi', 'infrastructure'],
    difficulty: 'advanced',
    estimatedTime: "3-4 hours",
    tags: ['fungible-assets', 'transfers']
  },
  { 
    id: "thirdparty", 
    title: "Depend on Third-Party Smart Contracts", 
    description: "Invoke External Smart Contract Methods",
    url: "https://learn.aptoslabs.com/en/code-examples/depend-on-third-party-smart-contracts",
    categories: ['infrastructure'],
    difficulty: 'intermediate',
    estimatedTime: "2-3 hours",
    tags: ['smart-contracts', 'integration']
  },
  { 
    id: "randomness", 
    title: "On-Chain Randomness", 
    description: "Implement Fair and Transparent Minting",
    url: "https://learn.aptoslabs.com/en/code-examples/on-chain-randomness",
    categories: ['infrastructure', 'nft'],
    difficulty: 'intermediate',
    estimatedTime: "2-3 hours",
    tags: ['randomness', 'minting']
  },
  { 
    id: "keyless", 
    title: "Aptos Keyless", 
    description: "Seamless Login Experience with Web2 Logins",
    url: "https://learn.aptoslabs.com/en/code-examples/aptos-keyless",
    categories: ['auth'],
    difficulty: 'intermediate',
    estimatedTime: "2-3 hours",
    tags: ['authentication', 'web2'],
    isNew: true
  },
  { 
    id: "voting", 
    title: "Voting", 
    description: "On-Chain Voting System on Aptos",
    url: "https://learn.aptoslabs.com/en/code-examples/voting",
    categories: ['social', 'infrastructure'],
    difficulty: 'intermediate',
    estimatedTime: "3-4 hours",
    tags: ['voting', 'governance'],
    isNew: true
  },
];

// Helper functions
const categoryLabels: Record<ExampleCategory, string> = {
  'basics': 'Basics',
  'defi': 'DeFi',
  'nft': 'NFTs',
  'social': 'Social',
  'infrastructure': 'Infrastructure',
  'auth': 'Authentication'
};

const difficultyLabels: Record<ExampleDifficulty, string> = {
  'beginner': 'Beginner',
  'intermediate': 'Intermediate',
  'advanced': 'Advanced'
};

const difficultyColors: Record<ExampleDifficulty, string> = {
  'beginner': 'bg-green-100 text-green-800',
  'intermediate': 'bg-blue-100 text-blue-800',
  'advanced': 'bg-purple-100 text-purple-800'
};

const categoryColors: Record<ExampleCategory, string> = {
  'basics': 'bg-gray-100 text-gray-800',
  'defi': 'bg-yellow-100 text-yellow-800',
  'nft': 'bg-pink-100 text-pink-800',
  'social': 'bg-indigo-100 text-indigo-800',
  'infrastructure': 'bg-cyan-100 text-cyan-800',
  'auth': 'bg-orange-100 text-orange-800'
};

const filterExamples = (
  query: string, 
  categories: ExampleCategory[] = [], 
  difficulty?: ExampleDifficulty,
  onlyNew: boolean = false
): Example[] => {
  return examples.filter((e) => {
    // Filter by search query
    const matchesQuery = !query || 
      e.title.toLowerCase().includes(query.toLowerCase()) || 
      e.description.toLowerCase().includes(query.toLowerCase()) ||
      (e.tags && e.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())));
    
    // Filter by categories
    const matchesCategories = categories.length === 0 || 
      categories.some(cat => e.categories.includes(cat));
    
    // Filter by difficulty
    const matchesDifficulty = !difficulty || e.difficulty === difficulty;
    
    // Filter by new flag
    const matchesNew = !onlyNew || e.isNew;
    
    return matchesQuery && matchesCategories && matchesDifficulty && matchesNew;
  });
};

// Component for displaying a badge
const Badge: React.FC<{
  text: string;
  className?: string;
}> = ({ text, className }) => (
  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${className}`}>
    {text}
  </span>
);

// Component for displaying an example card
const ExampleCard: React.FC<{
  example: Example;
  compact?: boolean;
}> = ({ example, compact = false }) => (
  <div className={`border border-border-divider rounded-lg overflow-hidden hover:shadow-md transition-shadow ${compact ? 'p-3' : 'p-4'}`}>
    <div className="flex justify-between items-start mb-2">
      <h4 className={`font-medium ${compact ? 'text-sm' : 'text-base'}`}>{example.title}</h4>
      {example.isNew && (
        <Badge text="NEW" className="bg-red-100 text-red-800" />
      )}
    </div>
    
    {!compact && <p className="text-sm text-text-muted mb-3">{example.description}</p>}
    
    <div className="flex flex-wrap gap-1 mb-3">
      {example.categories.map(cat => (
        <Badge 
          key={cat} 
          text={categoryLabels[cat]} 
          className={categoryColors[cat]} 
        />
      ))}
      <Badge 
        text={difficultyLabels[example.difficulty]} 
        className={difficultyColors[example.difficulty]} 
      />
      {example.estimatedTime && !compact && (
        <Badge text={example.estimatedTime} className="bg-gray-100 text-gray-800" />
      )}
    </div>
    
    <a 
      href={example.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-block px-3 py-1 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm"
    >
      View Example
    </a>
  </div>
);

// --- Enhanced Simple search component ---
const SimpleQuestion: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<ExampleCategory[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<ExampleDifficulty | undefined>(undefined);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [results, setResults] = useState<Example[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    setResults(filterExamples(query, selectedCategories, selectedDifficulty, showNewOnly));
  };

  const toggleCategory = (category: ExampleCategory) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto">
      <h3 className="label-300 md:heading-100">Find an Aptos Code Example</h3>
      <p className="body-200 md:body-300 text-text-muted">Enter a keyword (e.g., "NFT", "auction", "friend") to search for examples.</p>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your query"
          className="flex-1 px-4 py-2 border border-border-divider rounded-md bg-background-primary text-text-primary"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button 
          onClick={handleSearch}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          Search
        </button>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
        </button>
        
        <label className="flex items-center gap-1 text-sm ml-auto cursor-pointer">
          <input 
            type="checkbox" 
            checked={showNewOnly} 
            onChange={() => setShowNewOnly(!showNewOnly)}
            className="accent-primary"
          />
          New examples only
        </label>
      </div>
      
      {showFilters && (
        <div className="p-4 border border-border-divider rounded-md bg-background-elevated">
          <div className="mb-3">
            <h4 className="text-sm font-medium mb-2">Categories</h4>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(categoryLabels) as ExampleCategory[]).map(category => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedCategories.includes(category)
                      ? categoryColors[category]
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {categoryLabels[category]}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Difficulty</h4>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(difficultyLabels) as ExampleDifficulty[]).map(difficulty => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(
                    selectedDifficulty === difficulty ? undefined : difficulty
                  )}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    selectedDifficulty === difficulty
                      ? difficultyColors[difficulty]
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {difficultyLabels[difficulty]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {results.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((example) => (
            <ExampleCard key={example.id} example={example} />
          ))}
        </div>
      ) : results.length === 0 && query && (
        <div className="mt-4 p-4 border border-border-divider rounded-md bg-background-elevated text-center">
          <p className="text-text-muted">No examples found matching your criteria. Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

// --- Enhanced Advanced (quiz-like) component ---
const AdvancedQuestion: React.FC = () => {
  // Quiz state
  const [currentStep, setCurrentStep] = useState(0);
  const [experience, setExperience] = useState<'none' | 'some' | 'extensive'>('none');
  const [background, setBackground] = useState<'web2' | 'blockchain' | 'both' | 'none'>('none');
  const [interestCategory, setInterestCategory] = useState<ExampleCategory | ''>('');
  const [timeAvailable, setTimeAvailable] = useState<'short' | 'medium' | 'long'>('medium');
  const [suggestions, setSuggestions] = useState<Example[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Quiz questions
  const questions = [
    {
      question: "What's your experience level with blockchain development?",
      options: [
        { value: 'none', label: "I'm new to blockchain development" },
        { value: 'some', label: "I have some experience with blockchain" },
        { value: 'extensive', label: "I'm experienced with blockchain development" }
      ],
      state: experience,
      setState: setExperience
    },
    {
      question: "What's your development background?",
      options: [
        { value: 'web2', label: "Web2/Traditional development" },
        { value: 'blockchain', label: "Other blockchain platforms" },
        { value: 'both', label: "Both Web2 and blockchain" },
        { value: 'none', label: "I'm new to development" }
      ],
      state: background,
      setState: setBackground
    },
    {
      question: "What type of project are you most interested in building?",
      options: [
        { value: 'basics', label: "Basic Web3 applications" },
        { value: 'defi', label: "DeFi applications" },
        { value: 'nft', label: "NFT projects" },
        { value: 'social', label: "Social applications" },
        { value: 'infrastructure', label: "Infrastructure/Developer tools" },
        { value: 'auth', label: "Authentication systems" }
      ],
      state: interestCategory,
      setState: setInterestCategory
    },
    {
      question: "How much time do you have available for this project?",
      options: [
        { value: 'short', label: "1-2 hours" },
        { value: 'medium', label: "2-4 hours" },
        { value: 'long', label: "4+ hours" }
      ],
      state: timeAvailable,
      setState: setTimeAvailable
    }
  ];

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Generate suggestions based on answers
      generateSuggestions();
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateSuggestions = () => {
    // Map experience level to difficulty
    let targetDifficulty: ExampleDifficulty;
    switch (experience) {
      case 'none':
        targetDifficulty = 'beginner';
        break;
      case 'some':
        targetDifficulty = 'intermediate';
        break;
      case 'extensive':
        targetDifficulty = 'advanced';
        break;
      default:
        targetDifficulty = 'beginner';
    }

    // Filter examples based on quiz answers
    let filtered = examples.filter(e => {
      // Match by difficulty
      const difficultyMatch = e.difficulty === targetDifficulty;
      
      // Match by category if selected
      const categoryMatch = !interestCategory || e.categories.includes(interestCategory as ExampleCategory);
      
      // Match by time available
      let timeMatch = true;
      if (e.estimatedTime) {
        if (timeAvailable === 'short' && !e.estimatedTime.includes('1-2')) {
          timeMatch = false;
        } else if (timeAvailable === 'medium' && !e.estimatedTime.includes('2-4')) {
          timeMatch = false;
        } else if (timeAvailable === 'long' && !e.estimatedTime.includes('4+') && !e.estimatedTime.includes('5+')) {
          timeMatch = false;
        }
      }
      
      return difficultyMatch && categoryMatch && timeMatch;
    });

    // If no matches, broaden the search
    if (filtered.length === 0) {
      filtered = examples.filter(e => {
        if (interestCategory) {
          return e.categories.includes(interestCategory as ExampleCategory);
        }
        return e.difficulty === targetDifficulty;
      });
    }

    // If still no matches, show beginner examples
    if (filtered.length === 0) {
      filtered = examples.filter(e => e.difficulty === 'beginner');
    }

    setSuggestions(filtered.slice(0, 3)); // Show top 3 suggestions
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setQuizCompleted(false);
    setSuggestions([]);
  };

  // Current question
  const currentQuestion = questions[currentStep];

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl mx-auto">
      <h3 className="label-300 md:heading-100">Find Your Perfect Example</h3>
      <p className="body-200 md:body-300 text-text-muted">
        Answer a few questions to get personalized code example recommendations.
      </p>
      
      {!quizCompleted ? (
        <div className="mt-4">
          <div className="mb-6">
            <div className="flex justify-between mb-2 text-sm">
              <span>Question {currentStep + 1} of {questions.length}</span>
              <span>{Math.round(((currentStep + 1) / questions.length) * 100)}% complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <h4 className="text-lg font-medium mb-4">{currentQuestion.question}</h4>
          
          <div className="flex flex-col gap-3 mb-6">
            {currentQuestion.options.map(option => (
              <label 
                key={option.value} 
                className={`
                  flex items-center p-3 border rounded-md cursor-pointer transition-colors
                  ${currentQuestion.state === option.value 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border-divider hover:bg-background-elevated'
                  }
                `}
              >
                <input
                  type="radio"
                  name={`question-${currentStep}`}
                  value={option.value}
                  checked={currentQuestion.state === option.value}
                  onChange={() => currentQuestion.setState(option.value as any)}
                  className="mr-3 accent-primary"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded-md ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-background-elevated text-text-primary hover:bg-background-elevated/80'
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!currentQuestion.state}
              className={`px-4 py-2 rounded-md ${
                !currentQuestion.state
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              {currentStep === questions.length - 1 ? 'Get Recommendations' : 'Next'}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <h4 className="text-lg font-medium mb-4">Your Recommended Examples</h4>
          
          {suggestions.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {suggestions.map(example => (
                <ExampleCard key={example.id} example={example} />
              ))}
            </div>
          ) : (
            <p className="text-text-muted">No matching examples found. Try different preferences.</p>
          )}
          
          <button
            onClick={resetQuiz}
            className="mt-6 px-4 py-2 bg-background-elevated text-text-primary rounded-md hover:bg-background-elevated/80"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
};

// --- Enhanced Dropdown selector component ---
const DropdownChooser: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ExampleCategory | 'all'>('all');
  const [selectedId, setSelectedId] = useState('');

  const filteredExamples = selectedCategory === 'all' 
    ? examples 
    : examples.filter(ex => ex.categories.includes(selectedCategory));

  const selectedExample = examples.find((ex) => ex.id === selectedId);

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl mx-auto">
      <h3 className="label-300 md:heading-100">Browse Examples by Category</h3>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            selectedCategory === 'all'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          All Categories
        </button>
        {(Object.keys(categoryLabels) as ExampleCategory[]).map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              selectedCategory === category
                ? categoryColors[category]
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {filteredExamples.map(example => (
          <div 
            key={example.id}
            onClick={() => setSelectedId(example.id)}
            className={`
              p-3 border rounded-lg cursor-pointer transition-all
              ${selectedId === example.id 
                ? 'border-primary shadow-md' 
                : 'border-border-divider hover:border-primary/50 hover:shadow-sm'
              }
            `}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-sm">{example.title}</h4>
              {example.isNew && (
                <Badge text="NEW" className="bg-red-100 text-red-800" />
              )}
            </div>
            <p className="text-xs text-text-muted mb-2 line-clamp-2">{example.description}</p>
            <div className="flex flex-wrap gap-1">
              {example.categories.slice(0, 2).map(cat => (
                <Badge 
                  key={cat} 
                  text={categoryLabels[cat]} 
                  className={`${categoryColors[cat]} text-xs`} 
                />
              ))}
              <Badge 
                text={difficultyLabels[example.difficulty]} 
                className={`${difficultyColors[example.difficulty]} text-xs`} 
              />
            </div>
          </div>
        ))}
      </div>
      
      {selectedExample && (
        <div className="p-4 border border-primary rounded-lg bg-primary/5">
          <h4 className="font-medium mb-2">{selectedExample.title}</h4>
          <p className="text-sm text-text-muted mb-3">{selectedExample.description}</p>
          <div className="flex flex-wrap gap-1 mb-3">
            {selectedExample.categories.map(cat => (
              <Badge 
                key={cat} 
                text={categoryLabels[cat]} 
                className={categoryColors[cat]} 
              />
            ))}
            <Badge 
              text={difficultyLabels[selectedExample.difficulty]} 
              className={difficultyColors[selectedExample.difficulty]} 
            />
            {selectedExample.estimatedTime && (
              <Badge text={selectedExample.estimatedTime} className="bg-gray-100 text-gray-800" />
            )}
          </div>
          <a 
            href={selectedExample.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            View Example
          </a>
        </div>
      )}
    </div>
  );
};

// --- Visual Card Gallery component (NEW) ---
const CardGallery: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<ExampleCategory[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<ExampleDifficulty | undefined>(undefined);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'difficulty' | 'category'>('difficulty');

  const toggleCategory = (category: ExampleCategory) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Filter examples based on selected filters
  const filteredExamples = examples.filter(example => {
    const matchesCategories = selectedCategories.length === 0 || 
      selectedCategories.some(cat => example.categories.includes(cat));
    
    const matchesDifficulty = !selectedDifficulty || example.difficulty === selectedDifficulty;
    
    const matchesNew = !showNewOnly || example.isNew;
    
    return matchesCategories && matchesDifficulty && matchesNew;
  });

  // Sort examples
  const sortedExamples = [...filteredExamples].sort((a, b) => {
    if (sortBy === 'difficulty') {
      const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    } else {
      // Sort by category
      return a.categories[0].localeCompare(b.categories[0]);
    }
  });

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto">
      <h3 className="label-300 md:heading-100">Visual Example Gallery</h3>
      
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="text-sm font-medium">Filter by:</span>
        
        <div className="flex flex-wrap gap-1">
          {(Object.keys(categoryLabels) as ExampleCategory[]).map(category => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-2 py-1 text-xs rounded-full transition-colors ${
                selectedCategories.includes(category)
                  ? categoryColors[category]
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>
        
        <div className="h-4 w-px bg-border-divider mx-1"></div>
        
        <div className="flex flex-wrap gap-1">
          {(Object.keys(difficultyLabels) as ExampleDifficulty[]).map(difficulty => (
            <button
              key={difficulty}
              onClick={() => setSelectedDifficulty(
                selectedDifficulty === difficulty ? undefined : difficulty
              )}
              className={`px-2 py-1 text-xs rounded-full transition-colors ${
                selectedDifficulty === difficulty
                  ? difficultyColors[difficulty]
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {difficultyLabels[difficulty]}
            </button>
          ))}
        </div>
        
        <div className="h-4 w-px bg-border-divider mx-1"></div>
        
        <label className="flex items-center gap-1 text-xs cursor-pointer">
          <input 
            type="checkbox" 
            checked={showNewOnly} 
            onChange={() => setShowNewOnly(!showNewOnly)}
            className="accent-primary"
          />
          New examples only
        </label>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-text-muted">
          {sortedExamples.length} example{sortedExamples.length !== 1 ? 's' : ''} found
        </span>
        
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'difficulty' | 'category')}
            className="text-sm px-2 py-1 border border-border-divider rounded-md bg-background-primary"
          >
            <option value="difficulty">Difficulty</option>
            <option value="category">Category</option>
          </select>
        </div>
      </div>
      
      {sortedExamples.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedExamples.map(example => (
            <ExampleCard key={example.id} example={example} />
          ))}
        </div>
      ) : (
        <div className="p-8 border border-border-divider rounded-lg bg-background-elevated text-center">
          <p className="text-text-muted mb-2">No examples match your current filters.</p>
          <button
            onClick={() => {
              setSelectedCategories([]);
              setSelectedDifficulty(undefined);
              setShowNewOnly(false);
            }}
            className="text-primary hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

// --- Learning Path component (NEW) ---
const LearningPath: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<'web3' | 'defi' | 'nft'>('web3');
  
  const paths = {
    web3: {
      title: "Web3 Development Path",
      description: "Learn the fundamentals of Web3 development on Aptos",
      steps: [
        { 
          title: "Step 1: Basic Web3 App", 
          description: "Start with a simple To-Do List to learn the basics",
          example: examples.find(e => e.id === 'todo')!
        },
        { 
          title: "Step 2: User Authentication", 
          description: "Add user authentication to your app",
          example: examples.find(e => e.id === 'keyless')!
        },
        { 
          title: "Step 3: Social Features", 
          description: "Build social features into your application",
          example: examples.find(e => e.id === 'aptosfriend')!
        },
        { 
          title: "Step 4: Advanced Features", 
          description: "Explore more complex functionality",
          example: examples.find(e => e.id === 'voting')!
        }
      ]
    },
    defi: {
      title: "DeFi Development Path",
      description: "Build decentralized finance applications on Aptos",
      steps: [
        { 
          title: "Step 1: Token Basics", 
          description: "Learn about fungible assets on Aptos",
          example: examples.find(e => e.id === 'launchpad')!
        },
        { 
          title: "Step 2: Token Vesting", 
          description: "Implement token vesting and staking",
          example: examples.find(e => e.id === 'vesting')!
        },
        { 
          title: "Step 3: Marketplace", 
          description: "Build a marketplace with auctions",
          example: examples.find(e => e.id === 'dutch')!
        },
        { 
          title: "Step 4: Advanced DeFi", 
          description: "Create a stablecoin or DEX",
          example: examples.find(e => e.id === 'stablecoin')!
        }
      ]
    },
    nft: {
      title: "NFT Development Path",
      description: "Create and manage NFTs on Aptos",
      steps: [
        { 
          title: "Step 1: NFT Basics", 
          description: "Learn about non-fungible tokens on Aptos",
          example: examples.find(e => e.id === 'nft')!
        },
        { 
          title: "Step 2: Randomness", 
          description: "Implement fair and transparent minting",
          example: examples.find(e => e.id === 'randomness')!
        },
        { 
          title: "Step 3: Auctions", 
          description: "Build an NFT auction system",
          example: examples.find(e => e.id === 'dutch')!
        },
        { 
          title: "Step 4: Advanced NFT Features", 
          description: "Explore more complex NFT functionality",
          example: examples.find(e => e.id === 'dispatch')!
        }
      ]
    }
  };

  const currentPath = paths[selectedPath];

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto">
      <h3 className="label-300 md:heading-100">Learning Paths</h3>
      <p className="body-200 md:body-300 text-text-muted">
        Follow a structured learning path to build your skills step by step.
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {(Object.keys(paths) as Array<'web3' | 'defi' | 'nft'>).map(path => (
          <button
            key={path}
            onClick={() => setSelectedPath(path)}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedPath === path
                ? 'bg-primary text-white'
                : 'bg-background-elevated text-text-primary hover:bg-background-elevated/80'
            }`}
          >
            {paths[path].title}
          </button>
        ))}
      </div>
      
      <div className="p-6 border border-border-divider rounded-lg bg-background-elevated">
        <h4 className="text-lg font-medium mb-2">{currentPath.title}</h4>
        <p className="text-text-muted mb-6">{currentPath.description}</p>
        
        <div className="space-y-6">
          {currentPath.steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold">
                {index + 1}
              </div>
              <div className="flex-grow border border-border-divider rounded-lg p-4 bg-background-primary">
                <h5 className="font-medium mb-1">{step.title}</h5>
                <p className="text-sm text-text-muted mb-3">{step.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {step.example.categories.map(cat => (
                    <Badge 
                      key={cat} 
                      text={categoryLabels[cat]} 
                      className={categoryColors[cat]} 
                    />
                  ))}
                  <Badge 
                    text={difficultyLabels[step.example.difficulty]} 
                    className={difficultyColors[step.example.difficulty]} 
                  />
                </div>
                <a 
                  href={step.example.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-3 py-1 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm"
                >
                  Start with {step.example.title}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Chooser component to switch between ideas ---
const Chooser: React.FC = () => {
  const [mode, setMode] = useState<'simple' | 'advanced' | 'dropdown' | 'gallery' | 'path'>('simple');

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <button 
          onClick={() => setMode('simple')} 
          className={`px-4 py-2 rounded-md transition-colors ${mode === 'simple' ? 'bg-primary text-white' : 'bg-background-elevated text-text-primary hover:bg-background-elevated/80'}`}
        >
          Simple Search
        </button>
        <button 
          onClick={() => setMode('advanced')} 
          className={`px-4 py-2 rounded-md transition-colors ${mode === 'advanced' ? 'bg-primary text-white' : 'bg-background-elevated text-text-primary hover:bg-background-elevated/80'}`}
        >
          Quiz Finder
        </button>
        <button 
          onClick={() => setMode('dropdown')} 
          className={`px-4 py-2 rounded-md transition-colors ${mode === 'dropdown' ? 'bg-primary text-white' : 'bg-background-elevated text-text-primary hover:bg-background-elevated/80'}`}
        >
          Browse by Category
        </button>
        <button 
          onClick={() => setMode('gallery')} 
          className={`px-4 py-2 rounded-md transition-colors ${mode === 'gallery' ? 'bg-primary text-white' : 'bg-background-elevated text-text-primary hover:bg-background-elevated/80'}`}
        >
          Visual Gallery
        </button>
        <button 
          onClick={() => setMode('path')} 
          className={`px-4 py-2 rounded-md transition-colors ${mode === 'path' ? 'bg-primary text-white' : 'bg-background-elevated text-text-primary hover:bg-background-elevated/80'}`}
        >
          Learning Paths
        </button>
      </div>
      <div className="p-6 border border-border-divider rounded-lg bg-background-primary">
        {mode === 'simple' && <SimpleQuestion />}
        {mode === 'advanced' && <AdvancedQuestion />}
        {mode === 'dropdown' && <DropdownChooser />}
        {mode === 'gallery' && <CardGallery />}
        {mode === 'path' && <LearningPath />}
      </div>
    </div>
  );
};

export function CodeExamplesSection() {
  const { locale } = useRouter();
  const t = i18nConfig[locale!];

  return (
    <Section>
      <SectionHeader>Find Code Examples</SectionHeader>
      <div className="w-full max-w-4xl mx-auto">
        <Chooser />
      </div>
    </Section>
  );
}
