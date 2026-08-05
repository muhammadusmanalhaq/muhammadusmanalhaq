import { test, expect } from '@playwright/test';

test.describe('Social and Contact Links', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Hero section links should have correct URLs', async ({ page }) => {
    // Check LinkedIn link in Hero
    const linkedinHero = page.locator('.hero-content a[aria-label="LinkedIn"]');
    await expect(linkedinHero).toBeVisible();
    await expect(linkedinHero).toHaveAttribute('href', 'https://pk.linkedin.com/in/muhammad-usman-al-haq-05a321315');
    await expect(linkedinHero).toHaveAttribute('target', '_blank');

    // Check Gmail link in Hero
    const gmailHero = page.locator('.hero-content a[aria-label="Gmail"]');
    await expect(gmailHero).toBeVisible();
    await expect(gmailHero).toHaveAttribute('href', 'https://mail.google.com/mail/?view=cm&fs=1&to=muhammadusmanalhaq@gmail.com');
    await expect(gmailHero).toHaveAttribute('target', '_blank');

    // Check GitHub link in Hero
    const githubHero = page.locator('.hero-content a[aria-label="GitHub"]');
    await expect(githubHero).toBeVisible();
    await expect(githubHero).toHaveAttribute('href', 'https://github.com/muhammadusmanalhaq');
    await expect(githubHero).toHaveAttribute('target', '_blank');
  });

  test('Contact section links should have correct URLs', async ({ page }) => {
    // Check Email link in Contact section
    const emailContact = page.locator('#contact a:has-text("Email")');
    await expect(emailContact).toBeVisible();
    await expect(emailContact).toHaveAttribute('href', 'https://mail.google.com/mail/?view=cm&fs=1&to=muhammadusmanalhaq@gmail.com');

    // Check LinkedIn link in Contact section
    const linkedinContact = page.locator('#contact a:has-text("LinkedIn")');
    await expect(linkedinContact).toBeVisible();
    await expect(linkedinContact).toHaveAttribute('href', 'https://pk.linkedin.com/in/muhammad-usman-al-haq-05a321315');
  });

  test('Footer section links should have correct URLs', async ({ page }) => {
    // Check Email link in Footer
    const emailFooter = page.locator('footer a:has-text("Email")');
    await expect(emailFooter).toBeVisible();
    await expect(emailFooter).toHaveAttribute('href', 'https://mail.google.com/mail/?view=cm&fs=1&to=muhammadusmanalhaq@gmail.com');

    // Check LinkedIn link in Footer
    const linkedinFooter = page.locator('footer a:has-text("LinkedIn")');
    await expect(linkedinFooter).toBeVisible();
    await expect(linkedinFooter).toHaveAttribute('href', 'https://pk.linkedin.com/in/muhammad-usman-al-haq-05a321315');
  });
});
