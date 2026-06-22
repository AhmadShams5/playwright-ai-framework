# Feature: Login Page Authentication

## Application Under Test
SauceDemo (https://www.saucedemo.com)

## Background
The login page is the entry point for all users of the SauceDemo
e-commerce application. It must reliably authenticate valid users
and reject invalid attempts with clear, appropriate feedback.

## User Story
As a registered user of SauceDemo,
I want to log in with my username and password,
So that I can access the product inventory.

## Functional Requirements

1. The login page must display:
   - A username input field
   - A password input field
   - A login button

2. A user with valid credentials (standard_user / secret_sauce)
   must be able to log in successfully and be redirected to the
   inventory/products page.

3. A user with an invalid username or password must see an
   error message and must NOT be redirected to the inventory page.

4. A user who submits the form with empty username and password
   fields must see a validation error message.

5. A user who submits the form with a username but no password
   must see a validation error message specific to the missing
   password.

6. A locked-out user (locked_out_user / secret_sauce) must see
   an error message indicating the account has been locked,
   and must NOT be able to log in.

## Non-Functional Requirements

- Login must complete within 3 seconds under normal conditions.
- Error messages must be visible and readable (not hidden or
  clipped off-screen).
- The login form must be accessible via keyboard (Enter key
  submits the form).

## Out of Scope
- Password reset flow
- "Remember me" functionality
- Multi-factor authentication