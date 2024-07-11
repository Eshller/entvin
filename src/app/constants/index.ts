export const regulatoryComplianceRules = [
  {
    id: '1',
    rule: "The quantitative composition and function of each component in their generic drug product, include any solvents and processing aids that are used during the manufacture of the drug product",
    sourceLink: "",
    explainerText: "Quantitative Composition and Function of Each Component: Applicants should list every ingredient in their drug product, specifying the quantity and role (e.g., active ingredient, solvent, or processing aid). This includes not only the main components but also any auxiliary substances used during manufacturing.",
    additionalPrompts: ""
  },
  {
    id: '2',
    rule: "Information related to the physical description of the product (tablet size, scoring) and comparison to the RLD",
    sourceLink: "Tablet Scoring: Nomenclature, Labeling, and Data for Evaluation",
    explainerText: "Physical Description of the Product: Information about the physical characteristics of the drug, such as size and shape, and details about any scoring (lines for splitting tablets). This description should be compared to the reference listed drug (RLD) to ensure similarity.",
    additionalPrompts: ""
  },
  {
    id: '3',
    rule: "The quality standards (e.g., the USP or the National Formulary) of components; the composition of colors, flavors, and imprinting ink, if applicable",
    sourceLink: "Flavor manufacturers can provide the composition information directly to the reviewer if the information is not available to ANDA applicants because of proprietary reasons.",
    explainerText: "Quality Standards of Components: Each ingredient should meet established quality standards, such as those set by the United States Pharmacopeia (USP) or the National Formulary. Additionally, if colors, flavors, or imprinting inks are used, their composition must be specified.",
    additionalPrompts: ""
  },
  {
    id: '4',
    rule: "The amounts of their inactive ingredients that are appropriate per the Inactive Ingredient Database (per dose or unit dose) and a justification, preferably in a tabular format, for those amounts",
    sourceLink: "Inactive Ingredient Database",
    explainerText: "Inactive Ingredients and Justification: Applicants must detail the amounts of inactive ingredients per dose or unit dose, referring to the FDA's Inactive Ingredient Database. A justification for these amounts should be provided, preferably in a table format.",
    additionalPrompts: "<Inactive ingredient table>"
  },
  {
    id: '5',
    rule: "A conversion from percentage to milligram (mg)/dose values for all components, as applicable",
    sourceLink: "",
    explainerText: "Conversion from Percentage to mg/dose: Convert the percentage composition of each ingredient to milligrams per dose for clarity and accuracy.",
    additionalPrompts: ""
  },
  {
    id: '6',
    rule: "A conversion from percentage to mg/milliliter (mL) and/or mg/vial for injectable and injection products, indicating the unit of percentage (weight/weight or weight/volume) for liquid dosage forms",
    sourceLink: "Conversion for Injectable Products: For injectable products, convert the percentage composition to mg/mL or mg/vial, specifying the percentage unit (weight/weight or weight/volume).",
    explainerText: "",
    additionalPrompts: ""
  },
  {
    id: '7',
    rule: "A conversion from percentage to mg/mL for oral solution products",
    sourceLink: "",
    explainerText: "Conversion for Oral Solutions: Similar to injectable products, oral solutions require conversion from percentage to mg/mL.",
    additionalPrompts: ""
  },
  {
    id: '8',
    rule: "A conversion from percentage to mg/dose for dry powder to oral solution or oral suspension",
    explainerText: "Conversion for Dry Powder to Oral Solution or Suspension: For products in dry powder form intended to be reconstituted, convert the percentage to mg/dose.",
    sourceLink: "",
    additionalPrompts: ""
  },
  {
    id: '9',
    rule: "An identification and justification of any formulation overages or overfills that appear in the final product",
    explainerText: "Justification of Formulation Overages or Overfills: Any overages (excess amounts) or overfills in the final product must be identified and justified.",
    sourceLink: "",
    additionalPrompts: ""
  },
  {
    id: '10',
    rule: "A daily elemental iron calculation or statement of adherence to 21 CFR 73.1200",
    explainerText: "Elemental Iron Calculation: For products containing elemental iron, a daily calculation is necessary, or a statement of adherence to the regulatory standard 21 CFR 73.1200 must be provided.",
    sourceLink: "if the color additive is used in drugs ingested by man the amount consumed in accordance with labeled or prescribed dosages shall not exceed 5 milligrams, calculated as elemental iron, per day.",
    additionalPrompts: ""
  },
  {
    id: '11',
    rule: "If the proposed product is packaged with a specific diluent, a demonstration that the diluent is qualitatively and quantitatively the same as the diluent packaged with the RLD",
    explainerText: "Comparison of Diluent with RLD: If the product comes with a specific diluent, it must be demonstrated that this diluent is the same in both composition and quantity as that of the RLD.",
    sourceLink: "<Keyword search first> or user input before. To check if this rule needs to be checked.",
    additionalPrompts: ""
  },
  {
    id: '12',
    rule: "For products that contain aspartame, a calculation of the amount of phenylalanine (mg per dosage unit)",
    explainerText: "Phenylalanine Calculation for Aspartame-Containing Products: For products containing aspartame, the amount of phenylalanine per dosage unit should be calculated.",
    sourceLink: "21 CFR 201.21",
    additionalPrompts: ""
  },
  {
    id: '13',
    rule: "For nonprescription products that contain potassium, calcium, magnesium, and/or sodium, a calculation for the potassium, calcium, magnesium, and/or sodium content of a single maximum recommended dose",
    explainerText: "Calculation of Potassium, Calcium, Magnesium, and Sodium Content: Nonprescription products containing these minerals require a calculation of their content per single maximum recommended dose.",
    sourceLink: "21 CFR 201.72: Potassium labeling 21 CFR 201.70: Calcium labeling 21 CFR 201.71: Magnesium labeling 21 CFR 201.64: Sodium labeling",
    additionalPrompts: "User input if it is a non-prescription product? Yes/No"
  },
  {
    id: '14',
    rule: "For products that contain alcohol, a calculation of the absolute alcohol in terms of percent volume (volume/volume)",
    explainerText: "Calculation of Alcohol Content: For products containing alcohol, the absolute alcohol content should be calculated as a percentage by volume (v/v).",
    sourceLink: "21 CFR 201.10(d)(2)",
    additionalPrompts: ""
  },
  {
    id: '15',
    rule: "For antibiotics that contain sodium, a calculation for the sodium content (per tablet/capsule or per unit dose)",
    explainerText: "Sodium Content for Antibiotics: For antibiotic products containing sodium, the sodium content per tablet/capsule or unit dose must be calculated.",
    sourceLink: "",
    additionalPrompts: "User input if it is an antibiotic product? Yes/No"
  }
];

export default regulatoryComplianceRules;
