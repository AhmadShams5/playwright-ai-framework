# TEST PLAN: SauceDemo Login Page

## Overview
This test plan covers the authentication functionality of the SauceDemo login page (https://www.saucedemo.com). The plan includes positive, negative, boundary, and validation test scenarios mapped to functional and non-functional requirements.

---

## Test Scenarios

| # | Test Scenario Name | Test Type | Priority | Preconditions | Brief Steps | Expected Result |
|---|---|---|---|---|---|---|
| 1 | Login Page UI Elements Display | Validation | High | Browser opened, navigation to login page | 1. Navigate to SauceDemo login page<br>2. Inspect page elements | Username input field, password input field, and login button are all visible and properly rendered |
| 2 | Successful Login with Valid Credentials | Positive | High | Browser opened, navigation to login page | 1. Navigate to SauceDemo login page<br>2. Enter username: standard_user<br>3. Enter password: secret_sauce<br>4. Click Login button | User is authenticated and redirected to /inventory page; inventory products are displayed |
| 3 | Login Failure with Invalid Username | Negative | High | Browser opened, navigation to login page | 1. Navigate to SauceDemo login page<br>2. Enter username: invalid_user<br>3. Enter password: secret_sauce<br>4. Click Login button | Error message is displayed; user remains on login page; no redirect to inventory page |
| 4 | Login Failure with Invalid Password | Negative | High | Browser opened, navigation to login page | 1. Navigate to SauceDemo login page<br>2. Enter username: standard_user<br>3. Enter password: wrong_password<br>4. Click Login button | Error message is displayed; user remains on login page; no redirect to inventory page |
| 5 | Login Failure with Both Invalid Credentials | Negative | Medium | Browser opened, navigation to login page | 1. Navigate to SauceDemo login page<br>2. Enter username: invalid_user<br>3. Enter password: wrong_password<br>4. Click Login button | Error message is displayed; user remains on login page; no redirect to inventory page |
| 6 | Validation Error - Empty Username and Password | Validation | High | Browser opened, navigation to login page | 1. Navigate to SauceDemo login page<br>2. Leave username field empty<br>3. Leave password field empty<br>4. Click Login button | Validation error message is displayed for missing credentials; user remains on login page |
| 7 | Validation Error - Empty Username Only | Validation | Medium | Browser opened, navigation to login page | 1. Navigate to SauceDemo login page<br>2. Leave username field empty<br>3. Enter password: secret_sauce<br>4. Click Login button | Validation error message is displayed for missing username; user remains on login page |
| 8 | Validation Error - Empty Password Only | Validation | High | Browser opened, navigation to login page | 1. Navigate to SauceDemo login page<br>2. Enter username: standard_user<br>3. Leave password field empty<br>4. Click Login button | Validation error message is displayed specific to missing password; user remains on login page |
| 9 | Locked Account Login Attempt | Negative | High | Browser opened, navigation to login page | 1. Navigate to SauceDemo login page<br>2. Enter username: locked_out_user<br>3. Enter password: secret_sauce<br>4. Click Login button | Error message indicates account is locked; user is NOT logged in and remains on login page |
| 10 | Form Submission via Enter Key | Validation | Medium | Browser opened, navigation to login page, valid credentials ready | 1. Navigate to SauceDemo login page<br>2. Enter username: standard_user<br>3. Enter password: secret_sauce<br>4. Press Enter key | Form is submitted; user is authenticated and redirected to /inventory page |
| 11 | Error Message Visibility and Readability | Validation | Medium | Browser opened, login page with error triggered (invalid credentials) | 1. Navigate to SauceDemo login page<br>2. Enter invalid credentials and submit<br>3. Inspect error message display on screen | Error message is visible, readable, not clipped or hidden off-screen; text is clearly legible |
| 12 | Login Performance - Response Time | Boundary | Medium | Browser opened, valid credentials ready, network conditions normal | 1. Navigate to SauceDemo login page<br>2. Enter username: standard_user<br>3. Enter password: secret_sauce<br>4. Click Login button and measure response time | Login completes within 3 seconds; user is redirected to inventory page |
| 13 | Boundary - Username at Max Length | Boundary | Low | Browser opened, navigation to login page | 1. Navigate to SauceDemo login page<br>2. Enter a username with maximum allowed characters<br>3. Enter password: secret_sauce<br>4. Click Login button | Login behaves as expected (either accepts or rejects based on system rules); no UI breaks or errors |
| 14 | Boundary - Password at Max Length | Boundary | Low | Browser opened, navigation to login page | 1. Navigate to SauceDemo login page<br>2. Enter username: standard_user<br>3. Enter a password with maximum allowed characters<br>4. Click Login button | Login behaves as expected (either accepts or rejects based on system rules); no UI breaks or errors |
| 15 | Special Characters in Username Field | Negative | Low | Browser opened, navigation to login page | 1. Navigate to SauceDemo login page<br>2. Enter username with special characters: @#$%^<br>3. Enter password: secret_sauce<br>4. Click Login button | Either rejected with error message or handled gracefully; no application crash or unexpected behavior |
| 16 | Special Characters in Password Field | Negative | Low | Browser opened, navigation to login page | 1. Navigate to SauceDemo login page<br>2. Enter username: standard_user<br>3. Enter password with special characters: !@#$%<br>4. Click Login button | Either rejected with error message or handled gracefully; no application crash or unexpected behavior |
| 17 | Whitespace-Only Username | Validation | Low | Browser opened, navigation to login page | 1. Navigate to SauceDemo login page<br>2. Enter spaces only in username field<br>3. Enter password: secret_sauce<br>4. Click Login button | Validation error or treated as invalid; user remains on login page |
| 18 | Whitespace-Only Password | Validation | Low | Browser opened, navigation to login page | 1. Navigate to SauceDemo login page<br>2. Enter username: standard_user<br>3. Enter spaces only in password field<br>4. Click Login button | Validation error or treated as invalid; user remains on login page |

---

## Coverage Summary

| Category | Count | Status |
|---|---|---|
| Functional Requirements Covered | 6 | ✓ All covered |
| Non-Functional Requirements Covered | 3 | ✓ All covered |
| Test Scenarios | 18 | - |
| Positive Tests | 2 | - |
| Negative Tests | 6 | - |
| Validation Tests | 8 | - |
| Boundary Tests | 2 | - |

---

## Test Execution Notes

1. **Test Environment**: SauceDemo (https://www.saucedemo.com)
2. **Browser Compatibility**: To be defined (Chrome, Firefox, Safari, Edge)
3. **Test Data**: Valid and invalid credentials as specified in requirements
4. **Automation Tool**: Playwright
5. **Known Test Users**:
   - Valid: standard_user / secret_sauce
   - Locked: locked_out_user / secret_sauce
6. **Error Message Verification**: All error message content and display should be logged for consistency validation
7. **Performance Baseline**: 3-second threshold for login completion
