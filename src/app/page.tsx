import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen w-full bg-slate-950">
      <div className="flex flex-col items-center justify-center h-full p-10 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]">
        <h1 className="text-center text-2xl font-medium text-gray-900 dark:text-gray-50 sm:text-6xl py-4">
          Marill
        </h1>
        <Link href="/login">
          <button className=" bg-slate-50 hover:bg-slate-300 text-black py-2 px-6 rounded transition duration-300 ease-in-out transform hover:-translate-y-1">
            Get Started
          </button>
        </Link>
      </div>
    </main>
  );
}
