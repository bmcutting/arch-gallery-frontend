import LibSwitch from "react-switch";

interface Props {
  checked: boolean;
  onClick?: () => void;
  onChange?: (v: boolean) => void;
}

export default function Switch({ checked, onChange, onClick }: Props) {
  return (
    <LibSwitch
      onClick={onClick}
      checked={checked}
      onChange={onChange ? onChange : () => {}}
      checkedIcon={false}
      uncheckedIcon={false}
      activeBoxShadow=""
      handleDiameter={12}
      height={18}
      width={34}
      onColor="#4cd964"
    />
  );
}
