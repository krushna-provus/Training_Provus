import { Options } from "@/app/types/review";
import Link from "next/link";

export default function OptionButton({ buttonText }: { buttonText: Options }) {
  return (
    <Link
      href={buttonText.navLink}
      className="block w-full px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition duration-200"
    >
      {buttonText.heading}
    </Link>
  );
}
