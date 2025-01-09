## Vue 3 + TypeScript + Vite Chrome Extension Boilerplate

This boilerplate provides a starting point for developing Chrome extensions using Vue 3, TypeScript, Vite, ESLint, and Prettier.

It offers features like hot module replacement and code linting for a smooth development experience.

### Features

- **Vue 3:** Leverage the power of Vue 3 for building dynamic and interactive Chrome extension UIs.
- **TypeScript:** Ensure type safety and improve code maintainability with TypeScript.
- **Vite:** Benefit from Vite's blazing-fast development server and hot module replacement for a seamless development workflow.
- **ESLint:** Maintain code quality and consistency with ESLint integration.
- **Prettier:** Format your code automatically with Prettier for a clean and consistent codebase.
- **Auto rebuild on code change:** Focus on development and let the boilerplate handle rebuilding the extension on code changes.

### Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/nhanquach/chrome-extension-boilerplate-vue-vite
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Run the development server:

   ```bash
   yarn dev
   ```

   This will start the development server and open your Chrome extension in a new browser tab. Extension still need to be "Refresh" from the extension management page in order to take effect.

4. Develop your extension:

   The boilerplate provides a basic structure for your Chrome extension. You can edit the Vue components and TypeScript files located in the `src` directory to implement your extension's functionality.

5. Build the extension for production:

   ```bash
   yarn build
   ```

   This will generate an optimized production build of your Chrome extension in the `dist` directory.

### Additional Notes

- Refer to the official documentation for Vue 3, TypeScript, Vite, ESLint, and Prettier for detailed information on using these tools.
- The boilerplate includes a basic `manifest.json` file that you can customize to define your extension's metadata, permissions, and background scripts.

### Install Unpacked Extension to Chrome

1. Enable Developer Mode

   Open Chrome and go to `chrome://extensions/`.

   Toggle the "Developer mode" switch on.

2. Load Unpacked Extension

   Click the "Load unpacked" button. Select the folder where your unpacked extension files are located.

   This folder should contain the `manifest.json` file.
