import HomeCountdownPage from "@/components/home";
import SignIn from "@/components/singin";

export default function Page({ children }) {
  return (
    <div className="min-h-screen bg-[EAEDEF] dark:bg-[181818]">
      {/* SingIn */}
      <HomeCountdownPage/>
    </div>
  );
}
