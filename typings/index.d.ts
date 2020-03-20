/* HOW TO MAINTAIN THIS FILE
  This file DOES NOT need to be updated every time a new hero is released: when that happens, the update.yml workflow will automatically updateadd the new hero in autogen.ts
  IMPORTANT: If any response to any method is changed you need to update the corresponding structure as shown below
*/

import { hero } from './autogen'

declare module 'overwatch-stats-api' {
  /**
   * Gets all the possible stats for a user. Combines the results from the other 3 methods: `getBasicInfo`, `getHeroStats` and `getMostPlayed`
   * @param battletag Use the `'NAME-DISCRIMINATOR'` format if on pc, otherwise just type the name (case sensitive)
   * @param platform Either `'pc'`, `'xbl'` or `'psn'`
   */
  export function getAllStats(battletag: string, platform: string): Promise<AllStats>

  /**
   * Gets some basic stats about the profile
   * @param battletag Use the `'NAME-DISCRIMINATOR'` format if on pc, otherwise just type the name (case sensitive)
   * @param platform Either `'pc'`, `'xbl'` or `'psn'`
   */
  export function getBasicInfo(battletag: string, platform: string): Promise<BasicInfo>

  /**
   * Gets stats about the heroes
   * @param battletag Use the `'NAME-DISCRIMINATOR'` format if on pc, otherwise just type the name (case sensitive)
   * @param platform Either `'pc'`, `'xbl'` or `'psn'`
   */
  export function getHeroStats(battletag: string, platform: string): Promise<HeroStats>

  /**
   * Gets the playtime for every hero
   * @param battletag Use the `'NAME-DISCRIMINATOR'` format if on pc, otherwise just type the name (case sensitive)
   * @param platform Either `'pc'`, `'xbl'` or `'psn'`
   */
  export function getMostPlayed(battletag: string, platform: string): Promise<MostPlayed>

  export type Hero = hero

  interface AllStats extends BasicInfo {
    heroStats: HeroStats
    mostPlayed: MostPlayed
  }

  interface BasicInfo {
    battletag: string
    borderURL: string
    endorsementLevel: string
    endorsements: {
      shotcaller: string,
      sportsmanship: string
      teammate: string
    }
    iconURL: string
    level: string
    prestige: number
    profileURL: string
    rank: Rank
    starsURL: string
  }

  interface Rank {
    damage?: RankRole
    support?: RankRole
    tank?: RankRole
  }

  interface RankRole {
    sr: string
    roleIcon: string
    tierIcon: string
  }

  interface HeroStats {
    competitive: HeroStatsGroup
    quickplay: HeroStatsGroup
  }

  interface MostPlayed {
    competitive: Record<Hero, MostPlayedHero>
    quickplay: Record<Hero, MostPlayedHero>
  }

  interface HeroStatsGroup extends Record<Hero, RegularHero> {
    overall: HeroBase
  }

  interface HeroBase {
    assists: {
      defensive_assists: string
      defensive_assists_avg_per_10_min: string
      defensive_assists_most_in_game: string
      healing_done: string
      healing_done_avg_per_10_min: string
      healing_done_most_in_game: string
      offensive_assists: string
      offensive_assists_avg_per_10_min: string
      offensive_assists_most_in_game: string
      recon_assists: string
      recon_assists_avg_per_10_min: string
      recon_assists_most_in_game: string
    }
    average: {
      all_damage_done_avg_per_10_min: string
      barrier_damage_done_avg_per_10_min: string
      critical_hits_avg_per_10_min: string
      deaths_avg_per_10_min: string
      eliminations_avg_per_10_min: string
      eliminations_per_life: string
      final_blows_avg_per_10_min: string
      hero_damage_done_avg_per_10_min: string
      melee_final_blows_avg_per_10_min: string
      objective_kills_avg_per_10_min: string
      objective_time_avg_per_10_min: string
      solo_kills_avg_per_10_min: string
      time_spent_on_fire_avg_per_10_min: string
    }
    best: {
      all_damage_done_most_in_game: string
      all_damage_done_most_in_life: string
      barrier_damage_done_most_in_game: string
      critical_hits_most_in_game: string
      critical_hits_most_in_life: string
      eliminations_most_in_game: string
      eliminations_most_in_life: string
      final_blows_most_in_game: string
      hero_damage_done_most_in_game: string
      hero_damage_done_most_in_life: string
      kill_streak_best: string
      melee_final_blows_most_in_game: string
      multikill_best: string
      objective_kills_most_in_game: string
      objective_time_most_in_game: string
      solo_kills_most_in_game: string
      time_spent_on_fire_most_in_game: string
      weapon_accuracy_best_in_game: string
    }
    combat: {
      all_damage_done: string
      barrier_damage_done: string
      critical_hit_accuracy: string
      critical_hits: string
      deaths: string
      eliminations: string
      environmental_kills: string
      final_blows: string
      hero_damage_done: string
      melee_final_blows: string
      multikills: string
      objective_kills: string
      objective_time: string
      quick_melee_accuracy: string
      solo_kills: string
      time_spent_on_fire: string
      weapon_accuracy: string
    }
    game: {
      games_won: string
      time_played: string
    }
    match_awards: {
      cards: string
      medals: string
      medals_bronze: string
      medals_gold: string
      medals_silver: string
    }
    miscellanueous: {
      teleporter_pad_destroyed: string
      turrets_destroyed: string
    }
  }

  interface RegularHero extends HeroBase {
    hero_specific: Record<string, string>
  }

  interface MostPlayedHero {
    img: string
    time: string
  }
}
