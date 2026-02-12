import Link from "next/link";

type Features = {
  title: string;
  link: string;
};

export default function FeaturesComponent({ title, link }: Features) {
  return (
    <button className="m-4 p-4 bg-sky-500 text-white rounded-md cursor-pointer">
      <Link href={link}>{title}</Link>
    </button>
  );
}
