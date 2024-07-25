import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black">
      <button className="btn rounded-none w-64">Button</button>
      <button className="btn">Button</button>
      <button className="btn btn-primary glass">Button</button>
      <button className="btn btn-secondary">Button</button>
      <input type="checkbox" className="checkbox checkbox-secondary" />
      <div className="glass bg-slate-400 h-32">Glass</div>
    </div>
  );
}
