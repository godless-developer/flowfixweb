import Pet from "./_components/Pet";

export default function Home() {
  return (
    <div className="w-full h-screen relative bg-[url(/shadow.png)] bg-no-repeat bg-center bg-cover">
      <Pet />
    </div>
  );
}
