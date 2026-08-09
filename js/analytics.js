/**
 * Vercel Web Analytics initialization
 * This file initializes Vercel Web Analytics for the site
 */

import { inject } from '../node_modules/@vercel/analytics/dist/index.mjs';

// Initialize Vercel Web Analytics
inject({
  mode: 'auto', // Automatically detect environment (production/development)
  debug: false  // Set to true for debugging in development
});
