import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AccessProducts from "./components/AccessProducts";
import Collection from "./pages/Collection";
import MainCollection from "./pages/MainCollection";
import PostAd from "./pages/PostAd";
import Profile from "./auth/Profile";
import Chat from "./pages/Chat";
import ChatInbox from "./pages/ChatInbox";
import ResetPassword from "@/auth/ResetPassword";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (searchQuery, category, location) => {
    console.log("App - handleSearch called with:", { searchQuery, category, location });
    setSearchQuery(searchQuery);
    setCategory(category);
    setLocation(location);
  };

  // Log state changes
  useEffect(() => {
    console.log("App - State updated:", { searchQuery, category, location });
  }, [searchQuery, category, location]);

  return (
    <>
      <Navbar onSearch={handleSearch} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/search" 
          element={
            <MainCollection 
              searchQuery={searchQuery} 
              category={category} 
              location={location} 
            />
          } 
        />
        {/* Collection routes */}
        <Route path="/items-for-sale" element={<Collection />} />
        <Route path="/collection/:category" element={<Collection />} /> {/* Keep for backward compatibility */}
        {/* Product detail routes */}
        <Route path="/product/:productid" element={<AccessProducts />} />
        {/* User-related routes */}
        <Route path="/post-ad" element={<PostAd />} />
        <Route path="/edit-profile" element={<Profile />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/messages" element={<ChatInbox />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
