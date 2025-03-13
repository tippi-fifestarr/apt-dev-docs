import { useState, useCallback } from 'react';
import { Example, ExampleCategory, ExampleDifficulty, ExampleFilters, ExampleSortOption } from './types';
import { examples } from './exampleData';

/**
 * Function to perform fuzzy search (not a hook)
 */
function fuzzySearch(
  query: string | undefined | null,
  exampleList: Example[] | undefined | null
): Example[] {
  try {
    // Handle null/undefined inputs
    if (!query || query === '') return exampleList || [];
    if (!exampleList) return [];
    
    // Ensure we have an array
    if (!Array.isArray(exampleList)) return [];
    
    // Early return for empty arrays
    if (exampleList.length === 0) return [];
    
    const lowerQuery = query.toLowerCase();
    const queryTerms = lowerQuery.split(/\s+/).filter(term => term.length > 0);
    
    if (queryTerms.length === 0) return exampleList;
    
    // Filter out any null or undefined items
    const validExamples = exampleList.filter(e => e != null);
    
    if (validExamples.length === 0) return [];
    
    return validExamples.filter((example) => {
      if (!example) return false;
      
      // Calculate a score for each example based on matches
      let score = 0;
      
      // Check title (highest weight)
      if (example.title && example.title.toLowerCase().includes(lowerQuery)) {
        score += 10;
      }
      
      // Check description
      if (example.description && example.description.toLowerCase().includes(lowerQuery)) {
        score += 5;
      }
      
      // Check long description
      if (example.longDescription && example.longDescription.toLowerCase().includes(lowerQuery)) {
        score += 3;
      }
      
      // Check tags
      if (example.tags && Array.isArray(example.tags)) {
        for (const tag of example.tags) {
          if (tag && tag.toLowerCase().includes(lowerQuery)) {
            score += 8;
          }
          
          // Check individual terms against tags
          for (const term of queryTerms) {
            if (tag && tag.toLowerCase().includes(term)) {
              score += 2;
            }
          }
        }
      }
      
      // Check user stories
      if (example.userStories && Array.isArray(example.userStories)) {
        for (const story of example.userStories) {
          if (story && story.toLowerCase().includes(lowerQuery)) {
            score += 4;
          }
          
          // Check individual terms against user stories
          for (const term of queryTerms) {
            if (story && story.toLowerCase().includes(term)) {
              score += 1;
            }
          }
        }
      }
      
      return score > 0;
    });
  } catch (error) {
    console.error('Error in fuzzy search:', error);
    return [];
  }
}

/**
 * Custom hook for fuzzy searching examples
 * @param query Search query
 * @param exampleList List of examples to search
 * @returns Filtered examples matching the query
 */
export const useFuzzySearch = (
  query: string | undefined | null,
  exampleList: Example[] | undefined | null = examples
) => {
  // Use a regular function instead of useMemo to avoid potential issues
  return fuzzySearch(query, exampleList);
};

/**
 * Function to filter examples (not a hook)
 */
function filterExamples(
  filters: ExampleFilters | undefined | null,
  exampleList: Example[] | undefined | null
): Example[] {
  try {
    // Handle null/undefined inputs
    if (!exampleList) return [];
    if (!filters) return exampleList;
    
    // Ensure we have an array
    if (!Array.isArray(exampleList)) return [];
    
    // Early return for empty arrays
    if (exampleList.length === 0) return [];
    
    // Filter out any null or undefined items
    const validExamples = exampleList.filter(e => e != null);
    
    if (validExamples.length === 0) return [];
    
    // Create a copy to avoid mutating the original
    let filtered = [...validExamples];
    
    // Filter by search query if provided
    if (filters.query) {
      // Use the fuzzy search function directly instead of the hook
      const searchResults = useFuzzySearch(filters.query, filtered);
      if (Array.isArray(searchResults)) {
        filtered = searchResults;
      }
    }
    
    // Filter by categories if provided
    if (filters.categories && Array.isArray(filters.categories) && filters.categories.length > 0) {
      filtered = filtered.filter(example => {
        if (!example?.categories || !Array.isArray(example.categories)) {
          return false;
        }
        
        return filters.categories!.some(category => 
          example.categories.includes(category)
        );
      });
    }
    
    // Filter by difficulty if provided
    if (filters.difficulty) {
      filtered = filtered.filter(example => 
        example?.difficulty === filters.difficulty
      );
    }
    
    // Filter by new flag if requested
    if (filters.onlyNew) {
      filtered = filtered.filter(example => 
        example?.isNew === true
      );
    }
    
    return filtered;
  } catch (error) {
    console.error('Error in filtering examples:', error);
    return [];
  }
}

/**
 * Custom hook for filtering examples based on multiple criteria
 * @param filters Filter criteria
 * @param exampleList List of examples to filter
 * @returns Filtered examples
 */
export const useFilteredExamples = (
  filters: ExampleFilters | undefined | null,
  exampleList: Example[] | undefined | null = examples
) => {
  // Use a regular function instead of useMemo to avoid potential issues
  return filterExamples(filters, exampleList);
};

/**
 * Function to sort examples (not a hook)
 */
function sortExamples(
  exampleList: Example[] | undefined | null,
  sortBy: ExampleSortOption = 'difficulty'
): Example[] {
  try {
    // Handle null/undefined inputs
    if (!exampleList) return [];
    
    // Ensure we have an array
    if (!Array.isArray(exampleList)) return [];
    
    // Early return for empty arrays
    if (exampleList.length === 0) return [];
    
    // Filter out any null or undefined items
    const validExamples = exampleList.filter(e => e != null);
    
    if (validExamples.length === 0) return [];
    
    // Create a copy to avoid mutating the original
    const sorted = [...validExamples];
    
    // Safe sorting with fallbacks
    switch (sortBy) {
      case 'difficulty':
        // Sort by difficulty level (beginner -> advanced)
        return sorted.sort((a, b) => {
          if (!a?.difficulty || !b?.difficulty) return 0;
          
          const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        });
        
      case 'category':
        // Sort by primary category
        return sorted.sort((a, b) => {
          if (!a?.categories?.length || !b?.categories?.length) return 0;
          
          return a.categories[0].localeCompare(b.categories[0]);
        });
        
      case 'title':
        // Sort alphabetically by title
        return sorted.sort((a, b) => {
          if (!a?.title || !b?.title) return 0;
          return a.title.localeCompare(b.title);
        });
        
      default:
        return sorted;
    }
  } catch (error) {
    console.error('Error in sorting examples:', error);
    return [];
  }
}

/**
 * Custom hook for sorting examples
 * @param examples Examples to sort
 * @param sortBy Sort criteria
 * @returns Sorted examples
 */
export const useSortedExamples = (
  exampleList: Example[] | undefined | null = [],
  sortBy: ExampleSortOption = 'difficulty'
) => {
  // Use a regular function instead of useMemo to avoid potential issues
  return sortExamples(exampleList, sortBy);
};

/**
 * Custom hook for managing example filters with state
 * @returns Filter state and handlers
 */
export const useExampleFilters = () => {
  const [filters, setFilters] = useState<ExampleFilters>({
    query: '',
    categories: [],
    difficulty: undefined,
    onlyNew: false
  });
  
  const [sortBy, setSortBy] = useState<ExampleSortOption>('difficulty');
  
  // Update query
  const setQuery = useCallback((query: string) => {
    setFilters(prev => ({ ...prev, query }));
  }, []);
  
  // Toggle category
  const toggleCategory = useCallback((category: ExampleCategory) => {
    setFilters(prev => {
      const categories = prev.categories || [];
      if (categories.includes(category)) {
        return {
          ...prev,
          categories: categories.filter(c => c !== category)
        };
      } else {
        return {
          ...prev,
          categories: [...categories, category]
        };
      }
    });
  }, []);
  
  // Set difficulty
  const setDifficulty = useCallback((difficulty: ExampleDifficulty | undefined) => {
    setFilters(prev => ({ ...prev, difficulty }));
  }, []);
  
  // Toggle new only
  const toggleNewOnly = useCallback(() => {
    setFilters(prev => ({ ...prev, onlyNew: !prev.onlyNew }));
  }, []);
  
  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({
      query: '',
      categories: [],
      difficulty: undefined,
      onlyNew: false
    });
  }, []);
  
  // Get filtered and sorted examples
  const filteredExamples = useFilteredExamples(filters);
  const sortedExamples = useSortedExamples(filteredExamples, sortBy);
  
  return {
    filters,
    sortBy,
    setQuery,
    toggleCategory,
    setDifficulty,
    toggleNewOnly,
    setSortBy,
    clearFilters,
    filteredExamples,
    sortedExamples
  };
};

/**
 * Custom hook for the quiz component
 * @returns Quiz state and handlers
 */
export const useExampleQuiz = () => {
  // Quiz state
  const [currentStep, setCurrentStep] = useState(0);
  const [experience, setExperience] = useState<'none' | 'some' | 'extensive'>('none');
  const [background, setBackground] = useState<'web2' | 'blockchain' | 'both' | 'none'>('none');
  const [interestCategory, setInterestCategory] = useState<ExampleCategory | ''>('');
  const [timeAvailable, setTimeAvailable] = useState<'short' | 'medium' | 'long'>('medium');
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Reset quiz
  const resetQuiz = useCallback(() => {
    setCurrentStep(0);
    setExperience('none');
    setBackground('none');
    setInterestCategory('');
    setTimeAvailable('medium');
    setQuizCompleted(false);
  }, []);
  
  // Go to next step
  const handleNext = useCallback(() => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  }, [currentStep]);
  
  // Go to previous step
  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);
  
  /**
   * Function to get recommended examples based on quiz answers (not a hook)
   */
  function getRecommendedExamples(
    isCompleted: boolean,
    userExperience: 'none' | 'some' | 'extensive',
    category: ExampleCategory | '',
    time: 'short' | 'medium' | 'long'
  ): Example[] {
    try {
      // Safely handle the case where examples might be undefined or null
      const safeExamples = examples || [];
      
      if (!isCompleted || !safeExamples || !Array.isArray(safeExamples) || safeExamples.length === 0) {
        return [];
      }
      
      // Filter out any null or undefined items
      const validExamples = safeExamples.filter(e => e != null);
      
      if (validExamples.length === 0) {
        return [];
      }
      
      // Map experience level to difficulty
      let targetDifficulty: ExampleDifficulty;
      switch (userExperience) {
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
      let filtered = validExamples.filter(e => {
        if (!e) return false;
        
        // Match by difficulty
        const difficultyMatch = e.difficulty === targetDifficulty;
        
        // Match by category if selected
        const categoryMatch = !category || 
          (e.categories && Array.isArray(e.categories) && 
           e.categories.includes(category as ExampleCategory));
        
        // Match by time available
        let timeMatch = true;
        if (e.estimatedTime) {
          if (time === 'short' && !e.estimatedTime.includes('1-2')) {
            timeMatch = false;
          } else if (time === 'medium' && !e.estimatedTime.includes('2-4')) {
            timeMatch = false;
          } else if (time === 'long' && !e.estimatedTime.includes('4+') && !e.estimatedTime.includes('5+')) {
            timeMatch = false;
          }
        }
        
        return difficultyMatch && categoryMatch && timeMatch;
      });
      
      // If no matches, broaden the search
      if (filtered.length === 0) {
        filtered = validExamples.filter(e => {
          if (!e) return false;
          
          if (category) {
            return e.categories && 
                   Array.isArray(e.categories) && 
                   e.categories.includes(category as ExampleCategory);
          }
          return e.difficulty === targetDifficulty;
        });
      }
      
      // If still no matches, show beginner examples
      if (filtered.length === 0) {
        filtered = validExamples.filter(e => e && e.difficulty === 'beginner');
      }
      
      // Limit to top 3 suggestions
      return filtered.slice(0, 3);
    } catch (error) {
      console.error('Error in quiz recommendations:', error);
      return [];
    }
  }
  
  // Get recommended examples based on quiz answers
  const recommendedExamples = getRecommendedExamples(
    quizCompleted,
    experience,
    interestCategory,
    timeAvailable
  );
  
  return {
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
  };
};
