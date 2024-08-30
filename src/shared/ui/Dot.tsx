type Props = {
  size?: "x-small" | "small" | "base";
};
export default function Dot({ size = "x-small" }: Props) {
  const base = "mx-1 text-xs text-slate-400";
  let option = "";
  switch (size) {
    case "x-small":
      option = "text-xs";
      break;
    case "small":
      option = "text-sm";
      break;
    case "base":
      option = "text-base";
      break;
  }
  return <span className={`${base} ${option}`}>•</span>;
}
