import React, { useState, useEffect } from "react";
import { toast } from "sonner";

const Profile = () => {
  // Initialize state variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [profileImage, setProfileImage] = useState(""); // State for profile image

  // Load data from localStorage
  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem("user")) || {};
    setName(userProfile.username || "");
    setEmail(userProfile.email || "");
    setAddress(userProfile.address || "");
    setPhone(userProfile.phone || "");
    setProfileImage(userProfile.image || ""); // Load profile image from localStorage
  }, []);

  // Handle input change for editable fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "address") setAddress(value);
    if (name === "phone") setPhone(value);
  };

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result); // Set the base64 image data
      };
      reader.readAsDataURL(file);
    }
  };

  // Save profile changes to localStorage
  const handleSave = () => {
    const updatedProfile = { username: name, email, address, phone, image: profileImage };
    localStorage.setItem("user", JSON.stringify(updatedProfile));
    toast.success("Profile updated successfully!");
    setIsEditing(false); // After saving, switch to read-only mode
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg lg:w-1/2 mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">User Profile</h1>

      <div className="space-y-6">
        {/* Profile Image */}
        <div className="text-center">
          <img
            src={profileImage || "https://via.placeholder.com/150"} // Default placeholder if no image
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto object-cover"
          />
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          )}
        </div>

        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            disabled={!isEditing} // Disable input when not editing
          />
        </div>

        {/* Email Field (Read-Only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            readOnly
            className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
            placeholder="Your email (read-only)"
          />
        </div>

        {/* Address Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your address"
            disabled={!isEditing} // Disable input when not editing
          />
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your phone number"
            disabled={!isEditing} // Disable input when not editing
          />
        </div>

        {/* Buttons: Edit/Save */}
        <div className="mt-6 flex space-x-4">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Edit Profile
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="w-full py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
