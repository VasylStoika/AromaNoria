export const TOP_PERFUMES = [
  {
    id: 1,
    name: "Chanel No. 5",
    brand: "CHANEL",
    price: "8,500",
    image: "https://images.unsplash.com/photo-1719175936556-dbd05e415913?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFuZWwlMjBwZXJmdW1lJTIwYm90dGxlfGVufDF8fHx8MTc2NjAwNTIwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "women",
    isNew: true,
    description: "Легендарний аромат з нотами альдегідів, трояндового масла та сандалового дерева",
    country: "Франція",
    year: 1921,
    perfumer: "Ernest Beaux",
    concentration: "Eau de Parfum",
    volumes: [
      { ml: 30, price: 5200 },
      { ml: 50, price: 8500 },
      { ml: 100, price: 14200 }
    ],
    notes: {
      top: ["Альдегіди", "Нероліє", "Іланг-іланг"],
      heart: ["Троянда", "Жасмін", "Ірис"],
      base: ["Сандалове дерево", "Ваніль", "Амбра"]
    },
    longDescription: "Chanel No. 5 - це вічна класика, створена в 1921 році легендарним парфумером Ернестом Бо. Цей аромат став символом елегантності та жіночності. Унікальна композиція альдегідів створює неповторний букет, який розкривається квітковими нотами та залишає теплий, чуттєвий шлейф."
  },
  {
    id: 2,
    name: "Sauvage",
    brand: "DIOR",
    price: "7,200",
    image: "https://images.unsplash.com/photo-1698867928110-2408e8e2f44a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW9yJTIwc2F1dmFnZSUyMHBlcmZ1bWV8ZW58MXx8fHwxNzY2MDA1MjA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "men",
    isNew: true,
    description: "Свіжий та пряний аромат з нотами бергамоту, перцю та амброксану",
    country: "Франція",
    year: 2015,
    perfumer: "François Demachy",
    concentration: "Eau de Toilette",
    volumes: [
      { ml: 60, price: 7200 },
      { ml: 100, price: 10500 },
      { ml: 200, price: 16800 }
    ],
    notes: {
      top: ["Калабрійський бергамот", "Перець"],
      heart: ["Сичуаньський перець", "Лаванда", "Зірчастий аніс"],
      base: ["Амброксан", "Ветивер", "Пачулі"]
    },
    longDescription: "Sauvage від Dior - це втілення дикої природи та чоловічої сили. Створений у 2015 році Франсуа Демаші, цей аромат поєднує свіжість цитрусових з пряною гостротою перцю та теплом амброксану. Ідеальний для сучасного чоловіка, який цінує свободу та елегантність."
  },
  {
    id: 3,
    name: "Black Orchid",
    brand: "TOM FORD",
    price: "9,800",
    image: "https://images.unsplash.com/photo-1663307257429-5e4dfc91a7b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b20lMjBmb3JkJTIwcGVyZnVtZSUyMGJsYWNrJTIwb3JjaGlkfGVufDF8fHx8MTc2NjAwNTIwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "unisex",
    isNew: false,
    description: "Розкішний аромат з нотами чорної орхідеї, трюфелю та пачулі",
    country: "США",
    year: 2006,
    perfumer: "David Apel & Pierre Negrin",
    concentration: "Eau de Parfum",
    volumes: [
      { ml: 30, price: 6500 },
      { ml: 50, price: 9800 },
      { ml: 100, price: 16500 }
    ],
    notes: {
      top: ["Трюфель", "Бергамот", "Чорна смородина"],
      heart: ["Чорна орхідея", "Фруктові ноти", "Іланг-іланг"],
      base: ["Пачулі", "Ваніль", "Ладан"]
    },
    longDescription: "Black Orchid - це розкішний унісекс аромат від Tom Ford, який з'явився в 2006 році. Це чуттєва композиція поєднує екзотичні квіткові ноти з темними пряними акордами. Трюфель і чорна орхідея створюють незабутній, загадковий шлейф, ідеальний для вечірнього виходу."
  },
  {
    id: 4,
    name: "Black Opium",
    brand: "YVES SAINT LAURENT",
    price: "6,900",
    image: "https://images.unsplash.com/photo-1761845047498-56827f416735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5c2wlMjBibGFjayUyMG9waXVtJTIwcGVyZnVtZXxlbnwxfHx8fDE3NjYwMDUyMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "women",
    isNew: true,
    description: "Чуттєвий аромат з нотами кави, ванілі та білих квітів",
    country: "Франція",
    year: 2014,
    perfumer: "Nathalie Lorson, Marie Salamagne, Olivier Cresp, Honorine Blanc",
    concentration: "Eau de Parfum",
    volumes: [
      { ml: 30, price: 4500 },
      { ml: 50, price: 6900 },
      { ml: 90, price: 10200 }
    ],
    notes: {
      top: ["Рожевий перець", "Помаранч", "Груша"],
      heart: ["Кава", "Жасмін", "Біла квітка"],
      base: ["Ваніль", "Пачулі", "Кедр"]
    },
    longDescription: "Black Opium від YSL - це сучасний жіночий аромат для сміливих та пристрасних жінок. З 2014 року він завоював мільйони сердець своєю унікальною композицією кави, ванілі та білих квітів. Ідеальний для вечірніх виходів та особливих моментів."
  },
  {
    id: 5,
    name: "Eros",
    brand: "VERSACE",
    price: "5,400",
    image: "https://images.unsplash.com/photo-1716978499366-d5a84bf1fe70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXJzYWNlJTIwZXJvcyUyMHBlcmZ1bWV8ZW58MXx8fHwxNzY2MDA1MjA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "men",
    isNew: false,
    description: "Потужний аромат з нотами м'яти, яблука та ванілі",
    country: "Італія",
    year: 2012,
    perfumer: "Aurélien Guichard",
    concentration: "Eau de Toilette",
    volumes: [
      { ml: 50, price: 5400 },
      { ml: 100, price: 8200 },
      { ml: 200, price: 13500 }
    ],
    notes: {
      top: ["М'ята", "Лимон", "Зелене яблуко"],
      heart: ["Тонка боби", "Амброксан", "Герань"],
      base: ["Ваніль", "Ветивер", "Кедр"]
    },
    longDescription: "Versace Eros натхненний грецьким богом кохання. Цей аромат втілює чоловічу силу, пристрасть та спокусу. Свіжа м'ята та зелене яблуко поєднуються з теплою ваніллю, створюючи незабутню композицію для впевненого чоловіка."
  },
  {
    id: 6,
    name: "Bloom",
    brand: "GUCCI",
    price: "7,800",
    image: "https://images.unsplash.com/photo-1583121488135-18b39a9a68e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWNjaSUyMGJsb29tJTIwcGVyZnVtZXxlbnwxfHx8fDE3NjYwMDUyMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "women",
    isNew: true,
    description: "Квітковий аромат з нотами жасміну, рангуну та туберози",
    country: "Італія",
    year: 2017,
    perfumer: "Alberto Morillas",
    concentration: "Eau de Parfum",
    volumes: [
      { ml: 30, price: 4800 },
      { ml: 50, price: 7800 },
      { ml: 100, price: 12500 }
    ],
    notes: {
      top: ["Рангун"],
      heart: ["Туберози", "Жасмін"],
      base: ["Сандалове дерево"]
    },
    longDescription: "Gucci Bloom - це оспівування природної краси та жіночності. Створений Альберто Морілласом, цей аромат розкриває справжній квітковий сад, де панують ніжний жасмін та чуттєва туберози. Ідеальний для романтичних натур."
  },
  {
    id: 7,
    name: "La Vie Est Belle",
    brand: "LANCÔME",
    price: "6,500",
    image: "https://images.unsplash.com/photo-1719175936556-dbd05e415913?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFuZWwlMjBwZXJmdW1lJTIwYm90dGxlfGVufDF8fHx8MTc2NjAwNTIwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "women",
    isNew: false,
    description: "Солодкий аромат з нотами ірису, пралине та ванілі",
    country: "Франція",
    year: 2012,
    perfumer: "Dominique Ropion, Anne Flipo, Olivier Polge",
    concentration: "Eau de Parfum",
    volumes: [
      { ml: 30, price: 4200 },
      { ml: 50, price: 6500 },
      { ml: 100, price: 10800 }
    ],
    notes: {
      top: ["Чорна смородина", "Груша"],
      heart: ["Ірис", "Жасмін", "Апельсиновий цвіт"],
      base: ["Пралине", "Ваніль", "Пачулі"]
    },
    longDescription: "La Vie Est Belle від Lancôme - це гімн щастю та жіночій красі. Назва перекладається як 'Життя прекрасне', і цей аромат саме про це. Солодкі ноти пралине та ванілі поєднуються з витонченим ірисом, створюючи композицію для оптимістичних жінок."
  },
  {
    id: 8,
    name: "Bleu de Chanel",
    brand: "CHANEL",
    price: "8,200",
    image: "https://images.unsplash.com/photo-1698867928110-2408e8e2f44a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW9yJTIwc2F1dmFnZSUyMHBlcmZ1bWV8ZW58MXx8fHwxNzY2MDA1MjA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "men",
    isNew: true,
    description: "Деревно-ароматичний аромат з нотами цитрусів, імбиру та кедру",
    country: "Франція",
    year: 2010,
    perfumer: "Jacques Polge",
    concentration: "Eau de Toilette",
    volumes: [
      { ml: 50, price: 6200 },
      { ml: 100, price: 8200 },
      { ml: 150, price: 11500 }
    ],
    notes: {
      top: ["Грейпфрут", "Лимон", "М'ята"],
      heart: ["Імбир", "Жасмін", "Мускатний горіх"],
      base: ["Ладан", "Кедр", "Сандалове дерево"]
    },
    longDescription: "Bleu de Chanel - це втілення чоловічої незалежності та елегантності. Аромат для чоловіка, який сам визначає свою долю. Свіжі цитрусові ноти поєднуються з теплими деревними акордами, створюючи ідеальний баланс для будь-якої ситуації."
  },
  {
    id: 9,
    name: "Libre",
    brand: "YVES SAINT LAURENT",
    price: "7,100",
    image: "https://images.unsplash.com/photo-1761845047498-56827f416735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5c2wlMjBibGFjayUyMG9waXVtJTIwcGVyZnVtZXxlbnwxfHx8fDE3NjYwMDUyMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "women",
    isNew: true,
    description: "Квітково-лавандовий аромат з нотами лаванди, апельсинового цвіту та мускуса",
    country: "Франція",
    year: 2019,
    perfumer: "Anne Flipo, Carlos Benaïm",
    concentration: "Eau de Parfum",
    volumes: [
      { ml: 30, price: 4500 },
      { ml: 50, price: 7100 },
      { ml: 90, price: 10800 }
    ],
    notes: {
      top: ["Лаванда", "Мандарин", "Чорна смородина"],
      heart: ["Лаванда", "Апельсиновий цвіт", "Жасмін"],
      base: ["Мускус", "Ваніль", "Амбра"]
    },
    longDescription: "YSL Libre - це аромат свободи та жіночої сили. Він поєднує традиційно чоловічу лаванду з чуттєвими квітковими нотами, створюючи абсолютно новий жіночий аромат для незалежних та сміливих жінок."
  },
  {
    id: 10,
    name: "Tobacco Vanille",
    brand: "TOM FORD",
    price: "11,200",
    image: "https://images.unsplash.com/photo-1663307257429-5e4dfc91a7b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b20lMjBmb3JkJTIwcGVyZnVtZSUyMGJsYWNrJTIwb3JjaGlkfGVufDF8fHx8MTc2NjAwNTIwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "unisex",
    isNew: false,
    description: "Теплий аромат з нотами тютюну, ванілі та какао",
    country: "США",
    year: 2007,
    perfumer: "Olivier Gillotin",
    concentration: "Eau de Parfum",
    volumes: [
      { ml: 50, price: 11200 },
      { ml: 100, price: 19500 },
      { ml: 250, price: 38000 }
    ],
    notes: {
      top: ["Тютюн", "Пряності"],
      heart: ["Ваніль", "Какао", "Сухофрукти"],
      base: ["Деревні ноти", "Тонка боби"]
    },
    longDescription: "Tobacco Vanille - це розкішний унісекс аромат від Tom Ford Private Blend колекції. Він переносить вас до англійського джентльменського клубу, де панує атмосфера витонченості. Теплий тютюн та солодка ваніль створюють незабутній, комфортний аромат."
  },
  {
    id: 11,
    name: "1 Million",
    brand: "PACO RABANNE",
    price: "5,900",
    image: "https://images.unsplash.com/photo-1716978499366-d5a84bf1fe70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXJzYWNlJTIwZXJvcyUyMHBlcmZ1bWV8ZW58MXx8fHwxNzY2MDA1MjA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "men",
    isNew: false,
    description: "Пряно-шкіряний аромат з нотами грейпфруту, кориці та шкіри",
    country: "Франція",
    year: 2008,
    perfumer: "Christophe Raynaud, Olivier Pescheux, Michel Girard",
    concentration: "Eau de Toilette",
    volumes: [
      { ml: 50, price: 5900 },
      { ml: 100, price: 8500 },
      { ml: 200, price: 13200 }
    ],
    notes: {
      top: ["Грейпфрут", "М'ята", "Мандарин"],
      heart: ["Кориця", "Пряності", "Троянда"],
      base: ["Шкіра", "Амбра", "Білий мускус"]
    },
    longDescription: "Paco Rabanne 1 Million - це аромат успіху та розкоші. Його золотистий флакон у формі золотого зливка символізує багатство та впевненість. Пряні та свіжі ноти створюють сміливу композицію для амбітних чоловіків."
  },
  {
    id: 12,
    name: "Good Girl",
    brand: "CAROLINA HERRERA",
    price: "6,700",
    image: "https://images.unsplash.com/photo-1583121488135-18b39a9a68e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWNjaSUyMGJsb29tJTIwcGVyZnVtZXxlbnwxfHx8fDE3NjYwMDUyMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "women",
    isNew: true,
    description: "Орієнтальний аромат з нотами мигдалю, кави та туберози",
    country: "США",
    year: 2016,
    perfumer: "Louise Turner",
    concentration: "Eau de Parfum",
    volumes: [
      { ml: 30, price: 4100 },
      { ml: 50, price: 6700 },
      { ml: 80, price: 9800 }
    ],
    notes: {
      top: ["Мигдаль", "Кава"],
      heart: ["Туберози", "Жасмін", "Болгарська троянда"],
      base: ["Тонка боби", "Какао", "Сандалове дерево"]
    },
    longDescription: "Carolina Herrera Good Girl - це аромат про двоїстість жіночої природи. Флакон у формі туфлі на підборах став іконічним. Солодкі ноти кави та мигдалю контрастують з чуттєвими квітами, створюючи ідеальний аромат для сучасної жінки."
  }
];

export const getProductsByCategory = (category: 'women' | 'men' | 'unisex') => {
  return TOP_PERFUMES.filter(p => p.category === category);
};

export const getAllProducts = () => TOP_PERFUMES;

export const getProductById = (id: number) => {
  return TOP_PERFUMES.find(p => p.id === id);
};