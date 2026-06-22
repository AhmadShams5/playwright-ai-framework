import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';

test.describe('Login Page', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // ==================== SCENARIO 1: UI Elements Display ====================
  test('[SC1] Login Page UI Elements Display - VALIDATION - HIGH', async () => {
    // Verify all UI elements are visible
    expect(await loginPage.isUsernameInputVisible()).toBeTruthy();
    expect(await loginPage.isPasswordInputVisible()).toBeTruthy();
    expect(await loginPage.isLoginButtonVisible()).toBeTruthy();
  });

  // ==================== SCENARIO 2: Successful Login with Valid Credentials ====================
  test('[SC2] Successful Login with Valid Credentials - POSITIVE - HIGH', async () => {
    // Login with valid credentials
    await loginPage.login('standard_user', 'secret_sauce');

    // Verify redirect to inventory page
    await loginPage.waitForInventoryPage();
    expect(await loginPage.isInventoryPageLoaded()).toBeTruthy();
    expect(await loginPage.getCurrentURL()).toContain('inventory.html');
  });

  // ==================== SCENARIO 3: Login Failure with Invalid Username ====================
  test('[SC3] Login Failure with Invalid Username - NEGATIVE - HIGH', async () => {
    // Attempt login with invalid username
    await loginPage.login('invalid_user', 'secret_sauce');

    // Verify error is displayed and user stays on login page
    expect(await loginPage.isErrorVisible()).toBeTruthy();
    expect(await loginPage.isOnLoginPage()).toBeTruthy();
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toBeTruthy();
  });

  // ==================== SCENARIO 4: Login Failure with Invalid Password ====================
  test('[SC4] Login Failure with Invalid Password - NEGATIVE - HIGH', async () => {
    // Attempt login with invalid password
    await loginPage.login('standard_user', 'wrong_password');

    // Verify error is displayed and user stays on login page
    expect(await loginPage.isErrorVisible()).toBeTruthy();
    expect(await loginPage.isOnLoginPage()).toBeTruthy();
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toBeTruthy();
  });

  // ==================== SCENARIO 5: Login Failure with Both Invalid Credentials ====================
  test('[SC5] Login Failure with Both Invalid Credentials - NEGATIVE - MEDIUM', async () => {
    // Attempt login with both invalid username and password
    await loginPage.login('wrong_user', 'wrong_password');

    // Verify error is displayed and user stays on login page
    expect(await loginPage.isErrorVisible()).toBeTruthy();
    expect(await loginPage.isOnLoginPage()).toBeTruthy();
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toBeTruthy();
  });

  // ==================== SCENARIO 6: Validation Error - Empty Username and Password ====================
  test('[SC6] Validation Error - Empty Username and Password - VALIDATION - HIGH', async () => {
    // Click login with empty fields
    await loginPage.clickLogin();

    // Verify validation error is displayed
    expect(await loginPage.isErrorVisible()).toBeTruthy();
    expect(await loginPage.isOnLoginPage()).toBeTruthy();
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toBeTruthy();
  });

  // ==================== SCENARIO 7: Validation Error - Empty Username Only ====================
  test('[SC7] Validation Error - Empty Username Only - VALIDATION - MEDIUM', async () => {
    // Fill only password
    await loginPage.fillPassword('secret_sauce');
    await loginPage.clickLogin();

    // Verify validation error is displayed
    expect(await loginPage.isErrorVisible()).toBeTruthy();
    expect(await loginPage.isOnLoginPage()).toBeTruthy();
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toBeTruthy();
  });

  // ==================== SCENARIO 8: Validation Error - Empty Password Only ====================
  test('[SC8] Validation Error - Empty Password Only - VALIDATION - HIGH', async () => {
    // Fill only username
    await loginPage.fillUsername('standard_user');
    await loginPage.clickLogin();

    // Verify validation error is displayed
    expect(await loginPage.isErrorVisible()).toBeTruthy();
    expect(await loginPage.isOnLoginPage()).toBeTruthy();
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toBeTruthy();
  });

  // ==================== SCENARIO 9: Locked Account Login Attempt ====================
  test('[SC9] Locked Account Login Attempt - NEGATIVE - HIGH', async () => {
    // Attempt login with locked account
    await loginPage.login('locked_out_user', 'secret_sauce');

    // Verify locked account error is displayed
    expect(await loginPage.isErrorVisible()).toBeTruthy();
    expect(await loginPage.isOnLoginPage()).toBeTruthy();
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('locked');
  });

  // ==================== SCENARIO 10: Form Submission via Enter Key ====================
  test('[SC10] Form Submission via Enter Key - VALIDATION - MEDIUM', async () => {
    // Login using Enter key on password field
    await loginPage.loginWithEnter('standard_user', 'secret_sauce');

    // Verify redirect to inventory page
    await loginPage.waitForInventoryPage();
    expect(await loginPage.isInventoryPageLoaded()).toBeTruthy();
    expect(await loginPage.getCurrentURL()).toContain('inventory.html');
  });

  // ==================== SCENARIO 11: Error Message Visibility and Readability ====================
  test('[SC11] Error Message Visibility and Readability - VALIDATION - MEDIUM', async () => {
    // Trigger an error by logging in with invalid credentials
    await loginPage.login('invalid_user', 'wrong_password');

    // Verify error is visible and get its bounding box
    expect(await loginPage.isErrorVisible()).toBeTruthy();
    const errorBox = await loginPage.getErrorMessageBoundingBox();

    // Verify error is within viewport (not clipped off-screen)
    expect(errorBox).toBeTruthy();
    expect(errorBox.x).toBeGreaterThanOrEqual(0);
    expect(errorBox.y).toBeGreaterThanOrEqual(0);

    // Verify error message text is readable and not empty
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toBeTruthy();
    expect(errorMsg.length).toBeGreaterThan(0);
  });

  // ==================== SCENARIO 12: Login Performance - Response Time ====================
  test('[SC12] Login Performance - Response Time (within 3 seconds) - BOUNDARY - MEDIUM', async ({ page }) => {
    const startTime = Date.now();

    // Perform login
    await loginPage.login('standard_user', 'secret_sauce');

    // Wait for inventory page
    await loginPage.waitForInventoryPage();

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // Verify response is within 3 seconds (3000ms)
    expect(responseTime).toBeLessThan(3000);
    expect(await loginPage.isInventoryPageLoaded()).toBeTruthy();
  });

  // ==================== SCENARIO 13: Boundary - Username at Max Length ====================
  test('[SC13] Boundary - Username at Max Length - BOUNDARY - LOW', async () => {
    // Create a long username (reasonable max for username field)
    const longUsername = 'a'.repeat(255);

    // Attempt login with long username
    await loginPage.login(longUsername, 'secret_sauce');

    // Verify form is handled gracefully (no crash)
    // Either error or no redirect
    await loginPage.page.waitForTimeout(2000);
    const isOnLogin = await loginPage.isOnLoginPage();
    const currentUrl = await loginPage.getCurrentURL();
    const isOnInventory = currentUrl.includes('inventory');

    // At minimum, page should not crash
    expect(isOnLogin || isOnInventory).toBeTruthy();
  });

  // ==================== SCENARIO 14: Boundary - Password at Max Length ====================
  test('[SC14] Boundary - Password at Max Length - BOUNDARY - LOW', async () => {
    // Create a long password (reasonable max for password field)
    const longPassword = 'a'.repeat(255);

    // Attempt login with long password
    await loginPage.login('standard_user', longPassword);

    // Verify form is handled gracefully (no crash)
    await loginPage.page.waitForTimeout(2000);
    const isOnLogin = await loginPage.isOnLoginPage();
    const currentUrl = await loginPage.getCurrentURL();
    const isOnInventory = currentUrl.includes('inventory');

    // At minimum, page should not crash
    expect(isOnLogin || isOnInventory).toBeTruthy();
  });

  // ==================== SCENARIO 15: Special Characters in Username Field ====================
  test('[SC15] Special Characters in Username Field - NEGATIVE - LOW', async () => {
    // Attempt login with special characters in username
    await loginPage.login('@#$%^', 'secret_sauce');

    // Verify graceful handling (no crash, error or rejection)
    expect(await loginPage.page.url()).toBeTruthy();

    // Either error message or still on login page
    await loginPage.page.waitForTimeout(1000);
    const isErrorVisible = await loginPage.isErrorVisible();
    const isOnLoginPage = await loginPage.isOnLoginPage();
    expect(isErrorVisible || isOnLoginPage).toBeTruthy();
  });

  // ==================== SCENARIO 16: Special Characters in Password Field ====================
  test('[SC16] Special Characters in Password Field - NEGATIVE - LOW', async () => {
    // Attempt login with special characters in password
    await loginPage.login('standard_user', '!@#$%');

    // Verify graceful handling (no crash)
    expect(await loginPage.page.url()).toBeTruthy();

    // Either error message or still on login page
    await loginPage.page.waitForTimeout(1000);
    const isErrorVisible = await loginPage.isErrorVisible();
    const isOnLoginPage = await loginPage.isOnLoginPage();
    expect(isErrorVisible || isOnLoginPage).toBeTruthy();
  });

  // ==================== SCENARIO 17: Whitespace-Only Username ====================
  test('[SC17] Whitespace-Only Username - VALIDATION - LOW', async () => {
    // Attempt login with whitespace-only username
    await loginPage.login('     ', 'secret_sauce');

    // Verify either validation error or rejection
    await loginPage.page.waitForTimeout(1000);
    const isErrorVisible = await loginPage.isErrorVisible();
    const isOnLoginPage = await loginPage.isOnLoginPage();

    expect(isErrorVisible || isOnLoginPage).toBeTruthy();
  });

  // ==================== SCENARIO 18: Whitespace-Only Password ====================
  test('[SC18] Whitespace-Only Password - VALIDATION - LOW', async () => {
    // Attempt login with whitespace-only password
    await loginPage.login('standard_user', '     ');

    // Verify either validation error or rejection
    await loginPage.page.waitForTimeout(1000);
    const isErrorVisible = await loginPage.isErrorVisible();
    const isOnLoginPage = await loginPage.isOnLoginPage();

    expect(isErrorVisible || isOnLoginPage).toBeTruthy();
  });
});
