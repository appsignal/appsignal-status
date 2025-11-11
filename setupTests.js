require("whatwg-fetch");

// Mock react-markdown since it's ESM-only
jest.mock("react-markdown", () => {
  return {
    __esModule: true,
    default: ({ children }) => children,
  };
});
