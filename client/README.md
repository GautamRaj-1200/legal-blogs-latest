# Vite React TypeScript Template

A modern, feature-rich starter template for React projects using TypeScript, Vite, and comprehensive development tooling.

## Features

- ⚡️ [Vite](https://vitejs.dev/) - Lightning fast frontend build tool
- ⚛️ [React 19](https://react.dev/) - Latest version of React 
- 🔒 [TypeScript](https://www.typescriptlang.org/) - Type safety for your code
- 🧪 [Vitest](https://vitest.dev/) - Blazing fast testing framework powered by Vite
- 🔍 [ESLint](https://eslint.org/) - Code linting with the latest ESLint v9
- ✨ [Prettier](https://prettier.io/) - Code formatting
- 🐶 [Husky](https://typicode.github.io/husky/) - Git hooks made easy
- 🚫 [lint-staged](https://github.com/lint-staged/lint-staged) - Run linters on git staged files
- 📝 [commitlint](https://commitlint.js.org/) - Lint commit messages
- 📦 [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [pnpm](https://pnpm.io/) (v8 or newer)

## Getting Started

### Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/GautamRaj-1200/vite-react-ts-vitest-template.git
cd vite-react-ts-template

# Install dependencies
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

This will start the development server at [http://localhost:5173](http://localhost:5173).

### Building for Production

```bash
pnpm build
```

This will generate optimized production files in the `dist` directory.

### Preview Production Build

```bash
pnpm preview
```

## Testing

The template includes Vitest for unit and integration testing.

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

> Note: You'll need to add these scripts to your package.json after installing Vitest.

## Linting and Formatting

### Lint

```bash
# Run ESLint
pnpm lint

# Fix ESLint issues
pnpm lint:fix
```

### Format

```bash
# Check formatting
pnpm format:check

# Fix formatting issues
pnpm format:fix
```

## Git Hooks

The template includes Husky to set up Git hooks:

- **pre-commit**: Runs lint-staged to check code quality before committing
- **commit-msg**: Validates commit messages using commitlint

### Commit Message Convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Common types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: Code changes that neither fix a bug nor add a feature
- `test`: Adding or correcting tests
- `chore`: Changes to the build process or auxiliary tools

## Project Structure

```
vite-react-ts-template/
├── .husky/                 # Git hooks
├── public/                 # Static assets
├── src/
│   ├── assets/             # Project assets (images, fonts, etc.)
│   ├── components/         # React components
│   ├── App.tsx             # Main App component
│   ├── main.tsx            # Entry point
│   └── vite-env.d.ts       # Vite environment declaration
├── .eslintrc.cjs           # ESLint configuration
├── .gitignore              # Git ignore file
├── .prettierrc             # Prettier configuration
├── commitlint.config.js    # Commitlint configuration
├── index.html              # HTML template
├── package.json            # Project metadata and dependencies
├── tsconfig.json           # TypeScript configuration
├── tsconfig.node.json      # TypeScript configuration for Node
└── vite.config.ts          # Vite configuration
```

## Adding Vitest to Your Project

To add Vitest to the project:

1. Install Vitest and related packages:

```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom happy-dom
```

2. Add test scripts to your package.json:

```json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage"
}
```

3. Create a Vitest configuration in your vite.config.ts:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/test/setup.ts',
  },
});
```

4. Create a setup file at src/test/setup.ts:

```typescript
import '@testing-library/jest-dom';
```

5. Create a sample test file in src/components/Example.test.tsx:

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App', () => {
  it('renders headline', () => {
    render(<App />);
    expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument();
  });
});
```

## Customizing the Template

### Styling Solutions

You can add your preferred styling solution:

- **CSS Modules**: Already supported by Vite
- **Tailwind CSS**: 
  ```bash
  pnpm add -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```
- **Styled Components**: 
  ```bash
  pnpm add styled-components
  pnpm add -D @types/styled-components
  ```

### State Management

Consider adding one of these state management solutions:

- **Redux Toolkit**: 
  ```bash
  pnpm add @reduxjs/toolkit react-redux
  pnpm add -D @types/react-redux
  ```
- **Zustand**: 
  ```bash
  pnpm add zustand
  ```
- **Jotai**: 
  ```bash
  pnpm add jotai
  ```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
