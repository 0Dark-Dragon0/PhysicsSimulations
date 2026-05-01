export const tutorialsData = {
  Lab1: {
    title: "The Potential Playground",
    steps: [
      {
        dialogue: "Welcome to Guided Mode! I'm your Virtual Physics Professor. Today, we'll explore Electrostatics. Let's start with a single Point Charge.",
        actionText: "Click the 'Add +q Charge' button.",
        highlightTarget: "btn-add-pos",
        physicsFact: "A point charge creates an electric field that radiates outward in all directions. The field strength decreases with the square of the distance (1/r²)."
      },
      {
        dialogue: "Excellent! You just placed a source charge. Do you see the glowing arrows? They represent the Electric Field (E).",
        actionText: "Observe how the arrows point away from the positive charge.",
        highlightTarget: "canvas-area",
        physicsFact: "Electric field lines always originate from positive charges and terminate on negative charges (or infinity). They show the direction of force on a positive test charge."
      },
      {
        dialogue: "Now, let's explore Electrostatic Potential (V). Unlike the vector E-field, Potential is a scalar quantity.",
        actionText: "Click the 'Equipotentials' button to view the potential heatmap.",
        highlightTarget: "btn-mode-equi",
        physicsFact: "Potential is the work done per unit charge to bring a test charge from infinity to a point. V = kq/r. It's measured in Volts (Joules/Coulomb)."
      },
      {
        dialogue: "Look at the glowing red rings around your charge. These are Equipotential Surfaces. Everywhere on a ring, the potential is exactly the same.",
        actionText: "Drag the green test charge along one of these rings.",
        highlightTarget: "canvas-area",
        physicsFact: "Moving a charge along an equipotential surface requires ZERO work because the potential difference (ΔV) is zero. W = qΔV = 0."
      },
      {
        dialogue: "Notice that the Electric Field arrows are always exactly perpendicular (90 degrees) to the equipotential rings?",
        actionText: "Click the 'Both' button to see fields and potentials together.",
        highlightTarget: "btn-mode-both",
        physicsFact: "This is a fundamental rule: E = -dV/dr. The electric field points in the direction of steepest descent of potential."
      },
      {
        dialogue: "Let's create an Electric Dipole! This is a system of two equal and opposite charges.",
        actionText: "Click the 'Add -q Charge' button and place it near your positive charge.",
        highlightTarget: "btn-add-neg",
        physicsFact: "A dipole has a net charge of zero, but it creates a distinct, non-zero electric field. Water molecules (H2O) are natural electric dipoles!"
      },
      {
        dialogue: "Look closely at the space exactly halfway between the + and - charges. The red and blue potentials cancel out perfectly here.",
        actionText: "Drag the test charge to the exact midpoint between the two charges.",
        highlightTarget: "metrics-panel",
        physicsFact: "On the equatorial plane of a dipole, the electrostatic potential is exactly zero (V = 0). However, the Electric Field (E) is NOT zero there!"
      },
      {
        dialogue: "Finally, let's verify that Electrostatic Forces are Conservative. This means the work done depends only on the start and end points, not the path taken.",
        actionText: "Drag the test charge around in a big circle, returning it to its starting point. Watch the Potential Energy (U) in the metrics panel.",
        highlightTarget: "metrics-panel",
        physicsFact: "In a closed loop, the total work done is zero. ∮ E · dl = 0. This is the defining characteristic of a conservative field."
      }
    ]
  },
  Lab2: {
    title: "Capacitance Fundamentals",
    steps: [
      {
        dialogue: "Let's learn about Capacitors! A capacitor is simply two conductors separated by an insulator. It stores electrical energy.",
        actionText: "Look at the parallel plates on the screen.",
        highlightTarget: "capacitor-visual",
        physicsFact: "The ability of a system to store charge is called its Capacitance (C). C = Q/V. The SI unit is the Farad (F)."
      },
      {
        dialogue: "Let's see what happens when we increase the Plate Area (A).",
        actionText: "Drag the 'Plate Area' slider to the right.",
        highlightTarget: "slider-area",
        physicsFact: "Capacitance is directly proportional to Plate Area. C = ε₀A/d. More area means more space to hold charge without the charges repelling each other too much."
      },
      {
        dialogue: "Now, let's decrease the distance (d) between the plates.",
        actionText: "Drag the 'Separation' slider to the left.",
        highlightTarget: "slider-dist",
        physicsFact: "Capacitance is inversely proportional to separation distance. Bringing plates closer increases the attractive force between opposite charges, allowing more charge to be stored at the same voltage."
      },
      {
        dialogue: "Let's charge it up! Connect the battery by increasing the voltage.",
        actionText: "Drag the 'Voltage' slider up to 50V.",
        highlightTarget: "slider-voltage",
        physicsFact: "Notice that changing the voltage DOES NOT change the Capacitance (C). It only changes the stored Charge (Q) and Energy (U)."
      },
      {
        dialogue: "Look at the Electric Field lines (vertical lines) between the plates.",
        actionText: "Observe the uniform field between the plates.",
        highlightTarget: "capacitor-visual",
        physicsFact: "Inside a parallel plate capacitor, the electric field is uniform. E = V/d. The field lines are parallel and equally spaced."
      },
      {
        dialogue: "Look at the Energy density in the output panel.",
        actionText: "Check the 'Stored Energy U' metric.",
        highlightTarget: "metric-energy",
        physicsFact: "The energy is actually stored IN the electric field between the plates! The energy density is u = ½ε₀E²."
      }
    ]
  },
  Lab3: {
    title: "Dielectrics & Polarization",
    steps: [
      {
        dialogue: "Now we'll insert a material between the plates. First, let's use a Dielectric (an insulator like glass or plastic).",
        actionText: "Ensure 'Dielectric Slab' is selected at the top.",
        highlightTarget: "btn-dielectric",
        physicsFact: "A dielectric contains molecules that can polarize (stretch or rotate) in an electric field, but they don't have free electrons to conduct current."
      },
      {
        dialogue: "Watch carefully as you insert the slab. Look at the molecules inside.",
        actionText: "Drag the 'Insertion Ratio' slider to 50%.",
        highlightTarget: "slider-insertion",
        physicsFact: "As the slab enters the external field, its molecules act like tiny dipoles. The negative ends are pulled towards the positive plate, and vice versa. This is Dielectric Polarization."
      },
      {
        dialogue: "These polarized molecules create their own internal electric field, which points OPPOSITE to the battery's field.",
        actionText: "Observe the net effect on Capacitance in the output panel.",
        highlightTarget: "metric-capacitance",
        physicsFact: "Because the internal field opposes the external field, the net electric field decreases. To maintain the battery's voltage (V = Ed), the battery pumps MORE charge onto the plates. Therefore, Capacitance increases!"
      },
      {
        dialogue: "Let's try a different material. What if we insert a solid block of metal?",
        actionText: "Click the 'Conducting Slab' button.",
        highlightTarget: "btn-conducting",
        physicsFact: "Metals have 'free electrons' that can move anywhere. They aren't just bound to molecules like in a dielectric."
      },
      {
        dialogue: "Insert the conducting slab completely.",
        actionText: "Drag the 'Insertion Ratio' slider to 100%.",
        highlightTarget: "slider-insertion",
        physicsFact: "The free electrons instantly rush to the top surface to cancel the external field. Inside a perfect conductor, the net electric field is ALWAYS exactly zero!"
      }
    ]
  },
  Lab4: {
    title: "Capacitor Circuits",
    steps: [
      {
        dialogue: "Let's build circuits! We'll start by connecting capacitors end-to-end. This is called a Series Combination.",
        actionText: "Make sure 'Series Combination' is selected.",
        highlightTarget: "btn-series",
        physicsFact: "In a series circuit, there is only one path for the electrons to flow. This means the same amount of charge (Q) is forced onto every capacitor in the chain."
      },
      {
        dialogue: "Look at the charge values (in µC) below C1 and C2.",
        actionText: "Verify that Q1 is exactly equal to Q2.",
        highlightTarget: "circuit-display",
        physicsFact: "Series Rule 1: Q1 = Q2 = Q_total. Because the inner plates are isolated from the battery, any electron that leaves one plate must arrive at the adjacent plate."
      },
      {
        dialogue: "Now look at the Voltage (V) across C1 and C2. Notice how the 12V battery is split between them?",
        actionText: "Check the Voltage values. Note that V1 + V2 = Battery Voltage.",
        highlightTarget: "circuit-display",
        physicsFact: "Series Rule 2: Voltage divides. The total voltage is the sum of individual voltages. V_total = V1 + V2 + ... Since V=Q/C, the smaller capacitor gets the larger share of the voltage!"
      },
      {
        dialogue: "Now let's switch the wiring so they are side-by-side.",
        actionText: "Click the 'Parallel Combination' button.",
        highlightTarget: "btn-parallel",
        physicsFact: "In a parallel circuit, both capacitors are directly connected to the battery terminals. They each have their own independent path."
      },
      {
        dialogue: "Look at the Voltages now. They are identical!",
        actionText: "Verify that V1 = V2 = 12V.",
        highlightTarget: "circuit-display",
        physicsFact: "Parallel Rule 1: V1 = V2 = V_battery. Since both are connected directly to the source, they must share the same potential difference."
      },
      {
        dialogue: "Look at the Total Equivalent Capacitance (C) in the output panel.",
        actionText: "Compare the Total C in Parallel vs Series.",
        highlightTarget: "circuit-display",
        physicsFact: "In Parallel, C_eq = C1 + C2. The total capacitance increases because you are effectively increasing the total plate area connected to the battery."
      }
    ]
  },
  Lab5: {
    title: "Charge Sharing & Energy Loss",
    steps: [
      {
        dialogue: "This is my favorite experiment! We have two isolated capacitors. C1 is fully charged to 20V, and C2 is empty at 0V.",
        actionText: "Check the initial setups for C1 and C2 on the right.",
        highlightTarget: "setup-panel",
        physicsFact: "Nature hates imbalances. If we connect these two, charge will flow from the higher potential (20V) to the lower potential (0V) until they balance out."
      },
      {
        dialogue: "Are you ready? Let's close the switch and connect the wires!",
        actionText: "Click the circular switch icon in the middle of the circuit.",
        highlightTarget: "btn-switch",
        physicsFact: "Charge will flow rapidly. This flow of charge is a transient electric current. As it flows through the wire's resistance, it generates heat."
      },
      {
        dialogue: "Look at the Common Potential! They both stabilized at exactly the same voltage (6.7V).",
        actionText: "Look at the blue V values under the capacitors.",
        highlightTarget: "circuit-display",
        physicsFact: "They have reached Electrostatic Equilibrium. V_common = (Total Charge) / (Total Capacitance) = (Q1+Q2)/(C1+C2)."
      },
      {
        dialogue: "Now, the most important part. Look at the Total Charge Q and Energy Lost at the bottom.",
        actionText: "Observe the bottom metrics panel.",
        highlightTarget: "metrics-footer",
        physicsFact: "Notice that Total Charge is perfectly CONSERVED. No electrons were destroyed. BUT, look at Energy Lost! We permanently lost a chunk of our initial energy."
      },
      {
        dialogue: "Why did we lose energy if no charge was lost?",
        actionText: "Read the 'Energy Loss Formula' section on the bottom right.",
        highlightTarget: "info-energy",
        physicsFact: "This is an irreversible thermodynamic process. The lost energy was dissipated as heat in the connecting wires and radiated as an electromagnetic spark. The formula proves loss is always positive: ΔU = ½(C₁C₂/(C₁+C₂))(V₁-V₂)²."
      }
    ]
  }
};
