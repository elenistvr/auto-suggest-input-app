import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Story } from "../types";

interface StoriesState {
  saved: Story[];
}

const loadState = (): Story[] => {
  try {
    const stateFromStorage = localStorage.getItem("savedStories");
    if (stateFromStorage === null) {
      return [];
    }
    return JSON.parse(stateFromStorage);
  } catch (err) {
    return [];
  }
};

const initialState: StoriesState = {
  saved: loadState(),
};

const saveState = (state: Story[]) => {
  try {
    const stateFromStorage = JSON.stringify(state);
    localStorage.setItem("savedStories", stateFromStorage);
  } catch (err) {
    console.error(err);
  }
};

const newsSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    addStory: (state, action: PayloadAction<Story>) => {
      state.saved.push(action.payload);
      saveState(state.saved);
    },
    removeStory: (state, action: PayloadAction<Story>) => {
      state.saved = state.saved.filter(
        (story) => story.title !== action.payload.title
      );
      saveState(state.saved);
    },
  },
});

export const { addStory, removeStory } = newsSlice.actions;
export default newsSlice.reducer;
