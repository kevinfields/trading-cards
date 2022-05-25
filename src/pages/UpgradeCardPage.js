import React, { useState, useEffect } from "react";

const UpgradeCardPage = (props) => {
  const [cardData, setCardData] = useState({});

  const loadCardData = async () => {
    let data;
    await props.cardsRef
      .doc(props.id)
      .get()
      .then((doc) => {
        data = doc.data();
      });
    setCardData(data);
  };

  useEffect(() => {
    loadCardData();
  }, []);

  return (
    <div className="page">
      This is where you would update the {cardData.name ? cardData.name : null}{" "}
      card.
    </div>
  );
};

export default UpgradeCardPage;
