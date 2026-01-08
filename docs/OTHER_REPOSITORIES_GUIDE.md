# Guide for Securing Other Repositories

This guide provides instructions for applying the same security improvements to other repositories mentioned in the problem statement (fen-z/dhaniverse and fen-z/solvent-supply-chain).

## Quick Reference: What Was Done in quickscan

1. ✅ Moved hardcoded email to environment variable
2. ✅ Added `.env` and `.env.local` to `.gitignore`
3. ✅ Created `.env.example` template
4. ✅ Updated documentation with security guidelines
5. ✅ Removed hardcoded secrets from README and source files

## Instructions for dhaniverse Repository

Based on the problem statement, this repository has:
- API keys in `src/config/environment.ts`
- Polygon API key configuration

### Steps to Secure:

1. **Update .gitignore**
   ```bash
   # Add to .gitignore
   .env
   .env.local
   .env*.local
   ```

2. **Create .env.example**
   ```bash
   # Create .env.example
   cat > .env.example << 'EOF'
   # API Configuration
   VITE_POLYGON_API_KEY=
   # Add other API keys as needed
   EOF
   ```

3. **Update src/config/environment.ts**
   ```typescript
   // Before (insecure)
   export const POLYGON_CONFIG = {
       apiKey: import.meta.env.VITE_POLYGON_API_KEY || 'hardcoded-key',
       ...
   };
   
   // After (secure)
   export const POLYGON_CONFIG = {
       apiKey: import.meta.env.VITE_POLYGON_API_KEY,
       ...
   };
   
   // Add validation
   if (!POLYGON_CONFIG.apiKey) {
       console.error('VITE_POLYGON_API_KEY is required but not configured');
   }
   ```

4. **Rotate API Keys**
   - Generate new API keys from Polygon.io dashboard
   - Update deployment environment variables
   - Delete old compromised keys

## Instructions for solvent-supply-chain Repository

Based on the problem statement, this repository has:
- `.env` file committed with Supabase credentials
- `VITE_SUPABASE_PROJECT_ID`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

### Steps to Secure:

1. **CRITICAL: Remove .env from Git History**
   ```bash
   # Using BFG Repo-Cleaner (recommended)
   java -jar bfg.jar --delete-files .env
   git reflog expire --expire=now --all
   git gc --prune=now --aggressive
   
   # OR using git filter-repo
   git filter-repo --path .env --invert-paths
   ```

2. **Rotate Supabase Credentials Immediately**
   - Go to Supabase dashboard
   - Generate new API keys
   - Update deployment environment variables
   - Disable/delete old exposed keys

3. **Update .gitignore**
   ```bash
   # Add to .gitignore
   .env
   .env.local
   .env*.local
   ```

4. **Create .env.example**
   ```bash
   cat > .env.example << 'EOF'
   # Supabase Configuration
   VITE_SUPABASE_PROJECT_ID=
   VITE_SUPABASE_PUBLISHABLE_KEY=
   VITE_SUPABASE_ANON_KEY=
   EOF
   ```

5. **Verify .env is Not Tracked**
   ```bash
   git status
   # .env should NOT appear in the status
   
   # If it does, remove it:
   git rm --cached .env
   git commit -m "Remove .env from version control"
   ```

## General Security Checklist for All Repositories

### Immediate Actions

- [ ] Check if sensitive files are in Git history: `git log --all --full-history -- .env`
- [ ] If found, remove from history (see instructions above)
- [ ] Rotate all exposed credentials immediately
- [ ] Add `.env*` to `.gitignore`
- [ ] Create `.env.example` templates

### Code Changes

- [ ] Replace hardcoded API keys with environment variables
- [ ] Add validation for required environment variables
- [ ] Update documentation with configuration instructions
- [ ] Remove sensitive data from README and other docs

### Testing

- [ ] Test application without environment variables
- [ ] Test application with environment variables set
- [ ] Verify builds succeed in both scenarios
- [ ] Run security scans (npm audit, CodeQL)

### Documentation

- [ ] Update SECURITY.md with reporting procedures
- [ ] Create/update CONTRIBUTING.md with security guidelines
- [ ] Document all required environment variables in README
- [ ] Add deployment instructions for each platform

## Environment Variable Naming Conventions

Use clear, consistent names:

```bash
# Good naming
VITE_API_KEY=
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_POLYGON_API_KEY=

# Avoid
API_KEY=                    # Too generic
SUPABASE=                   # Not descriptive
MY_SECRET_KEY=              # Vague
```

## Deployment Platform Configuration

### Vercel
```bash
# Add in Vercel dashboard: Settings > Environment Variables
VITE_NOTIFICATION_EMAIL=your@email.com
VITE_API_KEY=your-api-key
```

### Netlify
```bash
# Add in Netlify dashboard: Site settings > Environment variables
VITE_NOTIFICATION_EMAIL=your@email.com
VITE_API_KEY=your-api-key
```

### GitHub Actions
```yaml
# In .github/workflows/deploy.yml
env:
  VITE_NOTIFICATION_EMAIL: ${{ secrets.NOTIFICATION_EMAIL }}
  VITE_API_KEY: ${{ secrets.API_KEY }}
```

## Verification Commands

After making changes, verify security:

```bash
# Check for hardcoded secrets
grep -r "api[_-]key\|password\|secret" src/ --include="*.ts" --include="*.js"

# Check .env is not tracked
git status | grep .env
# Should return nothing

# Check .env is in .gitignore
grep "\.env" .gitignore
# Should show .env entries

# Run security audit
npm audit

# Check for exposed secrets in history
git log --all --full-history -- "*.env"
```

## Tools for Secret Detection

1. **GitHub Secret Scanning** (enabled automatically for public repos)
2. **git-secrets** - Prevents committing secrets
3. **truffleHog** - Finds secrets in Git history
4. **gitleaks** - Scans repos for secrets

Installation example:
```bash
# Install git-secrets
brew install git-secrets  # macOS
# or
apt-get install git-secrets  # Ubuntu

# Configure
git secrets --install
git secrets --register-aws
```

## Pre-commit Hook (Optional but Recommended)

Create `.git/hooks/pre-commit`:

```bash
#!/bin/bash
if git diff --cached --name-only | grep -q "\.env$"; then
    echo "Error: Attempting to commit .env file!"
    echo "This file contains secrets and should not be committed."
    exit 1
fi

# Check for common secret patterns
if git diff --cached | grep -iE "(api[_-]?key|password|secret|token).*=.*['\"][^'\"]{20,}"; then
    echo "Warning: Possible secret detected in commit!"
    echo "Please review your changes carefully."
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

## Support

For questions about implementing these security improvements:
1. Review the quickscan repository changes as a reference
2. Check the docs/SECURITY_IMPROVEMENTS.md for detailed explanations
3. Refer to SECURITY.md for vulnerability reporting

## Resources

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [OWASP Secret Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [Supabase Security Best Practices](https://supabase.com/docs/guides/auth/security)
- [Polygon.io Security](https://polygon.io/docs/getting-started)
