import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('/ redirects to language-prefixed route', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/\/(es|en)\/?$/)
  })

  test('/ redirects to /es with Spanish Accept-Language', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'es-PE' })
    const page = await context.newPage()
    await page.goto('/')
    await expect(page).toHaveURL(/\/es\/?$/)
    await context.close()
  })

  test('/es loads home with correct title', async ({ page }) => {
    await page.goto('/es')
    await expect(page).toHaveTitle(/Chasqui II/)
  })

  test('header nav links are visible', async ({ page }) => {
    await page.goto('/es')
    const nav = page.locator('header nav').first()
    await expect(nav).toBeVisible()

    const expectedLinks = ['Inicio', 'Nosotros', 'Proyecto', 'Noticias', 'Tienda']
    for (const label of expectedLinks) {
      await expect(nav.getByRole('link', { name: label })).toBeVisible()
    }
  })

  test('clicking nav items navigates to correct routes', async ({ page }) => {
    await page.goto('/es')

    const navRoutes = [
      { label: 'Nosotros', path: '/es/nosotros' },
      { label: 'Proyecto', path: '/es/proyecto' },
      { label: 'Noticias', path: '/es/noticias' },
      { label: 'Tienda', path: '/es/tienda' },
    ]

    for (const { label, path } of navRoutes) {
      await page.goto('/es')
      const nav = page.locator('header nav').first()
      await nav.getByRole('link', { name: label }).click()
      await expect(page).toHaveURL(new RegExp(path))
    }
  })
})
