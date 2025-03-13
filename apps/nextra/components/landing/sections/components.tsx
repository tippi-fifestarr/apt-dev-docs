import React from 'react';
import { Example, ExampleCategory, ExampleDifficulty } from './types';
import { categoryColors, categoryLabels, difficultyColors, difficultyLabels } from './exampleData';

/**
 * Badge component for displaying categories, difficulty, etc.
 */
export const Badge: React.FC<{
  text: string;
  className?: string;
  ariaLabel?: string;
}> = ({ text, className, ariaLabel }) => (
  <span 
    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${className}`}
    aria-label={ariaLabel}
  >
    {text}
  </span>
);

/**
 * Category badge component
 */
export const CategoryBadge: React.FC<{
  category: ExampleCategory;
  className?: string;
}> = ({ category, className = '' }) => (
  <Badge 
    text={categoryLabels[category]} 
    className={`${categoryColors[category]} ${className}`}
    ariaLabel={`Category: ${categoryLabels[category]}`}
  />
);

/**
 * Difficulty badge component
 */
export const DifficultyBadge: React.FC<{
  difficulty: ExampleDifficulty;
  className?: string;
}> = ({ difficulty, className = '' }) => (
  <Badge 
    text={difficultyLabels[difficulty]} 
    className={`${difficultyColors[difficulty]} ${className}`}
    ariaLabel={`Difficulty: ${difficultyLabels[difficulty]}`}
  />
);

/**
 * New badge component
 */
export const NewBadge: React.FC<{
  className?: string;
}> = ({ className = '' }) => (
  <Badge 
    text="NEW" 
    className={`bg-red-100 text-red-800 ${className}`}
    ariaLabel="New example"
  />
);

/**
 * Time badge component
 */
export const TimeBadge: React.FC<{
  time: string;
  className?: string;
}> = ({ time, className = '' }) => (
  <Badge 
    text={time} 
    className={`bg-gray-100 text-gray-800 ${className}`}
    ariaLabel={`Estimated time: ${time}`}
  />
);

/**
 * User story component
 */
export const UserStory: React.FC<{
  story: string;
  className?: string;
}> = ({ story, className = '' }) => (
  <div className={`italic text-sm text-text-muted ${className}`}>
    "{story}"
  </div>
);

/**
 * Example card component
 */
export const ExampleCard: React.FC<{
  example: Example;
  compact?: boolean;
  className?: string;
  onClick?: () => void;
}> = ({ example, compact = false, className = '', onClick }) => (
  <div 
    className={`border border-border-divider rounded-lg overflow-hidden hover:shadow-md transition-shadow ${compact ? 'p-3' : 'p-4'} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    onClick={onClick}
    tabIndex={onClick ? 0 : undefined}
    onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    role={onClick ? 'button' : undefined}
    aria-label={onClick ? `Select ${example.title} example` : undefined}
  >
    <div className="flex justify-between items-start mb-2">
      <h4 className={`font-medium ${compact ? 'text-sm' : 'text-base'}`}>{example.title}</h4>
      {example.isNew && <NewBadge />}
    </div>
    
    {!compact && <p className="text-sm text-text-muted mb-3">{example.description}</p>}
    
    <div className="flex flex-wrap gap-1 mb-3">
      {example.categories.map(cat => (
        <CategoryBadge key={cat} category={cat} className={compact ? 'text-xs' : ''} />
      ))}
      <DifficultyBadge difficulty={example.difficulty} className={compact ? 'text-xs' : ''} />
      {example.estimatedTime && !compact && (
        <TimeBadge time={example.estimatedTime} />
      )}
    </div>
    
    {!compact && example.userStories && example.userStories.length > 0 && (
      <div className="mb-3">
        <UserStory story={example.userStories[0]} />
      </div>
    )}
    
    <a 
      href={example.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-block px-3 py-1 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm"
      aria-label={`View ${example.title} example`}
      onClick={(e) => e.stopPropagation()} // Prevent triggering parent onClick
    >
      View Example
    </a>
  </div>
);

/**
 * Button component with proper accessibility
 */
export const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
}> = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary',
  className = '',
  ariaLabel,
  type = 'button'
}) => {
  const baseStyles = "px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50";
  
  const variantStyles = {
    primary: "bg-primary text-white hover:bg-primary/90 disabled:bg-gray-300 disabled:text-gray-500",
    secondary: "bg-background-elevated text-text-primary hover:bg-background-elevated/80 disabled:bg-gray-100 disabled:text-gray-400",
    outline: "border border-border-divider bg-transparent hover:bg-background-elevated/50 disabled:border-gray-200 disabled:text-gray-400"
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

/**
 * Loading spinner component
 */
export const LoadingSpinner: React.FC<{
  size?: 'small' | 'medium' | 'large';
  className?: string;
}> = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-6 h-6 border-2',
    large: 'w-8 h-8 border-3'
  };
  
  return (
    <div 
      className={`animate-spin rounded-full border-t-transparent border-primary ${sizeClasses[size]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

/**
 * Empty state component
 */
export const EmptyState: React.FC<{
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}> = ({ message, action, className = '' }) => (
  <div className={`p-8 border border-border-divider rounded-lg bg-background-elevated text-center ${className}`}>
    <p className="text-text-muted mb-4">{message}</p>
    {action && (
      <Button 
        onClick={action.onClick} 
        variant="secondary"
      >
        {action.label}
      </Button>
    )}
  </div>
);

/**
 * Filter chip component
 */
export const FilterChip: React.FC<{
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}> = ({ label, active = false, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 text-sm rounded-full transition-colors ${
      active
        ? 'bg-primary text-white'
        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
    } ${className}`}
    aria-pressed={active}
  >
    {label}
  </button>
);

/**
 * Search input component
 */
export const SearchInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  className?: string;
}> = ({ value, onChange, onSearch, placeholder = 'Search...', className = '' }) => (
  <div className={`flex gap-2 ${className}`}>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="flex-1 px-4 py-2 border border-border-divider rounded-md bg-background-primary text-text-primary"
      onKeyDown={(e) => e.key === 'Enter' && onSearch()}
      aria-label="Search examples"
    />
    <Button 
      onClick={onSearch}
      ariaLabel="Search"
    >
      Search
    </Button>
  </div>
);
