# C.G. Patel Insurance Website

A modern React application for C.G. Patel House of Insurance, built with React JSX and Tailwind CSS.

## Features

- 🎨 Modern, responsive design
- 📱 Mobile-friendly layout
- 🎯 Interactive insurance quote form
- 🏢 Partner company logos
- 💼 Professional insurance branding

## Setup Instructions

### 1. Install Dependencies

First, install Tailwind CSS and its dependencies:

```bash
npm install -D tailwindcss postcss autoprefixer
```

### 2. Initialize Tailwind CSS

```bash
npx tailwindcss init -p
```

### 3. Start the Development Server

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`.

## Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation and logo
│   ├── MainContent.js     # Main content area
│   └── InsuranceForm.js   # Quote form
├── App.js                 # Main app component
├── App.css               # Tailwind CSS imports
└── index.js              # Entry point
```

## Technologies Used

- **React 19** - UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## Design Features

- **Header**: Logo with tree icon, navigation links
- **Main Content**: Large headline, family image placeholder, floating partner logos
- **Form**: Gender selection, input fields, call-to-action button
- **Responsive**: Works on desktop, tablet, and mobile devices

## Customization

The design uses custom Tailwind colors defined in `tailwind.config.js`:
- `primary`: #4A90E2 (Blue)
- `primaryDark`: #357ABD (Dark Blue)
- `accent`: #4CAF50 (Green)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
 <!-- <div className="bg-white rounded-xl border border-gray-200 px-6 py-5 shadow-sm">
            <div className="font-semibold text-lg text-[#23294a] mb-2">Riders</div>
            <div className="text-sm text-gray-500 mb-3">
              You should get these additional benefits to enhance your current plan
            </div>
            <select className="border border-gray-300 rounded-md px-4 py-2 text-base mb-5 max-w-xs bg-white">
              <option>Select any 1 of 2</option>
              <option>Instant Cover</option>
              <option>Reduction in PED</option>
            </select>
            {/* Add-on cards */}
            <div className="flex flex-col gap-4">
              {addOns.map((a, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <div className="font-medium text-[#22294a]">{a.title}</div>
                    <div className="text-sm text-gray-500">{a.desc}</div>
                    {a.waiting && <div className="text-xs mt-1 text-blue-700">Waiting Period: <b>{a.waiting}</b></div>}
                  </div>
                  <div className="flex flex-col items-end mt-3 md:mt-0 min-w-[110px]">
                    <div className="text-[15px] text-[#283356] font-medium mb-2">
                      Premium <span className="font-semibold text-lg text-[#23294a]">₹{a.premium}</span>
                    </div>
                    <button className="border border-orange-400 text-orange-600 font-semibold px-4 py-1 rounded-md hover:bg-orange-50 transition-all">{a.action}</button>
                  </div>
                </div>
              ))}
              <div className="text-xs text-[#23294a] pt-2 border-t border-gray-200">
                More Riders for you
              </div>
            </div>
          </div> -->