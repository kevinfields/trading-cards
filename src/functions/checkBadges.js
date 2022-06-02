import ADD_BADGE from "../reducers/ADD_BADGE";

//badgeObject structure: 

//title: string
//description: string
//idTag: string
//rank: number
//firstEarned: timestamp

export default function checkBadges(attacker, attackerMax, defender, defenderMax, round, time, computerCard, badgesRef, userRef) {

  const defenderDamages = {
    health: defenderMax.health - defender.health,
    strength: defenderMax.strength - defender.strength,
    accuracy: defenderMax.accuracy - defender.accuracy,
    defense: defenderMax.defense - defender.defense,
  };

  if (attacker.health >= 50) {
    ADD_BADGE(badgesRef, userRef, {
      title: 'Sweeping Victory',
      description: 'Win a battle with at least 50 health remaining.',
      rank: 2,
      idTag: 'sweeping_victory',
      firstEarned: time,
    });
  }

  if (defenderDamages.strength >= 30 && defenderDamages.accuracy >= 30 && defenderDamages.defense >= 30 && defenderDamages.health >= 30) {
    ADD_BADGE(badgesRef, userRef, {
      title: 'Well Rounded',
      description: "Deal at least 30 damage to each of your opponent's skills.",
      rank: 4,
      idTag: 'well_rounded',
      firstEarned: time,
    })
  }

  if (
    defenderMax.health === 100 &&
    defenderMax.strength === 100 &&
    defenderMax.accuracy === 100 &&
    defenderMax.defender === 100
  ) {
    ADD_BADGE(badgesRef, userRef, {
      title: 'Defeat a Maxed Card',
      description: 'Defeat a card with a skill total of 400.',
      rank: 5,
      idTag: 'defeat_maxed_card',
      firstEarned: time,
    })
  }

  if (computerCard === 'computerMaster') {
    ADD_BADGE(badgesRef, userRef, {
      title: 'Fearless',
      description: "Defeat the Computer's Master Card.",
      rank: 4,
      idTag: 'defeat_computer_master',
      firstEarned: time,
    })
  }
}