import { Options } from "@/app/types/review";
import OptionButton from "../ui/OptionButton";

const optionsArray: Options[] = [
  { heading: "Option 1", navLink: "/" },
  { heading: "Option 2", navLink: "/" },
  { heading: "Option 3", navLink: "/" },
  { heading: "Option 4", navLink: "/" },
];

export default function SideBar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between shadow-sm">
      <div className="p-6">
        <div className="space-y-2">
          {optionsArray.map((item) => (
            <OptionButton key={item.heading} buttonText={item} />
          ))}
        </div>
      </div>

      <div className="p-6 border-t border-gray-200">
        <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition duration-200">
          Open/Close Sidebar
        </button>
      </div>
    </aside>
  );
}
