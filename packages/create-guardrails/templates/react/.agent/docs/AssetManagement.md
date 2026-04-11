# Asset Management Guide

This document outlines the standard for managing static assets (images, icons, vectors) within the project.

---

## 📂 Directory Structure

All static assets that need to be processed by Vite/Webpack must be stored in the `src/assets/` directory, organized by feature.

```text
src/assets/
├── auth/            # Images for login/signup
├── dashboard/       # Dashboard icons and illustrations
├── home/            # Hero images and banners
├── common/          # Global assets (Logos, default avatars)
└── index.ts         # Centralized export file
```

---

## 🏗️ The Index Pattern

To ensure clean imports and easy asset management, we utilize a centralized `index.ts` file. Never import an image directly from its sub-folder into a component.

### ✅ DO: Import from the Central Index
Always use capitalized constant names for exported assets.

```typescript
// src/assets/index.ts
import HeroImage from './home/hero-banner.png';
import Logo from './common/logo.svg';
import LoginBg from './auth/login-bg.jpg';

export const ASSETS = {
  HERO_IMAGE: HeroImage,
  LOGO: Logo,
  LOGIN_BACKGROUND: LoginBg,
};
```

### Usage in Components:
```tsx
import { ASSETS } from '@/assets';
import { HOME_CONSTANTS } from '@/constants';

const Hero = () => {
  return (
    <img 
      src={ASSETS.HERO_IMAGE} 
      alt={HOME_CONSTANTS.HERO_ALT_TEXT} 
    />
  );
};
```


### ❌ DON'T: Import Directly from Paths
Avoid long, messy relative paths in your UI components.
```tsx
// Bad: Harder to refactor and maintain
import HeroImage from '../../assets/home/hero-banner.png'; 
```

---

## 🖼️ Image Optimization & Guidelines

1.  **Format:** Use **WebP** or **SVG** where possible for better performance.
2.  **Sizing:** Ensure images are cropped and optimized for their display size before adding them to the project.
3.  **Naming:** Use descriptive, hyphenated names for files (e.g., `user-profile-default.png`) and UPPER_SNAKE_CASE for the exported constants.
