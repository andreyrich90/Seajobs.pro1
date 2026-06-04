export const RANK_GROUPS = [
  {
    label: "Deck Officers",
    ranks: ["Master (Captain)", "Chief Officer (Chief Mate)", "2nd Officer", "3rd Officer", "Junior Officer", "Deck Cadet"],
  },
  {
    label: "Engine Officers",
    ranks: ["Chief Engineer", "2nd Engineer", "3rd Engineer", "4th Engineer", "Junior Engineer", "Engine Cadet"],
  },
  {
    label: "Electro-Technical / Specialized",
    ranks: ["ETO (Electro-Technical Officer)", "DPO (Dynamic Positioning Operator)", "Safety Officer", "Cargo Officer", "Pumpman Officer"],
  },
  {
    label: "Deck Ratings",
    ranks: ["Bosun", "AB (Able Seaman)", "OS (Ordinary Seaman)", "Deck Fitter"],
  },
  {
    label: "Engine Ratings",
    ranks: ["Motorman", "Oiler", "Fitter", "Wiper", "Pumpman", "Electrician"],
  },
  {
    label: "Catering / Hotel",
    ranks: ["Chief Cook / Cook", "2nd Cook", "Messman / Steward", "Chief Steward", "Purser", "Hotel Director"],
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
