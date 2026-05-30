export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-10 text-center">
      <h1 className="font-display text-5xl font-semibold text-foam">
        SeaJobs<span className="text-brass2">.pro</span>
      </h1>
      <p className="text-mist text-lg">
        Каркас работает. Стили подключены. ⚓
      </p>
      <span className="mt-4 rounded-full bg-brass px-5 py-2 font-semibold text-deep">
        Tailwind активен
      </span>
    </main>
  );
}
