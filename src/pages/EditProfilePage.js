import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styling/EditProfilePage.css';
import EDIT_PROFILE from "../reducers/EDIT_PROFILE";
import checkEmail from "../functions/checkEmail";
import checkURL from "../functions/checkURL";
import ErrorMessage from "../components/ErrorMessage";

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
  const [originalData, setOriginalData] = useState({
    name: '',
    email: '',
    photo: '',
  })
  const [newDetail, setNewDetail] = useState("");
  const [errorAlert, setErrorAlert] = useState({
    text: '',
    open: false,
  })
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
      setOriginalData({
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

    if (newDetail === '') {
      return;
    }

    switch (property) {
      case "name":
        if (newDetail.length > 20) {
          setErrorAlert({
            open: true,
            text: 'We can only store up to 20 characters for a name.'
          })
          return;
        }
        setProfileData({
          ...profileData,
          name: newDetail,
        });
        setErrorAlert({
          open: false,
          text: '',
        })
        break;
      case "email":
        switch (checkEmail(newDetail)) {
          case '@':
            setErrorAlert({
              open: true,
              text: 'You must have the symbol "@" in your email.'
            })
            return;
          case '.':
            setErrorAlert({
              open: true,
              text: "Your email must contain a '.'",
            })
            return;
          case 'length':
            setErrorAlert({
              open: true,
              text: 'Your email can only be 30 characters long.',
            })
            return;
          case 'ok':
            setProfileData({
              ...profileData,
              email: newDetail,
            });
            setErrorAlert({
              open: false,
              text: '',
            });
            break;
          default:
            break;
        }
        break;
      case "photo":
        if (!checkURL(newDetail)) {
          setErrorAlert({
            open: true,
            text: 'Please use a valid image URL of file type png, jpg, jpeg, or gif.',
          })
          return;
        }
        setProfileData({
          ...profileData,
          photo: newDetail,
        });
        setErrorAlert({
          open: false,
          text: '',
        });
        break;
      default:
        break;
    }
    setNewDetail("");
  };

  const saveChanges = async () => {

    if (
      originalData.name === profileData.name &&
      originalData.email === profileData.email && 
      originalData.photo === profileData.photo
      ) {
      setErrorAlert({
        open: true,
        text: 'You cannot save without making any changes.',
      });
      return;
    }
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
          <div className='profile-editor-detail-header'>Name:</div>
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
          <div className='profile-editor-detail-header'>Email:</div>
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
            <div className='profile-editor-detail-header'>Profile Picture URL:</div>
            {!editor.photo ? (
              <div className='profile-item-text'>{profileData.photo}</div>
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
      {errorAlert.open ?
        <ErrorMessage text={errorAlert.text} />
      : null}
    </div>
  );
};

export default EditProfilePage;
