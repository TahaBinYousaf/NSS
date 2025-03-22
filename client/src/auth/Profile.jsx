import { useState, useEffect, useRef } from "react";
import axios from "axios";
import DropDown from "../components/Dropdown";
import Label from "../components/Label";
import ProfileImg from "../assets/logo1.png";

export default function Profile() {
  const [location, setLocation] = useState("");
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Set individual states directly from the response data
        setName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phone || "");
        setGender(res.data.gender || "");
        setLocation(res.data.location || "");
        setDob(res.data.dob || "");
        setAboutMe(res.data.aboutMe || "");
        
        // Set image preview if profile image exists
        if (res.data.profileImage) {
          setImagePreview(`http://localhost:5000/${res.data.profileImage}`);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      
      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      
      // Create FormData object to handle file upload
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("gender", gender);
      formData.append("location", location);
      formData.append("dob", dob);
      formData.append("aboutMe", aboutMe);
      
      // Only append the image if a new one is selected
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      // Use multipart/form-data for file upload
      await axios.put("http://localhost:5000/api/auth/profile", formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="container max-w-screen-xl mx-auto py-10">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col rounded-lg bg-white border-2 border-gray-200 w-full">
          <div className="flex flex-col lg:flex-row w-full justify-between gap-4 border-b-2 border-b-gray-200 p-8">
            <Label name="Edit Profile" className="!text-4xl" />
          </div>

          <div className="flex flex-col lg:flex-row w-full justify-between gap-4 border-b-2 border-b-gray-200 p-8">
            <Label name="Profile Photo*" />
            <div className="flex flex-row flex-wrap items-center flex-1 gap-4">
              <div 
                className="relative cursor-pointer size-28 hover:bg-gray-200 rounded-full overflow-hidden ml-1"
                onClick={triggerFileInput}
              >
                <img 
                  src={imagePreview || ProfileImg} 
                  className="size-full object-cover" 
                  alt="Profile" 
                />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <button 
                className="cursor-pointer text-lg font-bold bg-blue-900 text-white p-3 rounded-md"
                onClick={triggerFileInput}
              >
                Upload Photo
              </button>
            </div>
          </div>

          <div className="flex flex-col w-full justify-between gap-8 p-8">
            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <Label name="Name" />
              <input className="flex-1 w-full border-2 border-gray-400 rounded-md p-4 text-lg"
                value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
            </div>

            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <Label name="Date of birth" />
              <input className="flex-1 w-full border-2 border-gray-400 rounded-md p-4 text-lg"
                value={dob} onChange={(e) => setDob(e.target.value)} placeholder="DD/MM/YYYY" />
            </div>

            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <Label name="Gender" />
              <DropDown placeholder="Select Gender" value={gender} valueSet={setGender} dropDownValues={["Male", "Female", "Prefer not to say"]} />
            </div>

            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <Label name="About Me" />
              <textarea className="flex-1 w-full border-2 border-gray-400 rounded-md p-4 text-lg min-h-52 max-h-52 resize-none"
                value={aboutMe} onChange={(e) => setAboutMe(e.target.value)} placeholder="About me (optional)" />
            </div>

            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <Label name="Location" />
              <DropDown placeholder="Select Location" value={location} valueSet={setLocation} dropDownValues={["DHA", "Gulberg", "Model Town", "Johar Town", "Bahria Town", "Garden Town", "PCSIR", "Cantonment Cantt", "Askari"]} />
            </div>
          </div>
        </div>

        <div className="flex flex-col rounded-lg bg-white border-2 border-gray-200 w-full">
          <div className="flex flex-col lg:flex-row w-full justify-between gap-4 border-b-2 border-b-gray-200 p-8">
            <Label name="Contact Information" className="!text-3xl w-full" />
          </div>

          <div className="flex flex-col w-full justify-between gap-8 p-8 border-b-2 border-b-gray-200">
            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <Label name="Phone Number" />
              <input className="flex-1 w-full border-2 border-gray-400 rounded-md p-4 text-lg"
                value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" />
            </div>

            <div className="flex flex-col lg:flex-row gap-4 flex-1">
              <Label name="Email" />
              <input className="flex-1 w-full border-2 border-gray-400 rounded-md p-4 text-lg"
                value={email} disabled />
            </div>
          </div>

          <div className="flex w-full justify-end gap-8 p-8">
            <button onClick={handleSaveChanges} className="w-fit flex items-center gap-2 cursor-pointer px-4 md:px-6 py-2 md:py-3 font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-black transition-all duration-300 ease-in-out transform hover:scale-105 hover:brightness-110">
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}