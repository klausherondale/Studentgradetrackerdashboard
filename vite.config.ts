import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Replace 'Studentgradetrackerdashboard' with your repository name if different.
const repoName = 'Studentgradetrackerdashboard';

export default defineConfig({
  base: process.env.GH_PAGES ? `/${repoName}/` : '/',
  plugins: [react()],
});