import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import UserMenu from './../../componenets/layout/UserMenu';
import Layout from './../../componenets/layout/layout';

const Profile = () => {
  // Context
  const [auth, setAuth] = useAuth();

  // State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profileLoading, setProfileLoading] = useState(false); // Loading state for profile update
  const [passwordLoading, setPasswordLoading] = useState(false); // Loading state for password change
  const [newPassword, setNewPassword] = useState(""); // New password state
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password state

  // Get user data
  useEffect(() => {
    if (auth?.user) {
      const { email, name, phone, address } = auth.user;
      setName(name);
      setPhone(phone);
      setEmail(email);
      setAddress(address);
    }
  }, [auth?.user]);

  // Form submission for updating profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true); // Set profile loading state to true
    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        setAuth({ ...auth, user: data.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        alert("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setProfileLoading(false); // Reset profile loading state after request completes
    }
  };

  // Form submission for changing password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    setPasswordLoading(true); // Set password loading state to true
    try {
      const { data } = await axios.put("/api/v1/auth/change-password", {
        currentPassword: password,
        newPassword: newPassword,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        alert("Password Changed Successfully");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setPasswordLoading(false); // Reset password loading state after request completes
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <div className="form-container" style={{ marginTop: "20px" }}> {/* Adjust margin-top here */}
              <form onSubmit={handleSubmit}>
                {/* User profile form */}
                <h4 className="title">User Profile</h4>
                <div className="mb-3">
                <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Name"
                    autoFocus
                    required
                  />
                </div>
                <div className="mb-3">
                <label htmlFor="name">Email:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Email"
                    disabled
                    required
                  />
                </div>
                <div className="mb-3">
                <label htmlFor="name">Phone No:</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    placeholder="Phone"
                    required
                  />
                </div>
                <div className="mb-3">
                <label htmlFor="name">Address:</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    placeholder="Address"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={profileLoading}>
                  {profileLoading ? "Updating..." : "Update Profile"}
                </button>
              </form>
            </div>
            <div className="form-container mt-4">
              <form onSubmit={handleChangePassword}>
                {/* Password change form */}
                <h4 className="title">Change Password</h4>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Current Password"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-control"
                    placeholder="New Password"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-control"
                    placeholder="Confirm New Password"
                    required
                  />
                  {newPassword !== confirmPassword && <p style={{ color: "red" }}>Passwords do not match</p>}
                  {newPassword.length < 6 && <p style={{ color: "red" }}>Password must be at least 6 characters long</p>}
                </div>
                <button type="submit" className="btn btn-primary" disabled={passwordLoading}>
                  {passwordLoading ? "Updating..." : "Change Password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
