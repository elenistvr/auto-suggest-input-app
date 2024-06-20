import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { RootState, AppDispatch } from "../store";
import { removeStory } from "../store/newsSlice";
import { Story } from "../types";

const SavedList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const SavedList = useSelector((state: RootState) => state.stories.saved);

  const handleRemoveStory = (story: Story) => {
    dispatch(removeStory(story));
  };

  return (
    <div className="list-container">
      <div
        style={{ width: "620px", marginBottom: "8px", alignSelf: "flex-start" }}
      >
        <Typography variant="h6">Saved Stories</Typography>
      </div>
      <div style={{ width: "620px" }}>
        {SavedList.length > 0 ? (
          <List>
            {SavedList.map((story, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={story.title}
                    secondary={`${story.points} points | by ${story.author} | ${story.num_comments} comments`}
                  />
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveStory(story)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
                {index < SavedList.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Typography variant="body1" color="textSecondary" align="center">
            No saved stories.
          </Typography>
        )}
      </div>
    </div>
  );
};

export default SavedList;
