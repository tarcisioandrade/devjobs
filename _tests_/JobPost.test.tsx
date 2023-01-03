import puppeteer, { Browser, Page } from "puppeteer";

export const fakeUser = {
  id: "clc95emfw0000i4i8m4b5q78i",
  user_type: "hiring",
  id_devjobs: "@ademiro",
  email: "admin@gmail.com",
  name: "Ademiro",
  surname: "Admin",
  avatar: "",
  biography: "",
  gender: "man",
  jobs: [],
  location: "AC",
  stacks: [],
  employee: false,
  github_url: "",
  linkedin_url: "",
  website_url: "",
  updatedAt: new Date(),
  fluents: [],
  createdAt: new Date(),
};

describe("jobpost page", () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("job postage", async () => {
    const URL = "http://localhost:3000/";

    await page.goto(URL);
    await page.setCookie({
      name: "token",
      value: process.env.TOKEN_VALID as string,
    });
    await page.cookies(URL);

    await page.goto(URL + "user/jobpost");

    await page.waitForSelector("#company_name");
    await page.type("#company_name", "Company Name Example");
    await page.type("#title_job", "Title Job Example");
    await page.type("#company_email", "email@example.com");
    await page.select("#model", "remoto");
    await page.select("#location", "BA");
    await page.select("#contract", "clt");
    await page.select("#type", "pleno");
    await page.click("#inputSearchFilter");
    await page.waitForSelector("[data-testid='filtersBox']");
    await page.click("[data-testid='filtersBox'] > div");
    await page.click("#benefits-container > div");
    await page.click("button[type='submit']");

    await page.waitForNavigation();

    expect(page.url()).toBe("http://localhost:3000/user/jobsposted");
  });
});
