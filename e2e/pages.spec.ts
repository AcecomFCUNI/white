import { test, expect } from '@playwright/test'

test.describe('Pages', () => {
  test('Home: hero visible and correct meta title', async ({ page }) => {
    await page.goto('/es')
    await expect(page).toHaveTitle('Chasqui II - Misión Estudiantil al Espacio')
    // StoryHero renders a main section
    const main = page.locator('main#main-content')
    await expect(main).toBeVisible()
  })

  test('Nosotros: page loads with correct title', async ({ page }) => {
    await page.goto('/es/nosotros')
    await expect(page).toHaveTitle('Nosotros - Chasqui II')
  })

  test('Proyecto: page loads with correct title', async ({ page }) => {
    await page.goto('/es/proyecto')
    await expect(page).toHaveTitle('Proyecto - Chasqui II')
  })

  test('Noticias: page loads with correct title', async ({ page }) => {
    await page.goto('/es/noticias')
    await expect(page).toHaveTitle('Noticias - Chasqui II')
    const main = page.locator('main')
    await expect(main).toBeVisible()
  })

  test('Tienda: page loads with correct title', async ({ page }) => {
    await page.goto('/es/tienda')
    await expect(page).toHaveTitle('Tienda - Chasqui II')
    const main = page.locator('main')
    await expect(main).toBeVisible()
  })
})
