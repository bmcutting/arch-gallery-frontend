import FormModal from "@modules/app/modules/modal/components/FormModal/FormModal";
import Input from "@modules/app/modules/ui/components/Input/Input";
import FormInput from "@modules/app/modules/ui/components/Form/FormInput";
import DateInput from "@modules/app/modules/ui/components/DateInput/DateInput";
import Textarea from "@modules/app/modules/ui/components/TextArea/TextArea";
import useExperienceForm from "@modules/user/hooks/useExperienceForm";
import type { Experience } from "@modules/user/domain/entities/experience";
import type { ExperienceType } from "@modules/user/domain/enums/experience";

interface Props {
  experience: Omit<Experience, "id"> | null;
  onSave: (expData: Omit<Experience, "id">) => void;
}

export default function ExperienceForm({ experience, onSave }: Props) {
  const { form, setForm, handleSubmit } =
    useExperienceForm({ experience, onSave });

  return (
    <FormModal
      title={experience ? "Editar experiencia" : "Añadir experiencia"}
      onSubmit={handleSubmit}
      submitDisabled={
        !form.type ||
        !form.title ||
        !form.institutionOrCompany ||
        !form.startYear
      }
      width={672}
    >
      <FormInput label="Tipo" required>
        <select
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value as ExperienceType })
          }
          className="w-full px-3 py-2 rounded-md border border-border"
        >
          <option value="work">Experiencia profesional</option>
          <option value="education">Educación</option>
        </select>
      </FormInput>
      <FormInput label="Título" required>
        <Input
          name="title"
          placeholder="Ej: Arquitecto Senior, Máster en Arquitectura"
          inputValue={{
            value: form.title,
            onChange: (val) => setForm({ ...form, title: val }),
          }}
          full
          errorMsg="Debe añadir un título"
        />
      </FormInput>
      <FormInput label="Institución/Empresa" required>
        <Input
          name="institutionOrCompany"
          placeholder="Nombre de la empresa o institución"
          inputValue={{
            value: form.institutionOrCompany,
            onChange: (val) => setForm({ ...form, institutionOrCompany: val }),
          }}
          full
          errorMsg="Debe añadir una institución o empresa"
        />
      </FormInput>
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="Año de inicio"
          className="block text-sm font-medium mb-1"
          required
        >
          <DateInput
            precision="year"
            name="startYear"
            inputValue={{
              value: { year: form.startYear },
              onChange: ({ year }) => setForm({ ...form, startYear: year }),
            }}
            errorMsg="Debe añadir el año de inicio"
          />
        </FormInput>
        <FormInput label="Año de fin">
          <div>
            <DateInput
              precision="year"
              inputValue={{
                value: { year: form.endYear },
                onChange: ({ year }) => setForm({ ...form, endYear: year }),
              }}
              disabled={form.isCurrent}
            />
            <label className="flex items-center gap-1 text-sm whitespace-nowrap">
              <input
                type="checkbox"
                checked={form.isCurrent}
                onChange={(e) =>
                  setForm({
                    ...form,
                    isCurrent: e.target.checked,
                    endYear: undefined,
                  })
                }
              />
              Actualmente
            </label>
          </div>
        </FormInput>
      </div>
      <FormInput label="Descripción (opcional)">
        <Textarea
          placeholder="Describe tus responsabilidades o logros"
          inputValue={{
            value: form.description,
            onChange: (val) => setForm({ ...form, description: val }),
          }}
          className="p-2"
        />
      </FormInput>
    </FormModal>
  );
}
