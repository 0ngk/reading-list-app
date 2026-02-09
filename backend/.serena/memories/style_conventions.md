# Code Style & Conventions

## Formatting
- **Primary**: Biome (configured in biome.json)
- **Secondary**: Prettier (for legacy compatibility)
- Indent: 2 spaces
- Quote style: double quotes
- Organize imports: enabled

## TypeScript
- Strict mode enabled
- Use `type` imports when appropriate (though `useImportType: off` in Biome)
- Unsafe parameter decorators enabled for NestJS

## NestJS Patterns
- Use `@Injectable()` decorator for services
- Use `@Module()` for module definitions
- Export services from modules for dependency injection
- Use Logger from `@nestjs/common`

## Naming Conventions
- Files: kebab-case (e.g., `scraper.service.ts`)
- Classes: PascalCase (e.g., `ScraperService`)
- Functions: camelCase (e.g., `extractTitle`)
- Types/Interfaces: PascalCase (e.g., `ScrapeResult`)
- Constants: SCREAMING_SNAKE_CASE (e.g., `TIMEOUT_MS`)

## Error Handling
- Custom error classes extending `Error`
- Include context in error messages (e.g., URL for scraping errors)
