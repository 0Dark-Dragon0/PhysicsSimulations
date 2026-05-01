export const experimentsData = {
  Lab2: {
    id: "exp_capacitance_area",
    title: "Verification of C ∝ A",
    aim: "To verify that the capacitance of a parallel plate capacitor is directly proportional to the area of its plates (C ∝ A).",
    apparatus: "Virtual Parallel Plate Capacitor, Area Control Slider, Capacitance Meter.",
    steps: [
      "Set the separation distance (d) to a constant value of 1.0 cm.",
      "Set the Plate Area (A) to 1.0 m².",
      "Record the Capacitance (C) in pF.",
      "Increase the Area to 2.0 m², 3.0 m², and 4.0 m², recording C each time.",
      "Click 'Complete Experiment' when you have 4 readings."
    ],
    tableHeaders: ["Area A (m²)", "Capacitance C (pF)"],
    expectedDataKeys: ["area", "capacitance_pf"]
  }
};
