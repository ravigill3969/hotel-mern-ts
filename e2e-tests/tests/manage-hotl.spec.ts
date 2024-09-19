import { test, expect } from '@playwright/test';
import path from 'path';

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL);
    await page.getByRole("link", { name: "Sign In" }).click();
  
    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
    await page.locator('[name=email]').fill("test@gmail.com");
    await page.locator('[name=password]').fill("test");
  
    await page.getByRole("button", { name: "Sign In" }).click();
  
    await expect(page.getByText("User signed in successfully")).toBeVisible();

    

});


test("should allow the user to add a hotel", async ({ page }) => {
    await page.goto(`${UI_URL}add-hotel`);

    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test City");
    await page.locator('[name="country"]').fill("Test Country");
    await page.locator('[name="description"]').fill("Test Description of Hotel");
    await page.locator('[name="pricePerNight"]').fill("100");
    
    await page.selectOption('select[name="starRating"]', '5');

    await page.getByText("Inn").click();

    await page.getByLabel("Free Wi-fi").check();
    await page.getByLabel("Parking").check();

    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("1");

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "1.jpg"),
        path.join(__dirname, "files", "2.jpg"),
    ]);

    await page.getByRole("button", { name: "Save" }).click();

    await expect(page.getByText("Hotel added successfully")).toBeVisible();
})