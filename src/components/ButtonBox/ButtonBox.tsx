import css from "./ButtonBox.module.css";

interface ButtonBoxProps {
  children?: React.ReactNode;
  type?: "submit" | "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement> | (() => void);
}

export default function ButtonBox({
  children,
  type = "button",
  onClick,
}: ButtonBoxProps) {
  return (
    <button type={type} onClick={onClick} className={css.ButtonBox}>
      {children}
    </button>
  );
}
