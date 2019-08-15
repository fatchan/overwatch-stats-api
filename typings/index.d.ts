/* HOW TO MAINTAIN THIS FILE
  This file needs to be updated every time a new hero is released.
  1) Perform a getHeroStats() request and take note of new hero's name.
  2) Add that name to the HeroStatsGroup interface.
  3) Create a new class that extends HeroBase and add the hero_specific properties.
  4) Assign that class as the type for the new property of HeroStatsGroup you created in point 2.
  5) Add that name to the MostPlayedGroup interface (use MostPlayedHero as type)
*/

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
    profileURL: string
    rank: string
    rankIconURL?: string
    starsURL: string
  }

  interface HeroStats {
    competitive: HeroStatsGroup
    quickplay: HeroStatsGroup
  }

  interface MostPlayed {
    competitive: MostPlayedGroup
    quickplay: MostPlayedGroup
  }

  /* #region Hero stuff */

  interface HeroStatsGroup {
    ana: Ana
    ashe: Ashe
    baptiste: Baptiste
    bastion: Bastion
    brigitte: Brigitte
    doomfist: Doomfist
    dva: DVa
    genji: Genji
    hammond: Hammond
    hanzo: Hanzo
    junkrat: Junkrat
    lucio: Lucio
    mccree: McCree
    mei: Mei
    mercy: Mercy
    moira: Moira
    orisa: Orisa
    overall: HeroBase
    phara: Pharah
    reaper: Reaper
    reinhardt: Reinhardt
    roadhog: Roadhog
    soldier: Soldier76
    sombra: Sombra
    symmetra: Symmetra
    torbjorn: Torbjorn
    tracer: Tracer
    widowmaker: WidowMaker
    winston: Winston
    zarya: Zarya
    zenyatta: Zenyatta
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

  interface Ana extends HeroBase {
    hero_specific: {
      biotic_grenade_kills: string
      enemies_slept: string
      enemies_slept_avg_per_10_min: string
      enemies_slept_most_in_game: string
      nano_boost_assists: string
      nano_boost_assists_avg_per_10_min: string
      nano_boost_assists_most_in_game: string
      nano_boosts_applied: string
      nano_boosts_applied_avg_per_10_min: string
      nano_boosts_applied_most_in_game: string
      scoped_accuracy: string
      scoped_accuracy_best_in_game: string
      secondary_fire_accuracy: string
      self_healing: string
      self_healing_avg_per_10_min: string
      self_healing_most_in_game: string
      unscoped_accuracy: string
      unscoped_accuracy_best_in_game: string
    }
  }

  interface Ashe extends HeroBase {
    hero_specific: {
      bob_kills: string
      bob_kills_avg_per_10_min: string
      bob_kills_most_in_game: string
      coach_gun_kills: string
      coach_gun_kills_avg_per_10_min: string
      coach_gun_kills_most_in_game: string
      dynamite_kills: string
      dynamite_kills_avg_per_10_min: string
      dynamite_kills_most_in_game: string
      scoped_accuracy: string
      scoped_accuracy_best_in_game: string
      scoped_critical_hit_accuracy: string
      scoped_critical_hit_kills: string
      scoped_critical_hit_kills_avg_per_10_min: string
      scoped_critical_hits: string
      scoped_critical_hits_avg_per_10_min: string
      scoped_critical_hits_most_in_game: string
      secondary_fire_accuracy: string
    }
  }

  interface Baptiste extends HeroBase {
    hero_specific: {
      amplification_matrix_assists: string
      amplification_matrix_assists_avg_per_10_min: string
      amplification_matrix_assists_best_in_game: string
      amplification_matrix_casts: string
      amplification_matrix_casts_avg_per_10_min: string
      amplification_matrix_casts_most_in_game: string
      damage_amplified: string
      damage_amplified_avg_per_10_min: string
      damage_amplified_most_in_game: string
      healing_accuracy: string
      healing_accuracy_best_in_game: string
      healing_amplified: string
      healing_amplified_avg_per_10_min: string
      healing_amplified_most_in_game: string
      immortality_field_deaths_prevented: string
      immortality_field_deaths_prevented_avg_per_10_min: string
      immortality_field_deaths_prevented_most_in_game: string
      secondary_fire_accuracy: string
      self_healing: string
      self_healing_avg_per_10_min: string
      self_healing_most_in_game: string
    }
  }

  interface Bastion extends HeroBase {
    hero_specific: {
      recon_kills: string
      recon_kills_avg_per_10_min: string
      recon_kills_most_in_game: string
      secondary_fire_accuracy: string
      self_healing: string
      self_healing_avg_per_10_min: string
      self_healing_most_in_game: string
      sentry_kills: string
      sentry_kills_avg_per_10_min: string
      sentry_kills_most_in_game: string
      tank_kills: string
      tank_kills_avg_per_10_min: string
      tank_kills_most_in_game: string
    }
  }

  interface Brigitte extends HeroBase {
    hero_specific: {
      armor_provided: string
      armor_provided_avg_per_10_min: string
      armor_provided_most_in_game: string
      damage_blocked: string
      damage_blocked_avg_per_10_min: string
      damage_blocked_most_in_game: string
      inspire_uptime_percentage: string
      self_healing: string
      self_healing_avg_per_10_min: string
    }
  }

  interface Doomfist extends HeroBase {
    hero_specific: {
      ability_damage_done: string
      ability_damage_done_avg_per_10_min: string
      ability_damage_done_most_in_game: string
      meteor_strike_kills: string
      meteor_strike_kills_avg_per_10_min: string
      meteor_strike_kills_most_in_game: string
      secondary_fire_accuracy: string
      shields_created: string
      shields_created_avg_per_10_min: string
      shields_created_most_in_game: string
    }
  }

  interface DVa extends HeroBase {
    hero_specific: {
      damage_blocked: string
      damage_blocked_avg_per_10_min: string
      damage_blocked_most_in_game: string
      mech_deaths: string
      mechs_called: string
      mechs_called_avg_per_10_min: string
      mechs_called_most_in_game: string
      secondary_fire_accuracy: string
      selfdestruct_kill_most_in_game: string
      selfdestruct_kills: string
      selfdestruct_kills_avg_per_10_min: string
    }
  }

  interface Genji extends HeroBase {
    hero_specific: {
      damage_reflected: string
      damage_reflected_avg_per_10_min: string
      damage_reflected_most_in_game: string
      deflection_kills: string
      dragonblade_kills: string
      dragonblade_kills_avg_per_10_min: string
      dragonblade_kills_most_in_game: string
      secondary_fire_accuracy: string
    }
  }

  interface Hammond extends HeroBase {
    hero_specific: {
      players_knocked_back: string
      players_knocked_back_avg_per_10_min: string
      players_knocked_back_most_in_game: string
      secondary_fire_accuracy: string
    }
  }

  interface Hanzo extends HeroBase {
    hero_specific: {
      dragonstrike_kills: string
      dragonstrike_kills_avg_per_10_min: string
      dragonstrike_kills_most_in_game: string
      scatter_arrow_kills: string
      scatter_arrow_kills_avg_per_10_min: string
      scatter_arrow_kills_most_in_game: string
      secondary_fire_accuracy: string
      storm_arrow_kills: string
      storm_arrow_kills_avg_per_10_min: string
      storm_arrow_kills_most_in_game: string
    }
  }

  interface Junkrat extends HeroBase {
    hero_specific: {
      concussion_mine_kills: string
      concussion_mine_kills_avg_per_10_min: string
      concussion_mine_kills_most_in_game: string
      enemies_trapped: string
      enemies_trapped_avg_per_10_min: string
      enemies_trapped_most_in_game: string
      riptire_kills: string
      riptire_kills_avg_per_10_min: string
      riptire_kills_most_in_game: string
      secondary_fire_accuracy: string
    }
  }

  interface Lucio extends HeroBase {
    hero_specific: {
      secondary_fire_accuracy: string
      self_healing: string
      self_healing_avg_per_10_min: string
      self_healing_most_in_game: string
      sound_barriers_provided: string
      sound_barriers_provided_avg_per_10_min: string
      sound_barriers_provided_most_in_game: string
    }
  }

  interface McCree extends HeroBase {
    hero_specific: {
      deadeye_kills: string
      deadeye_kills_avg_per_10_min: string
      deadeye_kills_most_in_game: string
      fan_the_hammer_kills: string
      fan_the_hammer_kills_avg_per_10_min: string
      fan_the_hammer_kills_most_in_game: string
      secondary_fire_accuracy: string
    }
  }

  interface Mei extends HeroBase {
    hero_specific: {
      blizzard_kills: string
      blizzard_kills_avg_per_10_min: string
      blizzard_kills_most_in_game: string
      damage_blocked: string
      damage_blocked_avg_per_10_min: string
      damage_blocked_most_in_game: string
      enemies_frozen: string
      enemies_frozen_avg_per_10_min: string
      enemies_frozen_most_in_game: string
      secondary_fire_accuracy: string
      self_healing: string
      self_healing_avg_per_10_min: string
      self_healing_most_in_game: string
    }
  }

  interface Mercy extends HeroBase {
    hero_specific: {
      blaster_kills: string
      blaster_kills_avg_per_10_min: string
      blaster_kills_most_in_game: string
      damage_amplified: string
      damage_amplified_avg_per_10_min: string
      damage_amplified_most_in_game: string
      players_resurrected: string
      players_resurrected_avg_per_10_min: string
      players_resurrected_most_in_game: string
      secondary_fire_accuracy: string
      self_healing: string
      self_healing_avg_per_10_min: string
      self_healing_most_in_game: string
    }
  }

  interface Moira extends HeroBase {
    hero_specific: {
      coalescence_healing: string
      coalescence_healing_avg_per_10_min: string
      coalescence_healing_most_in_game: string
      coalescence_kills: string
      coalescence_kills_avg_per_10_min: string
      coalescence_kills_most_in_game: string
      secondary_fire_accuracy: string
      self_healing: string
      self_healing_avg_per_10_min: string
      self_healing_most_in_game: string
    }
  }

  interface Orisa extends HeroBase {
    hero_specific: {
      damage_amplified: string
      damage_amplified_avg_per_10_min: string
      damage_amplified_most_in_game: string
      damage_blocked: string
      damage_blocked_avg_per_10_min: string
      damage_blocked_most_in_game: string
      secondary_fire_accuracy: string
      supercharger_assists: string
      supercharger_assists_avg_per_10_min: string
      supercharger_assists_most_in_game: string
    }
  }

  interface Pharah extends HeroBase {
    hero_specific: {
      barrage_kills: string
      barrage_kills_avg_per_10_min: string
      barrage_kills_most_in_game: string
      direct_hit_accuracy: string
      rocket_direct_hits: string
      rocket_direct_hits_avg_per_10_min: string
      rocket_direct_hits_most_in_game: string
      secondary_fire_accuracy: string
    }
  }

  interface Reaper extends HeroBase {
    hero_specific: {
      death_blossom_kills: string
      death_blossom_kills_avg_per_10_min: string
      death_blossom_kills_most_in_game: string
      secondary_fire_accuracy: string
      self_healing: string
      self_healing_avg_per_10_min: string
      self_healing_most_in_game: string
    }
  }

  interface Reinhardt extends HeroBase {
    hero_specific: {
      charge_kills: string
      charge_kills_avg_per_10_min: string
      charge_kills_most_in_game: string
      damage_blocked: string
      damage_blocked_avg_per_10_min: string
      damage_blocked_most_in_game: string
      earthshatter_kills: string
      earthshatter_kills_avg_per_10_min: string
      earthshatter_kills_most_in_game: string
      fire_strike_kills: string
      fire_strike_kills_avg_per_10_min: string
      fire_strike_kills_most_in_game: string
      rocket_hammer_melee_accuracy: string
    }
  }

  interface Roadhog extends HeroBase {
    hero_specific: {
      enemies_hooked: string
      enemies_hooked_avg_per_10_min: string
      enemies_hooked_most_in_game: string
      hook_accuracy: string
      hook_accuracy_best_in_game: string
      hooks_attempted: string
      secondary_fire_accuracy: string
      self_healing: string
      self_healing_avg_per_10_min: string
      self_healing_most_in_game: string
      whole_hog_kills: string
      whole_hog_kills_avg_per_10_min: string
      whole_hog_kills_most_in_game: string
    }
  }

  interface Soldier76 extends HeroBase {
    hero_specific: {
      biotic_field_healing_done: string
      biotic_fields_deployed: string
      helix_rockets_kills: string
      helix_rockets_kills_avg_per_10_min: string
      helix_rockets_kills_most_in_game: string
      secondary_fire_accuracy: string
      self_healing: string
      self_healing_avg_per_10_min: string
      self_healing_most_in_game: string
      tactical_visor_kills: string
      tactical_visor_kills_avg_per_10_min: string
      tactical_visor_kills_most_in_game: string
    }
  }

  interface Sombra extends HeroBase {
    hero_specific: {
      "enemies_emp'd": string
      "enemies_emp'd_avg_per_10_min": string
      "enemies_emp'd_most_in_game": string
      enemies_hacked: string
      enemies_hacked_avg_per_10_min: string
      enemies_hacked_most_in_game: string
      secondary_fire_accuracy: string
    }
  }

  interface Symmetra extends HeroBase {
    hero_specific: {
      damage_blocked: string
      damage_blocked_avg_per_10_min: string
      damage_blocked_most_in_game: string
      players_teleported: string
      players_teleported_avg_per_10_min: string
      players_teleported_most_in_game: string
      primary_fire_accuracy: string
      secondary_direct_hits_avg_per_10_min: string
      secondary_fire_accuracy: string
      sentry_turret_kills: string
      sentry_turret_kills_avg_per_10_min: string
      sentry_turret_kills_most_in_game: string
    }
  }

  interface Torbjorn extends HeroBase {
    hero_specific: {
      armor_packs_created: string
      armor_packs_created_avg_per_10_min: string
      armor_packs_created_most_in_game: string
      hammer_kills: string
      hammer_kills_most_in_game: string
      molten_core_kills: string
      molten_core_kills_avg_per_10_min: string
      molten_core_kills_most_in_game: string
      overload_kills: string
      overload_kills_most_in_game: string
      secondary_fire_accuracy: string
      torbjörn_kills: string
      torbjörn_kills_avg_per_10_min: string
      torbjörn_kills_most_in_game: string
      turret_damage_avg_per_10_min: string
      turret_kills: string
      turret_kills_avg_per_10_min: string
      turret_kills_most_in_game: string
    }
  }

  interface Tracer extends HeroBase {
    hero_specific: {
      health_recovered: string
      health_recovered_avg_per_10_min: string
      health_recovered_most_in_game: string
      pulse_bomb_kills: string
      pulse_bomb_kills_avg_per_10_min: string
      pulse_bomb_kills_most_in_game: string
      pulse_bombs_attached: string
      pulse_bombs_attached_avg_per_10_min: string
      pulse_bombs_attached_most_in_game: string
      secondary_fire_accuracy: string
      self_healing: string
      self_healing_avg_per_10_min: string
      self_healing_most_in_game: string
    }
  }

  interface WidowMaker extends HeroBase {
    hero_specific: {
      scoped_accuracy: string
      scoped_accuracy_best_in_game: string
      scoped_critical_hit_accuracy: string
      scoped_critical_hits: string
      scoped_critical_hits_avg_per_10_min: string
      scoped_critical_hits_most_in_game: string
      secondary_fire_accuracy: string
      venom_mine_kills: string
      venom_mine_kills_avg_per_10_min: string
      venom_mine_kills_most_in_game: string
    }
  }

  interface Winston extends HeroBase {
    hero_specific: {
      damage_blocked: string
      damage_blocked_avg_per_10_min: string
      damage_blocked_most_in_game: string
      jump_kills: string
      jump_pack_kills: string
      jump_pack_kills_avg_per_10_min: string
      jump_pack_kills_most_in_game: string
      melee_kills: string
      melee_kills_avg_per_10_min: string
      melee_kills_most_in_game: string
      players_knocked_back: string
      players_knocked_back_avg_per_10_min: string
      players_knocked_back_most_in_game: string
      primal_rage_kills: string
      primal_rage_kills_avg_per_10_min: string
      primal_rage_kills_most_in_game: string
      primal_rage_melee_accuracy: string
      tesla_cannon_accuracy: string
      weapon_kills: string
    }
  }

  interface Zarya extends HeroBase {
    hero_specific: {
      average_energy: string
      average_energy_best_in_game: string
      damage_blocked: string
      damage_blocked_avg_per_10_min: string
      damage_blocked_most_in_game: string
      graviton_surge_kill: string
      graviton_surge_kill_most_in_game: string
      graviton_surge_kills_avg_per_10_min: string
      primary_fire_accuracy: string
      projected_barriers_applied: string
      projected_barriers_applied_avg_per_10_min: string
      projected_barriers_applied_most_in_game: string
      secondary_fire_accuracy: string
    }
  }

  interface Zenyatta extends HeroBase {
    hero_specific: {
      secondary_fire_accuracy: string
      self_healing: string
      self_healing_avg_per_10_min: string
      self_healing_most_in_game: string
      transcendence_healing: string
      transcendence_healing_best: string
    }
  }
  /* #endregion */

  /* #region Most played heroes stuff */
  interface MostPlayedGroup {
    ana: MostPlayedHero
    ashe: MostPlayedHero
    bastion: MostPlayedHero
    brigitte: MostPlayedHero
    doomfist: MostPlayedHero
    dva: MostPlayedHero
    genji: MostPlayedHero
    hammond: MostPlayedHero
    hanzo: MostPlayedHero
    junkrat: MostPlayedHero
    lucio: MostPlayedHero
    mccree: MostPlayedHero
    mei: MostPlayedHero
    mercy: MostPlayedHero
    moira: MostPlayedHero
    orisa: MostPlayedHero
    phara: MostPlayedHero
    reaper: MostPlayedHero
    reinhardt: MostPlayedHero
    roadhog: MostPlayedHero
    soldier: MostPlayedHero
    sombra: MostPlayedHero
    symmetra: MostPlayedHero
    torbjorn: MostPlayedHero
    tracer: MostPlayedHero
    widowmaker: MostPlayedHero
    winston: MostPlayedHero
    zarya: MostPlayedHero
    zenyatta: MostPlayedHero
  }

  interface MostPlayedHero {
    img: string
    time: string
  }
  /* #endregion*/
}
