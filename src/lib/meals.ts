export type MealType = 'Breakfast' | 'Lunch' | 'Dinner';
export type Diet = 'Omnivore' | 'Pescatarian' | 'Vegetarian' | 'Vegan';

export type Meal = {
  type: MealType;
  name: string;
  desc: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
};

export type DayPlan = { day: string; meals: Meal[] };

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// --- Shared meals (vegan-safe — work for everyone) ---
const oats: Meal = {
  type: 'Breakfast',
  name: 'Maple Oat Porridge with Strawberries',
  desc: 'Creamy oats simmered in lactose-free milk, topped with fresh berries and a drizzle of maple.',
  tags: ['Low FODMAP', 'GF-Optional', 'Vegan'],
  ingredients: ['½ cup rolled oats', '1 cup lactose-free or almond milk', '1 tbsp maple syrup', '6 strawberries, sliced', '1 tbsp pumpkin seeds', 'Pinch of cinnamon'],
  steps: ['Combine oats and milk in a small pot over medium heat.', 'Stir gently for 5 minutes until thick and creamy.', 'Pour into a bowl, top with strawberries, seeds and cinnamon.', 'Drizzle with maple syrup and serve warm.'],
};

const chiaBowl: Meal = {
  type: 'Breakfast',
  name: 'Chia Pudding with Kiwi & Coconut',
  desc: 'Overnight chia in vanilla almond milk, layered with kiwi and toasted coconut flakes.',
  tags: ['Low FODMAP', 'No-Cook', 'Vegan'],
  ingredients: ['3 tbsp chia seeds', '1 cup almond milk', '1 tsp vanilla extract', '1 tsp maple syrup', '1 kiwi, sliced', '1 tbsp coconut flakes'],
  steps: ['Whisk chia, almond milk, vanilla and maple in a jar.', 'Refrigerate at least 4 hours or overnight.', 'Stir, spoon into a bowl, top with kiwi and coconut.'],
};

const quinoaBowl: Meal = {
  type: 'Lunch',
  name: 'Mediterranean Quinoa Bowl',
  desc: 'Fluffy quinoa with roasted zucchini, cherry tomatoes, olives and a lemon-herb dressing.',
  tags: ['Low FODMAP', 'GF', 'Vegan'],
  ingredients: ['¾ cup cooked quinoa', '1 small zucchini, diced', '6 cherry tomatoes', '8 black olives', '2 tbsp olive oil', '1 tbsp lemon juice', 'Fresh basil'],
  steps: ['Roast zucchini in olive oil at 200°C for 15 minutes.', 'Whisk lemon juice, oil and torn basil.', 'Toss quinoa, zucchini, tomatoes and olives.', 'Drizzle dressing over and serve.'],
};

const riceNoodleStirFry: Meal = {
  type: 'Dinner',
  name: 'Ginger Tofu Rice Noodles',
  desc: 'Silky rice noodles tossed with seared tofu, bok choy and a fragrant ginger-tamari glaze.',
  tags: ['Low FODMAP', 'GF', 'Asian', 'Vegan'],
  ingredients: ['100g rice noodles', '150g firm tofu, cubed', '1 cup bok choy', '1 tbsp tamari', '1 tsp grated ginger', '1 tbsp garlic-infused oil', '1 spring onion (green tops only)'],
  steps: ['Soak noodles in hot water until tender; drain.', 'Sear tofu in garlic-infused oil until golden.', 'Add ginger and bok choy, stir-fry 2 minutes.', 'Toss in noodles and tamari, finish with spring onion.'],
};

const carrotSoup: Meal = {
  type: 'Lunch',
  name: 'Spiced Carrot & Ginger Soup',
  desc: 'Velvety roasted carrot soup brightened with ginger and a swirl of coconut cream.',
  tags: ['Low FODMAP', 'GF', 'Vegan'],
  ingredients: ['4 carrots, chopped', '1 tsp grated ginger', '2 cups vegetable broth (low FODMAP)', '2 tbsp coconut cream', '1 tbsp garlic-infused oil', 'Salt & pepper'],
  steps: ['Roast carrots with oil at 200°C for 25 minutes.', 'Blend with ginger and broth until smooth.', 'Reheat, season, swirl in coconut cream.'],
};

const polenta: Meal = {
  type: 'Dinner',
  name: 'Creamy Polenta with Roasted Vegetables',
  desc: 'Soft polenta crowned with rosemary-roasted parsnip, capsicum and pine nuts.',
  tags: ['Low FODMAP', 'GF', 'Mediterranean'],
  ingredients: ['½ cup polenta', '2 cups water', '1 small parsnip, diced', '½ red capsicum, sliced', '1 tbsp olive oil', '1 sprig rosemary', '1 tbsp pine nuts'],
  steps: ['Roast vegetables with rosemary and oil at 200°C for 20 min.', 'Whisk polenta into boiling water; stir 8 minutes.', 'Spoon polenta into bowls, top with vegetables and pine nuts.'],
};

const buckwheatPancakes: Meal = {
  type: 'Breakfast',
  name: 'Buckwheat Pancakes with Blueberries',
  desc: 'Light buckwheat stacks with warm blueberries and a touch of maple.',
  tags: ['Low FODMAP', 'GF', 'Vegetarian'],
  ingredients: ['½ cup buckwheat flour', '1 egg (or flax egg)', '½ cup lactose-free milk', '½ cup blueberries', '1 tbsp maple syrup', 'Pinch of salt'],
  steps: ['Whisk flour, egg, milk and salt to a smooth batter.', 'Cook small pancakes in a non-stick pan, 2 min per side.', 'Warm blueberries in a small pot for 2 minutes.', 'Stack pancakes, top with blueberries and maple.'],
};

// --- Diet-specific MAIN proteins ---

// Omnivore exclusive
const chickenBowl: Meal = {
  type: 'Lunch',
  name: 'Lemon Herb Chicken Rice Bowl',
  desc: 'Pan-seared chicken with jasmine rice, cucumber ribbons and lemon-tahini drizzle.',
  tags: ['Low FODMAP', 'High Protein', 'GF'],
  ingredients: ['150g chicken breast', '¾ cup jasmine rice', '½ cucumber, ribboned', '1 tbsp tahini', '1 tbsp lemon juice', '1 tbsp garlic-infused oil', 'Fresh parsley'],
  steps: ['Cook rice per packet instructions.', 'Sear chicken in oil 4 min per side; rest, slice.', 'Whisk tahini and lemon with 1 tbsp water.', 'Plate rice, chicken, cucumber; drizzle dressing, top with parsley.'],
};

const turkeyMeatballs: Meal = {
  type: 'Dinner',
  name: 'Turkey Meatballs with Zucchini Pasta',
  desc: 'Herby turkey meatballs over spiralised zucchini in a fresh tomato sauce.',
  tags: ['Low FODMAP', 'High Protein', 'Mediterranean'],
  ingredients: ['200g turkey mince', '2 tbsp gluten-free breadcrumbs', '1 egg', '2 zucchini, spiralised', '½ cup canned tomatoes', '1 tbsp garlic-infused oil', 'Fresh basil'],
  steps: ['Mix mince, breadcrumbs and egg; roll into 8 meatballs.', 'Brown meatballs in oil 6 minutes.', 'Add tomatoes, simmer 8 minutes.', 'Sauté zucchini noodles 2 minutes; plate with meatballs and basil.'],
};

const lambKebab: Meal = {
  type: 'Dinner',
  name: 'Moroccan Lamb Skewers with Couscous',
  desc: 'Spiced lamb skewers with herbed couscous, cucumber and lactose-free yoghurt.',
  tags: ['Low FODMAP', 'High Protein'],
  ingredients: ['180g lamb, cubed', '1 tsp cumin', '1 tsp paprika', '½ cup couscous (or quinoa for GF)', '½ cucumber, diced', '2 tbsp lactose-free yoghurt', '1 tbsp olive oil'],
  steps: ['Toss lamb with spices and oil; thread on skewers.', 'Grill 3 minutes per side until charred.', 'Cook couscous per packet, fluff with fork.', 'Serve skewers over couscous with cucumber and yoghurt.'],
};

const eggsToast: Meal = {
  type: 'Breakfast',
  name: 'Soft Eggs on Spelt Sourdough',
  desc: 'Two eggs over spelt sourdough with smashed avocado and chilli flakes.',
  tags: ['Low FODMAP', 'High Protein', 'Vegetarian'],
  ingredients: ['2 eggs', '1 slice spelt sourdough', '¼ avocado', '1 tsp lemon juice', 'Pinch of chilli flakes', 'Sea salt'],
  steps: ['Toast sourdough until golden.', 'Smash avocado with lemon and salt; spread on toast.', 'Cook eggs to your liking; place over toast.', 'Top with chilli flakes.'],
};

// Pescatarian / Omnivore
const salmon: Meal = {
  type: 'Dinner',
  name: 'Maple-Glazed Salmon with Greens',
  desc: 'Pan-roasted salmon with a maple-tamari glaze, sesame greens and steamed rice.',
  tags: ['Low FODMAP', 'High Protein', 'GF', 'Asian'],
  ingredients: ['150g salmon fillet', '1 tbsp tamari', '1 tsp maple syrup', '1 cup spinach', '½ cup jasmine rice', '1 tsp sesame seeds', '1 tbsp garlic-infused oil'],
  steps: ['Cook rice per packet.', 'Whisk tamari and maple; brush on salmon.', 'Sear salmon skin-down 4 min, flip 2 min.', 'Wilt spinach in oil; plate with rice and salmon, sprinkle sesame.'],
};

const prawnNoodles: Meal = {
  type: 'Lunch',
  name: 'Lemongrass Prawn Rice Noodles',
  desc: 'Fragrant prawns tossed through silky rice noodles with herbs and lime.',
  tags: ['Low FODMAP', 'High Protein', 'GF', 'Asian'],
  ingredients: ['120g prawns', '100g rice noodles', '1 stalk lemongrass, minced', '1 tbsp tamari', '1 tbsp garlic-infused oil', 'Fresh coriander', 'Lime wedges'],
  steps: ['Cook noodles per packet; drain.', 'Sauté lemongrass in oil 30 seconds.', 'Add prawns, cook until pink; toss with tamari.', 'Combine with noodles, top with coriander and lime.'],
};

const tunaSalad: Meal = {
  type: 'Lunch',
  name: 'Niçoise-Style Tuna Salad',
  desc: 'Flaked tuna over greens with green beans, olives and a lemon vinaigrette.',
  tags: ['Low FODMAP', 'High Protein', 'GF', 'Mediterranean'],
  ingredients: ['1 can tuna in olive oil', '1 cup mixed lettuce', '½ cup green beans, blanched', '6 black olives', '1 boiled egg', '1 tbsp olive oil', '1 tbsp lemon juice'],
  steps: ['Whisk oil and lemon for dressing.', 'Arrange greens, beans, olives, halved egg.', 'Top with flaked tuna and dressing.'],
};

// Vegetarian / Vegan staples
const lentilDahl: Meal = {
  type: 'Dinner',
  name: 'Coconut Red Lentil Dahl',
  desc: 'Soft red lentils simmered with coconut milk, ginger and warming spices over rice.',
  tags: ['Low FODMAP', 'GF', 'Vegan', 'High Protein'],
  ingredients: ['½ cup canned lentils, rinsed', '½ cup coconut milk', '1 tsp grated ginger', '1 tsp turmeric', '1 tsp cumin', '½ cup jasmine rice', '1 tbsp garlic-infused oil'],
  steps: ['Cook rice per packet.', 'Sauté ginger and spices in oil 1 minute.', 'Add lentils and coconut milk; simmer 8 minutes.', 'Spoon over rice and serve.'],
};

const chickpeaSalad: Meal = {
  type: 'Lunch',
  name: 'Chickpea & Roasted Capsicum Salad',
  desc: 'Rinsed chickpeas tossed with roasted capsicum, feta-style and lemon dressing.',
  tags: ['Low FODMAP', 'Vegetarian', 'GF', 'Mediterranean'],
  ingredients: ['¼ cup canned chickpeas, rinsed well', '1 roasted red capsicum', '30g lactose-free feta', '1 cup rocket', '1 tbsp olive oil', '1 tbsp lemon juice', 'Fresh mint'],
  steps: ['Whisk oil and lemon.', 'Slice capsicum; combine with chickpeas, rocket and feta.', 'Toss with dressing, scatter mint.'],
};

const tofuPoke: Meal = {
  type: 'Lunch',
  name: 'Sesame Tofu Poke Bowl',
  desc: 'Marinated tofu over sushi rice with cucumber, carrot ribbons and sesame.',
  tags: ['Low FODMAP', 'Vegan', 'GF', 'Asian'],
  ingredients: ['150g firm tofu, cubed', '¾ cup sushi rice, cooked', '½ cucumber, diced', '½ carrot, ribboned', '1 tbsp tamari', '1 tsp sesame oil', '1 tsp sesame seeds'],
  steps: ['Marinate tofu in tamari and sesame oil 10 min.', 'Sear tofu until golden, 3 min per side.', 'Layer rice, cucumber, carrot, tofu.', 'Sprinkle with sesame seeds.'],
};

const halloumiBowl: Meal = {
  type: 'Dinner',
  name: 'Grilled Halloumi & Quinoa Plate',
  desc: 'Charred halloumi over warm quinoa with cucumber, mint and pomegranate.',
  tags: ['Low FODMAP', 'Vegetarian', 'GF', 'Mediterranean'],
  ingredients: ['100g halloumi, sliced', '¾ cup cooked quinoa', '½ cucumber, diced', '2 tbsp pomegranate seeds', 'Fresh mint', '1 tbsp olive oil', '1 tbsp lemon juice'],
  steps: ['Grill halloumi 2 min per side until golden.', 'Toss quinoa with cucumber, mint, oil and lemon.', 'Top with halloumi and pomegranate.'],
};

const peanutTofu: Meal = {
  type: 'Dinner',
  name: 'Peanut Tofu with Rice',
  desc: 'Crispy tofu glossed in a creamy peanut sauce with steamed greens and jasmine rice.',
  tags: ['Low FODMAP', 'Vegan', 'High Protein', 'Asian'],
  ingredients: ['150g firm tofu', '1 tbsp peanut butter (no garlic/onion)', '1 tbsp tamari', '1 tsp maple syrup', '½ cup jasmine rice', '1 cup baby spinach', '1 tbsp garlic-infused oil'],
  steps: ['Cook rice per packet.', 'Sear tofu in oil until crisp.', 'Whisk peanut butter, tamari, maple with 2 tbsp water.', 'Toss tofu in sauce; serve over rice with wilted spinach.'],
};

const veganSmoothie: Meal = {
  type: 'Breakfast',
  name: 'Berry Almond Smoothie Bowl',
  desc: 'Frozen strawberries blended with almond milk, topped with seeds and kiwi.',
  tags: ['Low FODMAP', 'Vegan', 'No-Cook'],
  ingredients: ['1 cup frozen strawberries', '¾ cup almond milk', '1 tbsp peanut butter', '1 tbsp chia seeds', '1 kiwi, sliced', '1 tbsp coconut flakes'],
  steps: ['Blend strawberries, milk and peanut butter until thick.', 'Pour into a bowl.', 'Top with chia, kiwi and coconut.'],
};

// Build a 7-day plan per diet
export function buildPlan(diet: Diet): DayPlan[] {
  const breakfastBase = [oats, chiaBowl, buckwheatPancakes, veganSmoothie, oats, chiaBowl, buckwheatPancakes];
  let lunches: Meal[];
  let dinners: Meal[];

  switch (diet) {
    case 'Omnivore':
      lunches = [chickenBowl, tunaSalad, quinoaBowl, prawnNoodles, chickenBowl, carrotSoup, tunaSalad];
      dinners = [salmon, turkeyMeatballs, lambKebab, riceNoodleStirFry, salmon, polenta, lentilDahl];
      break;
    case 'Pescatarian':
      lunches = [tunaSalad, quinoaBowl, prawnNoodles, chickpeaSalad, tunaSalad, carrotSoup, prawnNoodles];
      dinners = [salmon, riceNoodleStirFry, polenta, lentilDahl, salmon, halloumiBowl, peanutTofu];
      break;
    case 'Vegetarian':
      lunches = [chickpeaSalad, quinoaBowl, tofuPoke, carrotSoup, chickpeaSalad, quinoaBowl, tofuPoke];
      dinners = [halloumiBowl, lentilDahl, polenta, peanutTofu, halloumiBowl, riceNoodleStirFry, lentilDahl];
      // swap egg breakfast in for variety
      breakfastBase[1] = eggsToast;
      breakfastBase[5] = eggsToast;
      break;
    case 'Vegan':
    default:
      lunches = [tofuPoke, quinoaBowl, chickpeaSalad, carrotSoup, tofuPoke, quinoaBowl, chickpeaSalad.tags.includes('Vegetarian') ? quinoaBowl : chickpeaSalad];
      dinners = [lentilDahl, peanutTofu, riceNoodleStirFry, polenta, lentilDahl, peanutTofu, riceNoodleStirFry];
      // make chickpea salad vegan version (omit feta)
      lunches = lunches.map(m => m === chickpeaSalad ? {
        ...chickpeaSalad,
        name: 'Chickpea & Roasted Capsicum Salad',
        ingredients: chickpeaSalad.ingredients.filter(i => !i.includes('feta')),
        tags: ['Low FODMAP', 'Vegan', 'GF', 'Mediterranean'],
      } : m);
      break;
  }

  return DAYS.map((day, i) => ({
    day,
    meals: [breakfastBase[i], lunches[i], dinners[i]],
  }));
}

// Grocery list per diet
export function buildGrocery(diet: Diet): Record<string, string[]> {
  const base = {
    'Grains & Carbs': ['Rolled oats', 'Jasmine rice', 'Rice noodles', 'Quinoa', 'Polenta', 'Buckwheat flour', 'Spelt sourdough'],
    'Vegetables': ['Zucchini', 'Carrots', 'Bok choy', 'Spinach', 'Cucumber', 'Red capsicum', 'Cherry tomatoes', 'Parsnip', 'Lettuce'],
    'Fruits': ['Strawberries', 'Blueberries', 'Kiwi', 'Lemons', 'Limes'],
    'Pantry Staples': ['Garlic-infused olive oil', 'Olive oil', 'Tamari', 'Maple syrup', 'Coconut milk', 'Almond milk', 'Lactose-free milk', 'Chia seeds', 'Pumpkin seeds', 'Sesame seeds', 'Pine nuts', 'Black olives', 'Coconut flakes', 'Peanut butter'],
    'Spices & Herbs': ['Cinnamon', 'Turmeric', 'Cumin', 'Paprika', 'Chilli flakes', 'Fresh basil', 'Fresh mint', 'Fresh parsley', 'Fresh coriander', 'Rosemary', 'Ginger', 'Lemongrass'],
  } as Record<string, string[]>;

  let proteins: string[] = [];
  switch (diet) {
    case 'Omnivore':
      proteins = ['Chicken breast', 'Turkey mince', 'Lamb', 'Salmon fillet', 'Prawns', 'Canned tuna', 'Eggs', 'Firm tofu', 'Canned lentils', 'Canned chickpeas'];
      break;
    case 'Pescatarian':
      proteins = ['Salmon fillet', 'Prawns', 'Canned tuna', 'Eggs', 'Firm tofu', 'Halloumi (lactose-free)', 'Canned lentils', 'Canned chickpeas'];
      break;
    case 'Vegetarian':
      proteins = ['Eggs', 'Firm tofu', 'Halloumi (lactose-free)', 'Lactose-free feta', 'Canned lentils', 'Canned chickpeas'];
      break;
    case 'Vegan':
      proteins = ['Firm tofu', 'Canned lentils', 'Canned chickpeas'];
      base['Pantry Staples'] = base['Pantry Staples'].filter(i => i !== 'Lactose-free milk');
      break;
  }

  return { Proteins: proteins, ...base };
}
