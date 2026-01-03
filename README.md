# Creative Robotics & Future Tech Portfolio

A modern, interactive portfolio website designed for showcasing robotics and technology projects. Features smooth animations, particle effects, and an easy-to-update project system.

## 🚀 Features

- **Modern Design**: Sleek, futuristic design with gradient effects and smooth animations
- **Particle System**: Interactive particle animation in the hero section
- **Dynamic Projects**: Easy-to-update project showcase with filtering by category
- **Responsive**: Fully responsive design that works on all devices
- **Smooth Animations**: Scroll-triggered animations and smooth transitions
- **Contact Form**: Built-in contact form for easy communication
- **Skills Display**: Animated skill bars showing proficiency levels

## 📁 Project Structure

```
portfolio/
│
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # All styles and animations
├── js/
│   └── script.js          # JavaScript functionality
├── data/
│   └── projects.json      # Projects data (easy to update!)
└── README.md              # This file
```

## 🎨 Sections

1. **Hero/Home** - Eye-catching introduction with particle animation
2. **About** - Personal introduction with animated statistics
3. **Projects** - Filterable project showcase with modal details
4. **Skills** - Technology proficiency with animated progress bars
5. **Contact** - Contact information and form

## 📝 How to Add New Projects

Adding new projects is super easy! Just edit the `data/projects.json` file.

### Step-by-Step Guide:

1. Open `data/projects.json`
2. Add a new project object to the array:

```json
{
    "id": 7,
    "title": "Your Project Name",
    "description": "A brief description (1-2 sentences)",
    "category": "robotics",
    "tags": ["Technology1", "Technology2"],
    "github": "https://github.com/yourusername/project",
    "demo": "https://your-demo-link.com",
    "fullDescription": "A detailed description (2-3 paragraphs)",
    "features": [
        "Feature 1",
        "Feature 2",
        "Feature 3"
    ],
    "technologies": [
        "Tech 1",
        "Tech 2",
        "Tech 3"
    ]
}
```

3. Save the file and refresh your website!

### Project Categories:
- `robotics` - For robotics projects
- `ai` - For AI/ML projects
- `automation` - For automation projects
- `web` - For web development projects

### Optional Fields:
- `github` - Set to `null` if not available
- `demo` - Set to `null` if not available
- `fullDescription` - Optional detailed description
- `features` - Optional list of key features
- `technologies` - Optional list of technologies used

## 🎯 Customization

### Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
    --primary-color: #00f0ff;      /* Main accent color */
    --secondary-color: #ff00ff;     /* Secondary accent */
    --bg-dark: #0a0e27;            /* Background color */
    /* ... more variables */
}
```

### Personal Information
Update the following in `index.html`:

1. **Hero Section** - Change the title and description
2. **About Section** - Update the about text and statistics
3. **Skills Section** - Modify skills and proficiency levels
4. **Contact Section** - Update contact information

### Statistics
Edit the `data-target` attribute on stat numbers:
```html
<span class="stat-number" data-target="15">0</span>
```

### Skills
Modify skill progress percentages:
```html
<div class="skill-progress" data-progress="90"></div>
```

## 🌐 Running the Website

### Local Development:

1. **Simple HTTP Server** (Python):
   ```bash
   python -m http.server 8000
   ```
   Then visit: `http://localhost:8000`

2. **Live Server** (VS Code Extension):
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

3. **Direct Opening**:
   - Simply open `index.html` in your browser
   - Note: Some features may not work without a server (like loading projects.json)

## 📱 Responsive Design

The website is fully responsive and optimized for:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktops (1024px and up)
- 🖥️ Large screens (1440px and up)

## 🎨 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties, grid, and flexbox
- **JavaScript (ES6+)** - Interactive functionality
- **Canvas API** - Particle animation system
- **JSON** - Data storage for projects

## 🔧 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 📄 License

This project is free to use for personal and educational purposes. Feel free to modify and customize it for your own portfolio!

## 🤝 Contributing

Found a bug or want to suggest an improvement? Feel free to:
1. Fork the project
2. Make your changes
3. Submit a pull request

## 💡 Tips

- Replace placeholder text with your own information
- Update the contact email and social media links
- Add your own project images to the project cards
- Customize colors to match your personal brand
- Add Google Analytics for tracking (optional)

## 📧 Contact

For questions or suggestions, update the contact information in the Contact section of the website.

---

**Built with 💙 for creative robotics and future technology enthusiasts!**