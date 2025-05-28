# Japanese Alphabet Learning App

A modern, interactive web application for learning Japanese Hiragana and Katakana characters with flashcard-style practice.

## ✨ Features

- **Interactive Character Selection**: Choose from complete Hiragana and Katakana character sets
- **Multiple Practice Modes**: Practice by character, romaji, or random display
- **Flashcard System**: Click to flip cards and reveal answers
- **Progress Tracking**: Track selected characters and practice sessions
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Beautiful gradient backgrounds and smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser** - Vite will automatically open the app at `http://localhost:3000`

### Building for Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 📁 Project Structure

```
japanese-learn/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CharacterGrid.js # Character selection grid
│   │   └── Flashcard.js     # Flashcard component
│   ├── data/
│   │   └── characters.js    # Hiragana and Katakana data
│   ├── utils/
│   │   ├── dom.js          # DOM manipulation utilities
│   │   └── helpers.js      # General utility functions
│   ├── main.js             # Main application logic
│   └── style.css           # Application styles
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md              # This file
```

## 🎯 Usage

1. **Select Characters**: Choose between Hiragana and Katakana tabs
2. **Make Selections**: Click on individual characters or use "Select All" / "Basic Only" buttons
3. **Choose Practice Mode**:
   - **Show Character**: Display Japanese character, click to reveal romaji
   - **Show Romaji**: Display romanization, click to reveal character
   - **Random**: Randomly switch between the two modes
4. **Practice**: Click "Next Card" to practice with random selected characters
5. **Track Progress**: Monitor your selections and practice count in the stats panel

## 🛠️ Development

The project uses modern JavaScript ES6+ modules with a clean, modular architecture:

- **Vite**: Fast build tool with hot module replacement
- **ES6 Modules**: Clean separation of concerns
- **Class-based Components**: Object-oriented approach for maintainability
- **Modern CSS**: Flexbox, Grid, and CSS custom properties
- **Responsive Design**: Mobile-first approach

### Key Technologies

- **Vite** - Build tool and development server
- **Vanilla JavaScript** - No external frameworks, pure JS
- **CSS3** - Modern styling with gradients and animations
- **ES6+ Modules** - Clean, importable code organization

## 🎨 Customization

The app is designed to be easily customizable:

- **Colors**: Modify CSS custom properties in `src/style.css`
- **Character Data**: Add or modify characters in `src/data/characters.js`
- **Components**: Extend or modify components in `src/components/`
- **Styling**: All styles are contained in the single CSS file for easy customization

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

The app uses modern JavaScript features and is optimized for current browsers.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
