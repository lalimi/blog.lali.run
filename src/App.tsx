import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Home from "@/pages/Home";
import BlogIndex from "@/pages/blog/Index";
import BlogPost from "@/pages/blog/Post";
import AdminBlogPosts from "@/pages/admin/blog/AdminBlogPosts";
import AdminBlogPostForm from "@/pages/admin/blog/PostForm";
import AhrefsAnalytics from "@/components/AhrefsAnalytics";

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        {/* Ahrefs Analytics */}
        <AhrefsAnalytics dataKey="T5uvrdFYZyEqK2g1QYCwBg" />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          
          {/* Адмін маршрути */}
          <Route path="/admin/blog" element={<AdminBlogPosts />} />
          <Route path="/admin/blog/new" element={<AdminBlogPostForm />} />
          <Route path="/admin/blog/edit/:id" element={<AdminBlogPostForm />} />
          
          <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
