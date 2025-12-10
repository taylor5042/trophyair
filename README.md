# Trophy Air Website

## Overview
Professional website for Trophy Air, Heating and Cooling — an HVAC services company owned by Dave Taylor with 30 years of experience.

## Contact Information
- **Phone:** (801) 710-3031
- **Email:** Davetaylor@trophyair.com
- **Facebook:** https://www.facebook.com/profile.php?id=61575351681420

## Structure

### Pages
- **index.html** - Homepage with services overview and customer testimonials
- **services.html** - HVAC services (Heating, Cooling, Fireplaces, Installation)
- **about.html** - About Dave Taylor and Trophy Air
- **contact.html** - Contact information

### Assets
- **assets/css/** - Stylesheets
- **assets/js/** - JavaScript files
- **images/** - Site images

## Key Features
- Responsive design (mobile-friendly)
- Clean, modern interface
- Customer testimonials section
- Color-coded service cards
- Anchor links for service sections (#heating, #cooling, #fireplaces, #installation)

## Services Offered
- Heating (Furnace installation, repair, maintenance)
- Cooling (AC installation, repair, service)
- Fireplaces (Gas fireplace installation and service)
- Installation & Replacement (New construction, upgrades, second units)

## Technology
- Static HTML5 website
- CSS for styling (based on ZeroFour template by HTML5 UP)
- jQuery + custom JavaScript
- No build process required

## Code Architecture

### CSS Structure
- **main.css** - Base template styles (ZeroFour by HTML5 UP)
- **overrides.css** - Site-specific customizations organized as:
  1. Global Overrides
  2. Shared Component Styles (`.section-intro`, base card styles)
  3. Page-Specific Styles (color variations, unique layouts)

### JavaScript Structure
- **jquery.min.js** - jQuery library
- **jquery.dropotron.min.js** - Dropdown menu plugin
- **breakpoints.min.js** - Responsive breakpoint detection
- **browser.min.js** - Browser detection utilities
- **util.js** - Navigation list generation, panel functionality, form polyfills
- **main.js** - Site initialization (breakpoints, dropdowns, mobile nav)

### Shared CSS Components
The following classes are reusable across pages:
- `.section-intro` - Gradient banner for page introductions
- `.service-card`, `.quality-card`, `.employment-card`, `.resource-card` - Base card styles
- `.hero-background` - Page hero background system
- `.testimonial-card` - Customer review cards

### Page Body Classes
Each page uses body classes for page-specific styling:
- `homepage` - Home page
- `services-page` - Services page
- `about-page` - About page
- `contact-page` - Contact page
- `hero-background` - Enables hero background system

## Deployment
Hosted on Hostinger. Files can be deployed directly without compilation.

## Last Updated
December 2025

