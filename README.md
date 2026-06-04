# Master Of Smithing

A professional, production-ready mobile game built with React Native and Expo. Master Of Smithing is an idle RPG combining blacksmith simulation, turn-based strategy, pet collection, and automated battling.

## 🎮 Game Features

### Core Gameplay
- **Blacksmithing/Forging System** - Craft and upgrade 100+ types of equipment
- **Equipment Management** - Equip items, sell for coins, track inventory
- **Pet/Elf Collection** - Hatch eggs, collect unique elves with special abilities
- **Turn-Based Combat** - Strategic automated battles based on gear and pet combinations
- **Adventure Modes** - Quests, world bosses, dungeons, competitions
- **Resource Management** - Mithril, coins, diamonds, enhancement stones
- **Guild System** - Join clans and participate in group activities
- **Progression System** - Unlock new features as you advance

## 🛠️ Tech Stack

- **React Native** with Expo
- **Redux Toolkit** for state management
- **TypeScript** for type safety
- **AsyncStorage** for data persistence
- **Jest** for testing
- **ESLint + Prettier** for code quality

## 📦 Project Structure

```
master-of-smithing/
├── app.json                 # Expo configuration
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── jest.config.js          # Jest testing config
├── .eslintrc.json          # ESLint config
├── .prettierrc              # Prettier config
├── src/
│   ├── app/
│   │   ├── App.tsx         # Main app component
│   │   └── Navigation.tsx   # Navigation setup
│   ├── screens/            # Screen components
│   ├── store/              # Redux store and slices
│   ├── services/           # Game engines and logic
│   ├── hooks/              # Custom React hooks
│   ├── components/         # Reusable UI components
│   ├── data/               # Game data (equipment, pets, quests)
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   └── assets/             # Images, fonts, sounds
├── __tests__/              # Unit tests
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

```bash
# Clone the repository
git clone https://github.com/ekremhsckl/master-of-smithing.git
cd master-of-smithing

# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS simulator (macOS only)
npm run ios

# Run on Android emulator
npm run android

# Run on web
npm run web
```

### Development Commands

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Lint code
npm run lint

# Format code
npm run format

# Build for production
npm run build
```

## 🎯 Game Systems

### Smithing System
- Craft equipment with different quality tiers
- Upgrade equipment with resources
- Manage inventory with storage limits
- Sell items for profit

### Combat System
- Turn-based automated battles
- Strategic pet and equipment selection
- Enemy progression and difficulty scaling
- Reward system with loot drops

### Pet System
- Collect and hatch eggs with RNG mechanics
- Unique abilities and skills for each pet
- Pet leveling and experience
- Pet synthesis for stronger variants

### Quest System
- Progressive quest chains
- Various adventure modes
- World bosses and dungeons
- Reward progression

### Guild System
- Create or join guilds
- Guild raids and cooperative events
- Guild member interactions
- Shared resources and benefits

## 📝 Code Quality

- **TypeScript** - Full type safety
- **Error Handling** - Comprehensive validation and error management
- **Testing** - Unit tests for all core game logic
- **Documentation** - JSDoc comments on all functions
- **Linting** - ESLint with strict rules
- **Formatting** - Prettier for consistent code style
- **Performance** - Optimized with memoization and lazy loading

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- gameEngine.test.ts

# Generate coverage report
npm test -- --coverage
```

## 📱 Supported Platforms

- iOS (11.0+)
- Android (5.0+)
- Web (Chromium-based browsers)

## 🎨 Customization

All game constants, equipment data, pet abilities, and quest information can be customized in the `/src/data/` directory.

## 🐛 Bug Reports

Found a bug? Please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Happy Smithing!** ⚔️🔨
