# Security Policy

## Supported Versions

This project is actively maintained. Security updates are provided for the latest version.

| Version | Supported          |
| ------- | ------------------ |
| latest  | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it by:

1. **Do NOT** create a public GitHub issue
2. Email the maintainers with details about the vulnerability
3. Include steps to reproduce the issue if possible
4. Allow reasonable time for a fix before public disclosure

We will respond to security reports within 48 hours and provide regular updates on the fix progress.

## Security Best Practices

### Environment Variables

This project uses environment variables to store sensitive configuration. Follow these guidelines:

1. **Never commit `.env` files** - They are in `.gitignore` to prevent accidental commits
2. **Use `.env.example`** - This template shows required variables without exposing sensitive data
3. **Rotate secrets regularly** - Change API keys and credentials periodically
4. **Use different values per environment** - Production, staging, and development should have separate credentials

### Configuration Management

- Store sensitive data (API keys, emails, credentials) in environment variables
- Use the `.env.example` file as a template for required configuration
- Document all required environment variables in the README
- Never hardcode sensitive information in source code

### Dependency Security

- Regularly update dependencies to patch security vulnerabilities
- Use `npm audit` to check for known vulnerabilities
- Review dependency updates for security advisories

## Additional Resources

For more information on securing web applications:
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Vite Environment Variables Guide](https://vitejs.dev/guide/env-and-mode.html)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
