import { createApp } from './app';
import { seed } from './db/seed';

const PORT = 3000;

function main(): void {
  seed();
  const app = createApp();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
  });
}

main();
