import { createSlice, createSelector } from "@reduxjs/toolkit";

export const name = "view";
const initialState = {
  commentsModalOpen: false,
  comments: []
};

const viewSlice = createSlice({
  name,
  initialState,
  reducers: {
    openCommentsModal(state) {
      state.commentsModalOpen = true;
    },
    closeCommentsModal(state) {
      state.commentsModalOpen = false;
    },
    loadComments(state,action) {
      state.comments = action.payload
    },
    addComment(state,action) {
      state.comments.push({...action.payload, id:state.comments.length +1})
    }
  },
});

const getSlice = (state) => state[name] || {};

export const getViewCommentsModalOpen = createSelector(
  getSlice,
  (slice) => slice.commentsModalOpen
);

export const getTopCommenters = createSelector(
  getSlice,
  (slice) => {
    const comments = slice.comments;

    const count = {}

    for(const comment of comments){
      if(count[comment.name]){
        count[comment.name] += 1;
      }else{
        count[comment.name] = 1;
      }
    }

    const commenters = []
    Object.keys(count).forEach((key,index) => {
      commenters.push({
        name:key,
        counts:count[key]
      })
    })

    commenters.sort((a,b) => {
      if(a.counts > b.counts) {
        return -1
      } else if(a.counts < b.counts) {
        return 1
      } else {
        return 0
      }
    })
    

    return commenters.filter((comment,index) => {
      return index < 3
    })

  }
)

export const getCommentsList = createSelector(getSlice, (slice) => slice.comments)
export const { openCommentsModal, closeCommentsModal,loadComments,addComment } = viewSlice.actions;
export default viewSlice.reducer;
