# Contributing to CodeRover

Thank you for considering contributing to CodeRover! We welcome contributions from the community and are grateful for your support.

## 🤝 How to Contribute

### Reporting Issues

If you find a bug or have a feature request, please create an issue on GitHub:

1. Search existing issues to avoid duplicates
2. Use a clear and descriptive title
3. Provide detailed steps to reproduce the issue
4. Include relevant code snippets or screenshots
5. Specify your environment (browser, OS, Node.js version)

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/coderover-web.git
   cd coderover-web
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Update .env with your configuration
   ```
5. **Start the development server**:
   ```bash
   npm run dev
   ```

### Making Changes

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Make your changes** following our coding standards
3. **Test your changes**:
   ```bash
   npm run lint
   npm run build
   ```
4. **Commit your changes**:
   ```bash
   git commit -m "Add feature: your descriptive commit message"
   ```
5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request** on GitHub

## 📋 Coding Standards

### Code Style
- Use TypeScript for all new code
- Follow the existing ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Keep functions small and focused

### React/TypeScript Guidelines
- Use functional components with hooks
- Define proper TypeScript interfaces for props
- Use React.FC or explicit type annotations
- Handle errors gracefully with try-catch blocks
- Implement proper loading and error states

### CSS/Styling
- Use TailwindCSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use semantic HTML elements
- Ensure accessibility compliance

### File Organization
- Place components in appropriate directories
- Use index files for cleaner imports
- Keep utility functions in the util/ directory
- Define types in the types/ directory
- Follow existing naming conventions

## 🧪 Testing

- Write unit tests for utility functions
- Test components with user interactions
- Ensure all tests pass before submitting
- Add tests for new features and bug fixes

## 📝 Pull Request Process

### Before Submitting
- [ ] Code follows the project's coding standards
- [ ] All tests pass
- [ ] No linting errors
- [ ] Documentation updated (if necessary)
- [ ] Self-review completed

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Manual testing completed
- [ ] Unit tests added/updated
- [ ] All tests pass

## Screenshots (if applicable)
Add screenshots for UI changes

## Additional Notes
Any additional information
```

### Review Process
1. Automated checks must pass
2. Code review by maintainers
3. Address feedback if requested
4. Final approval and merge

## 🎯 Areas for Contribution

### High Priority
- Bug fixes and stability improvements
- Performance optimizations
- Accessibility enhancements
- Test coverage improvements

### Medium Priority
- New features and enhancements
- UI/UX improvements
- Documentation updates
- Code refactoring

### Nice to Have
- Internationalization (i18n)
- Additional AI model integrations
- Advanced reporting features
- Developer tools and debugging

## 📖 Resources

### Documentation
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

### Tools
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Configuration](https://prettier.io/docs/en/configuration.html)
- [Git Best Practices](https://git-scm.com/book/en/v2)

## 🏆 Recognition

Contributors will be:
- Listed in the project's contributors
- Mentioned in release notes
- Given credit in the README
- Invited to the contributors' team (for regular contributors)

## 📞 Getting Help

If you need help or have questions:
- Open a discussion on GitHub
- Check existing issues and discussions
- Contact maintainers through GitHub

## 🔒 Security

For security vulnerabilities, please follow our [Security Policy](SECURITY.md) rather than opening a public issue.

---

Thank you for contributing to CodeRover! 🚀