/**
 * Type definitions for the Code Examples Finder component
 */

/**
 * Categories for code examples
 */
export type ExampleCategory = 
  | 'basics' 
  | 'defi' 
  | 'nft' 
  | 'social' 
  | 'infrastructure' 
  | 'auth';

/**
 * Difficulty levels for code examples
 */
export type ExampleDifficulty = 
  | 'beginner' 
  | 'intermediate' 
  | 'advanced';

/**
 * Represents a code example with rich metadata
 */
export interface Example {
  /** Unique identifier for the example */
  id: string;
  /** Short title of the example */
  title: string;
  /** Brief description (1 line) */
  description: string;
  /** Detailed description (multiple sentences) */
  longDescription: string;
  /** URL to the example */
  url: string;
  /** Categories this example belongs to */
  categories: ExampleCategory[];
  /** Difficulty level */
  difficulty: ExampleDifficulty;
  /** Estimated time to complete (e.g., "1-2 hours") */
  estimatedTime?: string;
  /** Searchable tags */
  tags?: string[];
  /** Whether this is a new example */
  isNew?: boolean;
  /** User stories describing use cases */
  userStories?: string[];
}

/**
 * Filter criteria for examples
 */
export interface ExampleFilters {
  /** Text search query */
  query?: string;
  /** Filter by categories */
  categories?: ExampleCategory[];
  /** Filter by difficulty */
  difficulty?: ExampleDifficulty;
  /** Show only new examples */
  onlyNew?: boolean;
}

/**
 * Sort options for examples
 */
export type ExampleSortOption = 'difficulty' | 'category' | 'title';
