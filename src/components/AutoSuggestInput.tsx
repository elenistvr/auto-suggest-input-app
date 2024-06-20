import React, { useState, Fragment } from "react";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
  Snackbar,
  Typography,
  Box,
} from "@mui/material";
import Highlighter from "react-highlight-words";
import debounce from "lodash/debounce";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { addStory } from "../store/newsSlice";
import { useQuery } from "react-query";
import { Story } from "../types";
import "../App.css";

const useFetchStories = (query: string) => {
  return useQuery<Story[], Error>(
    ["stories", query],
    async () => {
      const response = await fetch(
        `https://hn.algolia.com/api/v1/search?query=${query}`
      );
      if (!response.ok) {
        throw new Error("network response was not ok!!");
      }
      const data = await response.json();
      return data.hits.map((hit: Story) => ({
        title: hit.title,
        author: hit.author,
        num_comments: hit.num_comments,
        points: hit.points,
      }));
    },
    {
      enabled: query.length >= 3,
      staleTime: 2 * 60 * 1000,
    }
  );
};

const AutoSuggestInput: React.FC = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "warning" | "error"
  >("success");
  const dispatch = useDispatch<AppDispatch>();
  const savedStories = useSelector((state: RootState) => state.stories.saved);

  const debouncedFetch = debounce((newQuery: string) => {
    setDebouncedQuery(newQuery);
  }, 150);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery.length >= 3) {
      debouncedFetch(newQuery);
    } else {
      setDebouncedQuery("");
    }
  };

  const { data: stories, isLoading, isError } = useFetchStories(debouncedQuery);

  const handleAddStory = (story: Story) => {
    const isAlreadySaved = savedStories.some(
      (savedStory) => savedStory.title === story.title
    );

    if (savedStories.length >= 5) {
      if (isAlreadySaved) {
        setSnackbarMessage("Maximum limit reached and story is already saved!");
        setSnackbarSeverity("warning");
      } else {
        setSnackbarMessage(
          "Maximum limit reached: You can only save up to 5 stories!"
        );
        setSnackbarSeverity("warning");
      }
    } else {
      if (isAlreadySaved) {
        setSnackbarMessage("Story is already saved!");
        setSnackbarSeverity("warning");
      } else {
        dispatch(addStory(story));
        setSnackbarMessage("Story added to saved list!");
        setSnackbarSeverity("success");
      }
    }
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="list-container">
      <TextField
        placeholder="Search"
        onChange={handleInputChange}
        fullWidth
        style={{ width: "620px" }}
      />
      {query.length >= 3 && (
        <Box className="list-shadow list-absolute">
          {isLoading ? (
            <Box className="loading-container">
              <CircularProgress color="warning" />
            </Box>
          ) : isError ? (
            <Typography color="error" align="center" mt={2}>
              Error fetching stories. Please try again.
            </Typography>
          ) : (
            <List>
              {stories?.slice(0, 5).map((story, index) => (
                <Fragment key={index}>
                  <ListItem button>
                    <ListItemText
                      primary={
                        <Highlighter
                          highlightClassName="highlight"
                          searchWords={[query]}
                          autoEscape={true}
                          textToHighlight={story.title || ""}
                        />
                      }
                      secondary={`${story.points} points | by ${story.author} | ${story.num_comments} comments`}
                      onClick={() => handleAddStory(story)}
                    />
                  </ListItem>
                  {index < stories.slice(0, 5).length - 1 && <Divider />}
                </Fragment>
              ))}
            </List>
          )}
        </Box>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AutoSuggestInput;
