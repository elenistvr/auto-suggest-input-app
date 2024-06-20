import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../store";
import AutoSuggestInput from "./AutoSuggestInput";
import fetchMock from "jest-fetch-mock";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </Provider>
  );
};

describe("AutoSuggestInput Component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("renders the search input field", () => {
    renderWithProviders(<AutoSuggestInput />);
    const inputElement = screen.getByPlaceholderText(/search/i);
    expect(inputElement).toBeTruthy();
  });

  it("has an initial empty value", () => {
    renderWithProviders(<AutoSuggestInput />);
    const inputElement = screen.getByPlaceholderText(
      /search/i
    ) as HTMLInputElement;
    expect(inputElement.value).toBe("");
  });
});

it("shows CircularProgress during loading", async () => {
  fetchMock.mockResponseOnce(
    () =>
      new Promise((resolve) =>
        setTimeout(() => resolve({ body: JSON.stringify({ hits: [] }) }), 1000)
      )
  );

  renderWithProviders(<AutoSuggestInput />);
  const inputElement = screen.getByPlaceholderText(/search/i);
  fireEvent.change(inputElement, { target: { value: "test" } });

  await waitFor(() => {
    expect(screen.queryByRole("progressbar")).toBeInTheDocument();
  });
});
