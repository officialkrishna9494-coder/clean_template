/**
 * =============================================================================
 * SERVICE CATALOGUE
 * =============================================================================
 * The single source for every service page, the services index, the homepage
 * grid, the header dropdown, the footer links and the sitemap.
 *
 * Adding a service here creates its page at `/{slug}` automatically — the
 * catch-all route in `app/[slug]/page.tsx` generates it statically.
 * =============================================================================
 */
import {
  Baby,
  Bone,
  Braces,
  Brush,
  HeartPulse,
  Layers,
  ShieldCheck,
  Siren,
  Smile,
  Sparkles,
  Stethoscope,
  Syringe,
  Wrench,
  Zap,
} from 'lucide-react'
import { assets } from '@/config/assets.config'
import type { Service, ServiceCategory } from '@/types/content'

export const serviceCategories: { id: ServiceCategory; label: string; description: string }[] = [
  {
    id: 'preventive',
    label: 'Preventive & Family Care',
    description: 'Routine visits that keep small problems from becoming big ones.',
  },
  {
    id: 'restorative',
    label: 'Restorative Dentistry',
    description: 'Repair damage, replace what is missing and get chewing comfortably again.',
  },
  {
    id: 'cosmetic',
    label: 'Cosmetic Dentistry',
    description: 'Treatments focused on how your smile looks, feels and photographs.',
  },
  {
    id: 'specialty',
    label: 'Specialty & Urgent Care',
    description: 'Focused treatment for children, emergencies and complex cases.',
  },
]

export const services: Service[] = [
  {
    slug: 'family-dentistry-in-austin-tx',
    title: 'Family Dentistry',
    heading: 'Family Dentistry in Austin, TX',
    summary: 'One practice for every age — from a toddler’s first visit to your grandparents’ dentures.',
    intro:
      'Bee Cave Family Dentistry is dedicated to providing compassionate, comprehensive and high-quality dental care for your whole family. Our team helps patients of every age achieve a lifetime of oral health with care tailored to their individual needs.',
    body: [
      'Family dentistry means you do not need a different office for every member of your household. We treat children, teens, adults and seniors under one roof, with the same team, the same records and the same familiar faces — which makes scheduling far simpler and appointments far less stressful.',
      'Every visit starts with listening. We review your history, examine your teeth and gums, take any imaging we need, and then explain exactly what we see and what your options are — before any treatment begins. No pressure, no jargon, no surprises on the bill.',
    ],
    benefits: [
      'Back-to-back family appointments so one trip covers everyone',
      'Digital X-rays with a fraction of the radiation of traditional film',
      'Preventive plans built around each patient’s actual risk factors',
      'Clear treatment estimates before we begin any work',
      'A calm, unhurried environment for anxious patients',
    ],
    process: [
      { title: 'Comprehensive exam', description: 'A full assessment of teeth, gums, bite and jaw joints, plus oral cancer screening.' },
      { title: 'Digital imaging', description: 'Low-dose X-rays and intraoral photos so you can see exactly what we see.' },
      { title: 'Personalised plan', description: 'A written plan that separates what is urgent from what can wait.' },
      { title: 'Ongoing care', description: 'A recall schedule matched to your risk — for most patients, twice a year.' },
    ],
    faqs: [
      {
        question: 'How often should my family have a checkup?',
        answer:
          'Most patients do well with a cleaning and exam every six months. If you have gum disease, a high cavity rate or a medical condition that affects oral health, we may recommend three- or four-month intervals.',
      },
      {
        question: 'Do you see children and adults on the same day?',
        answer:
          'Yes. We regularly book families into consecutive appointments so one trip covers everybody. Let us know when you call and we will arrange it.',
      },
    ],
    icon: Stethoscope,
    image: assets.fallback.service,
    category: 'preventive',
    featured: true,
    seo: {
      title: 'Family Dentistry in Austin, TX',
      description:
        'Comprehensive family dentistry in Bee Cave and Austin, TX. Gentle checkups, cleanings and complete dental care for every age at Bee Cave Family Dentistry.',
    },
  },
  {
    slug: 'teeth-cleaning-in-austin-tx',
    title: 'Teeth Cleaning',
    heading: 'Teeth Cleaning in Austin, TX',
    summary: 'Gentle, thorough hygiene visits that stop plaque before it becomes a cavity.',
    intro:
      'Our expert dental hygienists provide thorough yet gentle teeth cleanings that protect your teeth from plaque buildup and help prevent cavities and gum disease.',
    body: [
      'Brushing and flossing remove most plaque, but not all of it. What stays behind hardens into tartar, which only a professional cleaning can remove. A hygiene visit every six months is the single most cost-effective thing you can do for your teeth.',
      'Our hygienists take their time. We scale away hardened deposits above and below the gumline, polish the enamel, floss between every contact, and finish with a fluoride treatment where it will help. If your gums bleed or feel tender, tell us — that is information, not a judgement.',
    ],
    benefits: [
      'Removes tartar that brushing physically cannot reach',
      'Catches decay and gum disease while treatment is still simple',
      'Reduces staining from coffee, tea, wine and tobacco',
      'Fresher breath that lasts',
      'Lower lifetime dental costs — prevention is far cheaper than repair',
    ],
    process: [
      { title: 'Assessment', description: 'We measure gum pockets and check for bleeding, recession and inflammation.' },
      { title: 'Scaling', description: 'Hardened tartar is removed from above and below the gumline.' },
      { title: 'Polish', description: 'A fine paste lifts surface stains and leaves enamel smooth.' },
      { title: 'Prevention', description: 'Fluoride where indicated, plus specific technique coaching for your problem areas.' },
    ],
    faqs: [
      {
        question: 'Does a cleaning hurt?',
        answer:
          'For most patients it is completely comfortable. If your gums are inflamed it can be tender, and we can use a topical anaesthetic. Tell your hygienist — we will adjust.',
      },
      {
        question: 'My gums bleed when I floss. Should I stop?',
        answer:
          'No — bleeding is usually a sign of inflammation from plaque, and it typically resolves within a week or two of consistent flossing. If it persists, book an exam.',
      },
    ],
    icon: Sparkles,
    image: assets.fallback.service,
    category: 'preventive',
    featured: true,
    seo: {
      title: 'Teeth Cleaning in Austin, TX',
      description:
        'Gentle professional teeth cleaning in Bee Cave and Austin, TX. Our hygienists remove plaque and tartar to prevent cavities and gum disease.',
    },
  },
  {
    slug: 'dental-fillings-in-austin-tx',
    title: 'Dental Fillings',
    heading: 'Dental Fillings in Austin, TX',
    summary: 'Tooth-coloured composite fillings that restore strength and disappear into your smile.',
    intro:
      'When decay reaches the inside of a tooth, a filling stops it spreading and restores the tooth’s shape and strength. We use tooth-coloured composite that blends with your natural enamel.',
    body: [
      'Modern composite fillings bond directly to tooth structure, which means we remove less healthy tooth than the old amalgam technique required. They are shaded to match the tooth beside them, so nobody can tell where the filling starts.',
      'Most fillings are a single visit of well under an hour. We numb the area thoroughly, remove the decay, place and cure the composite in layers, then adjust the bite until it feels exactly right before you leave.',
    ],
    benefits: [
      'Shade-matched to your natural tooth colour',
      'Bonds to the tooth, so less healthy structure is removed',
      'Mercury-free',
      'Completed in a single appointment',
      'Sealed margins that resist new decay at the edges',
    ],
    faqs: [
      {
        question: 'How long do composite fillings last?',
        answer:
          'With good hygiene, a well-placed composite filling commonly lasts seven to ten years or more. Grinding, large fillings and a high-sugar diet shorten that.',
      },
      {
        question: 'Can I eat straight afterwards?',
        answer:
          'Composite sets hard immediately, so you can eat as soon as the numbness wears off — usually one to three hours.',
      },
    ],
    icon: Wrench,
    image: assets.fallback.service,
    category: 'restorative',
    featured: true,
    seo: {
      title: 'Dental Fillings in Austin, TX',
      description:
        'Tooth-coloured, mercury-free dental fillings in Bee Cave and Austin, TX. Single-visit composite restorations at Bee Cave Family Dentistry.',
    },
  },
  {
    slug: 'pediatric-dentistry-in-austin-tx',
    title: 'Pediatric Dentistry',
    heading: 'Pediatric Dentistry in Austin, TX',
    summary: 'Fear-free visits that turn a routine checkup into an adventure.',
    intro:
      'We specialise in turning routine checkups into fun, fear-free adventures. Our team works with children of all ages — from toddlers getting their first tooth to teens navigating orthodontic care.',
    body: [
      'How a child feels about the dentist at six tends to be how they feel about it at sixty. That is why we take the extra minutes: showing instruments before we use them, explaining each step in words a child understands, and never rushing a nervous patient.',
      'Alongside cleanings and exams, we place sealants on newly erupted molars, apply fluoride varnish, monitor how permanent teeth are coming through, and flag orthodontic issues early — when they are far simpler and cheaper to correct.',
    ],
    benefits: [
      'A gentle, unhurried approach for first visits',
      'Sealants and fluoride to prevent cavities before they start',
      'Early orthodontic assessment and monitoring',
      'Parents welcome in the room throughout',
      'Practical coaching on brushing, diet and thumb-sucking',
    ],
    faqs: [
      {
        question: 'When should my child first see a dentist?',
        answer:
          'By their first birthday, or within six months of the first tooth appearing. The early visits are short, friendly and mostly about building comfort.',
      },
      {
        question: 'My child is terrified. What can you do?',
        answer:
          'Tell us before the appointment. We schedule extra time, start with a no-treatment "meet the chair" visit if needed, and go entirely at your child’s pace.',
      },
    ],
    icon: Baby,
    image: assets.fallback.service,
    category: 'specialty',
    featured: true,
    seo: {
      title: 'Pediatric Dentistry in Austin, TX',
      description:
        'Kid-friendly pediatric dentistry in Bee Cave and Austin, TX. Gentle checkups, sealants and fluoride that make children feel at ease.',
    },
  },
  {
    slug: 'cosmetic-dentistry-in-austin-tx',
    title: 'Cosmetic Dentistry',
    heading: 'Cosmetic Dentistry in Austin, TX',
    summary: 'Whitening, veneers, bonding and smile design, planned around your face.',
    intro:
      'Our cosmetic dentistry in Austin, TX focuses on how your smile looks and how it makes you feel. Whether that means a single chipped tooth or a full smile makeover, we plan the result with you before we start.',
    body: [
      'Cosmetic dentistry is not one treatment — it is a set of them. Whitening lifts discolouration, bonding repairs chips, veneers reshape and resurface, and orthodontics corrects alignment. Most makeovers combine two or three.',
      'We start with photographs and a conversation about what specifically bothers you. Then we show you what is achievable, what it costs, and how long it lasts — so the decision is genuinely yours.',
    ],
    benefits: [
      'Treatment planned from photographs of your actual smile',
      'Options at several price points, clearly explained',
      'Natural-looking materials, shade-matched in daylight',
      'Combined plans that sequence treatments in the right order',
      'Results designed to suit your face, not a catalogue',
    ],
    faqs: [
      {
        question: 'Where should I start?',
        answer:
          'A consultation. We photograph your smile, listen to what you would change, and lay out the realistic options — from a single visit of whitening to a staged makeover.',
      },
    ],
    icon: Smile,
    image: assets.fallback.service,
    category: 'cosmetic',
    featured: true,
    seo: {
      title: 'Cosmetic Dentistry in Austin, TX',
      description:
        'Expert cosmetic dentistry in Bee Cave and Austin, TX — whitening, veneers, bonding and full smile makeovers at Bee Cave Family Dentistry.',
    },
  },
  {
    slug: 'teeth-whitening-in-austin-tx',
    title: 'Teeth Whitening',
    heading: 'Teeth Whitening in Austin, TX',
    summary: 'A safe, professional lift in brightness — often in a single visit.',
    intro:
      'Professional teeth whitening offers a safe, effective way to lift discolouration and reveal a noticeably brighter, more radiant smile in just one visit.',
    body: [
      'Coffee, tea, red wine, tobacco and simple ageing all dull enamel over time. Professional whitening uses a stronger, carefully controlled gel than anything sold over the counter, applied with your gums properly protected — which is what makes it both faster and safer.',
      'We offer in-office whitening for a same-day result, and custom-fitted take-home trays for a gradual lift you control. Many patients start in the chair and maintain at home.',
    ],
    benefits: [
      'Visible results after a single in-office visit',
      'Custom trays that fit your teeth exactly, so gel stays where it should',
      'Gum protection that over-the-counter kits cannot provide',
      'Supervised by a dentist, with sensitivity managed as we go',
      'Complimentary for new patients with their first cleaning and exam',
    ],
    faqs: [
      {
        question: 'Will whitening make my teeth sensitive?',
        answer:
          'Some patients get short-lived sensitivity for a day or two. We use desensitising agents and can lower the concentration or shorten the sessions if you are prone to it.',
      },
      {
        question: 'Does whitening work on crowns or veneers?',
        answer:
          'No — whitening only lifts natural enamel. If you have restorations in your smile line, we will plan the shade so everything matches once whitening is complete.',
      },
    ],
    icon: Zap,
    image: assets.fallback.service,
    category: 'cosmetic',
    featured: true,
    seo: {
      title: 'Teeth Whitening in Austin, TX',
      description:
        'Professional teeth whitening in Bee Cave and Austin, TX. Safe, dentist-supervised in-office and take-home whitening with visible results.',
    },
  },
  {
    slug: 'veneers-in-austin-tx',
    title: 'Veneers',
    heading: 'Veneers in Austin, TX',
    summary: 'Custom porcelain shells that reshape, resurface and brighten in one step.',
    intro:
      'Veneers are thin, custom-made porcelain shells bonded to the front of your teeth. They correct shape, size, colour and small alignment issues all at once.',
    body: [
      'Where whitening changes only colour and orthodontics changes only position, veneers change everything about the visible surface — which makes them the fastest route to a dramatic change.',
      'We design your veneers from photographs and models, so you approve the shape and shade before anything is bonded permanently. Porcelain resists staining far better than natural enamel, so the result stays bright.',
    ],
    benefits: [
      'Corrects colour, shape, chips and minor gaps together',
      'Stain-resistant porcelain that holds its brightness',
      'Designed and approved before permanent placement',
      'Conservative preparation — we remove as little enamel as possible',
      'Typically completed in two visits',
    ],
    faqs: [
      {
        question: 'How long do veneers last?',
        answer:
          'Well-made porcelain veneers commonly last ten to fifteen years or more. Avoiding ice, fingernails and grinding — or wearing a night guard if you grind — extends that considerably.',
      },
    ],
    icon: Layers,
    image: assets.fallback.service,
    category: 'cosmetic',
    seo: {
      title: 'Veneers in Austin, TX',
      description:
        'Custom porcelain veneers in Bee Cave and Austin, TX. Correct chips, gaps, shape and colour with natural-looking veneers.',
    },
  },
  {
    slug: 'invisalign-in-austin-tx',
    title: 'Invisalign',
    heading: 'Invisalign in Austin, TX',
    summary: 'Straighten misaligned teeth discreetly, without a bracket in sight.',
    intro:
      'We offer Invisalign clear aligners — an orthodontic solution that lets you straighten misaligned teeth discreetly and comfortably, without traditional metal braces.',
    body: [
      'Invisalign uses a sequence of clear, removable aligners, each one moving your teeth a fraction further than the last. Because they are removable, you brush, floss and eat exactly as you always have.',
      'Treatment starts with a digital scan and a simulation of your finished result, so you see where you are heading before you commit. Most adult cases finish in twelve to eighteen months, with check-ins every six to eight weeks.',
    ],
    benefits: [
      'Virtually invisible in everyday conversation',
      'Removable for meals, brushing and flossing',
      'No wire pokes, no emergency bracket repairs',
      'A digital preview of your result before you start',
      'Fewer, shorter appointments than fixed braces',
    ],
    process: [
      { title: 'Digital scan', description: 'A quick intraoral scan replaces messy impressions.' },
      { title: 'Treatment preview', description: 'You see a simulation of the finished alignment before committing.' },
      { title: 'Wear your aligners', description: '20–22 hours a day, changing to the next set roughly weekly.' },
      { title: 'Retain the result', description: 'A retainer holds the new position — this part is not optional.' },
    ],
    faqs: [
      {
        question: 'How long does Invisalign take?',
        answer:
          'Simple crowding can finish in six months; the average adult case runs twelve to eighteen. We will give you a specific estimate at your consultation.',
      },
      {
        question: 'Does it hurt?',
        answer:
          'You will feel pressure and mild tenderness for a day or two after each new set. Most patients describe it as noticeably milder than braces.',
      },
    ],
    icon: Braces,
    image: assets.fallback.service,
    category: 'cosmetic',
    featured: true,
    seo: {
      title: 'Invisalign in Austin, TX',
      description:
        'Invisalign clear aligners in Bee Cave and Austin, TX. Straighten your teeth discreetly with removable aligners and a digital treatment preview.',
    },
  },
  {
    slug: 'dental-crowns-in-austin-tx',
    title: 'Dental Crowns',
    heading: 'Dental Crowns in Austin, TX',
    summary: 'Same-day CEREC® crowns that protect a weakened tooth and match the ones beside it.',
    intro:
      'Our dental crowns solve issues with damaged, decayed or weakened teeth. A crown transforms a tooth’s shape, size, strength and appearance — letting you regain confidence in your smile.',
    body: [
      'Dental crowns are custom-made coverings that protect and repair damaged or weakened teeth. Ours are made from tooth-coloured porcelain that blends seamlessly with the teeth beside them.',
      'Using CEREC® technology we design, mill and place a ceramic crown in a single visit. There is no temporary crown to look after, no second appointment, and no two-week wait — you leave with your permanent crown already fitted.',
    ],
    benefits: [
      'Designed, milled and fitted in one appointment with CEREC®',
      'No temporary crown and no second visit',
      'Tooth-coloured porcelain, shade-matched to your smile',
      'Restores full chewing strength to a cracked or heavily filled tooth',
      'Protects a tooth after root canal treatment',
    ],
    process: [
      { title: 'Prepare the tooth', description: 'Decay and any failing filling are removed and the tooth is shaped.' },
      { title: 'Digital scan', description: 'A 3D scan captures the preparation and your bite in seconds.' },
      { title: 'Design and mill', description: 'The crown is designed on-screen and milled from a ceramic block while you wait.' },
      { title: 'Bond and adjust', description: 'We bond it in place and refine the bite until it feels like your own tooth.' },
    ],
    faqs: [
      {
        question: 'Do I really get the crown the same day?',
        answer:
          'Yes. With CEREC® we design and mill it in the practice while you wait, then bond it at the same visit. Plan for roughly two hours.',
      },
      {
        question: 'How long does a crown last?',
        answer:
          'Ten to fifteen years is typical, and many last considerably longer. The tooth underneath still needs brushing and flossing — crowns do not get cavities, but the margin can.',
      },
    ],
    icon: ShieldCheck,
    image: assets.fallback.service,
    category: 'restorative',
    featured: true,
    seo: {
      title: 'Dental Crowns in Austin, TX',
      description:
        'Same-day CEREC® dental crowns in Bee Cave and Austin, TX. Tooth-coloured porcelain crowns designed, milled and fitted in a single visit.',
    },
  },
  {
    slug: 'dental-bridge-in-austin-tx',
    title: 'Dental Bridges',
    heading: 'Dental Bridges in Austin, TX',
    summary: 'Close the gap left by a missing tooth and chew confidently again.',
    intro:
      'We offer high-quality dental bridges to replace missing teeth and restore the appearance of your smile.',
    body: [
      'A dental bridge is a restorative appliance that replaces one or more missing teeth. It consists of two or more crowns on the teeth either side of the gap, with one or more false teeth suspended in between.',
      'Bridges restore both the function and the aesthetics of your teeth, letting you chew, speak and smile with confidence. They also stop the neighbouring teeth drifting into the space — which is what causes bite problems years later.',
    ],
    benefits: [
      'Replaces missing teeth without surgery',
      'Restores full chewing and clear speech',
      'Stops adjacent teeth tilting into the gap',
      'Supports the shape of your cheeks and lips',
      'Typically completed in two visits',
    ],
    faqs: [
      {
        question: 'Bridge or implant?',
        answer:
          'An implant preserves the neighbouring teeth and lasts longer, but takes months and costs more. A bridge is faster and less invasive. We will walk you through both for your specific gap.',
      },
    ],
    icon: Bone,
    image: assets.fallback.service,
    category: 'restorative',
    seo: {
      title: 'Dental Bridges in Austin, TX',
      description:
        'Custom dental bridges in Bee Cave and Austin, TX. Replace missing teeth, restore your bite and complete your smile.',
    },
  },
  {
    slug: 'dentures-in-austin-tx',
    title: 'Dentures',
    heading: 'Dentures in Austin, TX',
    summary: 'Comfortable, natural-looking full and partial dentures, fitted properly.',
    intro:
      'Whether you are missing a few teeth or an entire arch, modern dentures restore your ability to eat, speak and smile — and today’s materials look far more natural than the ones you remember.',
    body: [
      'We make both full dentures, which replace a complete upper or lower arch, and partial dentures, which fill several gaps while your remaining natural teeth stay in place.',
      'Fit is everything. We take our time over impressions, try-ins and adjustments, because a denture that is nearly right is a denture you will not wear. Expect a few appointments — and expect us to keep refining until it is genuinely comfortable.',
    ],
    benefits: [
      'Full and partial options for any pattern of tooth loss',
      'Natural-looking teeth shaded and shaped to suit your face',
      'Careful, staged fitting with try-in appointments',
      'Restores chewing, speech and facial support',
      'Relines and repairs handled in-house',
    ],
    faqs: [
      {
        question: 'How long until dentures feel normal?',
        answer:
          'Most patients adapt over two to four weeks. Speech settles first, then chewing. Come back for adjustments — small sore spots are normal and quick to fix.',
      },
    ],
    icon: Smile,
    image: assets.fallback.service,
    category: 'restorative',
    seo: {
      title: 'Dentures in Austin, TX',
      description:
        'Full and partial dentures in Bee Cave and Austin, TX. Comfortable, natural-looking tooth replacement, carefully fitted and adjusted.',
    },
  },
  {
    slug: 'root-canal-in-austin-tx',
    title: 'Root Canal',
    heading: 'Root Canal Treatment in Austin, TX',
    summary: 'Relieve the pain of an infected tooth and keep the tooth itself.',
    intro:
      'Root canal therapy treats teeth affected by infection or abscess. It removes the infected tissue, relieves the pain and preserves your natural tooth — avoiding the need for extraction.',
    body: [
      'The pulp inside a tooth can become infected through deep decay, a crack or trauma. Left alone, that infection spreads into the bone and becomes an abscess. A root canal removes the infected tissue, disinfects the canals and seals them.',
      'Root canals have an unfair reputation. With modern anaesthesia the procedure itself feels much like having a filling — and it relieves pain rather than causing it. Most teeth are then restored with a crown to protect them long-term.',
    ],
    benefits: [
      'Ends the pain of an infected or abscessed tooth',
      'Saves the natural tooth instead of extracting it',
      'Prevents the infection spreading into the jaw',
      'Comfortable under modern local anaesthesia',
      'Restored with a crown for long-term strength',
    ],
    faqs: [
      {
        question: 'Is a root canal painful?',
        answer:
          'The infection is painful; the treatment relieves it. With proper anaesthesia the procedure itself feels much like a filling. Expect some tenderness for a few days afterwards.',
      },
      {
        question: 'Will I need a crown afterwards?',
        answer:
          'Usually, yes — especially on back teeth. A treated tooth becomes more brittle, and a crown protects it from fracturing.',
      },
    ],
    icon: HeartPulse,
    image: assets.fallback.service,
    category: 'restorative',
    seo: {
      title: 'Root Canal in Austin, TX',
      description:
        'Gentle root canal treatment in Bee Cave and Austin, TX. Relieve pain from an infected tooth and save your natural tooth.',
    },
  },
  {
    slug: 'teeth-extraction-in-austin-tx',
    title: 'Tooth Extraction',
    heading: 'Tooth Extraction in Austin, TX',
    summary: 'Careful, comfortable removal when a tooth genuinely cannot be saved.',
    intro:
      'Extraction is always our last resort — but when a tooth is beyond repair, removing it promptly protects the teeth around it and ends the pain.',
    body: [
      'We extract teeth that are severely decayed, fractured below the gumline, badly infected, or crowding the arch ahead of orthodontic treatment. Wisdom teeth that cannot erupt cleanly are a common case.',
      'You will be thoroughly numb before we begin, and we will talk you through each step. Afterwards you get clear written aftercare, our direct number, and a plan for replacing the tooth if that is appropriate.',
    ],
    benefits: [
      'Thorough local anaesthesia — you should feel pressure, not pain',
      'Simple and surgical extractions handled in-house',
      'Clear written aftercare and a follow-up check',
      'Same-day appointments for acute pain',
      'A replacement plan discussed before we start',
    ],
    faqs: [
      {
        question: 'How long is recovery?',
        answer:
          'Most of the discomfort settles within two to three days, and the socket closes over in a couple of weeks. Avoid smoking, straws and vigorous rinsing for the first 48 hours.',
      },
    ],
    icon: Syringe,
    image: assets.fallback.service,
    category: 'specialty',
    seo: {
      title: 'Tooth Extraction in Austin, TX',
      description:
        'Comfortable tooth extraction in Bee Cave and Austin, TX. Simple and surgical extractions with clear aftercare and same-day availability.',
    },
  },
  {
    slug: 'emergency-dentistry-in-austin-tx',
    title: 'Emergency Dentistry',
    heading: 'Emergency Dentistry in Austin, TX',
    summary: 'Fast, reliable relief when something goes wrong — call us and we will make room.',
    intro:
      'Dental emergencies do not wait for a convenient day. We keep space in the schedule for urgent care, so call us as soon as something goes wrong.',
    body: [
      'Severe toothache, a knocked-out or broken tooth, a lost crown or filling, swelling, or bleeding that will not stop — all of these are worth calling about immediately. Fast treatment usually means simpler treatment.',
      'If a permanent tooth has been knocked out, handle it by the crown only, rinse it gently, and if you can, put it back in the socket or in milk. Then call us straight away — the first hour matters enormously.',
    ],
    benefits: [
      'Same-day appointments held open for urgent cases',
      'Immediate pain relief as the first priority',
      'Treatment for broken teeth, lost crowns and abscesses',
      'Clear guidance over the phone before you arrive',
      'Follow-up care planned once the emergency is stabilised',
    ],
    faqs: [
      {
        question: 'What counts as a dental emergency?',
        answer:
          'Severe or worsening pain, facial swelling, a knocked-out or fractured tooth, uncontrolled bleeding, or trauma to the jaw. If you are unsure, call — we would far rather hear from you early.',
      },
      {
        question: 'What do I do with a knocked-out tooth?',
        answer:
          'Hold it by the crown, never the root. Rinse gently with milk or saline, reseat it in the socket if you can, or keep it in milk. Get to us within the hour if at all possible.',
      },
    ],
    icon: Siren,
    image: assets.fallback.service,
    category: 'specialty',
    featured: true,
    seo: {
      title: 'Emergency Dentistry in Austin, TX',
      description:
        'Fast, reliable emergency dentistry in Bee Cave and Austin, TX. Same-day appointments for toothache, broken teeth and dental trauma.',
    },
  },
  {
    slug: 'dental-sealants-in-austin-tx',
    title: 'Dental Sealants',
    heading: 'Dental Sealants in Austin, TX',
    summary: 'A thin protective coating that seals out decay on newly erupted molars.',
    intro:
      'Sealants are a quick, painless coating painted into the deep grooves of the back teeth, where a toothbrush bristle simply cannot reach.',
    body: [
      'The chewing surfaces of molars are covered in narrow pits and fissures that trap food and plaque. Sealing them is one of the most effective preventive measures in dentistry, particularly for children in the years right after their permanent molars come through.',
      'Application takes minutes, involves no drilling and no anaesthetic, and we check the sealants at every recall visit — topping them up if they wear.',
    ],
    benefits: [
      'Dramatically reduces decay in the grooves of back teeth',
      'Painless, with no drilling and no injection',
      'Applied in minutes at a routine visit',
      'Checked and maintained at every recall',
      'Often covered in full by dental insurance for children',
    ],
    icon: Brush,
    image: assets.fallback.service,
    category: 'preventive',
    seo: {
      title: 'Dental Sealants in Austin, TX',
      description:
        'Protective dental sealants in Bee Cave and Austin, TX. A fast, painless way to prevent decay on children’s permanent molars.',
    },
  },
]

/** Fast lookup used by the dynamic service route. */
export const servicesBySlug = new Map(services.map((service) => [service.slug, service]))

export function getService(slug: string): Service | undefined {
  return servicesBySlug.get(slug)
}

export const featuredServices = services.filter((service) => service.featured)

export function servicesByCategory(category: ServiceCategory): Service[] {
  return services.filter((service) => service.category === category)
}
