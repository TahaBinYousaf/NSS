import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import React, { useState } from "react";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import AccessProducts from "./components/AccessProducts";
import AccessProducts2 from "./components/AccessProducts2";
import AccessProducts3 from "./components/AccessProducts3";
import AccessProducts4 from "./components/AccessProducts4";
import AccessProducts5 from "./components/AccessProducts5";
import AccessProducts6 from "./components/AccessProducts6";
import AccessProducts7 from "./components/AccessProducts7";
import AccessProducts8 from "./components/AccessProducts8";
import Collection from "./pages/Collection";
import Collection2 from "./pages/Collection2";
import Collection3 from "./pages/Collection3";
import Collection4 from "./pages/Collection4";
import Collection5 from "./pages/Collection5";
import Collection6 from "./pages/Collection6";
import Collection7 from "./pages/Collection7";
import MainCollection from "./pages/MainCollection";
import PostAd from "./pages/PostAd";
import Profile from "./auth/Profile";
import Chat from "./pages/Chat";
import { ShopProvider } from "./context/ShopContext"; // Assuming you have this

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  
  const handleSearch = (query, category) => {
    setSearchQuery(query);
    setCategory(category);
  };

  return (
    <ShopProvider>
      <Navbar onSearch={handleSearch} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<MainCollection searchQuery={searchQuery} category={category} />} />
        
        {/* Collection routes */}
        <Route path="/items-for-sale" element={<Collection />} />
        <Route path="/collection" element={<Collection />} /> {/* Keep for backward compatibility */}
        <Route path="/collection2" element={<Collection2 />} />
        <Route path="/collection3" element={<Collection3 />} />
        <Route path="/collection4" element={<Collection4 />} />
        <Route path="/collection5" element={<Collection5 />} />
        <Route path="/collection6" element={<Collection6 />} />
        <Route path="/collection7" element={<Collection7 />} />
        
        {/* Product detail routes */}
        <Route path="/product/:productid" element={<AccessProducts />} />
        <Route path="/product2/:productid" element={<AccessProducts2 />} />
        <Route path="/product3/:productid" element={<AccessProducts3 />} />
        <Route path="/product4/:productid" element={<AccessProducts4 />} />
        <Route path="/product5/:productid" element={<AccessProducts5 />} />
        <Route path="/product6/:productid" element={<AccessProducts6 />} />
        <Route path="/product7/:productid" element={<AccessProducts7 />} />
        <Route path="/product8/:productid" element={<AccessProducts8 />} />
        
        {/* User-related routes */}
        <Route path="/post-ad" element={<PostAd />} />
        <Route path="/edit-profile" element={<Profile />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      
      <Footer />
    </ShopProvider>
  );
}

export default App;