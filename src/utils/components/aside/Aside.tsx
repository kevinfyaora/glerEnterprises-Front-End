import Image from "next/image";

const Aside = () => {
  return (
    <div className="min-h-screen w-[260px] bg-GLORIOUS-neutral-white text-center flex flex-col">
      <Image src={"/gler.svg"} width={68} height={68} alt="Logo" />
      <div>
        <Image src={"/female.svg"} width={40} height={40} alt="User Picture" />
      </div>
    </div>
  );
};

export default Aside;
