import { ModalProps } from "@modules/app/modules/modal/domain/base";
import type { Project } from "@modules/project/domain/entities/project";

export class CreateProjectModalProps extends ModalProps {
  constructor(
    readonly userId: string,
    readonly refetch: () => void,
  ) {
    super();
  }
}

export class EditProjectModalProps extends ModalProps {
  constructor(
    readonly project: Project,
    readonly refetch: () => void,
  ) {
    super();
  }
}

export class DeleteProjectModalProps extends ModalProps {
  constructor(
    readonly projectId: string,
    readonly title: string,
    readonly refetch: () => void,
  ) {
    super();
  }
}

export class ViewProjectModalProps extends ModalProps {
  constructor(readonly projectId: string) {
    super();
  }
}
