import ADD_BADGE from "../reducers/ADD_BADGE";
import getTotalStats from "./getTotalStats";

//badgeObject structure: 

//title: string
//description: string
//idTag: string
//rank: number
//firstEarned: timestamp

export default function checkBadges(attacker, attackerMax, defender, defenderMax, round, time, xp, computerCard, badgesRef, userRef) {

  const defenderDamages = {
    health: defenderMax.health - defender.health,
    strength: defenderMax.strength - defender.strength,
    accuracy: defenderMax.accuracy - defender.accuracy,
    defense: defenderMax.defense - defender.defense,
  };

  const attackerDamages = {
    health: attackerMax.health - attacker.health,
    strength: attackerMax.strength - attacker.strength,
    accuracy: attackerMax.accuracy - attacker.accuracy,
    defense: attackerMax.defense - attacker.defense,
  };

  const defenderTotal = getTotalStats(defenderMax);
  const attackerTotal = getTotalStats(attackerMax);

  let allBadges = [];

  if (attacker.health >= 50) {
    ADD_BADGE(badgesRef, userRef, {
      title: 'Sweeping Victory',
      description: 'Earn a victory with at least 50 health remaining.',
      rank: 2,
      idTag: 'sweeping_victory',
      firstEarned: time,
    });
    allBadges.push('Sweeping Victory');
  }

  if (defenderDamages.strength >= 30 && defenderDamages.accuracy >= 30 && defenderDamages.defense >= 30 && defenderDamages.health >= 30) {
    ADD_BADGE(badgesRef, userRef, {
      title: 'Well Rounded',
      description: "Deal at least 30 damage to each of your opponent's skills.",
      rank: 4,
      idTag: 'well_rounded',
      firstEarned: time,
    });
    allBadges.push('Well Rounded');
  };

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
    });
    allBadges.push('Defeat a Maxed Card');
  };

  if (computerCard === 'computerMaster') {
    ADD_BADGE(badgesRef, userRef, {
      title: 'Fearless',
      description: "Defeat the Computer's Master Card.",
      rank: 4,
      idTag: 'defeat_computer_master',
      firstEarned: time,
    });
    allBadges.push('Fearless');
  } else if (computerCard === 'computerExpert') {
    ADD_BADGE(badgesRef, userRef, {
      title: 'Feared',
      description: "Defeat the Computer's Expert Card.",
      rank: 2,
      idTag: 'defeat_computer_expert',
      firstEarned: time,
    })
    allBadges.push('Feared');
  } else if (computerCard === 'computerProficient') {
    ADD_BADGE(badgesRef, userRef, {
      title: 'Warrior',
      description: "Defeat the Computer's Proficient Card.",
      rank: 1,
      idTag: 'defeat_computer_proficient',
      firstEarned: time,
    });
    allBadges.push('Warrior');
  };

  if (round === 1) {
    ADD_BADGE(badgesRef, userRef, {
      title: 'One Shot',
      description: 'Earn a victory in one round.',
      rank: 3,
      idTag: "one_shot",
      firstEarned: time,
    });
    allBadges.push('One Shot');
  };

  if (attackerDamages.health > defenderDamages.health) {
    ADD_BADGE(badgesRef, userRef, {
      title: 'Healthy Battler',
      description: 'Earn a victory despite losing more health than your opponent.',
      rank: 1,
      idTag: 'healthy_battler',
      firstEarned: time,
    });
    allBadges.push('Healthy Battler');
  };

  if (attackerDamages.health >= (0.9 * attackerMax.health)) {
    ADD_BADGE(badgesRef, userRef, {
      title: 'Close Call',
      description: 'Earn a victory with 10% or less of your total health.',
      rank: 4,
      idTag: 'close_call',
      firstEarned: time,
    });
    allBadges.push('Close Call');
  };

  if (defenderTotal - 50 >= attackerTotal) {
    ADD_BADGE(badgesRef, userRef, {
      title: 'Underdog',
      description: 'Defeat an opponent with a total level at least 50 levels higher than yours.',
      rank: 4,
      idTag: 'underdog',
      firstEarned: time,
    });
    allBadges.push('Underdog');
  };

  if (xp >= 25) {
    ADD_BADGE(badgesRef, userRef, {
      title: 'Heavy Reward',
      description: 'Earn at least 25 xp points in one match.',
      rank: 4,
      idTag: 'heavy_reward',
      firstEarned: time,
    });
    allBadges.push('Heavy Reward');
  }

  if (defender.strength <= 0 || defender.accuracy <= 0 || defender.defense <= 0) {
    ADD_BADGE(badgesRef, userRef, {
      title: 'Specialist',
      description: "Earn a victory after depleting one of your opponent's skills to level 0.",
      rank: 1,
      idTag: 'specialist',
      firstEarned: time,
    });
    allBadges.push('Specialist')
  }

  return allBadges;
}