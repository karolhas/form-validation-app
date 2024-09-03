import { Form } from "@/components/form/Form";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center relative">
      <div className="absolute left-0 top-0 h-full w-1/2 bg-red-400"></div>
      <div className="absolute right-0 top-0 h-full w-1/2 bg-gray-100"></div>

      <div className="relative z-10 bg-white p-8 shadow-xl rounded-lg w-full max-w-2xl m-4">
        <Form />
      </div>
    </main>
  );
}
