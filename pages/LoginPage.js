// Page Object Model for SauceDemo Login Page
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.url = 'https://www.saucedemo.com';

    // Locators
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorButton = page.locator('[data-test="error-button"]');
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.inventoryList = page.locator('.inventory_list');
  }

  /**
   * Navigate to the login page
   */
  async goto() {
    await this.page.goto(this.url);
  }

  /**
   * Fill username field
   */
  async fillUsername(username) {
    await this.usernameInput.fill(username);
  }

  /**
   * Fill password field
   */
  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  /**
   * Click login button
   */
  async clickLogin() {
    await this.loginButton.click();
  }

  /**
   * Login with username and password
   * @param {string} username - The username to log in with
   * @param {string} password - The password to log in with
   */
  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  /**
   * Submit login form using Enter key on password field
   */
  async loginWithEnter(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.passwordInput.press('Enter');
  }

  /**
   * Get error message text
   */
  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  /**
   * Check if error message is visible
   */
  async isErrorVisible() {
    return await this.errorMessage.isVisible();
  }

  /**
   * Get error message element for visibility/readability assertions
   */
  async getErrorElement() {
    return this.errorMessage;
  }

  /**
   * Clear error message by clicking the error close button
   */
  async clearError() {
    if (await this.errorButton.isVisible()) {
      await this.errorButton.click();
    }
  }

  /**
   * Check if username input is visible
   */
  async isUsernameInputVisible() {
    return await this.usernameInput.isVisible();
  }

  /**
   * Check if password input is visible
   */
  async isPasswordInputVisible() {
    return await this.passwordInput.isVisible();
  }

  /**
   * Check if login button is visible
   */
  async isLoginButtonVisible() {
    return await this.loginButton.isVisible();
  }

  /**
   * Check if inventory page is loaded (redirect success)
   */
  async isInventoryPageLoaded() {
    return await this.inventoryContainer.isVisible();
  }

  /**
   * Wait for inventory page to load
   */
  async waitForInventoryPage() {
    await this.page.waitForURL('**/inventory.html');
  }

  /**
   * Get current page URL
   */
  async getCurrentURL() {
    return this.page.url();
  }

  /**
   * Check if page is on login page
   */
  async isOnLoginPage() {
    const url = await this.getCurrentURL();
    return url.includes('saucedemo.com') && !url.includes('inventory');
  }

  /**
   * Get the bounding box of error message (for visibility test)
   */
  async getErrorMessageBoundingBox() {
    return await this.errorMessage.boundingBox();
  }

  /**
   * Clear username field
   */
  async clearUsername() {
    await this.usernameInput.clear();
  }

  /**
   * Clear password field
   */
  async clearPassword() {
    await this.passwordInput.clear();
  }

  /**
   * Get username input value
   */
  async getUsernameValue() {
    return await this.usernameInput.inputValue();
  }

  /**
   * Get password input value
   */
  async getPasswordValue() {
    return await this.passwordInput.inputValue();
  }
}
