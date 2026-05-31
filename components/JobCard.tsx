export type JobDetail = {
  descr: string;
  req: string[];
  offer: string[];
};

export const JOB_DETAILS: Record<number, JobDetail> = {
  1: {
    descr:
      "Modern LNG carrier (174,000 m³, membrane type) trading on worldwide voyages. Join the vessel in Hamburg. Rotation 4 months on / 1 month leave. English-speaking multinational crew of 24.",
    req: [
      "Valid CoC Chief Mate / Master, unlimited",
      "Minimum 24 months as Chief Officer on gas carriers",
      "Valid GMDSS, advanced LNG / IGF endorsement",
      "Good command of English (Marlins test 80%+)",
      "All STCW certificates valid for 6+ months",
    ],
    offer: [
      "Salary from $11,500/month, paid in USD",
      "Paid joining / repatriation flights and transit",
      "P&I and full medical insurance for the contract",
      "Senior officer cabin, Wi-Fi onboard",
      "Long-term cooperation, owner's own fleet",
    ],
  },
  2: {
    descr:
      "Product / chemical tanker (IMO II/III, 45,000 DWT) on Mediterranean and Atlantic trade. Sign-on in Piraeus or nearest convenient port. Single contract of 6 months (+/- 1 month).",
    req: [
      "Valid CoC 2nd Engineer, unlimited",
      "Experience on tankers with similar machinery (MAN B&W)",
      "Valid Advanced Tanker (chemical) training",
      "Dangerous Cargo Endorsement",
      "Team player, ready for a 6-month contract",
    ],
    offer: [
      "Salary €9,200/month",
      "Equal rotation, stable schedule",
      "Flights and visa costs covered by the company",
      "Modern, well-maintained vessel",
      "Possibility of permanent employment",
    ],
  },
  3: {
    descr:
      "Supramax bulk carrier (58,000 DWT) on worldwide tramp trading. Reliable Norwegian owner with a young fleet. Crew change planned in a European port.",
    req: [
      "Valid CoC Master, unlimited",
      "Minimum 36 months in command of bulk carriers",
      "Strong knowledge of port state control and vetting",
      "Excellent English, leadership skills",
      "Clean record, valid medical (ENG1 or equivalent)",
    ],
    offer: [
      "Salary from $13,800/month",
      "4-month contracts, predictable rotation",
      "Direct employment with the owner",
      "High safety and maintenance standards",
      "Loyalty bonus for returning officers",
    ],
  },
  4: {
    descr:
      "Feeder container vessel (1,700 TEU) operating in North Europe and the Baltic. Frequent port calls, active deck work. Join in Rotterdam.",
    req: [
      "Valid AB certificate (II/5)",
      "Minimum 12 months as AB on container or general cargo",
      "Valid Basic + Advanced fire fighting",
      "Mooring and cargo lashing experience",
      "Conversational English",
    ],
    offer: [
      "Salary €2,400/month",
      "Contract 6 months (+/- 1)",
      "Travel arranged and paid by the company",
      "Friendly, experienced crew",
      "Re-joining priority for reliable seafarers",
    ],
  },
  5: {
    descr:
      "Mid-size cruise vessel (1,200 pax) on Mediterranean itineraries. High standard of automation and passenger systems. Sign-on in Genoa.",
    req: [
      "Valid CoC Electro-Technical Officer",
      "Experience with passenger vessel electrical systems",
      "Knowledge of automation, HV systems, navigation electronics",
      "Customer-service mindset (passenger environment)",
      "Fluent English",
    ],
    offer: [
      "Salary $5,600/month",
      "4-month contracts",
      "Single cabin, full board",
      "International team, dynamic environment",
      "Career development within the cruise line",
    ],
  },
  6: {
    descr:
      "Offshore PSV / supply vessel operating in the North Sea. DP2 class, high-spec diesel-electric propulsion. Equal-time rotation 5 weeks on / 5 weeks off.",
    req: [
      "Valid CoC Chief Engineer, unlimited",
      "Offshore / DP vessel experience preferred",
      "Knowledge of diesel-electric propulsion",
      "Valid OPITO BOSIET / offshore survival",
      "Strong English, safety-first attitude",
    ],
    offer: [
      "Salary from $14,200/month",
      "Equal 5/5 rotation",
      "Top-tier insurance and benefits",
      "Modern offshore unit",
      "Long-term offshore career path",
    ],
  },
};
