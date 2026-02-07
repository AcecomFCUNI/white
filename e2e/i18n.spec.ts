import { test, expect } from '@playwright/test'

test.describe('i18n', () => {
  test('/es shows nav in Spanish', async ({ page }) => {
    await page.goto('/es')
    const nav = page.locator('header nav').first()

    const spanishLabels = ['Inicio', 'Nosotros', 'Proyecto', 'Noticias', 'Tienda']
    for (const label of spanishLabels) {
      await expect(nav.getByRole('link', { name: label })).toBeVisible()
    }
  })

  test('/en shows nav in English', async ({ page }) => {
    await page.goto('/en')
    const nav = page.locator('header nav').first()

    const englishLabels = ['Home', 'About', 'Project', 'News', 'Shop']
    for (const label of englishLabels) {
      await expect(nav.getByRole('link', { name: label })).toBeVisible()
    }
  })

  test('<html lang> reflects URL language for /es', async ({ page }) => {
    await page.goto('/es')
    await expect(page.locator('html')).toHaveAttribute('lang', 'es')
  })

  test('<html lang> reflects URL language for /en', async ({ page }) => {
    await page.goto('/en')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  })
})
