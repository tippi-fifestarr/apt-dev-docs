import React, { useState } from 'react';
import { Section, SectionHeader } from "../components/Section";
import { useRouter } from "nextra/hooks";
import { i18nConfig } from "@docs-config";

// Import our custom components, hooks, and data
import { 
  ExampleCard, 
  Badge, 
  Button, 
  SearchInput, 
  FilterChip, 
  EmptyState, 
  LoadingSpinner,
  CategoryBadge,
  DifficultyBadge,
  TimeBadge,
  UserStory
} from './components';
import { 
  useExampleFilters, 
  useExampleQuiz, 
  useFuzzySearch, 
  useFilteredExamples, 
  useSortedExamples 
} from './hooks';
import { 
  examples, 
  categoryLabels, 
  difficultyLabels, 
  categoryColors, 
  difficultyColors 
} from './exampleData';
import { 
  Example,
  ExampleCategory, 
  ExampleDifficulty, 
  ExampleSortOption 
} from './types';

/**
 * Simple search component with enhanced filtering and fuzzy search
 */
const SimpleQuestion: React.FC = () => {
  const {
    filters,
    setQuery,
    toggleCategory,
    setDifficulty,
    toggleNewOnly,
    clearFilters,
    sortedExamples: results
  } = useExampleFilters();
  
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = () => {
    setIsSearching(true);
    // Simulate a short delay for better UX
    setTimeout(() => {
      setIsSearching(false);
    }, 300);
  };
  
  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto">
      <h3 className="label-300 md:heading-100">Find an Aptos Code Example</h3>
      <p className="body-200 md:body-300 text-text-muted">
        Enter a keyword (e.g., "NFT", "auction", "friend") to search for examples.
      </p>
      
      <SearchInput
        value={filters.query || ''}
        onChange={setQuery}
        onSearch={handleSearch}
        placeholder="Type your query"
        className="w-full"
      />
      
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="text-sm text-primary hover:underline flex items-center gap-1"
          aria-expanded={showFilters}
          aria-controls="search-filters"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
        </button>
        
        <label className="flex items-center gap-1 text-sm ml-auto cursor-pointer">
          <input 
            type="checkbox" 
            checked={filters.onlyNew || false}
            onChange={toggleNewOnly}
            className="accent-primary"
            aria-label="Show only new examples"
          />
          New examples only
        </label>
      </div>
      
      {showFilters && (
        <div id="search-filters" className="p-4 border border-border-divider rounded-md bg-background-elevated">
          <div className="mb-3">
            <h4 className="text-sm font-medium mb-2">Categories</h4>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(categoryLabels) as ExampleCategory[]).map(category => (
                <FilterChip
                  key={category}
                  label={categoryLabels[category]}
                  active={filters.categories?.includes(category) || false}
                  onClick={() => toggleCategory(category)}
                  className={filters.categories?.includes(category) ? categoryColors[category] : ''}
                />
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Difficulty</h4>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(difficultyLabels) as ExampleDifficulty[]).map(difficulty => (
                <FilterChip
                  key={difficulty}
                  label={difficultyLabels[difficulty]}
                  active={filters.difficulty === difficulty}
                  onClick={() => setDifficulty(
                    filters.difficulty === difficulty ? undefined : difficulty
                  )}
                  className={filters.difficulty === difficulty ? difficultyColors[difficulty] : ''}
                />
              ))}
            </div>
          </div>
          
          {(filters.categories?.length || filters.difficulty || filters.onlyNew) && (
            <div className="mt-3 flex justify-end">
              <Button 
                variant="outline" 
                onClick={clearFilters}
                ariaLabel="Clear all filters"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      )}
      
      {isSearching ? (
        <div className="flex justify-center items-center py-8">
          <LoadingSpinner size="medium" />
        </div>
      ) : results.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((example) => (
            <ExampleCard key={example.id} example={example} />
          ))}
        </div>
      ) : filters.query && (
        <EmptyState 
          message="No examples found matching your criteria. Try adjusting your search or filters."
          action={{
            label: "Clear all filters",
            onClick: clearFilters
          }}
          className="mt-4"
        />
      )}
    </div>
  );
};

/**
 * Quiz-based recommendation component
 */
const AdvancedQuestion: React.FC = () => {
  const {
    currentStep,
    experience,
    setExperience,
    background,
    setBackground,
    interestCategory,
    setInterestCategory,
    timeAvailable,
    setTimeAvailable,
    quizCompleted,
    handleNext,
    handlePrevious,
    resetQuiz,
    recommendedExamples
  } = useExampleQuiz();
  
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
                role="progressbar"
                aria-valuenow={Math.round(((currentStep + 1) / questions.length) * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
          </div>
          
          <h4 className="text-lg font-medium mb-4" id="quiz-question">{currentQuestion.question}</h4>
          
          <div className="flex flex-col gap-3 mb-6" role="radiogroup" aria-labelledby="quiz-question">
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
                  aria-label={option.label}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          
          <div className="flex justify-between">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              variant="secondary"
              ariaLabel="Go to previous question"
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!currentQuestion.state}
              ariaLabel={currentStep === questions.length - 1 ? 'Get recommendations' : 'Go to next question'}
            >
              {currentStep === questions.length - 1 ? 'Get Recommendations' : 'Next'}
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <h4 className="text-lg font-medium mb-4">Your Recommended Examples</h4>
          
          {recommendedExamples.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {recommendedExamples.map(example => (
                <ExampleCard 
                  key={example.id} 
                  example={example} 
                />
              ))}
            </div>
          ) : (
            <p className="text-text-muted">No matching examples found. Try different preferences.</p>
          )}
          
          <Button
            onClick={resetQuiz}
            variant="secondary"
            className="mt-6"
            ariaLabel="Start the quiz over"
          >
            Start Over
          </Button>
        </div>
      )}
    </div>
  );
};

/**
 * Category-based browsing component
 */
const DropdownChooser: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ExampleCategory | 'all'>('all');
  const [selectedId, setSelectedId] = useState('');

  // Filter examples by category without useMemo
  const filteredExamples = selectedCategory === 'all' 
    ? examples 
    : examples.filter(ex => ex && ex.categories && ex.categories.includes(selectedCategory));

  // Find selected example without useMemo
  const selectedExample = examples && Array.isArray(examples) 
    ? examples.find((ex) => ex && ex.id === selectedId) 
    : undefined;

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl mx-auto">
      <h3 className="label-300 md:heading-100">Browse Examples by Category</h3>
      
      <div className="flex flex-wrap gap-2 mb-4" role="tablist" aria-label="Categories">
        <FilterChip
          label="All Categories"
          active={selectedCategory === 'all'}
          onClick={() => setSelectedCategory('all')}
          className="px-3 py-1"
        />
        {(Object.keys(categoryLabels) as ExampleCategory[]).map(category => (
          <FilterChip
            key={category}
            label={categoryLabels[category]}
            active={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 ${selectedCategory === category ? categoryColors[category] : ''}`}
          />
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
            tabIndex={0}
            role="button"
            aria-pressed={selectedId === example.id}
            aria-label={`Select ${example.title}`}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-sm">{example.title}</h4>
              {example.isNew && <Badge text="NEW" className="bg-red-100 text-red-800" />}
            </div>
            <p className="text-xs text-text-muted mb-2 line-clamp-2">{example.description}</p>
            <div className="flex flex-wrap gap-1">
              {example.categories.slice(0, 2).map(cat => (
                <CategoryBadge key={cat} category={cat} className="text-xs" />
              ))}
              <DifficultyBadge difficulty={example.difficulty} className="text-xs" />
            </div>
          </div>
        ))}
      </div>
      
      {selectedExample && (
        <div className="p-4 border border-primary rounded-lg bg-primary/5">
          <h4 className="font-medium mb-2">{selectedExample.title}</h4>
          <p className="text-sm text-text-muted mb-3">{selectedExample.description}</p>
          
          {selectedExample.userStories && selectedExample.userStories.length > 0 && (
            <div className="mb-3">
              <UserStory story={selectedExample.userStories[0]} />
            </div>
          )}
          
          <div className="flex flex-wrap gap-1 mb-3">
            {selectedExample.categories.map(cat => (
              <CategoryBadge key={cat} category={cat} />
            ))}
            <DifficultyBadge difficulty={selectedExample.difficulty} />
            {selectedExample.estimatedTime && (
              <TimeBadge time={selectedExample.estimatedTime} />
            )}
          </div>
          <a 
            href={selectedExample.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            aria-label={`View ${selectedExample.title} example`}
          >
            View Example
          </a>
        </div>
      )}
    </div>
  );
};

/**
 * Visual gallery component with filtering and sorting
 */
const CardGallery: React.FC = () => {
  const {
    filters,
    sortBy,
    toggleCategory,
    setDifficulty,
    toggleNewOnly,
    setSortBy,
    clearFilters,
    sortedExamples
  } = useExampleFilters();

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto">
      <h3 className="label-300 md:heading-100">Visual Example Gallery</h3>
      
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="text-sm font-medium">Filter by:</span>
        
        <div className="flex flex-wrap gap-1">
          {(Object.keys(categoryLabels) as ExampleCategory[]).map(category => (
            <FilterChip
              key={category}
              label={categoryLabels[category]}
              active={filters.categories?.includes(category) || false}
              onClick={() => toggleCategory(category)}
              className={`px-2 py-1 text-xs ${filters.categories?.includes(category) ? categoryColors[category] : ''}`}
            />
          ))}
        </div>
        
        <div className="h-4 w-px bg-border-divider mx-1" aria-hidden="true"></div>
        
        <div className="flex flex-wrap gap-1">
          {(Object.keys(difficultyLabels) as ExampleDifficulty[]).map(difficulty => (
            <FilterChip
              key={difficulty}
              label={difficultyLabels[difficulty]}
              active={filters.difficulty === difficulty}
              onClick={() => setDifficulty(
                filters.difficulty === difficulty ? undefined : difficulty
              )}
              className={`px-2 py-1 text-xs ${filters.difficulty === difficulty ? difficultyColors[difficulty] : ''}`}
            />
          ))}
        </div>
        
        <div className="h-4 w-px bg-border-divider mx-1" aria-hidden="true"></div>
        
        <label className="flex items-center gap-1 text-xs cursor-pointer">
          <input 
            type="checkbox" 
            checked={filters.onlyNew || false}
            onChange={toggleNewOnly}
            className="accent-primary"
            aria-label="Show only new examples"
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
            onChange={(e) => setSortBy(e.target.value as ExampleSortOption)}
            className="text-sm px-2 py-1 border border-border-divider rounded-md bg-background-primary"
            aria-label="Sort examples by"
          >
            <option value="difficulty">Difficulty</option>
            <option value="category">Category</option>
            <option value="title">Title</option>
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
        <EmptyState 
          message="No examples match your current filters."
          action={{
            label: "Clear all filters",
            onClick: clearFilters
          }}
        />
      )}
    </div>
  );
};

/**
 * Function to safely find an example by ID
 */
function findExampleById(id: string): Example {
  // Default example in case the requested one isn't found
  const defaultExample: Example = {
    id: 'default',
    title: 'Example Not Found',
    description: 'The requested example could not be found',
    longDescription: 'Please try another example or contact support',
    categories: ['basics'],
    difficulty: 'beginner',
    isNew: false,
    url: '#'
  };
  
  // Check if examples exists and is an array
  if (!examples || !Array.isArray(examples)) {
    console.error('Examples data is not available');
    return defaultExample;
  }
  
  // Try to find the example
  const found = examples.find(e => e && e.id === id);
  
  // Return the found example or the default one
  return found || defaultExample;
}

/**
 * Learning path component
 */
const LearningPath: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<'web3' | 'defi' | 'nft'>('web3');
  
  // Create paths data structure without useMemo
  const paths = {
    web3: {
      title: "Web3 Development Path",
      description: "Learn the fundamentals of Web3 development on Aptos",
      steps: [
        { 
          title: "Step 1: Basic Web3 App", 
          description: "Start with a simple To-Do List to learn the basics",
          example: findExampleById('todo')
        },
        { 
          title: "Step 2: User Authentication", 
          description: "Add user authentication to your app",
          example: findExampleById('keyless')
        },
        { 
          title: "Step 3: Social Features", 
          description: "Build social features into your application",
          example: findExampleById('aptosfriend')
        },
        { 
          title: "Step 4: Advanced Features", 
          description: "Explore more complex functionality",
          example: findExampleById('voting')
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
          example: findExampleById('launchpad')
        },
        { 
          title: "Step 2: Token Vesting", 
          description: "Implement token vesting and staking",
          example: findExampleById('vesting')
        },
        { 
          title: "Step 3: Marketplace", 
          description: "Build a marketplace with auctions",
          example: findExampleById('dutch')
        },
        { 
          title: "Step 4: Advanced DeFi", 
          description: "Create a stablecoin or DEX",
          example: findExampleById('stablecoin')
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
          example: findExampleById('nft')
        },
        { 
          title: "Step 2: Randomness", 
          description: "Implement fair and transparent minting",
          example: findExampleById('randomness')
        },
        { 
          title: "Step 3: Auctions", 
          description: "Build an NFT auction system",
          example: findExampleById('dutch')
        },
        { 
          title: "Step 4: Advanced NFT Features", 
          description: "Explore more complex NFT functionality",
          example: findExampleById('dispatch')
        }
      ]
    }
  };

  // Get the current path safely
  const currentPath = paths[selectedPath] || paths.web3;

  return (
    <div className="flex flex-col gap-4 w-full max-w-4xl mx-auto">
      <h3 className="label-300 md:heading-100">Learning Paths</h3>
      <p className="body-200 md:body-300 text-text-muted">
        Follow a structured learning path to build your skills step by step.
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Learning paths">
        {(Object.keys(paths) as Array<'web3' | 'defi' | 'nft'>).map(path => (
          <Button
            key={path}
            onClick={() => setSelectedPath(path)}
            variant={selectedPath === path ? 'primary' : 'secondary'}
            ariaLabel={`Select ${paths[path].title}`}
          >
            {paths[path].title}
          </Button>
        ))}
      </div>
      
      <div className="p-6 border border-border-divider rounded-lg bg-background-elevated">
        <h4 className="text-lg font-medium mb-2">{currentPath.title}</h4>
        <p className="text-text-muted mb-6">{currentPath.description}</p>
        
        <div className="space-y-6">
          {currentPath.steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-4">
              <div 
                className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold"
                aria-hidden="true"
              >
                {index + 1}
              </div>
              <div className="flex-grow border border-border-divider rounded-lg p-4 bg-background-primary">
                <h5 className="font-medium mb-1">{step.title}</h5>
                <p className="text-sm text-text-muted mb-3">{step.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {step.example.categories.map(cat => (
                    <CategoryBadge key={cat} category={cat} />
                  ))}
                  <DifficultyBadge difficulty={step.example.difficulty} />
                </div>
                <a 
                  href={step.example.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-3 py-1 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm"
                  aria-label={`Start with ${step.example.title}`}
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

/**
 * Main component that switches between different modes
 */
const Chooser: React.FC = () => {
  const [mode, setMode] = useState<'simple' | 'advanced' | 'dropdown' | 'gallery' | 'path'>('simple');

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-wrap justify-center gap-2 mb-4" role="tablist" aria-label="Example finder modes">
        <Button 
          onClick={() => setMode('simple')} 
          variant={mode === 'simple' ? 'primary' : 'secondary'}
          ariaLabel="Switch to Simple Search mode"
        >
          Simple Search
        </Button>
        <Button 
          onClick={() => setMode('advanced')} 
          variant={mode === 'advanced' ? 'primary' : 'secondary'}
          ariaLabel="Switch to Quiz Finder mode"
        >
          Quiz Finder
        </Button>
        <Button 
          onClick={() => setMode('dropdown')} 
          variant={mode === 'dropdown' ? 'primary' : 'secondary'}
          ariaLabel="Switch to Browse by Category mode"
        >
          Browse by Category
        </Button>
        <Button 
          onClick={() => setMode('gallery')} 
          variant={mode === 'gallery' ? 'primary' : 'secondary'}
          ariaLabel="Switch to Visual Gallery mode"
        >
          Visual Gallery
        </Button>
        <Button 
          onClick={() => setMode('path')} 
          variant={mode === 'path' ? 'primary' : 'secondary'}
          ariaLabel="Switch to Learning Paths mode"
        >
          Learning Paths
        </Button>
      </div>
      <div 
        className="p-6 border border-border-divider rounded-lg bg-background-primary"
        role="tabpanel"
        aria-label={`${mode} panel`}
      >
        {mode === 'simple' && <SimpleQuestion />}
        {mode === 'advanced' && <AdvancedQuestion />}
        {mode === 'dropdown' && <DropdownChooser />}
        {mode === 'gallery' && <CardGallery />}
        {mode === 'path' && <LearningPath />}
      </div>
    </div>
  );
};

/**
 * Main section component
 */
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
