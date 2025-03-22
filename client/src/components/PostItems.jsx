import { useState } from "react"; 
import axios from "axios";
import PropTypes from 'prop-types'; // Import PropTypes

export default function PostItem({ modalTypeSet }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("Lahore");
    
    async function handlePost() {
        const userData = localStorage.getItem("user");
        const authToken = localStorage.getItem("token");
        
        if (!userData || !authToken) {
            alert("You must be logged in to post an item.");
            modalTypeSet("Login"); // Redirect user to login modal
            return;
        }
        
        try {
            const response = await axios.post(
                "http://localhost:5000/api/posts",
                { title, description, category, location },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`, // Pass token in header
                    },
                }
            );
            
            console.log("Post created:", response.data);
            alert("Post created successfully!");
        } catch (error) {
            console.error("Error creating post:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Failed to create post.");
        }
    }
    
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">Create a New Post</h2>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="w-full p-2 border rounded mt-2"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full p-2 border rounded mt-2"
            />
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
                className="w-full p-2 border rounded mt-2"
            />
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="w-full p-2 border rounded mt-2"
            />
            
            <button onClick={handlePost} className="mt-4 p-2 bg-black text-white rounded">
                Submit Post
            </button>
        </div>
    );
}

// Add PropTypes validation
PostItem.propTypes = {
    modalTypeSet: PropTypes.func.isRequired
};