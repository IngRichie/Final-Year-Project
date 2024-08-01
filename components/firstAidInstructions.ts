const firstAidInstructions = [
    {
      id: 1,
      title: "Cuts and Scrapes",
      description: `
        1. Wash your hands with soap and water.
        2. Stop the bleeding by applying gentle pressure with a clean cloth or bandage.
        3. Clean the cut with water and mild soap.
        4. Apply an antibiotic ointment to prevent infection.
        5. Cover the wound with a sterile bandage.
        6. Change the bandage daily or whenever it gets wet or dirty.
        7. Watch for signs of infection such as redness, swelling, or pus.
      `,
    },
    {
      id: 2,
      title: "Burns",
      description: `
        1. Cool the burn under running water for at least 10 minutes.
        2. Remove any tight items, such as rings or clothing, from the burned area.
        3. Apply a clean, cool cloth to the burn.
        4. Do not break any blisters that may form.
        5. Apply a moisturizing lotion or aloe vera gel to soothe the skin.
        6. Cover the burn with a sterile, non-stick bandage.
        7. Seek medical attention for severe burns or if the burn area is large.
      `,
    },
    {
      id: 3,
      title: "Choking",
      description: `
        1. Encourage the person to cough to dislodge the object.
        2. If the person can't cough, speak, or breathe, perform the Heimlich maneuver.
        3. Stand behind the person and wrap your arms around their waist.
        4. Make a fist with one hand and place it above the person's navel.
        5. Grasp the fist with your other hand and give quick, upward thrusts.
        6. Repeat the thrusts until the object is expelled.
        7. Seek emergency medical help if the person is unconscious or the object can't be removed.
      `,
    },
    {
      id: 4,
      title: "Nosebleeds",
      description: `
        1. Sit up straight and lean forward slightly.
        2. Pinch the soft part of your nose with your thumb and index finger.
        3. Hold your nose for 5 to 10 minutes while breathing through your mouth.
        4. Apply a cold compress to the bridge of your nose to reduce blood flow.
        5. After the bleeding stops, avoid blowing your nose for a few hours.
        6. If the bleeding doesn't stop after 20 minutes, seek medical attention.
      `,
    },
    {
      id: 5,
      title: "Sprains",
      description: `
        1. Rest the injured limb and avoid putting weight on it.
        2. Apply ice to the injured area for 15-20 minutes every hour to reduce swelling.
        3. Compress the sprain with an elastic bandage to provide support.
        4. Elevate the injured limb above the level of your heart to reduce swelling.
        5. Take over-the-counter pain relievers if needed.
        6. Seek medical attention if you suspect a fracture or if the pain and swelling persist.
      `,
    },
    {
      id: 6,
      title: "Shock",
      description: `
        1. Lay the person down and elevate their legs if possible.
        2. Keep the person warm and comfortable.
        3. Do not give the person anything to eat or drink.
        4. Call emergency services immediately.
        5. Monitor the person's breathing and pulse until help arrives.
      `,
    },
    {
      id: 7,
      title: "Allergic Reactions",
      description: `
        1. Administer an antihistamine if the person is conscious and able to swallow.
        2. Use an epinephrine auto-injector (EpiPen) if available and the reaction is severe.
        3. Call emergency services immediately.
        4. Keep the person calm and monitor their breathing.
        5. If the person loses consciousness, start CPR if necessary.
      `,
    },
    {
      id: 8,
      title: "Fractures",
      description: `
        1. Immobilize the injured area using a splint or padding.
        2. Avoid moving the affected limb.
        3. Apply ice packs to reduce swelling.
        4. Elevate the injured area if possible.
        5. Seek medical attention immediately.
      `,
    },
    {
      id: 9,
      title: "Heat Exhaustion",
      description: `
        1. Move the person to a cool, shaded area.
        2. Loosen or remove excess clothing.
        3. Offer cool water to drink slowly.
        4. Apply cool, wet cloths to the skin.
        5. Fan the person to promote cooling.
        6. Seek medical attention if symptoms worsen.
      `,
    },
    {
      id: 10,
      title: "Insect Bites and Stings",
      description: `
        1. Remove the stinger if present by scraping it off with a flat object.
        2. Wash the area with soap and water.
        3. Apply a cold pack to reduce swelling.
        4. Apply an antihistamine cream to relieve itching.
        5. Monitor for signs of an allergic reaction.
        6. Seek medical attention if the person shows signs of a severe reaction.
      `,
    },
    {
      id: 11,
      title: "Poisoning",
      description: `
        1. Call Poison Control or emergency services immediately.
        2. Do not induce vomiting unless instructed by a professional.
        3. Remove any remaining poison from the mouth if possible.
        4. Provide information about the poison to the medical personnel.
        5. Keep the person calm and monitor their condition.
      `,
    },
    {
      id: 12,
      title: "Hypothermia",
      description: `
        1. Move the person to a warm environment.
        2. Remove any wet clothing and replace with dry, warm clothing.
        3. Wrap the person in blankets or towels.
        4. Offer warm drinks if the person is conscious and able to swallow.
        5. Avoid direct heat such as heating pads or hot water bottles.
        6. Seek emergency medical help immediately.
      `,
    },
    {
      id: 13,
      title: "Seizures",
      description: `
        1. Clear the area around the person to prevent injury.
        2. Do not restrain the person or put anything in their mouth.
        3. Place a soft item under their head and turn them onto their side.
        4. Time the seizure duration.
        5. Stay with the person until the seizure ends and they are fully awake.
        6. Call emergency services if the seizure lasts more than 5 minutes or if the person is injured.
      `,
    },
    {
      id: 14,
      title: "Asthma Attack",
      description: `
        1. Help the person sit up and stay calm.
        2. Assist with using their inhaler, if available.
        3. Monitor their breathing and comfort them.
        4. If symptoms don't improve after the inhaler, call emergency services.
        5. Encourage slow, deep breaths while waiting for help.
      `,
    },
    {
      id: 15,
      title: "Diabetic Emergency",
      description: `
        1. If the person is conscious, give them a sugary drink or food.
        2. If they are unconscious, do not give anything by mouth.
        3. Call emergency services immediately.
        4. Monitor their breathing and pulse.
        5. Be prepared to administer CPR if necessary.
      `,
    },
    {
      id: 16,
      title: "Heart Attack",
      description: `
        1. Call emergency services immediately.
        2. Have the person sit down and stay calm.
        3. Loosen tight clothing and help them take any prescribed heart medication.
        4. If unconscious and not breathing, begin CPR.
        5. Keep monitoring the person's condition until help arrives.
      `,
    },
    {
      id: 17,
      title: "Stroke",
      description: `
        1. Call emergency services immediately.
        2. Note the time when symptoms started.
        3. Lay the person down with their head elevated slightly.
        4. Keep the person calm and monitor their condition.
        5. Do not give them anything to eat or drink.
      `,
    },
    {
      id: 18,
      title: "Electric Shock",
      description: `
        1. Do not touch the person if they are still in contact with the electrical source.
        2. Turn off the power source if possible.
        3. Call emergency services immediately.
        4. If safe, begin CPR if the person is not breathing or unconscious.
        5. Cover any burns with a sterile dressing.
        6. Monitor the person until help arrives.
      `,
    },
    {
      id: 19,
      title: "Drowning",
      description: `
        1. Call emergency services immediately.
        2. Remove the person from the water, being cautious of your own safety.
        3. Check for breathing and pulse.
        4. Begin CPR if the person is not breathing or unconscious.
        5. Keep the person warm and monitor their condition.
        6. Continue CPR until medical help arrives.
      `,
    },
    {
      id: 20,
      title: "Head Injury",
      description: `
        1. Keep the person still and calm.
        2. Apply a cold pack to the injured area to reduce swelling.
        3. Monitor for signs of concussion such as confusion or loss of consciousness.
        4. Call emergency services if the injury is severe or symptoms worsen.
        5. Avoid moving the person if a neck or spine injury is suspected.
      `,
    },
  ];
  
  export default firstAidInstructions;
  