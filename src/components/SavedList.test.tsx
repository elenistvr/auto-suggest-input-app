import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import SavedList from "./SavedList";
import { RootState } from "../store";

const mockStore = configureStore<RootState>([]);

const renderWithProviders = (
  ui: React.ReactElement,
  store: MockStoreEnhanced<RootState>
) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe("SavedList Component", () => {
  it("renders the saved list title", () => {
    const initialState: RootState = {
      stories: {
        saved: [],
      },
    };
    const store = mockStore(initialState);

    renderWithProviders(<SavedList />, store);
    const titleElements = screen.getAllByText(/Saved Stories/i);
    expect(titleElements.length).toBeGreaterThan(0);
  });

  it("shows empty saved list initially", () => {
    const initialState: RootState = {
      stories: {
        saved: [],
      },
    };
    const store = mockStore(initialState);

    renderWithProviders(<SavedList />, store);
    const noStoriesElement = screen.getByText(/No saved stories./i);
    expect(noStoriesElement).toBeTruthy();
  });

  it("renders the saved stories", () => {
    const initialState: RootState = {
      stories: {
        saved: [
          {
            title: "Story A",
            author: "Author A",
            num_comments: 10,
            points: 100,
          },
          {
            title: "Story B",
            author: "Author B",
            num_comments: 20,
            points: 200,
          },
        ],
      },
    };
    const store = mockStore(initialState);

    renderWithProviders(<SavedList />, store);

    const storyElements = screen.getAllByRole("listitem");
    expect(storyElements).toHaveLength(2);
    expect(screen.getByText("Story A")).toBeInTheDocument();
    expect(screen.getByText("Story B")).toBeInTheDocument();
  });
});
