import React, { useState, useEffect } from "react";
import "../styling/ProfilePage.css";
import Card from "../components/Card";
import LoadingScreen from "../components/LoadingScreen";
import BadgesScreen from "../components/BadgesScreen";

const OtherProfilePage = (props) => {
  const [details, setDetails] = useState({
    data: {},
    id: "",
  });
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

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
    return data;
  };

  const loadCards = async (cards) => {
    let cardsData = [];
    for (let i=0; i<cards.length; i++) {
      await props.cardsRef.doc(cards[i]).get().then(doc => {
        cardsData.push({
          id: doc.id,
          data: doc.data(),
        })
      })
    }
    setCards(cardsData);
    setLoading(false);
  };

  useEffect(() => {
    loadData().then((data) => {
      loadCards(data.cards);
    });
  }, []);

  return (
    <div className="page">
      <h3 className="profile-header">Profile</h3>
      {!loading ? (
        <>
          <div className="personal-information">
            <h3 className="personal-info-item">{details.data.name}</h3>
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
          { details.id === 'computer' ? null :
          <>
            <h3 className='badges-header'>Badges</h3>
            <BadgesScreen userRef={props.userRef} self={false}/>
            <h3 className='cards-header'>Cards</h3>
            <div className='cards-screen'>
              {cards.length > 0 ? cards.map(item => (
                <Card card={item.data} />
              ))
              : cards.length === 0 && !loading ?
              <p className='no-cards-alert'>You do not have any cards yet.</p>
              : null
              }
            </div>
          </>
          }
        </>
      ) : (
        <LoadingScreen />
      )}
    </div>
  );
};

export default OtherProfilePage;
