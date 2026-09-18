export const REGIONS = [
  { id: "head", label: "Head & Neck", groups: ["cranium", "mandible"] },
  { id: "spine", label: "Spine", groups: ["cervical", "thoracic", "lumbar", "sacrum", "coccyx"] },
  { id: "thorax", label: "Thorax", groups: ["sternum", "ribs"] },
  { id: "upper-limb", label: "Upper Limbs", groups: ["clavicle", "scapula", "humerus", "radius", "ulna", "hand"] },
  { id: "pelvis", label: "Pelvis", groups: ["pelvis"] },
  { id: "lower-limb", label: "Lower Limbs", groups: ["femur", "patella", "tibia", "fibula", "foot"] },
];

export const BONE_GROUPS = {
  cranium: {
    name: "Cranium",
    latin: "Calvaria · Neurocranium",
    regionLabel: "Head & Neck",
    count: "8 fused bones",
    description:
      "Eight fused bones — frontal, two parietal, two temporal, occipital, sphenoid and ethmoid — form a rigid vault protecting the brain. They meet at immovable sutures: the coronal, sagittal and squamous lines running across the skull's surface.",
    facts: [
      {
        title: "The pterion is the weak point",
        text: "Where frontal, parietal, temporal and sphenoid meet, the bone is thinnest. A blow here can tear the middle meningeal artery beneath, producing an extradural haematoma.",
      },
      {
        title: "Fontanelles close on a schedule",
        text: "In infants the sutures are open fontanelles. The anterior fontanelle normally closes by 18–24 months; delayed closure prompts a search for hypothyroidism or rickets.",
      },
      {
        title: "Fracture patterns matter",
        text: "Linear fractures are the most common pattern. Depressed fractures push fragments inward onto the brain and usually need surgical elevation.",
      },
    ],
  },
  mandible: {
    name: "Mandible",
    latin: "Mandibula",
    regionLabel: "Head & Neck",
    count: "1 bone · the only mobile skull bone",
    description:
      "The largest and strongest facial bone, and the only freely mobile skull bone — it swings on the temporomandibular joint (TMJ) and carries the lower teeth in its alveolar process.",
    facts: [
      {
        title: "The ring breaks twice",
        text: "The mandible is the facial bone most often fractured — at the condyle, angle or symphysis — and its horseshoe shape often produces a second fracture on the opposite side.",
      },
      {
        title: "A nerve runs its whole length",
        text: "The inferior alveolar nerve travels the mandibular canal, emerging at the mental foramen. Fractures or dental disease can numb the lower lip.",
      },
      {
        title: "One joint, two sides",
        text: "The TMJs must open together; disc displacement on either side produces the clicking and locking of TMJ dysfunction.",
      },
    ],
  },
  cervical: {
    name: "Cervical Vertebrae",
    latin: "Vertebrae cervicales C1–C7",
    regionLabel: "Spine",
    count: "7 vertebrae",
    description:
      "Seven small vertebrae carry the skull. C1 — the atlas — is a bony ring with no body; C2 — the axis — projects the dens upward through it, letting the head rotate.",
    facts: [
      {
        title: "Classic high-energy fractures",
        text: "The Jefferson fracture (C1 burst) and hangman's fracture (C2 pedicles) can leave patients neurologically intact because the canal is widest at this level.",
      },
      {
        title: "Vertebral arteries climb C1–C6",
        text: "They run through the transverse foramina before entering the skull — whiplash or neck manipulation can dissect one, risking posterior-circulation stroke.",
      },
      {
        title: "One ligament holds the dens",
        text: "The transverse ligament can rupture in rheumatoid arthritis or trauma, letting C1 slip forward onto the cord — an unstable injury needing urgent imaging.",
      },
    ],
  },
  thoracic: {
    name: "Thoracic Vertebrae",
    latin: "Vertebrae thoracicae T1–T12",
    regionLabel: "Spine",
    count: "12 vertebrae",
    description:
      "Twelve vertebrae, each with rib facets on both sides. Their long, steeply downward-sloping spinous processes give the mid-back its knobbly contour on palpation.",
    facts: [
      {
        title: "The osteoporosis site",
        text: "Compression fractures cluster at T8–T12 — the commonest fragility fracture after hip and wrist, announced by sudden mid-back pain and a stooped kyphosis.",
      },
      {
        title: "The metastasis site",
        text: "Costovertebral joints make the thoracic spine the stiffest spinal segment, but also the favourite target of metastatic disease, seeded via the valveless Batson venous plexus.",
      },
      {
        title: "Adolescent kyphosis",
        text: "Scheuermann's disease wedges the anterior vertebral bodies in teenagers, producing a rigid round-back deformity rather than a postural one.",
      },
    ],
  },
  lumbar: {
    name: "Lumbar Vertebrae",
    latin: "Vertebrae lumbales L1–L5",
    regionLabel: "Spine",
    count: "5 vertebrae",
    description:
      "Five massive vertebrae built for load, with short spinous processes. Below the L1–L2 disc the spinal cord ends and the cauda equina's nerve roots float in the canal.",
    facts: [
      {
        title: "Where discs go",
        text: "L4–L5 and L5–S1 account for the overwhelming majority of herniations; a prolapsed L5 or S1 root radiates sciatica down the back of the leg.",
      },
      {
        title: "Red flags below the cord",
        text: "Saddle anaesthesia, urinary retention and bilateral leg pain after a central herniation signal cauda equina syndrome — a surgical emergency.",
      },
      {
        title: "The slipping vertebra",
        text: "Spondylolisthesis — one vertebra sliding forward on the next, usually L5 on S1 — begins with a stress fracture of the pars in young athletes.",
      },
    ],
  },
  sacrum: {
    name: "Sacrum",
    latin: "Os sacrum",
    regionLabel: "Spine",
    count: "5 fused vertebrae",
    description:
      "Five vertebrae fused into a single wedge that transmits the entire upper-body load into the pelvis through the sacroiliac joints, completing the pelvic ring at the back.",
    facts: [
      {
        title: "The injection doorway",
        text: "The sacral hiatus at the bone's tip is the entry point for caudal epidural block — still used in children's anaesthesia and chronic pain management.",
      },
      {
        title: "Easily missed in the elderly",
        text: "Sacral insufficiency fractures in osteoporotic patients are near-invisible on plain film; persistent low-back or groin pain after minor falls warrants MRI.",
      },
      {
        title: "The roots run through it",
        text: "The anterior sacral foramina transmit the S1–S4 roots; because the sacrum completes the pelvic ring, fracturing it implies violent trauma.",
      },
    ],
  },
  coccyx: {
    name: "Coccyx",
    latin: "Os coccygis",
    regionLabel: "Spine",
    count: "3–5 fused segments",
    description:
      "Three to five rudimentary fused segments — our vestigial tail — anchoring the pelvic floor muscles and part of the anal sphincter complex.",
    facts: [
      {
        title: "Coccydynia",
        text: "Pain on sitting usually follows a fall onto the buttocks or childbirth; most cases resolve with cushioning and time.",
      },
      {
        title: "When it will not settle",
        text: "Persistent coccydynia may need a local steroid injection — and, rarely, surgical removal of the coccyx itself.",
      },
    ],
  },
  sternum: {
    name: "Sternum",
    latin: "Sternum",
    regionLabel: "Thorax",
    count: "1 bone · 3 parts",
    description:
      "The breastbone has three parts — manubrium, body and xiphoid process. It anchors the upper seven rib pairs through costal cartilage and lies directly over the heart and great vessels.",
    facts: [
      {
        title: "The angle of Louis",
        text: "The sternal angle marks the T4/T5 disc, the second rib, and the aortic arch — the landmark for counting ribs and for CPR hand placement.",
      },
      {
        title: "The biopsy site",
        text: "The sternal body is a standard bone marrow biopsy site: its cortex is thin and the marrow stays haemopoietic throughout life.",
      },
      {
        title: "A marker for the heart",
        text: "A sternal fracture from a deceleration injury flags possible myocardial contusion — troponin and ECG monitoring are routine.",
      },
    ],
  },
  ribs: {
    name: "Ribs",
    latin: "Costae",
    regionLabel: "Thorax",
    count: "24 bones · 12 pairs",
    description:
      "Twelve pairs form the thoracic cage. Ribs 1–7 are true ribs with their own cartilage to the sternum, 8–10 are false ribs sharing a cartilage arch, and 11–12 float free at the front.",
    facts: [
      {
        title: "Which ribs break",
        text: "Ribs 4–9 fracture most often. A first-rib fracture implies enormous energy transfer — look hard for associated vascular and lung injury.",
      },
      {
        title: "Flail chest",
        text: "Two or more breaks in three or more adjacent ribs creates a flail segment that moves paradoxically; these patients may need mechanical ventilation.",
      },
      {
        title: "Watch the pleura",
        text: "Rib fracture with subcutaneous emphysema — crunching under the fingers — or with breathlessness and reduced sounds signals pneumothorax or haemothorax.",
      },
    ],
  },
  clavicle: {
    name: "Clavicle",
    latin: "Clavicula",
    regionLabel: "Upper Limbs",
    count: "2 bones",
    description:
      "The S-shaped strut holding the shoulder away from the chest — the only long bone lying horizontally, and the first bone to ossify in the embryo.",
    facts: [
      {
        title: "The most-broken long bone",
        text: "Usually fractured midshaft by a fall onto the shoulder; despite the dramatic deformity, most heal well in a sling.",
      },
      {
        title: "The only true joint",
        text: "The sternoclavicular joint is the sole bony link between the upper limb and the axial skeleton; its posterior dislocation can threaten the great vessels behind it.",
      },
      {
        title: "Nothing over it",
        text: "The clavicle sits directly under the skin with the brachial plexus just beneath — a subcutaneous bone with little protection from direct blows.",
      },
    ],
  },
  scapula: {
    name: "Scapula",
    latin: "Scapula",
    regionLabel: "Upper Limbs",
    count: "2 bones",
    description:
      "The shoulder blade — a flat triangular bone whose shallow glenoid fossa forms the shoulder socket. Seventeen muscles originate from or insert onto it.",
    facts: [
      {
        title: "The winged scapula",
        text: "A scapula lifting off the ribcage signals long thoracic nerve palsy paralysing serratus anterior — a classic exam finding.",
      },
      {
        title: "A broken scapula is a warning",
        text: "Cushioned by muscle, it needs violent force to fracture. When it breaks, hunt for pneumothorax, rib fractures and spinal injury.",
      },
      {
        title: "Shallow socket, loose joint",
        text: "The glenoid covers barely a third of the humeral head — supreme mobility at the price of the body's most commonly dislocated joint.",
      },
    ],
  },
  humerus: {
    name: "Humerus",
    latin: "Humerus",
    regionLabel: "Upper Limbs",
    count: "2 bones",
    description:
      "The arm bone, running from the shoulder's ball to the hinge of the elbow. Its three fracture zones each endanger a different nerve.",
    facts: [
      {
        title: "Surgical neck → axillary nerve",
        text: "Fracture here weakens the deltoid and numbs the regimental-badge patch of skin over the shoulder.",
      },
      {
        title: "Midshaft → radial nerve",
        text: "The nerve spirals in the groove behind the bone; injury there produces wrist drop.",
      },
      {
        title: "Supracondylar in children",
        text: "The classic fall-from-the-monkey-bars fracture sits right beside the brachial artery — always check the pulse, and check it early.",
      },
    ],
  },
  radius: {
    name: "Radius",
    latin: "Radius",
    regionLabel: "Upper Limbs",
    count: "2 bones",
    description:
      "The thumb-side forearm bone. It carries the hand, and its rotation around the ulna is what lets the palm turn up and down.",
    facts: [
      {
        title: "The most common fracture in the body",
        text: "A fall onto an outstretched hand breaks the distal radius — a Colles' fracture with its classic dinner-fork deformity.",
      },
      {
        title: "Pulled elbow",
        text: "The radial head subluxes in toddlers yanked by the arm, and fractures in adults falling onto the palm.",
      },
      {
        title: "Geometry matters",
        text: "The radius carries roughly 80% of the load crossing the wrist; surgery must restore its length and tilt or rotation is lost.",
      },
    ],
  },
  ulna: {
    name: "Ulna",
    latin: "Ulna",
    regionLabel: "Upper Limbs",
    count: "2 bones",
    description:
      "The little-finger-side forearm bone — the stable hinge of the elbow, ending in the olecranon that forms the point of the elbow.",
    facts: [
      {
        title: "The point that breaks",
        text: "A fall onto the point of the elbow can fracture or avulse the olecranon through the triceps pull — active extension then fails.",
      },
      {
        title: "Do not miss Monteggia",
        text: "An ulna shaft fracture with dislocation of the radial head is easy to overlook; always examine the radial head on the X-ray.",
      },
      {
        title: "The funny bone",
        text: "The ulnar nerve curls behind the medial epicondyle — strike it for that electric jolt; injure it distally and the hand claws.",
      },
    ],
  },
  hand: {
    name: "Hand",
    latin: "Manus",
    regionLabel: "Upper Limbs",
    count: "27 bones per hand",
    description:
      "Twenty-seven bones per hand: eight carpals in two rows, five metacarpals in the palm, and fourteen phalanges — a quarter of all the bones in the body live in the two hands.",
    facts: [
      {
        title: "Snuffbox tenderness",
        text: "A scaphoid fracture risks avascular necrosis — its blood supply enters from the distal end, so a fracture can starve the proximal half.",
      },
      {
        title: "Boxer's fracture",
        text: "The fifth metacarpal neck is the commonest hand fracture from a punch; check for rotation of the little finger.",
      },
      {
        title: "The tunnel",
        text: "The median nerve passes under the flexor retinaculum with the tendons; carpal tunnel syndrome wakes patients with tingling in the thumb, index and middle fingers.",
      },
    ],
  },
  pelvis: {
    name: "Hip Bone",
    latin: "Os coxae",
    regionLabel: "Pelvis",
    count: "2 bones · 3 fused parts each",
    description:
      "Each hip bone is three childhood bones — ilium, ischium and pubis — fused at the acetabulum, the deep socket for the femoral head. The pair meets in front at the pubic symphysis and behind at the sacrum.",
    facts: [
      {
        title: "The fragility fracture",
        text: "A hip fracture is a fall from standing height in an elderly patient. Intracapsular breaks tear the retinacular blood supply, so the femoral head may die — many are treated with replacement.",
      },
      {
        title: "The dashboard injury",
        text: "A knee striking a dashboard drives the femoral head through the acetabulum; the pattern of the fracture lines dictates the surgical approach.",
      },
      {
        title: "A bucket that bleeds",
        text: "The pelvic ring springs apart at the symphysis and sacroiliac joints in disruption; the pelvis can hide litres of blood — bind it early and restore volume.",
      },
    ],
  },
  femur: {
    name: "Femur",
    latin: "Femur",
    regionLabel: "Lower Limbs",
    count: "2 bones · the longest bone",
    description:
      "The longest, strongest and heaviest bone — about a quarter of standing height — built to carry several times body weight with every step.",
    facts: [
      {
        title: "Clock is ticking on the neck",
        text: "A displaced femoral neck fracture in the young tears the retrograde blood supply; the head risks avascular necrosis unless reduced and fixed within hours.",
      },
      {
        title: "A thigh is a bucket too",
        text: "A midshaft fracture needs massive force, and the thigh compartments can hide 1–1.5 litres of blood — treat shock before the film.",
      },
      {
        title: "Trochanters as landmarks",
        text: "The greater trochanter is the entry point for intramedullary nailing; an isolated lesser-trochanter avulsion in an adult means pathological bone until proven otherwise.",
      },
    ],
  },
  patella: {
    name: "Patella",
    latin: "Patella",
    regionLabel: "Lower Limbs",
    count: "2 bones · largest sesamoids",
    description:
      "The largest sesamoid bone, embedded in the quadriceps tendon. It shields the knee joint and boosts the leverage of knee extension by roughly a third.",
    facts: [
      {
        title: "Can the leg lift?",
        text: "After a transverse fracture from a direct blow, whether the patient can straight-leg-raise tells you if the retinaculum is torn — and whether surgery is needed.",
      },
      {
        title: "It dislocates sideways",
        text: "Almost always laterally, most often in adolescent girls, tearing the medial patellofemoral ligament.",
      },
      {
        title: "The reflex hammer target",
        text: "Tapping the patellar tendon tests the L3–L4 reflex arc through the femoral nerve — the knee jerk of the neurological examination.",
      },
    ],
  },
  tibia: {
    name: "Tibia",
    latin: "Tibia",
    regionLabel: "Lower Limbs",
    count: "2 bones · second largest",
    description:
      "The shin bone — the second largest in the body, bearing nearly all of the leg's weight. Its sharp anterior border lies directly beneath the skin.",
    facts: [
      {
        title: "The open-fracture bone",
        text: "The tibia is the long bone most often fractured open: the skin over the crest offers nothing, so the ends pierce it.",
      },
      {
        title: "The march of recruits",
        text: "Tibial stress fractures — shin splints gone worse — are the overuse injury of military training and distance running.",
      },
      {
        title: "Plateau and popliteal",
        text: "A valgus blow crushes the tibial plateau and can tear the menisci; hard signs behind the knee mean popliteal artery injury until proven otherwise.",
      },
    ],
  },
  fibula: {
    name: "Fibula",
    latin: "Fibula",
    regionLabel: "Lower Limbs",
    count: "2 bones",
    description:
      "The slender splint bone at the outer side of the shin — mostly a muscle attachment, bearing only about a tenth of the leg's weight, and forming the lateral wall of the ankle mortise.",
    facts: [
      {
        title: "The Weber landmark",
        text: "Fractures of the lateral malleolus at, above or below the syndesmosis set the Weber classification that drives ankle fracture care.",
      },
      {
        title: "A nerve on the surface",
        text: "The common peroneal nerve wraps around the neck of the fibula just under the skin — a blow or fracture there causes foot drop.",
      },
      {
        title: "The spare-part bone",
        text: "Because it carries so little load, the fibula is a common donor for vascularised bone grafts elsewhere in the body.",
      },
    ],
  },
  foot: {
    name: "Foot",
    latin: "Pes",
    regionLabel: "Lower Limbs",
    count: "26 bones per foot",
    description:
      "Twenty-six bones per foot: seven tarsals, five metatarsals and fourteen phalanges, arranged in three arches that work as both shock absorber and rigid lever.",
    facts: [
      {
        title: "The fallen heel",
        text: "The calcaneus is the most commonly fractured tarsal, from falls onto the heel; because the mechanism is axial, always check the lumbar spine too.",
      },
      {
        title: "March fractures",
        text: "Metatarsal stress fractures are the classic injury of new recruits and long-distance walkers — forefoot pain with a normal first X-ray.",
      },
      {
        title: "The missed Lisfranc",
        text: "Disruption of the midfoot tarsometatarsal joint in a twisted fall is easily missed on plain film, yet needs precise alignment to save the arch.",
      },
    ],
  },
};