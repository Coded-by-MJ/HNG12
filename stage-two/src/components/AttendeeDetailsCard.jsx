import { ActionButton } from "./Buttons";
import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useStore } from "../provider/storeContext";
import { uploadProfileImage } from "../lib/cloudinary";

function AttendeeDetailsCard() {
  const { user, updateUser, updateStepsData, addTicketToStore } = useStore();
  const { email, fullName, request, avatar } = user;
  const [previewUrl, setPreviewUrl] = useState(avatar);
  const [errors, setErrors] = useState({
    avatar: "",
    fullName: "",
    email: "",
  });

  const handleEmailChange = (e) => {
    const { value, validity } = e.target;
    const isEmailValid = validity.valid;
    if (!isEmailValid) {
      setErrors((prev) => ({
        ...prev,
        email: "Enter a correct email",
      }));
      return;
    }
    setErrors((prev) => ({
      ...prev,
      email: "",
    }));
    updateUser("email", value);
  };
  const handleNameChange = (e) => {
    const { value, validity } = e.target;
    const isNameValid = validity.valid;
    if (!isNameValid || !value.length) {
      setErrors((prev) => ({
        ...prev,
        fullName: "Your Full Name is Required",
      }));
      return;
    }
    setErrors((prev) => ({
      ...prev,
      fullName: "",
    }));
    updateUser("fullName", value);
  };
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setErrors((prev) => ({
        ...prev,
        avatar: "Please provide a profile photo",
      }));
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      // 2MB limit
      setErrors((prev) => ({
        ...prev,
        avatar: "File must be less than 2MB",
      }));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageBase64 = reader.result;
      setPreviewUrl(imageBase64);
      updateUser("avatar", imageBase64);
    };
    reader.readAsDataURL(file);
    setErrors((prev) => ({
      ...prev,
      avatar: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a correct email";
    }
    if (!fullName || fullName.trim().length < 1) {
      newErrors.fullName = "Your Full Name is Required";
    }
    if (!avatar || avatar.length < 1) {
      newErrors.avatar = "Please provide a profile photo";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    //Upload to cloudinary
    const imageUrl = await uploadProfileImage(avatar);

    if (!imageUrl) {
      alert("There was an error uploading your profile photo");
      throw new Error("There was an error uploading your profile photo");
    }
    updateUser("email", email);
    updateUser("fullName", fullName);
    updateUser("avatar", imageUrl);
    updateUser("request", request);
    addTicketToStore();
    updateStepsData({
      title: "Ready",
      currentStep: 2,
      percent: 100,
    });
  };

  return (
    <article className="steps-card">
      <form id="user-form" onSubmit={(e) => handleSubmit(e)} noValidate>
        <div className="avatar-input-wrapper">
          <span>Upload Profile Photo*</span>
          <label htmlFor="avatar" className="avatar-label">
            <input
              type="file"
              accept="image/jpeg"
              name="avatar"
              id="avatar"
              onChange={(e) => handleImageChange(e)}
            />
            {previewUrl.length ? (
              <img src={previewUrl} className="dropbox-img" />
            ) : (
              <div className="dropbox">
                <IoCloudUploadOutline color="#fafafa" size={24} />

                <p>Drag & drop or click to upload</p>
              </div>
            )}
          </label>
          <p className="err-msg">{errors.avatar}</p>
        </div>
        <div className="line-bar"></div>
        <div className="input-wrapper">
          <label htmlFor="fullName">Enter your full name*</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            defaultValue={fullName}
            onChange={(e) => handleNameChange(e)}
            required={true}
          />
          <p className="err-msg">{errors.fullName}</p>
        </div>{" "}
        <div className="input-wrapper">
          <label htmlFor="email">Enter your email address*</label>
          <input
            type="email"
            name="email"
            id="email"
            required={true}
            onChange={(e) => handleEmailChange(e)}
            defaultValue={email}
          />
          <p className="err-msg">{errors.email}</p>
        </div>
        <div className="input-wrapper">
          <label htmlFor="request">Special Request?</label>
          <textarea
            rows={8}
            name="request"
            id="request"
            defaultValue={request}
            onChange={(e) => {
              updateUser("request", e.target.value);
            }}
          />
        </div>
      </form>
      <div className="action-button-wrapper">
        <ActionButton
          className={"secondary"}
          text="Back"
          onClick={() => {
            updateStepsData({
              title: "Ticket Selection",
              currentStep: 0,
              percent: 35,
            });
          }}
        />
        <button
          type="submit"
          className="action-button primary"
          form="user-form"
        >
          Get My Free Ticket
        </button>
      </div>
    </article>
  );
}

export default AttendeeDetailsCard;
