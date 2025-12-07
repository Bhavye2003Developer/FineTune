import PlayerHome from "./components/PlayerHome";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-zinc-100 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <main className="mx-auto flex w-full max-w-3xl flex-col px-8 py-16">
        <PlayerHome />
      </main>
    </div>
  );
}
