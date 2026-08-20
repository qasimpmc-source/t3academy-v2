import type { FoundationsTopicContent } from "../types";

const CHAPTER = "analysing-and-displaying-data";

export const mathsAnalysingAndDisplayingData: FoundationsTopicContent[] = [
  {
    meta: { id: "mode-median-and-range", chapterId: CHAPTER, subjectId: "maths", title: "Mode, median and range", order: 0 },
    mode: "maths",
    starter: {
      prompt: "Football score predictions for 5 matches: 2, 1, 3, 1, 4. What's the range?",
      options: [
        { label: "5", correct: false, feedback: "That's not max minus min — check the two extreme values again." },
        { label: "4", correct: false, feedback: "That's just the biggest number on its own. Range needs a subtraction." },
        { label: "3", correct: true, feedback: "Correct — 4 − 1 = 3." },
        { label: "1", correct: false, feedback: "That's the most common value (the mode), not the range." },
      ],
    },
    hook: {
      prompt: "Team A and Team B both average 2 goals a match. Same mean. Are they equally reliable strikers?",
      options: ["True — same mean, same reliability", "False — same mean can hide a totally different story"],
      note: "Hold that. You'll see exactly why by the end of this.",
    },
    teach: {
      body: "Three tools for describing a set of numbers. Mode: the value that appears most often. Median: the middle value once everything's in order. Range: the spread, biggest minus smallest.\n\nBack to Team A and Team B. Same mean doesn't mean same team — Team A might score 2 every single match (range 0, dead reliable), while Team B swings between 0 and 4 (range 4, wildly unpredictable). Mean alone hides that completely. That's why range matters.",
      worked: [
        {
          label: "Fully worked",
          problem: "Find the mode, median and range of: 3, 7, 7, 2, 9",
          steps: [
            "Order the data: 2, 3, 7, 7, 9",
            "Mode: the most frequent value → 7 appears twice, so mode = 7",
            "Median: the middle value (5 numbers, so the 3rd) → 7",
            "Range: biggest minus smallest → 9 − 2 = 7",
          ],
          blankIndices: [],
        },
        {
          label: "One step blank",
          problem: "Find the mode, median and range of: 5, 5, 8, 1, 6",
          steps: [
            "Order the data: 1, 5, 5, 6, 8",
            "Mode: 5 appears twice, so mode = 5",
            "Median: the middle value (5 numbers, so the 3rd) → ___",
            "Range: 8 − 1 = 7",
          ],
          blankIndices: [2],
          answer: "5",
        },
        {
          label: "Two steps blank",
          problem: "Find the mode, median and range of: 4, 4, 4, 9, 2",
          steps: [
            "Order the data: ___",
            "Mode: the most frequent value → ___",
            "Median: the middle value (5 numbers, so the 3rd)",
            "Range: biggest minus smallest",
          ],
          blankIndices: [0, 1],
          answer: "Ordered: 2, 4, 4, 4, 9 — Mode: 4",
        },
        {
          label: "Bare question",
          problem: "Find the mode, median and range of: 6, 3, 3, 3, 10, 3",
          steps: [],
          blankIndices: [],
          answer: "Ordered: 3, 3, 3, 3, 6, 10 — Mode: 3 — Median: (3+3)÷2 = 3 — Range: 10−3 = 7",
        },
      ],
    },
    practice: [
      {
        q: "Dataset: 4, 8, 8, 8, 15, 2. What's the mode?",
        options: ["2", "8", "15", "There isn't one"],
        correct: 1,
        feedback: [
          "That's the smallest value, not the most frequent one.",
          "Correct — 8 appears three times, more than anything else.",
          "That's the largest value, not the most frequent one.",
          "There is one — 8 repeats, so it's not this option.",
        ],
      },
      {
        q: "Dataset: 1, 3, 5, 7. What's the median?",
        options: ["4", "5", "3", "You can't find one — there's no single middle number"],
        correct: 0,
        feedback: [
          "Correct — with an even count, average the two middle values: (3+5) ÷ 2 = 4.",
          "That's one of the two middle values on its own — you need to average both of them.",
          "That's the other middle value on its own — average both of them instead.",
          "You can — just average the two middle values when there's an even count.",
        ],
      },
      {
        q: "Dataset: 12, 5, 9, 20, 1. What's the range?",
        options: ["12", "20", "19", "5"],
        correct: 2,
        feedback: [
          "That's just the first number listed, not a calculation.",
          "That's just the biggest number on its own — range needs a subtraction.",
          "Correct — 20 − 1 = 19.",
          "That's just one value from the middle of the set.",
        ],
      },
      {
        q: "Dataset: 6, 6, 2, 9, 6, 3, 8. What's the median?",
        options: ["6", "5", "3", "8"],
        correct: 0,
        feedback: [
          "Correct — order it: 2,3,6,6,6,8,9 → the middle (4th of 7) value is 6.",
          "That's not any value that actually appears once you order the data.",
          "That's near the low end once ordered, not the middle.",
          "That's near the high end once ordered, not the middle.",
        ],
      },
      {
        q: "A dataset has mode 5, median 5, and range 0. What does a range of 0 tell you?",
        options: ["The data has an error in it", "Every value in the dataset is identical", "The dataset only has one number in it"],
        correct: 1,
        feedback: [
          "A range of 0 is a completely valid, meaningful result — no error.",
          "Correct — if the biggest and smallest are the same number, everything must be that number.",
          "It could easily have several values — they'd just all have to be equal.",
        ],
      },
    ],
    teachBack: {
      prompt: "Give me a set of five numbers and walk me through finding the mode, median and range — properly, showing the ordering step.",
      checkFor: ["orders the data first", "mode = most frequent", "median = middle value (averaging two if even count)", "range = max − min"],
    },
    closingLine: "Mode, median, range — locked in. Next: getting the same numbers to actually show something on a chart.",
  },
  {
    meta: { id: "displaying-data", chapterId: CHAPTER, subjectId: "maths", title: "Displaying data", order: 1 },
    mode: "maths",
    starter: {
      prompt: "Dataset: 3, 3, 3, 7, 9. What's the mode?",
      options: [
        { label: "3", correct: true, feedback: "Correct." },
        { label: "7", correct: false, feedback: "That appears once — not the most frequent." },
        { label: "9", correct: false, feedback: "That appears once — not the most frequent." },
      ],
    },
    hook: {
      prompt: "A bar chart and a pie chart can show the exact same survey data. One tells you 'how many people', the other only tells you 'what share of the total'. Which is which?",
      options: ["Bar chart = counts, pie chart = share", "Pie chart = counts, bar chart = share", "They both tell you exactly the same thing"],
      note: "Keep that distinction — it's the whole point of this topic.",
    },
    teach: {
      body: "Bar charts show frequency — actual counts, one bar per category, height equals how many. Pictograms do the same job with symbols instead of bars, but the key matters enormously: if one symbol = 2 people, half a symbol = 1, and getting that wrong throws off every reading.\n\nA pie chart shows proportion — what share of the whole each category takes up — but on its own, it can't tell you the actual count unless you also know the total number surveyed. That's the trap in the hook: a pie chart alone answers 'what fraction', not 'how many'.\n\nAlways check the scale before reading any chart. A bar chart where the vertical axis starts at 50 instead of 0 can make small differences look enormous — technically accurate, deliberately misleading.",
      worked: [
        {
          label: "Fully worked",
          problem: "A pictogram key shows: 🍎 = 4 apples sold. Monday has 2½ symbols. How many apples sold on Monday?",
          steps: [
            "Each full symbol = 4 apples",
            "2 full symbols = 2 × 4 = 8 apples",
            "Half a symbol = 4 ÷ 2 = 2 apples",
            "Total = 8 + 2 = 10 apples",
          ],
          blankIndices: [],
        },
        {
          label: "One step blank",
          problem: "A pictogram key shows: 🍎 = 4 apples sold. Tuesday has 3½ symbols. How many apples sold on Tuesday?",
          steps: [
            "Each full symbol = 4 apples",
            "3 full symbols = 3 × 4 = 12 apples",
            "Half a symbol = 4 ÷ 2 = 2 apples",
            "Total = ___",
          ],
          blankIndices: [3],
          answer: "14 apples",
        },
        {
          label: "Two steps blank",
          problem: "A pictogram key shows: 🍎 = 6 apples sold. Wednesday has 1½ symbols. How many apples sold on Wednesday?",
          steps: [
            "Each full symbol = 6 apples",
            "1 full symbol = ___",
            "Half a symbol = 6 ÷ 2 = ___",
            "Total = full symbols + half symbol",
          ],
          blankIndices: [1, 2],
          answer: "1 full symbol = 6 apples — Half a symbol = 3 apples",
        },
        {
          label: "Bare question",
          problem: "A pictogram key shows: 🍎 = 8 apples sold. Thursday has 2½ symbols. How many apples sold on Thursday?",
          steps: [],
          blankIndices: [],
          answer: "2 × 8 = 16, plus half of 8 = 4, total 20 apples",
        },
      ],
    },
    practice: [
      {
        q: "A pictogram key shows 🎈 = 5 balloons. A row shows 3 full symbols. How many balloons?",
        options: ["8", "3", "15", "5"],
        correct: 2,
        feedback: [
          "That's adding the number of symbols to the key value — not how pictograms work.",
          "That's just the number of symbols, not the actual count they represent.",
          "Correct — 3 × 5 = 15.",
          "That's just the key value on its own, not multiplied by the symbol count.",
        ],
      },
      {
        q: "A bar chart's vertical axis starts at 40 instead of 0. What's the risk in reading it?",
        options: ["No risk — the numbers are still accurate", "Small real differences can look huge", "The chart becomes impossible to read at all"],
        correct: 1,
        feedback: [
          "The numbers can be technically accurate and still create a misleading visual impression.",
          "Correct — chopping the axis exaggerates differences that are actually small.",
          "It's still readable — just easy to misjudge if you don't check the scale first.",
        ],
      },
      {
        q: "A pie chart shows 'Football: 50%' of a survey. Without any other information, how many people said football?",
        options: ["50 people", "Half the total surveyed — but you can't know the number without the total", "You can't tell anything at all from a pie chart"],
        correct: 1,
        feedback: [
          "50% doesn't mean 50 people unless exactly 100 people were surveyed.",
          "Correct — proportion only, not a count, unless you also know the total.",
          "You can tell the proportion — just not the raw count without more information.",
        ],
      },
      {
        q: "Which is the better choice for showing how many pets each type a class owns — bar chart or pie chart, if you want the exact numbers to be obvious at a glance?",
        options: ["Bar chart", "Pie chart", "Either works exactly the same for this"],
        correct: 0,
        feedback: [
          "Correct — bar chart heights read directly as counts.",
          "A pie chart would need you to also know the total number of pets to back out a count.",
          "They're built for different jobs — counts versus proportions.",
        ],
      },
      {
        q: "A pictogram key shows 🚗 = 10 cars, and one row shows a quarter symbol. What does that represent?",
        options: ["0.25 cars", "2.5 cars", "1 car", "It's not possible to show a quarter symbol"],
        correct: 1,
        feedback: [
          "That's the fraction itself, not applied to the key's value.",
          "Correct — a quarter of 10 = 2.5.",
          "That would be a tenth of the symbol, not a quarter.",
          "Partial symbols are a normal, valid part of pictograms.",
        ],
      },
    ],
    teachBack: {
      prompt: "Explain to me the difference between what a bar chart tells you and what a pie chart tells you, and why checking the axis matters.",
      checkFor: ["bar chart = frequency/counts", "pie chart = proportion of whole", "axis scale can mislead if not checked"],
    },
    closingLine: "Charts, sorted. Next up — what to do when there's too much raw data to put on one sensible chart.",
  },
  {
    meta: { id: "grouping-data", chapterId: CHAPTER, subjectId: "maths", title: "Grouping data", order: 2 },
    mode: "maths",
    starter: {
      prompt: "A bar chart's axis starts at 40 instead of 0. What's the risk?",
      options: [
        { label: "Small differences can look huge", correct: true, feedback: "Correct." },
        { label: "No risk at all", correct: false, feedback: "The visual impression can mislead even when the numbers are accurate." },
      ],
    },
    hook: {
      prompt: "You've got the exact ages of 37 people, all different. Can you put that sensibly on one bar chart, one bar per age?",
      options: ["Yes, no problem", "No — 37 separate bars is unreadable"],
      note: "You'll see exactly what to do instead in a second.",
    },
    teach: {
      body: "When there's too much raw data to show one value at a time, group it into class intervals — ranges like 0–9, 10–19, 20–29 — and count how many values fall in each one using a tally chart, then convert tallies into a frequency table.\n\nThe one thing that trips people up: class boundaries must not overlap. '0–10' followed by '10–20' is ambiguous — where does exactly 10 go? Use non-overlapping ranges like 0–9 and 10–19, or clear inequality notation (0 ≤ x < 10, 10 ≤ x < 20) so every value has exactly one home.\n\nChoosing the group width matters too: too few groups and you lose all the detail, too many and you're back to 37 unreadable bars.",
      worked: [
        {
          label: "Fully worked",
          problem: "Group these ages into class intervals of width 10: 4, 12, 23, 8, 19, 31, 15, 27",
          steps: [
            "Set up non-overlapping intervals: 0–9, 10–19, 20–29, 30–39",
            "Sort each value: 4→0–9, 12→10–19, 23→20–29, 8→0–9, 19→10–19, 31→30–39, 15→10–19, 27→20–29",
            "Tally: 0–9: II (2), 10–19: III (3), 20–29: II (2), 30–39: I (1)",
            "Frequency table: 0–9 = 2, 10–19 = 3, 20–29 = 2, 30–39 = 1",
          ],
          blankIndices: [],
        },
        {
          label: "One step blank",
          problem: "Group these test scores into intervals of width 10: 5, 14, 22, 9, 18, 33, 27, 11",
          steps: [
            "Set up non-overlapping intervals: 0–9, 10–19, 20–29, 30–39",
            "Sort each value: 5→0–9, 14→10–19, 22→20–29, 9→0–9, 18→10–19, 33→30–39, 27→20–29, 11→10–19",
            "Tally: 0–9: II (2), 10–19: III (3), 20–29: II (2), 30–39: I (1)",
            "Frequency table: ___",
          ],
          blankIndices: [3],
          answer: "0–9 = 2, 10–19 = 3, 20–29 = 2, 30–39 = 1",
        },
        {
          label: "Two steps blank",
          problem: "Group these heights (cm) into intervals of width 20: 105, 142, 168, 121, 155, 110, 190, 135",
          steps: [
            "Set up non-overlapping intervals: 100–119, 120–139, 140–159, 160–179, 180–199",
            "Sort each value into its interval: ___",
            "Tally each interval: ___",
            "Frequency table follows directly from the tally",
          ],
          blankIndices: [1, 2],
          answer: "105,110→100–119 (2) | 121,135→120–139 (2) | 142,155→140–159 (2) | 168→160–179 (1) | 190→180–199 (1)",
        },
        {
          label: "Bare question",
          problem: "Group these scores into intervals of width 10 and give the frequency table: 3, 17, 24, 9, 31, 16, 22, 8, 35, 11",
          steps: [],
          blankIndices: [],
          answer: "0–9: 3,9,8 (3) | 10–19: 17,16,11 (3) | 20–29: 24,22 (2) | 30–39: 31,35 (2)",
        },
      ],
    },
    practice: [
      {
        q: "Class intervals are given as '0–10' and '10–20'. What's the problem?",
        options: ["Nothing — this is standard practice", "The value 10 could belong to either interval", "The intervals are too wide"],
        correct: 1,
        feedback: [
          "This is actually a common error — the boundary overlap is a real problem.",
          "Correct — ambiguous boundaries. Use 0–9 and 10–19, or strict inequality notation.",
          "Width isn't the issue here — the overlap at the boundary is.",
        ],
      },
      {
        q: "You have 40 data points and choose only 2 groups to sort them into. What's the downside?",
        options: ["Nothing, fewer groups is always better", "You lose almost all the detail about how the data's actually spread", "The tally chart becomes impossible to draw"],
        correct: 1,
        feedback: [
          "Too few groups can hide real patterns in the data — it's a genuine tradeoff.",
          "Correct — 2 huge groups tells you almost nothing about the actual distribution.",
          "A tally chart with 2 groups is easy to draw — the issue is what it hides, not how to make it.",
        ],
      },
      {
        q: "A value of exactly 20 needs sorting into '10–19' or '20–29'. Which interval does it belong to?",
        options: ["10–19", "20–29", "Either one — it doesn't matter"],
        correct: 1,
        feedback: [
          "20 is outside this interval — it only goes up to 19.",
          "Correct — 20 is the first value in this interval.",
          "It matters — each value must land in exactly one, unambiguous interval.",
        ],
      },
      {
        q: "What's the point of a tally chart before making a frequency table?",
        options: ["It's just decoration", "It makes counting occurrences in each group quick and less error-prone", "It replaces the need for a frequency table entirely"],
        correct: 1,
        feedback: [
          "It has a real function — fast, accurate counting.",
          "Correct — marks in groups of 5 make large counts easy to check at a glance.",
          "A tally chart is a step toward the frequency table, not a replacement for it.",
        ],
      },
      {
        q: "Ages 0–9, 10–19, 20–29 are being used. Where does someone aged exactly 9.5 go, if ages are recorded to one decimal place?",
        options: ["0–9, since 9.5 rounds down for this purpose", "10–19, since 9.5 is closer to 10", "0–9, since 9.5 is still less than 10"],
        correct: 2,
        feedback: [
          "Rounding isn't how interval sorting works — it's about which range the actual value falls in.",
          "Closeness to a boundary doesn't decide it — the value's actual position does.",
          "Correct — 9.5 is less than 10, so it belongs in 0–9 regardless of which boundary it's nearer to.",
        ],
      },
    ],
    teachBack: {
      prompt: "Explain to me why grouping data into class intervals is sometimes necessary, and what can go wrong if the intervals overlap.",
      checkFor: ["too many individual values to chart sensibly", "intervals must not overlap", "boundary ambiguity is the main risk"],
    },
    closingLine: "Grouping, done. Next: actually comparing two datasets fairly, not just describing one.",
  },
  {
    meta: { id: "averages-and-comparing-data", chapterId: CHAPTER, subjectId: "maths", title: "Averages and comparing data", order: 3 },
    mode: "maths",
    starter: {
      prompt: "Class intervals '0–10' and '10–20' — what's wrong with them?",
      options: [
        { label: "The value 10 could go in either one", correct: true, feedback: "Correct — overlapping boundaries." },
        { label: "Nothing, they're fine", correct: false, feedback: "10 is ambiguous between the two — that's the problem." },
      ],
    },
    hook: {
      prompt: "Class A scores 850 total marks across the year. Class B scores 600 total marks. Class A did better — true or false?",
      options: ["True — more total marks, better result", "False — you can't tell without knowing how many students are in each class"],
      note: "Hold that. You'll see exactly why in a second.",
    },
    teach: {
      body: "Comparing totals is only fair when the group sizes match. Class A with 850 total marks might have 34 students (mean 25), while Class B with 600 total marks might have only 20 students (mean 30) — Class B actually did better per student, despite the smaller total. Mean, not total, is the fair comparison across different-sized groups.\n\nBut mean alone isn't the whole story either. Two classes can have identical means and completely different ranges — one consistent, one wildly variable. A proper comparison uses mean and range together: mean tells you the typical level, range tells you how consistent that level actually is.",
      worked: [
        {
          label: "Fully worked",
          problem: "Class A: 25 students, total 750 marks. Class B: 20 students, total 640 marks. Compare using the mean.",
          steps: [
            "Class A mean = 750 ÷ 25 = 30",
            "Class B mean = 640 ÷ 20 = 32",
            "Compare: 32 > 30",
            "Conclusion: Class B did better on average, despite a lower total.",
          ],
          blankIndices: [],
        },
        {
          label: "One step blank",
          problem: "Team X: 15 players, total 180 points. Team Y: 12 players, total 156 points. Compare using the mean.",
          steps: [
            "Team X mean = 180 ÷ 15 = 12",
            "Team Y mean = 156 ÷ 12 = 13",
            "Compare: 13 > 12",
            "Conclusion: ___",
          ],
          blankIndices: [3],
          answer: "Team Y performed better per player, despite a lower total score.",
        },
        {
          label: "Two steps blank",
          problem: "Shop A: 8 days trading, total £2,400 sales. Shop B: 6 days trading, total £2,100 sales. Compare using the mean.",
          steps: [
            "Shop A mean = 2400 ÷ 8 = ___",
            "Shop B mean = 2100 ÷ 6 = ___",
            "Compare the two means",
            "Conclusion follows from which mean is higher",
          ],
          blankIndices: [0, 1],
          answer: "Shop A mean = £300/day — Shop B mean = £350/day",
        },
        {
          label: "Bare question",
          problem: "Group 1: 10 students, total 320 marks. Group 2: 16 students, total 480 marks. Which group did better on average, and by how much?",
          steps: [],
          blankIndices: [],
          answer: "Group 1 mean = 32, Group 2 mean = 30 — Group 1 did better, by 2 marks on average.",
        },
      ],
    },
    practice: [
      {
        q: "Why is comparing raw totals unfair when group sizes are different?",
        options: ["It isn't unfair — totals are always the right comparison", "A bigger group can rack up a bigger total without actually performing better per person", "Totals are impossible to calculate for different-sized groups"],
        correct: 1,
        feedback: [
          "It genuinely can mislead — that's exactly the trap in this topic.",
          "Correct — more people means more total, regardless of individual performance.",
          "Totals are easy to calculate for any group — the problem is what conclusion you draw from them.",
        ],
      },
      {
        q: "Two classes have the exact same mean test score. Does that mean they performed identically?",
        options: ["Yes, same mean means identical performance", "Not necessarily — they could have very different ranges", "It's impossible for two classes to have the same mean"],
        correct: 1,
        feedback: [
          "Same mean can hide wildly different consistency — check the range too.",
          "Correct — same mean, but one could be far more consistent than the other.",
          "Two different classes can absolutely land on the same mean by coincidence.",
        ],
      },
      {
        q: "Class P: 30 students, total 900. Class Q: 25 students, total 800. Which class has the higher mean?",
        options: ["Class P", "Class Q", "They're equal"],
        correct: 1,
        feedback: [
          "Class P's mean is 900 ÷ 30 = 30 — check Class Q's mean before deciding.",
          "Correct — Class Q's mean is 800 ÷ 25 = 32, higher than Class P's 30.",
          "30 and 32 aren't equal — recalculate both means.",
        ],
      },
      {
        q: "What extra piece of information does the range add, on top of the mean?",
        options: ["Nothing — the mean already tells you everything", "How spread out or consistent the data is", "The exact total of all the values"],
        correct: 1,
        feedback: [
          "The mean and range measure genuinely different things — the mean alone misses spread entirely.",
          "Correct — range shows consistency, something the mean can't reveal on its own.",
          "That's what a total (or the mean multiplied by the count) tells you, not the range.",
        ],
      },
      {
        q: "Team A: mean score 20, range 2. Team B: mean score 20, range 18. Which team is more consistent?",
        options: ["Team A", "Team B", "They're equally consistent — same mean"],
        correct: 0,
        feedback: [
          "Correct — a small range means the scores barely vary, which is exactly what 'consistent' means.",
          "A range of 18 means huge swings between matches — that's the opposite of consistent.",
          "Same mean doesn't mean same consistency — the range tells a completely different story here.",
        ],
      },
    ],
    teachBack: {
      prompt: "Explain to me why you shouldn't just compare totals between two groups of different sizes, and what the range adds that the mean alone doesn't.",
      checkFor: ["mean, not total, is fair across different group sizes", "range shows spread/consistency", "same mean can still mean very different data"],
    },
    closingLine: "Fair comparisons, sorted. Last one in this chapter — reading trends, not just single snapshots.",
  },
  {
    meta: { id: "line-graphs-and-more-bar-charts", chapterId: CHAPTER, subjectId: "maths", title: "Line graphs and more bar charts", order: 4 },
    mode: "maths",
    starter: {
      prompt: "Class P total: 900 marks, 30 students. Class Q total: 800 marks, 25 students. Which has the higher mean?",
      options: [
        { label: "Class P", correct: false, feedback: "Class P's mean is 30 — check Class Q's mean before deciding." },
        { label: "Class Q", correct: true, feedback: "Correct — Class Q's mean is 32, higher than Class P's 30." },
      ],
    },
    hook: {
      prompt: "A line graph joins data points with a straight line, even though nothing was actually measured in between those points. Is the graph lying to you?",
      options: ["Yes — it's making up data that was never measured", "No — it's a reasonable assumption for continuous data like temperature or time", "It depends entirely on what's being measured"],
      note: "That third option is closer than you'd think — hang on to it.",
    },
    teach: {
      body: "Line graphs work well for continuous data that changes smoothly over time — temperature through the day, height over years — because it's reasonable to assume the value moved gradually between the points you actually measured.\n\nBut that assumption breaks for categorical data. Joining 'Football: 12 votes' to 'Tennis: 8 votes' with a straight line implies something moved between football and tennis, which makes no sense — categories aren't points on a continuous scale. That's exactly when a bar chart is the right tool instead.\n\nComparative (or composite) bar charts push this further — two or more bars per category, side by side, letting you compare groups directly. Boys versus girls, this year versus last year, all on one chart instead of two separate ones you'd have to mentally overlay.",
      worked: [
        {
          label: "Fully worked",
          problem: "Decide which chart type fits: (a) temperature recorded every hour through a day, (b) favourite colour votes from a class survey.",
          steps: [
            "(a) Temperature changes continuously and was sampled at points in time",
            "(a) A line graph is appropriate — joining the points shows a believable trend",
            "(b) Favourite colour is categorical — there's no 'between' red and blue",
            "(b) A bar chart is appropriate — categories should never be joined by a line",
          ],
          blankIndices: [],
        },
        {
          label: "One step blank",
          problem: "Decide which chart type fits: (a) a plant's height measured weekly for 10 weeks, (b) numbers of each pet type owned by a class.",
          steps: [
            "(a) Height changes gradually over time — continuous data",
            "(a) A line graph is appropriate",
            "(b) Pet type is categorical, not a continuous scale",
            "(b) ___",
          ],
          blankIndices: [3],
          answer: "A bar chart is appropriate — categories shouldn't be joined by a line.",
        },
        {
          label: "Two steps blank",
          problem: "Decide which chart type fits: (a) a car's speed recorded every second during a journey, (b) exam results by subject for one student.",
          steps: [
            "(a) Speed changes continuously moment to moment",
            "(a) ___",
            "(b) Subject is categorical, not a continuous scale",
            "(b) ___",
          ],
          blankIndices: [1, 3],
          answer: "(a) A line graph is appropriate — (b) A bar chart is appropriate",
        },
        {
          label: "Bare question",
          problem: "You want to compare boys' and girls' average screen time across 5 weekdays on one chart. What chart type fits, and why?",
          steps: [],
          blankIndices: [],
          answer: "A comparative bar chart — two bars per day (boys/girls), letting you compare both groups directly across the same categories.",
        },
      ],
    },
    practice: [
      {
        q: "Which type of data is safe to join with a line on a graph?",
        options: ["Categorical data, like favourite sports", "Continuous data, like temperature over time", "Any data at all — lines always work"],
        correct: 1,
        feedback: [
          "Categories aren't points on a scale — there's nothing meaningful 'between' them.",
          "Correct — continuous data can reasonably be assumed to change gradually between points.",
          "Categorical data specifically shouldn't be joined by a line.",
        ],
      },
      {
        q: "A survey of favourite pets is shown with points joined by a straight line. What's wrong with this?",
        options: ["Nothing — it's a completely standard chart choice", "Pet type is categorical, so joining the points implies something that doesn't make sense", "The colours are probably wrong"],
        correct: 1,
        feedback: [
          "This is actually a common charting mistake — categorical data shouldn't be joined by a line.",
          "Correct — a bar chart is the right tool here instead.",
          "Colour choice isn't the structural problem with this chart.",
        ],
      },
      {
        q: "What's the main advantage of a comparative bar chart with two bars per category?",
        options: ["It uses less space than one chart alone", "It lets you compare two groups directly, category by category", "It removes the need for a scale on the axis"],
        correct: 1,
        feedback: [
          "It typically uses more space, not less, since there are twice the bars.",
          "Correct — side-by-side bars make direct comparison easy.",
          "A scale is still essential — comparative bar charts need one just like any other bar chart.",
        ],
      },
      {
        q: "A line graph shows a plant's height over 8 weeks, rising steadily then flattening off. What does the flat part suggest?",
        options: ["The plant died", "Growth slowed to almost nothing over that period", "The measurements must be wrong"],
        correct: 1,
        feedback: [
          "A flat line means unchanging height, not necessarily death — could just be slow growth.",
          "Correct — a flattening trend shows growth levelling off.",
          "A flat section is a perfectly normal, meaningful part of a real growth pattern.",
        ],
      },
      {
        q: "Why might you choose a comparative bar chart over two separate bar charts for boys' and girls' results?",
        options: ["Two separate charts are always clearer", "One combined chart makes direct comparison far easier than mentally overlaying two charts", "It's not possible to make two separate charts for this data"],
        correct: 1,
        feedback: [
          "Two separate charts actually make direct comparison harder, not easier.",
          "Correct — putting both groups on one chart, category by category, is the whole point.",
          "Two separate charts are entirely possible — just a worse choice for direct comparison.",
        ],
      },
    ],
    teachBack: {
      prompt: "Explain to me when a line graph is the right choice, when it isn't, and what a comparative bar chart is for.",
      checkFor: ["line graphs suit continuous data", "categorical data shouldn't be joined by a line", "comparative bar charts let you compare groups directly"],
    },
    closingLine: "Chapter one, done. Five for five on the mastery map. Number skills is next, and it moves fast.",
  },
];
