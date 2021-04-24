const { getShortURL } = require("../src/scripts/util");

test("GET URL", () => {
  getShortURL("https://www.abc.com").then((data) => {
    expect(data.result.original_link).toBe("https://www.abc.com");
  });
});

test("GET URL", () => {
  expect(getShortURL("https://www.abc.com"));
});
