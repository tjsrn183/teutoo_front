import AppBar from "@/components/common/app-bar";
import AddressMenu from "./_components/address-menu";
import Search from "@/components/common/search";
import TrainerList from "./_components/trainer-list";

export default function Home() {
  return (
    <div className="flex flex-col">
      <AppBar sticky>
        <AddressMenu />
      </AppBar>
      <div className="p-2">
        <Search
          className="w-full"
          placeholder="트레이너, 헬스장 이름을 검색하세요..."
        />
        <div className="flex-auto h-full">
          <TrainerList />
        </div>
      </div>
    </div>
  );
}
