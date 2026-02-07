import { test, expect } from '@playwright/test'

test.describe('Redirects', () => {
  test('/en/about → 301 → /en/nosotros', async ({ request }) => {
    const response = await request.get('/en/about', { maxRedirects: 0 })
    expect(response.status()).toBe(301)
    expect(response.headers()['location']).toBe('/en/nosotros')
  })

  test('/en/project → 301 → /en/proyecto', async ({ request }) => {
    const response = await request.get('/en/project', { maxRedirects: 0 })
    expect(response.status()).toBe(301)
    expect(response.headers()['location']).toBe('/en/proyecto')
  })

  test('/en/news → 301 → /en/noticias', async ({ request }) => {
    const response = await request.get('/en/news', { maxRedirects: 0 })
    expect(response.status()).toBe(301)
    expect(response.headers()['location']).toBe('/en/noticias')
  })

  test('/en/shop → 301 → /en/tienda', async ({ request }) => {
    const response = await request.get('/en/shop', { maxRedirects: 0 })
    expect(response.status()).toBe(301)
    expect(response.headers()['location']).toBe('/en/tienda')
  })

  test('invalid lang /xx/nosotros → redirects to /es', async ({ page }) => {
    await page.goto('/xx/nosotros')
    await expect(page).toHaveURL(/\/es\/?$/)
  })
})
