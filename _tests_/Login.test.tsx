import { setup } from "@components/MultipleSelect/MultipleSelect.test";
import { screen } from "@testing-library/react";
import Login from "@pages/user/login";
import puppeteer, { Browser, Page } from "puppeteer";

describe("Login Page", () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Message error for email or password incorrect.", async () => {
    await page.goto("http://localhost:3000/user/login");

    await page.waitForSelector("#email-input");
    await page.type("#email-input", "emailIncorrect@gmail.com");
    await page.type("#password-input", "0000999000099");
    await page.click("button[type='submit']");

    const messageErrorClass = "[data-testid='ErrorToast-message']";
    await page.waitForSelector(messageErrorClass);

    const messageError = await page.$eval(
      messageErrorClass,
      (e) => e.textContent
    );

    expect(messageError).toBe("E-mail ou senha inválido.");
  });

  test("Message error for email and password dont valid.", async () => {
    const { user } = setup(<Login />);

    const emailInput = screen.getByRole("textbox", { name: "E-mail" });
    const passwordInput = screen.getByLabelText("Senha");
    const buttonEl = screen.getByRole("button", { name: "Entrar" });

    await user.clear(emailInput);
    await user.type(emailInput, "email@gmail");

    await user.clear(passwordInput);
    await user.type(passwordInput, "123");

    await user.click(buttonEl);

    expect(
      await screen.findByText("Digite um e-mail válido.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Digite uma senha com minímo de 8 carácteres.")
    ).toBeInTheDocument();
  });

  test("Success login and go to for home page.", async () => {
    await page.goto("http://localhost:3000/user/login");

    await page.waitForSelector("#email-input");
    await page.type("#email-input", "email@gmail.com");

    await page.type("#password-input", "123456789");
    await page.click("button[type='submit']");

    await page.waitForNavigation();

    expect(page.url()).toBe("http://localhost:3000/");
  });
});
