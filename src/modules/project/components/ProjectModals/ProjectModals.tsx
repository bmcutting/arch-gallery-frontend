import useModal from "@modules/app/modules/modal/hooks/useModal";
import {
  CreateProjectModalProps,
  DeleteProjectModalProps,
  EditProjectModalProps,
  ViewProjectModalProps,
} from "@modules/project/domain/modal/project-modal";
import CreateProject from "@modules/project/components/ProjectModals/components/CreateProject/CreateProject";
import EditProject from "@modules/project/components/ProjectModals/components/EditProject/EditProject";
import DeleteProject from "@modules/project/components/ProjectModals/components/DeleteProject/DeleteProject";
import ViewProject from "@modules/project/components/ProjectModals/components/ViewProject/ViewProject";

export default function ProjectModals() {
  const { open } = useModal();

  return (
    <>
      {open instanceof CreateProjectModalProps && (
        <CreateProject userId={open.userId} refetch={open.refetch} />
      )}
      {open instanceof EditProjectModalProps && (
        <EditProject project={open.project} refetch={open.refetch} />
      )}
      {open instanceof DeleteProjectModalProps && (
        <DeleteProject
          projectId={open.projectId}
          title={open.title}
          refetch={open.refetch}
        />
      )}
      {open instanceof ViewProjectModalProps && (
        <ViewProject projectId={open.projectId} />
      )}
    </>
  );
}
