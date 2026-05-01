export const physicsFormulas = [
  {
    id: "f1",
    title: "Coulomb's Law",
    category: "Electrostatics",
    equation: "F = k * (|q1 * q2|) / r^2",
    symbols: [
      { sym: "F", desc: "Electrostatic Force (Newtons)" },
      { sym: "k", desc: "Coulomb's constant (8.99 × 10^9 N⋅m²/C²)" },
      { sym: "q1, q2", desc: "Magnitudes of charges (Coulombs)" },
      { sym: "r", desc: "Distance between charges (meters)" }
    ],
    derivation: "Determined experimentally by Charles-Augustin de Coulomb using a torsion balance in 1785. It is analogous to Newton's law of universal gravitation, but for electrical charge instead of mass.",
    useCase: "Calculating the exact push or pull between two stationary point charges."
  },
  {
    id: "f2",
    title: "Electric Field of a Point Charge",
    category: "Electrostatics",
    equation: "E = k * |q| / r^2",
    symbols: [
      { sym: "E", desc: "Electric Field Magnitude (N/C or V/m)" },
      { sym: "k", desc: "Coulomb's constant" },
      { sym: "q", desc: "Source charge" },
      { sym: "r", desc: "Distance from source charge" }
    ],
    derivation: "Derived from Coulomb's Law by defining E = F / q_test. E represents the force per unit charge that a test charge would experience at a distance r.",
    useCase: "Mapping out the invisible force field created by a single charged particle."
  },
  {
    id: "f3",
    title: "Parallel Plate Capacitance",
    category: "Capacitance",
    equation: "C = (ε₀ * A) / d",
    symbols: [
      { sym: "C", desc: "Capacitance (Farads)" },
      { sym: "ε₀", desc: "Vacuum permittivity (8.854 × 10^-12 F/m)" },
      { sym: "A", desc: "Area of each plate (m²)" },
      { sym: "d", desc: "Distance between plates (m)" }
    ],
    derivation: "Using Gauss's Law, the electric field between plates is E = σ/ε₀ = Q/(A*ε₀). Since V = E*d, we get V = (Q*d)/(A*ε₀). By definition, C = Q/V, substituting V yields C = (ε₀*A)/d.",
    useCase: "Designing physical capacitors in circuits. Shows that to store more charge, you need larger plates or closer separation."
  },
  {
    id: "f4",
    title: "Energy Stored in Capacitor",
    category: "Energy",
    equation: "U = ½ C * V^2 = Q^2 / (2C) = ½ Q * V",
    symbols: [
      { sym: "U", desc: "Potential Energy (Joules)" },
      { sym: "C", desc: "Capacitance (Farads)" },
      { sym: "V", desc: "Voltage (Volts)" },
      { sym: "Q", desc: "Charge (Coulombs)" }
    ],
    derivation: "Work done to move a tiny charge dq across potential V is dW = V dq. Since V = q/C, dW = (q/C) dq. Integrating from 0 to total charge Q gives W = ∫(q/C)dq = Q²/(2C).",
    useCase: "Calculating how much energy is released when a camera flash fires or a defibrillator is used."
  }
];
