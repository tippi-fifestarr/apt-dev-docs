import { ExampleCategory, ExampleDifficulty, Example } from './types';

/**
 * Comprehensive dataset of code examples with enriched metadata
 */
export const examples: Example[] = [
  { 
    id: "todo", 
    title: "To-Do List", 
    description: "Build a To-Do List on Web3",
    longDescription: "A simple introduction to building a stateful To-Do List on Aptos. Perfect for beginners to understand on-chain state management.",
    url: "https://learn.aptoslabs.com/en/code-examples/todo-list",
    categories: ['basics'],
    difficulty: 'beginner',
    estimatedTime: "1-2 hours",
    tags: ['web3', 'beginner-friendly', 'state-management'],
    isNew: false,
    userStories: [
      "As a beginner, I want to understand on-chain state management.",
      "I need a simple project to learn the basics of dApp development."
    ]
  },
  { 
    id: "nft", 
    title: "NFT Marketplace", 
    description: "Create a Marketplace for NFTs",
    longDescription: "Build a decentralized marketplace for minting and trading NFTs. Learn how to handle digital assets and marketplace transactions.",
    url: "https://learn.aptoslabs.com/en/code-examples/nft-marketplace",
    categories: ['nft', 'defi'],
    difficulty: 'intermediate',
    estimatedTime: "3-4 hours",
    tags: ['nft', 'marketplace', 'digital-assets', 'trading'],
    isNew: false,
    userStories: [
      "As an artist, I want to list and trade my digital art.",
      "I need to learn how to create a secure NFT marketplace."
    ]
  },
  { 
    id: "billboard", 
    title: "Billboard", 
    description: "Build a Billboard on Web3",
    longDescription: "Create an on-chain billboard where messages can be stored and updated. A fun project to understand state changes and data persistence.",
    url: "https://learn.aptoslabs.com/en/code-examples/billboard",
    categories: ['basics'],
    difficulty: 'beginner',
    estimatedTime: "1-2 hours",
    tags: ['web3', 'beginner-friendly', 'state-management'],
    isNew: false,
    userStories: [
      "I want to learn how to display dynamic data on-chain.",
      "I need a quick project to understand blockchain state updates."
    ]
  },
  { 
    id: "launchpad", 
    title: "Launchpad", 
    description: "Develop a Fungible Asset Launchpad",
    longDescription: "Learn how to develop a platform for launching fungible tokens. Covers token creation, distribution, and fundraising mechanics.",
    url: "https://learn.aptoslabs.com/en/code-examples/launchpad",
    categories: ['defi'],
    difficulty: 'intermediate',
    estimatedTime: "3-4 hours",
    tags: ['fungible-assets', 'tokens', 'fundraising'],
    isNew: false,
    userStories: [
      "I need to launch a new token and understand distribution mechanics.",
      "I'm evaluating decentralized fundraising options for my project."
    ]
  },
  { 
    id: "aptosfriend", 
    title: "Aptos Friend", 
    description: "Build an Aptos Friend Social App",
    longDescription: "Create a social application that leverages on-chain identity and interactions. Bridge Web2 social paradigms with decentralized technologies.",
    url: "https://learn.aptoslabs.com/en/code-examples/aptos-friend",
    categories: ['social'],
    difficulty: 'intermediate',
    estimatedTime: "2-3 hours",
    tags: ['social', 'web3', 'identity'],
    isNew: true,
    userStories: [
      "I want to integrate social features into my dApp.",
      "I'm looking to blend familiar social experiences with blockchain technology."
    ]
  },
  { 
    id: "vesting", 
    title: "Vesting Token", 
    description: "Staked Locked APT Example",
    longDescription: "Dive into the mechanics of token vesting, showing how tokens can be locked and released gradually. Essential for secure reward systems.",
    url: "https://learn.aptoslabs.com/en/code-examples/vesting-token",
    categories: ['defi'],
    difficulty: 'intermediate',
    estimatedTime: "2-3 hours",
    tags: ['staking', 'tokens', 'vesting'],
    isNew: true,
    userStories: [
      "I need to understand token vesting for team member distributions.",
      "I'm looking for examples of locking tokens with vesting schedules."
    ]
  },
  { 
    id: "epoch", 
    title: "Epoch-based Rewards Pool", 
    description: "Manage Rewards for Multiple Tokens",
    longDescription: "An advanced rewards system that operates on epochs. Perfect for DeFi projects where token rewards are issued over specific time intervals.",
    url: "https://learn.aptoslabs.com/en/code-examples/epoch-based-rewards-pool",
    categories: ['defi'],
    difficulty: 'advanced',
    estimatedTime: "4-5 hours",
    tags: ['rewards', 'tokens', 'defi-advanced'],
    isNew: false,
    userStories: [
      "I want to see how rewards are distributed in intervals (epochs).",
      "I'm interested in multi-token reward systems for my DeFi project."
    ]
  },
  { 
    id: "upgrades", 
    title: "Managing Contract Upgrades", 
    description: "Package Management System Example",
    longDescription: "Learn best practices for managing smart contract upgrades. Maintain a consistent contract interface while enabling versioning and improvements.",
    url: "https://learn.aptoslabs.com/en/code-examples/managing-contract-upgrades",
    categories: ['infrastructure'],
    difficulty: 'advanced',
    estimatedTime: "3-4 hours",
    tags: ['upgrades', 'smart-contracts', 'versioning'],
    isNew: false,
    userStories: [
      "I need to safely upgrade my smart contracts without breaking functionality.",
      "I'm looking for strategies to manage contract versioning and deployment."
    ]
  },
  { 
    id: "dex", 
    title: "Swap: Solidity Style ve(3,3) DEX", 
    description: "Modules for DEX Implementation",
    longDescription: "Build a decentralized exchange on Aptos, modeled after popular Solidity-based DEX patterns. Focuses on token swapping and liquidity management.",
    url: "https://learn.aptoslabs.com/en/code-examples/swap-ve33-dex",
    categories: ['defi'],
    difficulty: 'advanced',
    estimatedTime: "5+ hours",
    tags: ['dex', 'swap', 'solidity', 'liquidity'],
    isNew: false,
    userStories: [
      "I'm transitioning from Ethereum and want to build a DEX on Aptos.",
      "I need robust token swap logic for my DeFi application."
    ]
  },
  { 
    id: "dutch", 
    title: "Dutch Auction", 
    description: "Build a Dutch Auction",
    longDescription: "Implement a Dutch Auction where the price of an asset drops over time until a buyer emerges. Ideal for experimenting with dynamic pricing models.",
    url: "https://learn.aptoslabs.com/en/code-examples/dutch-auction",
    categories: ['defi', 'nft'],
    difficulty: 'intermediate',
    estimatedTime: "3-4 hours",
    tags: ['auction', 'marketplace', 'pricing'],
    isNew: true,
    userStories: [
      "I want to implement a descending price auction for selling assets.",
      "I'm exploring alternative pricing mechanisms for my marketplace."
    ]
  },
  { 
    id: "stablecoin", 
    title: "Stablecoin", 
    description: "Create a Stablecoin on Aptos",
    longDescription: "Learn how to create and manage a blockchain-based stablecoin. Covers pegging mechanisms and collateralization strategies.",
    url: "https://learn.aptoslabs.com/en/code-examples/stablecoin",
    categories: ['defi'],
    difficulty: 'advanced',
    estimatedTime: "4-5 hours",
    tags: ['stablecoin', 'tokens', 'pegging'],
    isNew: false,
    userStories: [
      "I'm creating a stablecoin and need to understand the mechanics.",
      "I want to explore strategies for maintaining price stability."
    ]
  },
  { 
    id: "dispatch", 
    title: "Dispatchable Fungible Assets", 
    description: "Inject Custom Logic During Asset Transfers",
    longDescription: "Learn how to override default token transfer behavior by injecting custom logic. Perfect for projects with specific business rules.",
    url: "https://learn.aptoslabs.com/en/code-examples/dispatchable-fungible-assets",
    categories: ['defi', 'infrastructure'],
    difficulty: 'advanced',
    estimatedTime: "3-4 hours",
    tags: ['fungible-assets', 'transfers', 'custom-logic'],
    isNew: false,
    userStories: [
      "I need to inject custom logic into token transfers for business rules.",
      "I'm looking to add extra checks during asset transfers for security."
    ]
  },
  { 
    id: "thirdparty", 
    title: "Depend on Third-Party Smart Contracts", 
    description: "Invoke External Smart Contract Methods",
    longDescription: "Learn how to integrate third-party smart contracts safely. Provides guidance on invoking external methods for modular dApp development.",
    url: "https://learn.aptoslabs.com/en/code-examples/depend-on-third-party-smart-contracts",
    categories: ['infrastructure'],
    difficulty: 'intermediate',
    estimatedTime: "2-3 hours",
    tags: ['smart-contracts', 'integration', 'external-calls'],
    isNew: false,
    userStories: [
      "I want to call external smart contracts to extend my dApp's functionality.",
      "I need to build a system where contracts depend on external logic safely."
    ]
  },
  { 
    id: "randomness", 
    title: "On-Chain Randomness", 
    description: "Implement Fair and Transparent Minting",
    longDescription: "Tackle the challenge of on-chain randomness with methods for generating unbiased random numbers. Essential for gaming and fair distributions.",
    url: "https://learn.aptoslabs.com/en/code-examples/on-chain-randomness",
    categories: ['infrastructure', 'nft'],
    difficulty: 'intermediate',
    estimatedTime: "2-3 hours",
    tags: ['randomness', 'minting', 'gaming'],
    isNew: false,
    userStories: [
      "I need a transparent method for generating random numbers for games.",
      "I'm building a lottery and need fair randomization."
    ]
  },
  { 
    id: "keyless", 
    title: "Aptos Keyless", 
    description: "Seamless Login Experience with Web2 Logins",
    longDescription: "Combine Web2 login convenience with blockchain security. Improve user experience for non-crypto natives with familiar authentication flows.",
    url: "https://learn.aptoslabs.com/en/code-examples/aptos-keyless",
    categories: ['auth'],
    difficulty: 'intermediate',
    estimatedTime: "2-3 hours",
    tags: ['authentication', 'web2', 'user-experience'],
    isNew: true,
    userStories: [
      "I want to implement a seamless login experience without key management.",
      "I need to integrate Web2 login methods for better onboarding."
    ]
  },
  { 
    id: "voting", 
    title: "Voting", 
    description: "On-Chain Voting System on Aptos",
    longDescription: "Create a secure on-chain voting system from proposal submission to vote tallying. Vital for decentralized governance frameworks.",
    url: "https://learn.aptoslabs.com/en/code-examples/voting",
    categories: ['social', 'infrastructure'],
    difficulty: 'intermediate',
    estimatedTime: "3-4 hours",
    tags: ['voting', 'governance', 'dao'],
    isNew: true,
    userStories: [
      "I need a reliable on-chain voting system for governance.",
      "I'm building a DAO and need transparent decision-making mechanisms."
    ]
  },
];

// Helper constants
export const categoryLabels: Record<ExampleCategory, string> = {
  'basics': 'Basics',
  'defi': 'DeFi',
  'nft': 'NFTs',
  'social': 'Social',
  'infrastructure': 'Infrastructure',
  'auth': 'Authentication'
};

export const difficultyLabels: Record<ExampleDifficulty, string> = {
  'beginner': 'Beginner',
  'intermediate': 'Intermediate',
  'advanced': 'Advanced'
};

export const difficultyColors: Record<ExampleDifficulty, string> = {
  'beginner': 'bg-green-100 text-green-800',
  'intermediate': 'bg-blue-100 text-blue-800',
  'advanced': 'bg-purple-100 text-purple-800'
};

export const categoryColors: Record<ExampleCategory, string> = {
  'basics': 'bg-gray-100 text-gray-800',
  'defi': 'bg-yellow-100 text-yellow-800',
  'nft': 'bg-pink-100 text-pink-800',
  'social': 'bg-indigo-100 text-indigo-800',
  'infrastructure': 'bg-cyan-100 text-cyan-800',
  'auth': 'bg-orange-100 text-orange-800'
};
