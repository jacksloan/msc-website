<style global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .page-title {
    @apply mt-4 mb-12;
  }

  html {
    overflow-y: scroll;
  }

  .markdown-content p {
    @apply mb-6;
  }

  .markdown-content h1,
  h2,
  h3,
  h4,
  h5 {
    @apply mt-8 mb-4;
  }

  body,
  main {
    @apply bg-gray-50;
  }

  h1 {
    @apply text-5xl;
  }

  h2 {
    @apply text-4xl;
  }

  h3 {
    @apply text-3xl;
  }
  h4 {
    @apply text-2xl;
  }
  h5 {
    @apply text-xl;
  }
  h6 {
    @apply text-lg;
  }
</style>
