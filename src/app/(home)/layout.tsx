import Link from "next/link";

export default function HomePage(props: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-black via-blue-950 to-blue-900 p-4 text-white">
      <main className="text-center">{props.children}</main>
      <footer className="mt-16 text-sm text-blue-400">
        Designed by
        <Link
          href={"https://github.com/xeo3221/"}
          className="ml-1 text-blue-300 hover:underline"
        >
          {" "}
          Sebastian Świderki
        </Link>
      </footer>
    </div>
  );
}
