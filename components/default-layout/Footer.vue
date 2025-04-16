<template>
  <div class="flex flex-col min-h-screen">
    <div class="flex-grow">
      <slot />
    </div>
    <footer class="bg-gray-800 text-white py-4">
      <div class="container mx-auto text-center">
        <p>&copy; 2025 Best Tyro. All rights reserved.</p>
        <p>Follow us on social media:</p>
        <ul class="flex justify-center space-x-4">
          <li><a href="#" class="text-white">Facebook</a></li>
          <li><a href="#" class="text-white">Twitter</a></li>
          <li><a href="#" class="text-white">Instagram</a></li>
        </ul>
      </div>
    </footer>
  </div>
</template>
