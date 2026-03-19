import fs from 'fs';
import path from 'path';

const basePath = path.join(process.cwd(), 'src/lib/components/app/shopTheme');

const themes = [
  'business/restaurant',
  'business/clothing',
  'business/electronics',
  'business/bakery',
  'general/default',
  'general/modern',
  'general/grid'
];

const layoutContent = `<script lang="ts">
  export let shop: any = null;
  export let totalProducts: number = 0;
  export let product: any = undefined;
</script>
<header class="p-4 bg-gray-900 text-white font-bold border-b">THEME_NAME HEADER</header>
<main class="min-h-screen">
  <slot />
</main>
<footer class="p-4 bg-gray-900 text-white text-sm border-t mt-auto">THEME_NAME FOOTER</footer>
`;

const viewContent = `<script lang="ts">
  export let data: any;
</script>
<div class="p-8 text-center text-xl font-bold border-4 border-dashed border-gray-300 rounded-xl my-8">
  THIS IS THE THEME_NAME THEME CONTENT
</div>
`;

themes.forEach(theme => {
  const themePath = path.join(basePath, theme);
  const layoutPath = path.join(themePath, 'layout');
  const viewsPath = path.join(themePath, 'views');
  const componentsPath = path.join(themePath, 'components');

  [themePath, layoutPath, viewsPath, componentsPath].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  const name = theme.toUpperCase();

  fs.writeFileSync(path.join(layoutPath, 'ThemeLayout.svelte'), layoutContent.replace(/THEME_NAME/g, name));
  
  fs.writeFileSync(path.join(viewsPath, 'HomeView.svelte'), viewContent.replace(/THEME_NAME THEME CONTENT/g, name + ' HOME VIEW'));
  fs.writeFileSync(path.join(viewsPath, 'ProductsView.svelte'), viewContent.replace(/THEME_NAME THEME CONTENT/g, name + ' PRODUCTS LIST'));
  fs.writeFileSync(path.join(viewsPath, 'DetailView.svelte'), viewContent.replace(/THEME_NAME THEME CONTENT/g, name + ' PRODUCT DETAILS'));
  
  fs.writeFileSync(path.join(componentsPath, 'ProductCard.svelte'), viewContent.replace(/THEME_NAME THEME CONTENT/g, name + ' PRODUCT CARD'));
});
console.log('Done scaffolding themes!');
