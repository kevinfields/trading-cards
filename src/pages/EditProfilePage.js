import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EDIT_PROFILE from "../reducers/EDIT_PROFILE";

const EditProfilePage = (props) => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    photo: "",
  });
  const [editor, setEditor] = useState({
    name: false,
    email: false,
    photo: false,
  });
  const [newDetail, setNewDetail] = useState("");
  const navigate = useNavigate();

  const loadProfileData = async () => {
    let data;
    await props.userRef.get().then((doc) => {
      data = doc.data();
      setProfileData({
        name: data.name,
        email: data.email,
        photo: data.photoURL,
      });
    });
  };

  const editDetail = (property) => {
    switch (property) {
      case "name":
        setEditor({
          name: true,
          email: false,
          photo: false,
        });
        break;
      case "email":
        setEditor({
          email: true,
          name: false,
          photo: false,
        });
        break;
      case "photo":
        setEditor({
          photo: true,
          name: false,
          email: false,
        });
        break;
      default:
        break;
    }
  };

  const saveDetail = (property) => {
    setEditor({
      name: false,
      email: false,
      photo: false,
    });

    switch (property) {
      case "name":
        setProfileData({
          ...profileData,
          name: newDetail,
        });
        break;
      case "email":
        setProfileData({
          ...profileData,
          email: newDetail,
        });
        break;
      case "photo":
        setProfileData({
          ...profileData,
          photo: newDetail,
        });
        break;
      default:
        break;
    }
    setNewDetail("");
  };

  const saveChanges = async () => {
    await EDIT_PROFILE(
      props.userRef,
      profileData.name,
      profileData.email,
      profileData.photo
    ).then(() => {
      navigate("/my-profile");
    });
  };

  const closeEditor = () => {
    setEditor({
      name: false,
      email: false,
      photo: false,
    });
  };

  useEffect(() => {
    loadProfileData();
  }, []);

  return (
    <div className="page">
      {profileData.name !== "" ? (
        <div className="profile-data-form">
          <div className="profile-item">
            Name:
            {!editor.name ? (
              <p className="profile-item-text">{profileData.name}</p>
            ) : (
              <input
                className="profile-detail-input"
                type="text"
                onChange={(e) => setNewDetail(e.target.value)}
              />
            )}
            {!editor.name ? (
              <button
                className="profile-item-editor-button"
                onClick={() => editDetail("name")}
              >
                Edit Name
              </button>
            ) : (
              <>
                <button
                  className="profile-item-editor-button"
                  onClick={() => saveDetail("name")}
                >
                  Save Change
                </button>
                <button
                  className="profile-editor-stop-button"
                  onClick={() => closeEditor()}
                >
                  X
                </button>
              </>
            )}
          </div>
          <div className="profile-item">
            Email:
            {!editor.email ? (
              <p className="profile-item-text">{profileData.email}</p>
            ) : (
              <input
                className="profile-detail-input"
                type="text"
                onChange={(e) => setNewDetail(e.target.value)}
              />
            )}
            {!editor.email ? (
              <button
                className="profile-item-editor-button"
                onClick={() => editDetail("email")}
              >
                Edit Email
              </button>
            ) : (
              <>
                <button
                  className="profile-item-editor-button"
                  onClick={() => saveDetail("email")}
                >
                  Save Change
                </button>
                <button
                  className="profile-editor-stop-button"
                  onClick={() => closeEditor()}
                >
                  X
                </button>
              </>
            )}
          </div>
          <div className="profile-item">
            Profile Picture URL:
            {!editor.photo ? (
              <p className="profile-item-text">{profileData.photo}</p>
            ) : (
              <input
                className="profile-detail-input"
                type="link"
                onChange={(e) => setNewDetail(e.target.value)}
              />
            )}
            {!editor.photo ? (
              <button
                className="profile-item-editor-button"
                onClick={() => editDetail("photo")}
              >
                Change Photo
              </button>
            ) : (
              <>
                <button
                  className="profile-item-editor-button"
                  onClick={() => saveDetail("photo")}
                >
                  Save Change
                </button>
                <button
                  className="profile-editor-stop-button"
                  onClick={() => closeEditor()}
                >
                  X
                </button>
              </>
            )}
          </div>
          <button
            className="save-profile-details"
            onClick={() => saveChanges()}
          >
            Save Changes
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default EditProfilePage;
