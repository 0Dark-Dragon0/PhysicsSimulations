export const questionBank = [
  {
    id: "q1",
    topic: "Electrostatics",
    difficulty: 1,
    type: "conceptual",
    question: "What happens to the electrostatic force between two point charges if the distance between them is doubled?",
    options: ["It doubles", "It halves", "It becomes one-fourth", "It remains the same"],
    correctAnswerIndex: 2,
    explanation: "According to Coulomb's Law (F ∝ 1/r²), if r is doubled, the force becomes 1/(2²) = 1/4th of the original force."
  },
  {
    id: "q2",
    topic: "Electrostatics",
    difficulty: 2,
    type: "numerical",
    question: "If a point charge of 2µC experiences a force of 10N, what is the magnitude of the electric field at that point?",
    options: ["5 × 10⁶ N/C", "20 N/C", "0.2 N/C", "5 N/C"],
    correctAnswerIndex: 0,
    explanation: "Using E = F/q. E = 10 / (2 × 10⁻⁶) = 5 × 10⁶ N/C."
  },
  {
    id: "q3",
    topic: "Capacitance",
    difficulty: 1,
    type: "conceptual",
    question: "Inserting a dielectric slab between the plates of an isolated charged capacitor will:",
    options: ["Increase its capacitance and voltage", "Increase capacitance, decrease voltage", "Decrease capacitance, increase voltage", "Decrease both capacitance and voltage"],
    correctAnswerIndex: 1,
    explanation: "Dielectrics always increase capacitance (C = K*C₀). For an isolated capacitor, charge Q is constant. Since V = Q/C, an increase in C leads to a decrease in V."
  },
  {
    id: "q4",
    topic: "Circuits",
    difficulty: 3,
    type: "numerical",
    question: "Three identical capacitors of capacitance C are connected in series. What is their equivalent capacitance?",
    options: ["3C", "C", "C/3", "3/C"],
    correctAnswerIndex: 2,
    explanation: "For series: 1/Ceq = 1/C + 1/C + 1/C = 3/C. Therefore, Ceq = C/3."
  },
  {
    id: "q5",
    topic: "Energy",
    difficulty: 3,
    type: "conceptual",
    question: "When two charged capacitors are connected in parallel, the total energy of the system:",
    options: ["Always increases", "Remains constant", "Always decreases", "May increase or decrease"],
    correctAnswerIndex: 2,
    explanation: "Charge sharing always involves a loss of energy due to heat dissipation in the connecting wires or as a spark, unless both capacitors were initially at the exact same potential."
  }
];
