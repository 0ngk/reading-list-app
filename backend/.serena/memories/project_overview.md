# Reading List Backend

## Purpose
A backend service for a reading list application that scrapes web articles, extracts content, and uses LLM (Gemini) for processing.

## Tech Stack
- **Framework**: NestJS 11
- **Language**: TypeScript 5.7
- **Database**: PostgreSQL with TypeORM
- **Package Manager**: pnpm
- **LLM**: Google Gemini (@google/genai)
- **Web Scraping**: cheerio, jsdom, @mozilla/readability, robots-parser
- **Validation**: Zod

## Project Structure
```
src/
├── article/        # Article management module
├── config/         # Environment configuration
├── database/       # Database module (TypeORM)
├── gemini/         # Gemini AI integration
├── llm/            # LLM abstraction layer
├── scraper/        # Web scraping module
│   ├── extractors/ # Content/title extraction
│   └── types/      # TypeScript types
└── shared/         # Shared utilities, pipes, strategies
```
