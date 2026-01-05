const { test, expect } = require('@playwright/test');

test.describe('Example Tests', () => {
  test('should load Playwright documentation', async ({ page }) => {
    // Navigate to Playwright website
    await page.goto('https://playwright.dev/');
    
    // Check page title
    await expect(page).toHaveTitle(/Playwright/);
    
    // Check for main heading
    const heading = page.getByRole('heading', { name: 'Playwright' });
    await expect(heading).toBeVisible();
  });

  test('should search for documentation', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Click on search or navigation
    await page.getByRole('link', { name: 'Docs' }).click();
    
    // Verify we're on the docs page
    await expect(page).toHaveURL(/.*docs/);
  });

  test('should interact with a form example', async ({ page }) => {
    // Navigate to a test page (you can replace this with your target URL)
    await page.goto('https://example.com');
    
    // Example: Check page content
    await expect(page.locator('h1')).toContainText('Example Domain');
  });
});


