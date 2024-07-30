export interface Step {
  label: string;
  command: (event: any) => void;

  // Command looks like this:
  /*
        command: (event: any) =>
          this.messageService.add({
            severity: 'info',
            summary: 'First Step',
            detail: event.item.label,
          }),
    */
}
