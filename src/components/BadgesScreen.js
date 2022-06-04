import React, {useState, useEffect} from 'react'
import Badge from './Badge';
import LoadingScreen from './LoadingScreen';
import '../styling/BadgesScreen.css';

const BadgesScreen = (props) => {

  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBadges = async () => {

    let badgeData = [];
    await props.userRef.collection('badges').get().then(snap => {
      snap.forEach(doc => {
        badgeData.push(doc.data());
      })
    });
    setBadges(badgeData.sort((a, b) => b.rank - a.rank));
    setLoading(false);
  }

  const getBorderColor = (rank) => {
    switch (rank) {
      default:
        return 'black';
      case 1:
        return ['1px solid green', 'lightgreen'];
      case 2: 
        return ['1px solid blue', 'skyblue'];
      case 3: 
        return ['1px solid red', 'pink'];
      case 4: 
        return ['1px solid purple', 'magenta'];
      case 5:
        return ['2px solid goldenrod', 'gold'];
    }
  }

  useEffect(() => {
    loadBadges();
  }, []);
  
  return (
    <div className='badges-screen'>
      {loading ? 
          <LoadingScreen />
        : !loading && badges.length === 0 ?
          <p className='no-badges-message'>{props.self ? 'You ' : 'This player '} not have any badges yet.</p>
        : badges.map(item => (
          <Badge badge={item} styling={{
            border: getBorderColor(item.rank)[0],
            backgroundColor: getBorderColor(item.rank)[1]
          }}/>
        ))
      }
    </div>
  )
}

export default BadgesScreen