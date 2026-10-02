import FormModal from "@modules/app/modules/modal/components/FormModal/FormModal";
import Input from "@modules/app/modules/ui/components/Input/Input";
import FormInput from "@modules/app/modules/ui/components/Form/FormInput";
import useSkillForm from "@modules/user/hooks/useSkillForm";
import type { Level } from "@modules/user/domain/enums/level";
import type { Skill } from "@modules/user/domain/entities/skill";

interface Props {
  skill: Skill | null;
  onSave: (skillData: Omit<Skill, "id">) => void;
}

export default function SkillForm({ skill, onSave }: Props) {
  const { form, setForm, LEVEL_OPTIONS, touched, handleTouched, handleSubmit } =
    useSkillForm({ skill, onSave });

  return (
    <FormModal
      title={skill ? "Editar habilidad" : "Añadir habilidad"}
      onSubmit={handleSubmit}
      submitDisabled={!form.name}
      width={448}
    >
      <FormInput label="Nombre de la habilidad" required>
        <Input
          name="name"
          placeholder="Ej: AutoCAD, Revit, Photoshop"
          inputValue={{
            value: form.name,
            onChange: (val) => setForm({ ...form, name: val }),
          }}
          touched={touched.name}
          onBlur={handleTouched}
          required
          errorMsg="Debe añadir el nombre de la habilidad"
          full
        />
      </FormInput>
      <div>
        <label className="block text-sm font-medium mb-1">
          Nivel (opcional)
        </label>
        <select
          value={form.level || ""}
          onChange={(e) => setForm({ ...form, level: e.target.value as Level })}
          className="w-full px-3 py-2 rounded-md border border-border"
        >
          <option value="">Sin nivel</option>
          {LEVEL_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </FormModal>
  );
}
