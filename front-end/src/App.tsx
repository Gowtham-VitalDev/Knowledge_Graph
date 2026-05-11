import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FeedView from "./views/Feed/FeedView";
import BlogView from "./views/Blog/BlogView";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FeedView />} />
        <Route path="/article/:slug" element={<BlogView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
