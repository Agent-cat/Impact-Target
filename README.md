# AI Test Impact Analysis Platform

A production-ready Next.js backend that optimizes CI/CD pipelines by intelligently determining which tests to run based on code changes. Powered by Google Gemini AI and GitHub integration.

## 🚀 Features

- **Smart Test Selection**: Uses AI to analyze PR diffs and identify impacted tests
- **GitHub Integration**: Fetches PR data directly from GitHub API
- **Repo Indexing**: Caches test file locations for fast analysis
- **Analytics Dashboard**: Tracks performance metrics and time savings
- **RESTful API**: Clean endpoints for CI/CD integration

## 🏗️ Architecture

```
GitHub Action → Next.js API → Gemini AI → Test Selection → CI Results → Dashboard
```

## 📁 Project Structure

```
impact-ai-platform/
├── app/
│   ├── api/
│   │   ├── analyze/route.ts     # Main analysis endpoint
│   │   ├── report/route.ts      # CI results reporting
│   │   └── indexRepo/route.ts   # Repo indexing
│   ├── dashboard/page.tsx       # Analytics dashboard
│   └── page.tsx                 # Landing page
├── lib/
│   ├── gemini.ts                # Google AI client
│   ├── githubClient.ts          # GitHub API client
│   ├── impactEngine.ts          # Core analysis logic
│   ├── repoIndexer.ts           # Test file indexing
│   └── db.ts                    # Simple JSON storage
├── repo-index/                  # Cached repo data
├── tests/                       # Unit tests
└── package.json
```

## 🛠️ Setup

1. **Clone and install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file:

   ```env
   GITHUB_TOKEN=your_github_token
   GEMINI_API_KEY=your_gemini_api_key
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Run tests:**
   ```bash
   npm test
   ```

## 🔧 API Endpoints

### POST `/api/analyze`

Analyzes a PR and returns impacted tests.

**Request:**

```json
{
  "owner": "myuser",
  "repo": "myproject",
  "pr": 123
}
```

**Response:**

```json
{
  "impactedTests": [
    "tests/auth/login.test.ts",
    "tests/payment/checkout.test.ts"
  ]
}
```

### POST `/api/indexRepo`

Builds a test index for a repository.

**Request:**

```json
{
  "owner": "myuser",
  "repo": "myproject"
}
```

### POST `/api/report`

Reports CI results for analytics.

**Request:**

```json
{
  "owner": "myuser",
  "repo": "myproject",
  "pr": 123,
  "testsRun": 5,
  "failed": 0,
  "timeSaved": "72%"
}
```

## 📊 GitHub Workflow Integration

Add this to your `.github/workflows/ci.yml`:

```yaml
- name: Analyze Test Impact
  run: |
    curl -X POST https://your-domain.com/api/analyze \
      -H "Content-Type: application/json" \
      -d '{
        "owner":"${{ github.repository_owner }}",
        "repo":"${{ github.event.repository.name }}",
        "pr":${{ github.event.number }}
      }' > impacted-tests.json

- name: Run Impacted Tests
  run: |
    # Parse and run only impacted tests
    # ... your test runner commands

- name: Report Results
  run: |
    curl -X POST https://your-domain.com/api/report \
      -H "Content-Type: application/json" \
      -d '{
        "owner":"${{ github.repository_owner }}",
        "repo":"${{ github.event.repository.name }}",
        "pr":${{ github.event.number }},
        "testsRun":5,
        "failed":0,
        "timeSaved":"72%"
      }'
```

## 🎯 Usage Flow

1. **Index Repository**: Call `/api/indexRepo` to cache test files
2. **Analyze PR**: GitHub Action calls `/api/analyze` with PR details
3. **Run Tests**: Workflow runs only the returned test files
4. **Report Results**: Send CI metrics back via `/api/report`
5. **View Analytics**: Check the dashboard at `/dashboard`

## 🧪 Testing

The project includes comprehensive unit tests for all core functionality:

- `tests/impactEngine.test.ts` - AI analysis logic
- `tests/repoIndexer.test.ts` - Repository indexing
- `tests/db.test.ts` - Data persistence

Run tests with:

```bash
npm test
```

## 🚀 Deployment

Deploy to Vercel, Netlify, or any Node.js hosting platform:

```bash
npm run build
npm start
```

Make sure to set environment variables in your deployment platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

MIT License - feel free to use in your projects!
# Impact-Target
