import type { FoundationsTopicContent } from "../types";

const CHAPTER = "forces";

export const physicsForces: FoundationsTopicContent[] = [
  {
    meta: { id: "introduction-to-forces", chapterId: CHAPTER, subjectId: "physics", title: "Introduction to forces", order: 0 },
    mode: "science",
    starter: {
      prompt: "Push a desk as hard as you can without moving it. (Go on, imagine it — don't actually break anything.) Are you applying a force to the desk right now?",
      options: [
        { label: "Yes", correct: true, feedback: "Correct. Nothing moved, but you definitely pushed. Hold that thought." },
        { label: "No", correct: false, feedback: "You are. Nothing happened, but you definitely pushed. Forces don't need to win to count." },
      ],
    },
    hook: {
      prompt: "A shopping trolley and a football, exact same push, exact same force. Which one speeds up more?",
      options: ["The trolley", "The football", "They speed up the same amount"],
      note: "Lock that answer in. We're not settling it today — that's next topic's argument.",
    },
    teach: {
      body: "A force is a push or a pull. That's the whole definition. Two things make a force what it is: how big it is, and which direction it's going — forces are measured in newtons.\n\nTwo families. Contact forces need touching — friction, air resistance, the floor pushing back up on your feet. Non-contact forces work across a gap — gravity, magnets, static electricity crackling your hair to a balloon.\n\nLook at the diagram: the book isn't going anywhere, but there are two forces on it, pulling opposite ways, cancelling out. Still doesn't mean force-free. It usually means balanced.",
      diagram: {
        description: "Two panels side by side. Panel A: a book resting on a table. Two arrows — one pointing down from the book labelled 'gravity', one pointing up from the table labelled 'table pushes back', drawn the same length. Panel B: a trolley being pushed. One arrow forward labelled 'push', a shorter arrow backward at the wheels labelled 'friction'.",
        caption: "Still isn't the same as force-free.",
      },
    },
    practice: [
      {
        q: "Which of these is a non-contact force?",
        options: ["Friction", "Gravity", "Air resistance", "The floor pushing on your feet"],
        correct: 1,
        feedback: [
          "That one needs contact. Gravity's the odd one out — it reaches across empty space.",
          "Correct. Gravity doesn't need touching.",
          "That one needs contact — air resistance is your skin meeting air molecules.",
          "That one needs contact — your feet are literally touching the floor.",
        ],
      },
      {
        q: "A book rests on a table, completely still. True or false: no forces are acting on it.",
        options: ["True", "False"],
        correct: 1,
        feedback: [
          "Two forces, dead even, cancelling out. Balanced, not absent.",
          "Correct. Balanced forces, not zero forces.",
        ],
      },
      {
        q: "What two things define a force completely?",
        options: ["Size only", "Direction only", "Size and direction", "Speed and mass"],
        correct: 2,
        feedback: [
          "Size alone doesn't tell you which way it's shoving something.",
          "Direction alone doesn't tell you how hard.",
          "Correct — a force needs both to mean anything.",
          "Those describe motion and matter, not the force itself.",
        ],
      },
      {
        q: "You let go of a ball. What force pulls it down?",
        options: ["Air resistance", "Gravity", "Friction", "Tension"],
        correct: 1,
        feedback: [
          "Air resistance actually fights the fall — it doesn't cause it.",
          "Correct. Gravity's the one pulling down.",
          "Friction needs a surface it's sliding against — there isn't one here.",
          "Tension is a pulling force through something like a rope or string — not this.",
        ],
      },
      {
        q: "Which of these is a contact force?",
        options: ["Gravity", "Magnetism", "Friction", "Static electricity"],
        correct: 2,
        feedback: [
          "That one works at a distance — no touching required.",
          "That one works at a distance — no touching required.",
          "Correct. Friction needs surfaces actually touching.",
          "That one works at a distance — no touching required.",
        ],
      },
    ],
    teachBack: {
      prompt: "Okay, switch. I've never heard the word 'force' in my life. Thirty seconds — what is it, and give me one example of each type.",
      checkFor: ["push or pull", "size and direction", "one contact example", "one non-contact example"],
    },
    closingLine: "That's forces, unlocked. Next time — that trolley and football question comes back to bite you.",
  },
  {
    meta: { id: "balanced-and-unbalanced-forces", chapterId: CHAPTER, subjectId: "physics", title: "Balanced and unbalanced forces", order: 1 },
    mode: "science",
    starter: {
      prompt: "From last time: a book sits still on a table. Are there forces acting on it?",
      options: [
        { label: "Yes", correct: true, feedback: "Right — balanced, not absent." },
        { label: "No", correct: false, feedback: "There are two, they just cancel out. Still isn't force-free." },
      ],
    },
    hook: {
      prompt: "Remember the trolley and the football? Exact same push. Which one speeds up more?",
      options: ["The trolley", "The football", "They speed up the same amount"],
      note: "This topic's about to answer that. Keep your answer from last time in mind.",
    },
    teach: {
      body: "Balanced forces cancel out — the object stays still, or keeps moving in a straight line at the same speed. Nothing about its motion changes.\n\nUnbalanced forces don't cancel — there's a winner. And when there's a winner, the object's motion changes: it speeds up, slows down, or changes direction.\n\nBack to the trolley and the football. Same push, same force, but the football has way less mass. The same force causes a bigger change in motion when there's less to shove around. Football wins — it speeds up more.",
      diagram: {
        description: "Two tug-of-war panels. Panel A: two evenly matched teams, arrows equal length pointing opposite ways, rope centre marker not moving — labelled 'balanced'. Panel B: one team clearly stronger, arrows unequal length, rope centre marker moving toward the stronger side — labelled 'unbalanced'.",
        caption: "Same idea as forces on any object, just easier to see with a rope.",
      },
    },
    practice: [
      {
        q: "A ball rolls in a straight line at a constant speed. Are the forces on it balanced or unbalanced?",
        options: ["Balanced", "Unbalanced"],
        correct: 0,
        feedback: [
          "Correct — no change in motion means balanced, even though it's moving.",
          "Nothing about its motion is changing, so there's no net winner. That's balanced.",
        ],
      },
      {
        q: "A car speeds up from the traffic lights. What does that tell you about the forces on it?",
        options: ["They're balanced", "They're unbalanced", "There are no forces at all"],
        correct: 1,
        feedback: [
          "Speeding up is a change in motion — that only happens with an unbalanced force.",
          "Correct — the engine's push wins over friction and air resistance, so motion changes.",
          "The car is very much being pushed by its engine — plenty of forces involved.",
        ],
      },
      {
        q: "Two people push a heavy crate from opposite sides with exactly equal force. What happens?",
        options: ["It moves toward the stronger push", "It doesn't move", "It moves faster and faster"],
        correct: 1,
        feedback: [
          "Equal force means neither side wins — nobody's stronger here.",
          "Correct. Equal and opposite, so balanced, so no change in motion.",
          "That would need an unbalanced force — this one's dead even.",
        ],
      },
      {
        q: "A skydiver falls at a totally constant speed (terminal velocity). What does that mean about the forces on them?",
        options: ["Gravity has completely switched off", "Gravity and air resistance are balanced", "Air resistance is stronger than gravity"],
        correct: 1,
        feedback: [
          "Gravity never switches off — it's still pulling down the whole time.",
          "Correct — constant speed always means balanced forces, even mid-fall.",
          "If that were true they'd be slowing down, not staying constant.",
        ],
      },
      {
        q: "You push a shopping trolley and a heavier one, exact same force. Which changes speed more?",
        options: ["The heavier trolley", "The lighter trolley", "Both change speed the same amount"],
        correct: 1,
        feedback: [
          "More mass means the same force has less effect on its motion, not more.",
          "Correct — same force, less mass to shift, bigger change in motion.",
          "Mass changes how much a given force affects motion — they won't match.",
        ],
      },
    ],
    teachBack: {
      prompt: "Confuse me on purpose: give me one example of balanced forces and one of unbalanced forces, and tell me how you can tell them apart just by watching.",
      checkFor: ["balanced = no change in motion", "unbalanced = change in motion (speed or direction)", "one example each"],
    },
    closingLine: "Balanced versus unbalanced, sorted. Speed's next — and the maths starts creeping in.",
  },
  {
    meta: { id: "speed", chapterId: CHAPTER, subjectId: "physics", title: "Speed", order: 2 },
    mode: "science",
    starter: {
      prompt: "A ball rolling at a constant speed in a straight line — balanced or unbalanced forces?",
      options: [
        { label: "Balanced", correct: true, feedback: "Correct — no change in motion, balanced." },
        { label: "Unbalanced", correct: false, feedback: "Unbalanced means the motion is changing. This one isn't." },
      ],
    },
    hook: {
      prompt: "You and your mate leave for school at the same time, same route. You arrive one minute earlier than them. Were you definitely walking faster?",
      options: ["Yes, definitely", "No, not necessarily", "There's no way to know anything from this"],
      note: "Hang on to that. The formula coming up settles it properly.",
    },
    teach: {
      body: "Speed tells you how much distance covers how much time: speed = distance ÷ time. Standard units are metres per second (m/s), but you'll also see km/h and mph.\n\nBack to the walk to school: arriving a minute earlier doesn't automatically mean you walked faster. If your mate's route was a minute longer, you could've walked at the exact same speed. Speed only compares fairly when you actually calculate it — distance over time — rather than just eyeballing who arrived first.\n\nExample: a runner covers 100 m in 20 s. Speed = 100 ÷ 20 = 5 m/s.",
      diagram: {
        description: "A simple track diagram: two joggers on parallel lanes. Jogger A covers 100m in 20s (labelled). Jogger B covers 100m in 25s (labelled). Arrows show both finish at the same distance mark but at different times, visually setting up the distance/time comparison.",
        caption: "Same distance, different time — different speed, even though both 'got there'.",
      },
    },
    practice: [
      {
        q: "A cyclist covers 60 m in 10 s. What's their speed?",
        options: ["600 m/s", "6 m/s", "0.6 m/s", "50 m/s"],
        correct: 1,
        feedback: [
          "That's distance × time, not distance ÷ time.",
          "Correct — 60 ÷ 10 = 6 m/s.",
          "That's time ÷ distance — flipped the wrong way round.",
          "That's distance − time, which isn't a speed calculation at all.",
        ],
      },
      {
        q: "A car travels 150 km in 3 hours. What's its average speed?",
        options: ["450 km/h", "50 km/h", "3 km/h", "153 km/h"],
        correct: 1,
        feedback: [
          "That's distance × time — the formula is distance ÷ time.",
          "Correct — 150 ÷ 3 = 50 km/h.",
          "That's just the time given, not a speed at all.",
          "That's distance + time — not how speed works.",
        ],
      },
      {
        q: "Runner A covers 200 m in 25 s. Runner B covers 180 m in 25 s. Who's faster?",
        options: ["Runner A", "Runner B", "They're the same speed — same time"],
        correct: 0,
        feedback: [
          "Correct — same time, more distance covered, so faster.",
          "B covered less distance in the same time — that's slower, not faster.",
          "Same time doesn't mean same speed if the distance is different.",
        ],
      },
      {
        q: "A snail moves 2 m in 100 s. What's its speed?",
        options: ["200 m/s", "0.02 m/s", "50 m/s", "2 m/s"],
        correct: 1,
        feedback: [
          "That's distance × time — flip it to divide instead.",
          "Correct — 2 ÷ 100 = 0.02 m/s. Small numbers are fine, speed doesn't have to be fast.",
          "That's time ÷ distance, the formula the wrong way round.",
          "That's just the distance on its own, no time factored in.",
        ],
      },
      {
        q: "A speed is given as '5 km/h'. What does that actually mean?",
        options: ["It travelled 5 km, full stop", "It would cover 5 km if it kept that pace for an hour", "It took 5 hours to travel somewhere"],
        correct: 1,
        feedback: [
          "That's a distance on its own — the unit here describes a rate, not a fixed trip.",
          "Correct — km/h is a rate: distance you'd cover per hour at that pace.",
          "The 'h' is the unit of the rate, not a stated travel time.",
        ],
      },
    ],
    teachBack: {
      prompt: "Teach me the speed formula and walk me through one made-up example with real numbers.",
      checkFor: ["speed = distance ÷ time", "correct units (m/s or similar)", "a worked numerical example"],
    },
    closingLine: "Speed, calculated. Next: what speed actually looks like drawn on a graph.",
  },
  {
    meta: { id: "distance-time-graphs", chapterId: CHAPTER, subjectId: "physics", title: "Distance–time graphs", order: 3 },
    mode: "science",
    starter: {
      prompt: "Quick formula check: speed equals...?",
      options: [
        { label: "distance ÷ time", correct: true, feedback: "Correct." },
        { label: "time ÷ distance", correct: false, feedback: "That's the formula flipped the wrong way round." },
      ],
    },
    hook: {
      prompt: "A distance–time graph has a completely flat, horizontal section right in the middle. What's happening during that bit?",
      options: ["Speeding up", "Slowing down", "Stopped completely", "Moving backwards"],
      note: "Hold that — you'll see the actual graph in a second.",
    },
    teach: {
      body: "On a distance–time graph, time goes along the bottom, distance goes up the side. The steepness of the line — the gradient — is the speed. Steeper means faster. Flat means the distance isn't changing at all, which means stopped, not fast.\n\nA flat section is the one everyone gets wrong first go — it looks like nothing dramatic is happening, but it's actually telling you the object has stopped completely, because if it were moving, the distance would have to keep increasing.\n\nA line sloping back down means the distance from the start is decreasing — the object is heading back toward where it began.",
      diagram: {
        description: "A distance–time graph with three sections joined together: (1) a steep straight rising line from the origin, labelled 'fast, moving away'; (2) a flat horizontal section, labelled 'stopped'; (3) a less steep rising line, labelled 'slower, moving away'. Axes labelled 'Time (s)' along the bottom and 'Distance (m)' up the side.",
        caption: "Steeper = faster. Flat = stopped. There's no third option.",
      },
    },
    practice: [
      {
        q: "On a distance–time graph, what does a completely flat section mean?",
        options: ["Moving at top speed", "Stopped", "Moving very slowly backwards", "The graph has an error"],
        correct: 1,
        feedback: [
          "Flat means the distance isn't changing at all — that's the opposite of top speed.",
          "Correct — no change in distance means stopped.",
          "Backwards would show as a downward slope, not flat.",
          "A flat section is a completely normal, valid part of a real journey.",
        ],
      },
      {
        q: "Which section of a distance–time graph shows the fastest speed?",
        options: ["The flattest section", "The steepest section", "It's impossible to tell from the graph"],
        correct: 1,
        feedback: [
          "Flat is stopped, the slowest possible 'speed' — zero.",
          "Correct — steepness is speed, so steepest is fastest.",
          "The whole point of the graph is that you can tell, from the gradient.",
        ],
      },
      {
        q: "A line on a distance–time graph slopes downward. What does that mean?",
        options: ["The object is speeding up", "The object is moving back toward the start", "The graph is drawn wrong"],
        correct: 1,
        feedback: [
          "Speeding up (in the same direction) shows as a steeper upward slope, not downward.",
          "Correct — decreasing distance from the start means heading back.",
          "A downward slope is a completely valid, meaningful part of a journey graph.",
        ],
      },
      {
        q: "Two lines on the same graph: one steep, one shallow, both going up. Which represents the faster object?",
        options: ["The steep one", "The shallow one", "They must be moving at the same speed"],
        correct: 0,
        feedback: [
          "Correct — steeper gradient, more distance per second, faster.",
          "Shallow means less distance covered per second — that's slower.",
          "Different gradients on the same axes always mean different speeds.",
        ],
      },
      {
        q: "A graph shows distance increasing, then flat, then increasing again at the same steepness as before. What happened?",
        options: ["The object sped up partway through", "The object stopped for a while, then carried on at the same speed", "The object went backwards"],
        correct: 1,
        feedback: [
          "The steepness before and after the flat bit is the same — no speed change, just a pause.",
          "Correct — a rest stop, then continuing at the original pace.",
          "Backwards needs a downward slope, not a flat one.",
        ],
      },
    ],
    teachBack: {
      prompt: "Draw me a distance–time graph with words: describe a journey with a fast start, a rest, then a slower finish, and tell me what each part would look like on the graph.",
      checkFor: ["steep = fast", "flat = stopped", "less steep = slower", "shape matches the described journey"],
    },
    closingLine: "Graphs, cracked. Last one in this chapter — gravity, and a genuinely famous experiment.",
  },
  {
    meta: { id: "gravity", chapterId: CHAPTER, subjectId: "physics", title: "Gravity", order: 4 },
    mode: "science",
    starter: {
      prompt: "Which of these is a non-contact force?",
      options: [
        { label: "Gravity", correct: true, feedback: "Correct." },
        { label: "Friction", correct: false, feedback: "Friction needs surfaces actually touching." },
        { label: "Tension", correct: false, feedback: "Tension acts through something physically connected, like a rope." },
      ],
    },
    hook: {
      prompt: "Drop a hammer and a feather at the exact same moment, from the exact same height, with absolutely no air around. Which one hits the ground first?",
      options: ["The hammer", "The feather", "They land at exactly the same time"],
      note: "This one's real, not a thought experiment. Answer's coming.",
    },
    teach: {
      body: "Gravity pulls every mass toward every other mass. Near Earth's surface, it accelerates everything downward at the same rate — a hammer and a feather really do fall together, with nothing to get in the way.\n\nSo why does a feather fall slower in real life? Air resistance — not gravity. Air pushes back against the feather's large surface far more than against the hammer's small one. Take the air away, and the difference disappears.\n\nThis isn't hypothetical: Apollo 15 astronaut David Scott actually dropped a hammer and a feather on the Moon in 1971, where there's no air to get in the way. They landed together, exactly as gravity alone predicts.\n\nOne more distinction: weight isn't the same as mass. Mass is how much stuff you're made of, measured in kilograms, and it doesn't change. Weight is the force gravity exerts on that mass, measured in newtons — and it changes depending on how strong the gravity is where you're standing.",
      diagram: {
        description: "Two panels. Panel A: a hammer and a feather falling side by side in air — the feather clearly lagging behind, with small upward arrows on the feather labelled 'air resistance'. Panel B: the same hammer and feather falling side by side with no air — both at exactly the same height throughout, no resistance arrows, labelled 'in a vacuum'.",
        caption: "Take away the air, take away the difference.",
      },
    },
    practice: [
      {
        q: "Why does a feather fall slower than a hammer here on Earth?",
        options: ["Gravity pulls harder on the hammer", "Air resistance affects the feather more", "The feather has less gravity acting on it"],
        correct: 1,
        feedback: [
          "Gravity accelerates both at the same rate — that's not what's slowing the feather.",
          "Correct — air resistance, not gravity, is the difference.",
          "Gravity doesn't pick and choose by object — it's air resistance doing the work here.",
        ],
      },
      {
        q: "On the Moon, with no atmosphere, what would happen if you dropped a hammer and a feather together?",
        options: ["The hammer would land first, same as on Earth", "They'd land at the same time", "Neither would fall at all — no air to push them down"],
        correct: 1,
        feedback: [
          "That only happens because of Earth's air resistance — the Moon has none.",
          "Correct — this actually happened, Apollo 15, 1971.",
          "Gravity doesn't need air to work — the Moon still has gravity, just weaker than Earth's.",
        ],
      },
      {
        q: "Which of these is heavier objects fall faster — is that true near Earth's surface, once air resistance is out of the picture?",
        options: ["True — more mass always falls faster", "False — mass doesn't affect how fast something falls, once air's not a factor"],
        correct: 1,
        feedback: [
          "This is one of the most common misconceptions in physics — but it's not true once air resistance is removed.",
          "Correct. Without air resistance, all masses accelerate downward at the same rate.",
        ],
      },
      {
        q: "You take an object with a mass of 5 kg to the Moon, where gravity is weaker than on Earth. What happens to its mass and its weight?",
        options: ["Both stay exactly the same", "Mass stays the same, weight decreases", "Mass decreases, weight stays the same"],
        correct: 1,
        feedback: [
          "Weight depends on gravity, and gravity is weaker on the Moon — weight does change.",
          "Correct — mass is fixed at 5 kg, but weaker gravity means less weight.",
          "Mass is how much stuff you're made of — travelling to the Moon doesn't remove any of it.",
        ],
      },
      {
        q: "What is weight actually measuring?",
        options: ["How much stuff an object is made of", "The force of gravity acting on an object's mass", "How big an object is"],
        correct: 1,
        feedback: [
          "That's mass, not weight — a different quantity, measured in kilograms.",
          "Correct — weight is a force, measured in newtons.",
          "Size isn't directly what either mass or weight measures.",
        ],
      },
    ],
    teachBack: {
      prompt: "Explain to me why a hammer and a feather would land together with no air, and why mass and weight aren't the same thing.",
      checkFor: ["air resistance explains the everyday difference, not gravity", "mass is fixed, weight depends on gravity", "reference to the real Moon demonstration if possible"],
    },
    closingLine: "Forces, chapter closed. Five for five on the mastery map. Electromagnets is next, and it's a different kind of topic entirely.",
  },
];
