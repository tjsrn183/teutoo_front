import IntroTrainerForm from "./components/IntroTrainerForm";
export default function IntroduceTrainerPage() {
  return (
    <div className="h-screen bg-white text-black md:w-full">
      <div className="flex flex-col">
        <IntroTrainerForm />
      </div>
    </div>
  );
}
