// The canonical rank taxonomy. This is the single source of truth: the seafarer
// profile and sea-service forms, the company vacancy form, the seafarer search,
// both admin import forms, the job-alert rank picker and the vacancy-parsing
// prompt in lib/parseVacancy.ts all read it. Adding a rank here makes it
// selectable and matchable everywhere; nothing else needs touching.
//
// Ranks are listed in order of seniority within a group, because that is the
// order the pickers render them in.
export const RANK_GROUPS = [
  {
    label: "Deck Officers",
    ranks: ["Master (Captain)", "Chief Officer (Chief Mate)", "2nd Officer", "3rd Officer", "4th Officer", "Junior Officer", "Deck Cadet"],
  },
  {
    label: "Engine Officers",
    // "1st Engineer" is a distinct rank, not a synonym for Chief or 2nd. On
    // cargo ships the engine room runs Chief → 2nd → 3rd → 4th, but passenger
    // and cruise vessels insert a 1st Engineer between Chief and 2nd, and the
    // cruise operators advertise under exactly that title. Without it here, a
    // cruise posting had to be filed as the nearest cargo rank.
    ranks: ["Chief Engineer", "1st Engineer", "2nd Engineer", "3rd Engineer", "4th Engineer", "Gas Engineer / Reefer Engineer", "Junior Engineer", "Engine Cadet", "Electrical Cadet"],
  },
  {
    label: "Electro-Technical / Specialized",
    ranks: ["ETO (Electro-Technical Officer)", "DPO (Dynamic Positioning Operator)", "Safety Officer", "Cargo Officer", "Pumpman Officer"],
  },
  {
    label: "Deck Ratings",
    ranks: ["Bosun", "AB (Able Seaman)", "OS (Ordinary Seaman)", "Deck Fitter", "Carpenter", "Painter", "Sand Blaster", "Crane Operator", "Welder"],
  },
  {
    label: "Engine Ratings",
    ranks: ["Motorman", "Oiler", "Fitter", "Fitter (Welder)", "Wiper", "Pumpman", "Electrician"],
  },
  {
    label: "Catering / Hotel",
    ranks: ["Chief Cook / Cook", "2nd Cook", "Baker", "Messman / Steward", "Steward / Stewardess", "Chief Steward / Chief Stewardess", "Purser", "Hotel Director"],
  },
  {
    label: "Offshore",
    ranks: [
      "Crane Operator (Offshore)",
      "Dynamic Positioning Operator (DPO)",
      "SDPO (Senior DPO)",
      "Derrickman",
      "Driller",
      "Toolpusher",
      "Diver",
      "Floorman",
      "Pipe Layer",
      "Rigger",
      "Roustabout",
      "Barge Master",
      "Ballast Control Operator",
    ],
  },
  {
    label: "Cruise / Hotel Staff",
    ranks: [
      "Cruise Director",
      "Receptionist",
      "Bartender",
      "Waiter / Waitress",
      "Shop Manager",
      "Store Keeper",
      "Security Officer",
      "Ship Doctor",
      "Nurse",
      "Spa / Beauty & Massage",
      "Fitness Instructor",
      "Entertainer",
      "Photographer",
      "Fabricator",
    ],
  },
  {
    label: "Combined / Dual Roles",
    ranks: [
      // Deck + Catering
      "AB Cook",
      "OS Cook",
      "Bosun Cook",
      "OS Messman",
      "AB Messman",
      // Engine + Catering
      "Motorman Cook",
      "Fitter Cook",
      "Oiler Cook",
      "Wiper Cook",
      // Deck + Engine
      "AB Motorman",
      "OS Motorman",
      "AB Oiler",
      "Motorman Fitter",
      // Deck + Technical
      "AB Welder",
      "OS Welder",
      "Fitter Welder",
      // Deck + Equipment Operator
      "AB Crane Operator",
      "AB Excavator Operator",
      "AB Bulldozer Operator",
      "AB Dredge Operator",
      "OS Crane Operator",
      // Pump / Technical
      "AB Pumpman",
      "Motorman Pumpman",
      // Other
      "Electrician Cook",
      "AB Electrician",
    ],
  },
];
