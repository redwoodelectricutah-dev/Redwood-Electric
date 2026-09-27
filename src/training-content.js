/**
 * Training portal manifest.
 *
 * The page renders this list. Slots stay empty until real material exists.
 * To publish a module later, fill any of:
 *   lesson  — plain paragraph string
 *   photos  — [{ src, alt }] using real image paths (portfolio/… or training/…)
 *   video   — { src, label } pointing at a video file in public/
 *   quiz    — [{ q, choices: [string] }]
 * Leave a field null or [] and the portal keeps the empty slot.
 * There is no login and no score storage. This is the doorway, not an LMS.
 */
export const tracks = [
  { id: "all", label: "All tracks" },
  { id: "electrical", label: "Electrical" },
  { id: "theater", label: "Home theater" },
  { id: "unifi", label: "UniFi / security" },
  { id: "racks", label: "Data racks" },
  { id: "loxone", label: "Loxone" },
]

export const modules = [
  {
    id: "panel-labels",
    track: "electrical",
    trackLabel: "Electrical",
    title: "Naming a panel so it stays useful",
    summary: "How a directory should read after the cover is on — room, load, and nothing cute.",
    status: "Scheduled",
    lesson: null,
    photos: [],
    video: null,
    quiz: [],
  },
  {
    id: "deadfront",
    track: "electrical",
    trackLabel: "Electrical",
    title: "Torque, covers, and a clean deadfront",
    summary: "The last pass on a residential panel: seating, labels, and a cover that sits flat.",
    status: "Scheduled",
    lesson: null,
    photos: [],
    video: null,
    quiz: [],
  },
  {
    id: "screen-wall",
    track: "theater",
    trackLabel: "Home theater",
    title: "A screen wall that looks built in",
    summary: "Power, screen, and soundbar lined up so the wall reads as one piece of finish.",
    status: "Scheduled",
    lesson: null,
    photos: [],
    video: null,
    quiz: [],
  },
  {
    id: "small-rack",
    track: "theater",
    trackLabel: "Home theater",
    title: "A small rack: receiver, streamer, shades",
    summary: "What belongs on the shelf, what gets labeled, and what the homeowner actually touches.",
    status: "Scheduled",
    lesson: null,
    photos: [],
    video: null,
    quiz: [],
  },
  {
    id: "eave-camera",
    track: "unifi",
    trackLabel: "UniFi / security",
    title: "Placing a turret where the eave covers it",
    summary: "Aim, height, and the corners where a downspout or stone pier changes the shot.",
    status: "Scheduled",
    lesson: null,
    photos: [],
    video: null,
    quiz: [],
  },
  {
    id: "udm-patch",
    track: "unifi",
    trackLabel: "UniFi / security",
    title: "Dream Machine, switch, and a labeled patch field",
    summary: "A NavePoint cabinet dressed so the next visit starts with the labels, not a hunt.",
    status: "Scheduled",
    lesson: null,
    photos: [],
    video: null,
    quiz: [],
  },
  {
    id: "wall-rack",
    track: "racks",
    trackLabel: "Data racks",
    title: "Wall-mount dress and UPS placement",
    summary: "Patch panel, switch, power, and the battery at the bottom — cable routed, not piled.",
    status: "Scheduled",
    lesson: null,
    photos: [],
    video: null,
    quiz: [],
  },
  {
    id: "loxone-walk",
    track: "loxone",
    trackLabel: "Loxone",
    title: "Walking a house for Loxone",
    summary: "A shell for the lighting and automation walkthrough. The lesson is not written yet.",
    status: "Scheduled",
    lesson: null,
    photos: [],
    video: null,
    quiz: [],
  },
]
