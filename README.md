# Playwright POM with MCP Setup

This project is an automated testing suite for Naukri.com (a popular job portal in India) using Playwright with the Page Object Model (POM) design pattern. It includes integration with MCP (Model Context Protocol) for enhanced testing capabilities.

## What the Code Does

The codebase automates end-to-end testing of key user workflows on Naukri.com:

- **Login Functionality**: Automates user login using credentials stored in environment variables
- **Dashboard Verification**: Validates that the dashboard loads correctly and displays recommended jobs
- **Profile Management**: Tests profile slider navigation, CV upload functionality, and success message validation

The tests use the Page Object Model to organize code into reusable page classes (BasePage, LoginPage, DashboardPage, ProfilePage), making the tests maintainable and scalable.

## Project Structure

```
├── pages/                 # Page Object Model classes
│   ├── BasePage.js       # Base class with common methods
│   ├── LoginPage.js      # Login page interactions
│   ├── DashboardPage.js  # Dashboard page interactions
│   └── ProfilePage.js    # Profile page interactions
├── tests/                # Test specifications
│   ├── Base.spec.js      # Base test setup
│   ├── Demo.spec.js      # Main test scenarios
│   └── example.spec.js   # Example tests
├── testData/             # Test data files
│   └── data.json         # Configuration and test data
├── playwright-report/    # Generated test reports
├── test-results/         # Test execution results
├── .env                  # Environment variables (not committed)
├── playwright.config.js  # Playwright configuration
└── package.json          # Project dependencies
```

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- Git

## Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Amit8310/Playwright-POM-With-MCP.git
   cd Playwright-POM-With-MCP
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright browsers**:
   ```bash
   npm run playwright:install
   ```

4. **Set up environment variables**:
   Create a `.env` file in the root directory with your Naukri.com credentials:
   ```
   PW_USERNAME=your_naukri_email@example.com
   PW_PASSWORD=your_naukri_password
   ```

5. **Update test data** (optional):
   Edit `testData/data.json` to modify test URLs, expected texts, or file paths as needed.

## Running Tests

### Run all tests:
```bash
npm test
```

### Run tests in headed mode (visible browser):
```bash
npm run test:headed
```

### View test reports:
```bash
npm run test:report
```

## Configuration Details

- **Browser**: Tests run on Chromium by default
- **Viewport**: 1280x720 pixels
- **Timeouts**: 30 seconds for tests, 5 seconds for expectations
- **Screenshots**: Captured on test failure
- **Videos**: Recorded on test failure
- **Traces**: Retained on test failure

## Test Scenarios

1. **Login Test**: Verifies successful login to Naukri.com
2. **Dashboard Test**: Confirms dashboard loads with "Recommended jobs for you" text
3. **Profile Test**: Tests profile navigation, CV upload, and success message

## Notes

- The tests use real credentials, so ensure you have a valid Naukri.com account
- CV upload path in `data.json` should point to a valid PDF file on your system
- Tests are configured to run in parallel for faster execution
- Reports are generated in HTML format for easy viewing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests to ensure everything works
5. Submit a pull request</content>
<parameter name="filePath">d:\PW_MCP_Setup\README.md