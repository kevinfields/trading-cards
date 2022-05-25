import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../styling/ProfilePage.css";
import LoadingScreen from "../components/LoadingScreen";

const ProfilePage = (props) => {
  const [details, setDetails] = useState({
    data: {},
    id: "",
  });
  const navigate = useNavigate();

  const loadData = async () => {
    let data;
    let id;
    await props.userRef.get().then((doc) => {
      data = doc.data();
      id = doc.id;
      setDetails({
        data: data,
        id: id,
      });
    });
  };

  const openProfileEditor = () => {
    navigate("/edit-profile");
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="page">
      <h3 className="profile-header">My Profile</h3>
      <button
        className="edit-profile-button"
        onClick={() => openProfileEditor()}
      >
        Edit Details
      </button>
      {details.id !== "" ? (
        <>
          <div className="personal-information">
            <p className="personal-info-item">{details.data.name}</p>
            <p className="personal-info-item">Email: {details.data.email}</p>
            <p className="personal-info-item">
              Battles: {Number(details.data.wins) + Number(details.data.losses)}
            </p>
            <p className="personal-info-item">Victories: {details.data.wins}</p>
            <p className="personal-info-item">Defeats: {details.data.losses}</p>
            <p className="personal-info-item">
              Total Xp: {details.data.xpTotal}
            </p>
            <p className="personal-info-item">
              Unused Xp: {details.data.xpRemaining}
            </p>
          </div>
          <img
            className="profile-photo"
            src={details.data.photoURL}
            alt={details.data.name}
          />
        </>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};

export default ProfilePage;
