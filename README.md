# Playwright AI-Assisted Testing Framework

![Tests](https://github.com/AhmadShams5/playwright-ai-framework/actions/workflows/playwright.yml/badge.svg)

A complete AI-assisted Playwright testing framework demonstrating the full AI testing workflow: Requirements → Plan → Generate → Run → CI/CD → Heal.

---

## The AI Workflow Story

```
requirements/login-page-requirements.md
              ↓
         AI reads and analyzes
              ↓
   ai-workflow/plans/login-test-plan.md
              ↓
         AI generates code
              ↓
    pages/LoginPage.js (POM class)
    tests/generated/login.spec.js (18 tests)
              ↓
      Human reviews and fixes (2 issues found)
              ↓
         All 18 tests pass locally
              ↓
       Push to GitHub
              ↓
    CI/CD triggers automatically
              ↓
    18 tests run in cloud
              ↓
    UI break simulated (locator changed)
              ↓
    AI diagnoses and heals broken locator
              ↓
    All tests passing again
```

---

## Project Structure

```
playwright-ai-framework/
│
├── requirements/
│   └── login-page-requirements.md
│
├── ai-workflow/
│   ├── plans/
│   │   └── login-test-plan.md
│   └── logs/
│       ├── 01-analysis-log.md
│       ├── 02-generation-log.md
│       ├── 03-cicd-log.md
│       └── 04-healer-log.md
│
├── pages/
│   └── LoginPage.js
│
├── tests/
│   └── generated/
│       └── login.spec.js
│
└── .github/
    └── workflows/
        └── playwright.yml
```

---

## AI Tools Used

| Stage | Tool | Purpose |
|---|---|---|
| Analysis and Planning | GitHub Copilot Claude Haiku | Read requirements, create test plan |
| Code Generation | GitHub Copilot Agent mode | Generate POM and test files |
| Code Completion | GitHub Copilot Free | Inline suggestions while reviewing |
| Self-Healing | GitHub Copilot Chat | Diagnose and fix broken locators |
| Local Alternative | Continue plus Llama3.2 | Offline AI assistance via Ollama |

---

## Test Coverage 18 Scenarios

| Type | Count | Examples |
|---|---|---|
| Positive | 2 | Valid login, Enter key login |
| Negative | 5 | Invalid credentials, locked account |
| Validation | 5 | Empty fields, field visibility |
| Boundary | 4 | Max length, special chars, whitespace |
| Performance | 1 | Login within 3 seconds |
| NFR | 1 | Error message visibility and readability |

---

## Self-Healing Demo

Simulated: Developer renames HTML attribute from data-test="username" to data-test="username-field"

Result: 16 out of 18 tests fail immediately

AI Healer process:
- Reads the error message
- Inspects the SauceDemo page structure
- Diagnoses root cause which is wrong attribute name
- Suggests the correct locator automatically

Fix Time: 2 minutes compared to 30 to 60 minutes manual

After Fix: All 18 tests passing again

---

## Docker and Kubernetes Concepts

### Level 2 Healing with Healenium

For fully autonomous healing with zero human intervention, Healenium can be added via Docker. It uses ML algorithms to automatically detect and repair broken locators without any human involvement.

Start Healenium backend command:
docker-compose up healenium

Docker compose example configuration:

version 3
services healenium uses image healenium/hlm-backend:latest on port 7878 with volume healenium-data mounted at /app/healenium
db service uses postgres:13 image with POSTGRES_DB set to healenium, POSTGRES_USER set to healenium, POSTGRES_PASSWORD set to healenium

### Docker Concepts Demonstrated

| Concept | Description | QA Use Case |
|---|---|---|
| Container | Isolated runtime environment | Run tests consistently on any machine |
| Image | Pre-built template | healenium/hlm-backend pulled from registry |
| docker-compose | Orchestrate multiple services | Start Healenium and database together |
| Volume | Persistent storage | Store healing history across restarts |
| Port mapping | Expose container to host | Access Healenium UI on localhost:7878 |

### Kubernetes Awareness

Production Healenium deployments typically run on Kubernetes for:

- High availability across multiple nodes
- Auto-scaling based on parallel test load
- Rolling updates without test downtime
- Resource limits and quotas per test pod

### Why CI/CD Not Local

Docker backend is recommended for GitHub Actions with unlimited cloud resources and dedicated test servers. Not recommended for resource-constrained development machines.

---

## Running Locally

Install dependencies:
npm install

Install Playwright browsers:
npx playwright install chromium

Run AI-generated tests:
npx playwright test tests/generated/login.spec.js --project=chromium

View HTML report:
npx playwright show-report

---

## CI/CD Pipeline

Automatically triggers on every push to main branch:

1. Checkout code from GitHub
2. Setup Node.js LTS
3. Install npm dependencies
4. Install Playwright Chromium browser
5. Run all 18 AI-generated login tests
6. Upload HTML report as downloadable artifact

---

## Key Achievements

- Requirements to passing tests in under 1 hour
- 18 comprehensive test scenarios generated by AI
- Zero manual locator writing required
- Human review found and fixed 2 AI code issues
- Full audit trail of every AI decision documented
- Self-healing demo reduces fix time from 60 minutes to 2 minutes
- CI/CD runs automatically on every push with no manual trigger

---

## Author

QA Automation Engineer specializing in AI-assisted testing, combining 8 plus years of traditional QA expertise with modern AI evaluation, autonomous testing, and self-healing methodologies.

GitHub: github.com/AhmadShams5