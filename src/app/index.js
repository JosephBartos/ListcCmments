import React from "react";

import Header from "components/Header";
import CommentModal from "components/CommentModal";
import Comments from "components/Comments";
import TopComments from "components/TopComments";

function App() {
  return (
    <>
      <Header />
      <CommentModal />
      <TopComments />
      <Comments />
    </>
  );
}

export default App;
