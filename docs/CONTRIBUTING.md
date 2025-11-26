# Contributing to EaseSplit

Thank you for your interest in contributing to EaseSplit! We welcome contributions from the community and are excited to see what you'll bring to the project.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing to the project.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the [issue tracker](https://github.com/your-username/easesplit/issues) as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps which reproduce the problem
- Provide specific examples to demonstrate the steps
- Describe the behavior you observed after following the steps
- Explain which behavior you expected to see instead and why
- Include screenshots if possible
- Note your browser, browser version, and operating system

### Suggesting Enhancements

Enhancement suggestions are tracked as [GitHub issues](https://github.com/your-username/easesplit/issues). When creating an enhancement suggestion, please include:

- Use a clear and descriptive title
- Provide a step-by-step description of the suggested enhancement
- Provide specific examples to demonstrate the steps
- Describe the current behavior and explain which behavior you expected to see instead
- Explain why this enhancement would be useful to most EaseSplit users

### Pull Requests

The process described here has several goals:

- Maintain EaseSplit's quality
- Fix problems that are important to users
- Engage the community in working toward the best possible EaseSplit
- Enable a sustainable system for EaseSplit's maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in [the template](.github/PULL_REQUEST_TEMPLATE.md)
2. Follow the [styleguides](#styleguides)
3. After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Consider starting the commit message with an applicable emoji:
  - :art: `:art:` when improving the format/structure of the code
  - :racehorse: `:racehorse:` when improving performance
  - :non-potable_water: `:non-potable_water:` when plugging memory leaks
  - :memo: `:memo:` when writing docs
  - :penguin: `:penguin:` when fixing something on Linux
  - :apple: `:apple:` when fixing something on macOS
  - :checkered_flag: `:checkered_flag:` when fixing something on Windows
  - :bug: `:bug:` when fixing a bug
  - :fire: `:fire:` when removing code or files
  - :green_heart: `:green_heart:` when fixing the CI build
  - :white_check_mark: `:white_check_mark:` when adding tests
  - :lock: `:lock:` when dealing with security
  - :arrow_up: `:arrow_up:` when upgrading dependencies
  - :arrow_down: `:arrow_down:` when downgrading dependencies
  - :shirt: `:shirt:` when removing linter warnings

### TypeScript Styleguide

All TypeScript code must adhere to the following:

- All code must be formatted with `pnpm format`
- All code must pass linting with `pnpm lint`
- Prefer functional components over class components
- Use TypeScript interfaces for props and state
- Use descriptive variable and function names
- Write JSDoc comments for all functions, interfaces, and complex logic
- Keep functions small and focused on a single responsibility
- Avoid complex nested callbacks - extract to named functions when possible

### CSS/Tailwind Styleguide

- Use Tailwind CSS utility classes whenever possible
- Follow the existing class ordering pattern
- Extract repeated utility combinations into components or custom classes
- Use consistent spacing and sizing scales
- Maintain accessibility standards (proper contrast, ARIA attributes, etc.)

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/easesplit.git`
3. Create a branch for your feature or bugfix: `git checkout -b feature/your-feature-name`
4. Install dependencies: `pnpm install`
5. Start the development server: `pnpm dev`
6. Make your changes
7. Run tests: `pnpm test` (if applicable)
8. Commit your changes following the commit message guidelines
9. Push to your fork: `git push origin feature/your-feature-name`
10. Create a pull request

## Additional Notes

### Issue and Pull Request Labels

This section lists the labels we use to help us track and manage issues and pull requests.

- `bug` - Issues that are bugs
- `enhancement` - Issues that are feature requests
- `documentation` - Issues or pull requests related to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `question` - Further information is requested

Thank you for reading and contributing to EaseSplit!
